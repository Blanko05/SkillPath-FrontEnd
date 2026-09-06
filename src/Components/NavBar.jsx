import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function NavBar() {
  const { currentUser, logout } = useCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Navbar expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SkillPath
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-2">
          <ThemeToggle />
          <Navbar.Toggle aria-controls="main-navbar" />
        </div>
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/courses">
              Courses
            </Nav.Link>
            {currentUser?.role === "student" && (
              <>
                <Nav.Link as={Link} to="/quiz">
                  Take Quiz
                </Nav.Link>
                <Nav.Link as={Link} to="/quiz-history">
                  Quiz History
                </Nav.Link>
                <Nav.Link as={Link} to="/my-enrollments">
                  My Enrollments
                </Nav.Link>
              </>
            )}
            {currentUser?.role === "manager" && (
              <Nav.Link as={Link} to="/manager">
                Manager Dashboard
              </Nav.Link>
            )}
            {currentUser?.role === "admin" && (
              <Nav.Link as={Link} to="/admin">
                Admin Dashboard
              </Nav.Link>
            )}
          </Nav>
          {currentUser ? (
            <div className="d-flex align-items-center gap-3">
              <span className="eyebrow">
                {currentUser.name} &middot; {currentUser.role}
              </span>
              <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Nav.Link as={Link} to="/login">
                Log in
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
