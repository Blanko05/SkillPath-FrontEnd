import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Badge, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { getCourseById } from "../api/courses.js";
import { getEnrollments, createEnrollment, deleteEnrollment } from "../api/enrollments.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import { SKILL_LEVEL_VARIANT } from "../Components/CourseCard.jsx";
import LearnMorePanel from "../Components/LearnMorePanel.jsx";
import RelatedVideos from "../Components/RelatedVideos.jsx";

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState(null);
  const [showUnenrollConfirm, setShowUnenrollConfirm] = useState(false);

  useEffect(() => {
    getCourseById(id).then(setCourse);
  }, [id]);

  useEffect(() => {
    if (currentUser?.role === "student") {
      getEnrollments().then(setEnrollments);
    }
  }, [currentUser]);

  if (!course) {
    return <Spinner animation="border" className="m-4" />;
  }

  const myEnrollment = enrollments.find(
    (e) => e.user.id === currentUser?.id && e.course.id === course.id,
  );

  async function handleEnroll() {
    setWorking(true);
    setMessage(null);
    try {
      await createEnrollment(currentUser.id, course.id);
      setMessage({ type: "success", text: "Enrolled successfully!" });
      const updated = await getEnrollments();
      setEnrollments(updated);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Could not enroll.",
      });
    } finally {
      setWorking(false);
    }
  }

  async function handleUnenroll() {
    setShowUnenrollConfirm(false);
    setWorking(true);
    setMessage(null);
    try {
      await deleteEnrollment(myEnrollment.id);
      setMessage({ type: "success", text: "Unenrolled successfully." });
      const updated = await getEnrollments();
      setEnrollments(updated);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Could not unenroll.",
      });
    } finally {
      setWorking(false);
    }
  }

  return (
    <Container>
      <Button variant="link" className="ps-0" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
      <h1 className="mt-3">{course.title}</h1>
      <p className="text-muted">
        {course.category} &middot; {course.durationHours}h &middot; Taught by{" "}
        {course.manager?.name}
      </p>
      <Badge bg={SKILL_LEVEL_VARIANT[course.skillLevel] || "secondary"} className="mb-3">
        {course.skillLevel}
      </Badge>
      <p>{course.description}</p>

      {course.content && (
        <p style={{ whiteSpace: "pre-wrap" }}>{course.content}</p>
      )}

      <LearnMorePanel topic={course.category} />
      <RelatedVideos query={course.title} />

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      {currentUser?.role === "student" && (
        <Button
          variant={myEnrollment ? "outline-danger" : "primary"}
          disabled={working}
          onClick={
            myEnrollment ? () => setShowUnenrollConfirm(true) : handleEnroll
          }
        >
          {working
            ? "Please wait..."
            : myEnrollment
              ? "Unenroll"
              : "Enroll"}
        </Button>
      )}

      <Modal show={showUnenrollConfirm} onHide={() => setShowUnenrollConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unenroll from this course?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to unenroll from &ldquo;{course.title}&rdquo;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnenrollConfirm(false)}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleUnenroll}>
            Unenroll
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CourseDetailPage;
