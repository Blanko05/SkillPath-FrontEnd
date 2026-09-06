import { useState, useEffect } from "react";
import { Container, Table, Button, Alert, Modal } from "react-bootstrap";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api/courses.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import CourseForm from "../Components/CourseForm.jsx";

function ManagerDashboardPage() {
  const { currentUser } = useCurrentUser();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState(null);

  function loadCourses() {
    getCourses().then((data) => {
      setCourses(data.filter((c) => c.manager.id === currentUser.id));
    });
  }

  useEffect(() => {
    if (currentUser) loadCourses();
  }, [currentUser]);

  function openCreateForm() {
    setEditingCourse(null);
    setShowForm(true);
  }

  function openEditForm(course) {
    setEditingCourse(course);
    setShowForm(true);
  }

  async function handleSubmit(values) {
    setError(null);
    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, values);
      } else {
        await createCourse(values);
      }
      setShowForm(false);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save course.");
    }
  }

  async function handleDelete(course) {
    if (!window.confirm(`Delete "${course.title}"?`)) return;
    try {
      await deleteCourse(course.id);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete course.");
    }
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>My Courses</h1>
        <Button onClick={openCreateForm}>+ New Course</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Skill Level</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.skillLevel}</td>
              <td>{course.status}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => openEditForm(course)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {courses.length === 0 && (
        <p className="text-muted">You haven't created any courses yet.</p>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCourse ? "Edit Course" : "New Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseForm
            initialValues={editingCourse || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            submitLabel={editingCourse ? "Save Changes" : "Create Course"}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ManagerDashboardPage;
