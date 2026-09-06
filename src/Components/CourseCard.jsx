import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCallNumber } from "../utils/callNumber.js";
import { getCoverColor } from "../utils/categoryStyle.js";

export const SKILL_LEVEL_VARIANT = {
  beginner: "success",
  intermediate: "warning",
  advanced: "dark",
};

function CourseCard({ course }) {
  return (
    <Card className="h-100 course-card">
      <div
        className="course-cover"
        style={{ backgroundColor: getCoverColor(course.category) }}
      >
        <span className="course-cover-number">{getCallNumber(course)}</span>
        <span className="course-cover-initial">{course.title[0]}</span>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{course.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {course.category} &middot; {course.durationHours}h
        </Card.Subtitle>
        <Badge
          bg={SKILL_LEVEL_VARIANT[course.skillLevel] || "secondary"}
          className="mb-2 align-self-start"
        >
          {course.skillLevel}
        </Badge>
        <Card.Text className="flex-grow-1">{course.description}</Card.Text>
        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
          Taught by {course.manager?.name}
        </Card.Text>
        <Button as={Link} to={`/courses/${course.id}`} variant="primary">
          View Course
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
