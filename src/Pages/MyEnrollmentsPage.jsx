import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getEnrollments } from "../api/enrollments.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import CourseCard from "../Components/CourseCard.jsx";

function MyEnrollmentsPage() {
  const { currentUser } = useCurrentUser();
  const [enrollments, setEnrollments] = useState(null);

  useEffect(() => {
    getEnrollments().then(setEnrollments);
  }, []);

  if (!enrollments) {
    return <Spinner animation="border" className="m-4" />;
  }

  const myEnrollments = enrollments.filter(
    (e) => e.user.id === currentUser?.id,
  );

  return (
    <Container>
      <h1>My Enrollments</h1>

      {myEnrollments.length === 0 && (
        <p className="text-muted">You're not enrolled in any courses yet.</p>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {myEnrollments.map((enrollment) => (
          <Col key={enrollment.id}>
            <CourseCard course={enrollment.course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyEnrollmentsPage;
