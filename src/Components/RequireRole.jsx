import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";

// Wraps a page and only renders it if the logged-in user's role is in the
// allowed list - otherwise shows a message instead.
function RequireRole({ allowed, children }) {
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return (
      <Alert variant="warning">
        You need to <Link to="/login">log in</Link> to view this page.
      </Alert>
    );
  }

  if (!allowed.includes(currentUser.role)) {
    return (
      <Alert variant="warning">
        You don't have permission to view this page.
      </Alert>
    );
  }

  return children;
}

export default RequireRole;
