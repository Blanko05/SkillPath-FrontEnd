import { useState, useEffect } from "react";
import { Container, Table, Button, Alert, Modal, Form, Tabs, Tab } from "react-bootstrap";
import { getCourses, reassignCourseManager } from "../api/courses.js";
import { getUsers, updateUser, deleteUser } from "../api/users.js";

function AdminDashboardPage() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [reassigningCourse, setReassigningCourse] = useState(null);
  const [newManagerId, setNewManagerId] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [userFormValues, setUserFormValues] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);

  const managers = users.filter((u) => u.role === "manager");

  function loadCourses() {
    getCourses().then(setCourses);
  }

  function loadUsers() {
    getUsers().then(setUsers);
  }

  useEffect(() => {
    loadCourses();
    loadUsers();
  }, []);

  function openReassignForm(course) {
    setReassigningCourse(course);
    setNewManagerId(String(course.manager.id));
  }

  async function handleReassignSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await reassignCourseManager(reassigningCourse.id, Number(newManagerId));
      setReassigningCourse(null);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not reassign manager.");
    }
  }

  // The backend's user-update endpoint replaces the whole record, so a
  // role change resends the user's existing name/email untouched. Password
  // is omitted so the backend keeps the user's existing one unchanged.
  async function handleRoleChange(user, newRole) {
    setError(null);
    try {
      await updateUser(user.id, {
        name: user.name,
        email: user.email,
        role: newRole,
      });
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update role.");
    }
  }

  function openEditUserForm(user) {
    setEditingUser(user);
    setUserFormValues({ name: user.name, email: user.email });
  }

  async function handleUserFormSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await updateUser(editingUser.id, {
        name: userFormValues.name,
        email: userFormValues.email,
        role: editingUser.role,
      });
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update user.");
    }
  }

  async function handleDeleteUser(user) {
    const warning =
      user.role === "student"
        ? `Delete ${user.name}? This will also permanently delete their enrollments and quiz history.`
        : `Delete ${user.name}?`;
    if (!window.confirm(warning)) return;
    setError(null);
    try {
      await deleteUser(user.id);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete user.");
    }
  }

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="courses" className="mb-3">
        <Tab eventKey="courses" title="Courses">
          <p className="text-muted">
            Course content is owned and managed by its manager. As admin, you
            can only reassign which manager owns a course.
          </p>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Manager</th>
                <th>Category</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.manager?.name}</td>
                  <td>{course.category}</td>
                  <td>{course.status}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openReassignForm(course)}
                    >
                      Reassign Manager
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="users" title="Users">
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ minWidth: "8.5rem" }}
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                    >
                      <option value="student">student</option>
                      <option value="manager">manager</option>
                      <option value="admin">admin</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => openEditUserForm(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={!!editingUser} onHide={() => setEditingUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={userFormValues.name}
                onChange={(e) =>
                  setUserFormValues((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userFormValues.email}
                onChange={(e) =>
                  setUserFormValues((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={!!reassigningCourse} onHide={() => setReassigningCourse(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Reassign Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReassignSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                New manager for "{reassigningCourse?.title}"
              </Form.Label>
              <Form.Select
                value={newManagerId}
                onChange={(e) => setNewManagerId(e.target.value)}
                required
              >
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setReassigningCourse(null)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminDashboardPage;
