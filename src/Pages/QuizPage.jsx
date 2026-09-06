import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { submitQuiz } from "../api/quiz.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";

const GOAL_OPTIONS = [
  "career-change",
  "skill-upgrade",
  "certification",
  "personal-interest",
  "promotion",
];

function QuizPage() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const [skillLevel, setSkillLevel] = useState("beginner");
  const [timeAvailability, setTimeAvailability] = useState("5-10 hrs/week");
  const [goals, setGoals] = useState([]);
  const [freeTextPrompt, setFreeTextPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function toggleGoal(goal) {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitQuiz({
        userId: currentUser.id,
        skillLevel,
        timeAvailability,
        goals,
        freeTextPrompt,
      });
      navigate(`/recommendations/${result.quizResponseId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not get recommendations. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container style={{ maxWidth: 600 }}>
      <h1>Find Your Course</h1>
      <p className="text-muted">
        Answer a few questions and we'll recommend courses that fit you.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Skill level</Form.Label>
          <Form.Select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time availability</Form.Label>
          <Form.Select
            value={timeAvailability}
            onChange={(e) => setTimeAvailability(e.target.value)}
          >
            <option value="0-5 hrs/week">0-5 hrs/week</option>
            <option value="5-10 hrs/week">5-10 hrs/week</option>
            <option value="10-15 hrs/week">10-15 hrs/week</option>
            <option value="15+ hrs/week">15+ hrs/week</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Goals</Form.Label>
          {GOAL_OPTIONS.map((goal) => (
            <Form.Check
              key={goal}
              type="checkbox"
              label={goal}
              checked={goals.includes(goal)}
              onChange={() => toggleGoal(goal)}
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Anything else we should know?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={freeTextPrompt}
            onChange={(e) => setFreeTextPrompt(e.target.value)}
            placeholder="e.g. I want to get into backend development..."
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Getting recommendations..." : "Get Recommendations"}
        </Button>
      </Form>
    </Container>
  );
}

export default QuizPage;
