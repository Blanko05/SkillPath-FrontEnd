import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Badge, Spinner } from "react-bootstrap";
import { getQuizResponseById } from "../api/quiz.js";
import { SKILL_LEVEL_VARIANT } from "../Components/CourseCard.jsx";

function RecommendationsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getQuizResponseById(id).then(setData);
  }, [id]);

  if (!data) {
    return <Spinner animation="border" className="m-4" />;
  }

  return (
    <Container style={{ maxWidth: 700 }}>
      <h1>Your Recommendations</h1>
      <p className="text-muted">Based on your quiz answers, ranked best fit first.</p>

      {data.recommendations.map((rec) => (
        <Card key={rec.rank} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title>
                #{rec.rank} - {rec.course.title}
              </Card.Title>
              <Badge bg={SKILL_LEVEL_VARIANT[rec.course.skillLevel] || "secondary"}>
                {rec.course.skillLevel}
              </Badge>
            </div>
            <Card.Subtitle className="mb-2 text-muted">
              {rec.course.category}
            </Card.Subtitle>
            <Card.Text className="fst-italic">{rec.aiRationale}</Card.Text>
            <Link to={`/courses/${rec.course.id}`}>View course details</Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default RecommendationsPage;
