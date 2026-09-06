import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import { getQuizHistory } from "../api/quiz.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";

function QuizHistoryPage() {
  const { currentUser } = useCurrentUser();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getQuizHistory(currentUser.id).then(setHistory);
    }
  }, [currentUser]);

  if (!history) {
    return <Spinner animation="border" className="m-4" />;
  }

  return (
    <Container style={{ maxWidth: 700 }}>
      <h1>My Quiz History</h1>

      {history.length === 0 && (
        <p className="text-muted">
          You haven't taken the quiz yet. <Link to="/quiz">Take it now</Link>.
        </p>
      )}

      {history.map((entry) => (
        <Card key={entry.quizResponseId} className="mb-3">
          <Card.Body>
            <Card.Title>
              Quiz taken {new Date(entry.createdAt).toLocaleDateString()}
            </Card.Title>
            <Card.Text className="text-muted">
              Top pick: {entry.recommendations[0]?.course.title}
            </Card.Text>
            <Link to={`/recommendations/${entry.quizResponseId}`}>
              View full results
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default QuizHistoryPage;
