import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import { getCourses } from "../api/courses.js";
import { getCallNumber } from "../utils/callNumber.js";
import { useInView } from "../hooks/useInView.js";
import CourseCard from "../Components/CourseCard.jsx";
import Reveal from "../Components/Reveal.jsx";

const STEPS = [
  {
    tag: "INPUT",
    title: "Take the quiz",
    text: "Skill level, time availability, and your goals - recorded in under two minutes.",
  },
  {
    tag: "MATCH",
    title: "AI drafts your reading list",
    text: "Every published course is scored against your answers, each with a stated reason.",
  },
  {
    tag: "ENROLL",
    title: "Enroll and learn",
    text: "Check a course out, track it on your shelf, come back for another round anytime.",
  },
];

// Counts up from 0 to `target` once `active` becomes true - used to animate
// the stat strip when it scrolls into view, rather than just popping in.
function useCountUp(target, active, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    let start;
    function step(timestamp) {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function HomePage() {
  const { currentUser } = useCurrentUser();
  const [stats, setStats] = useState({ courseCount: 0, categoryCount: 0 });
  const [topCategories, setTopCategories] = useState([]);
  const [recent, setRecent] = useState([]);

  const [statsRef, statsInView] = useInView({ threshold: 0.4 });
  const animatedCourseCount = useCountUp(stats.courseCount, statsInView);
  const animatedCategoryCount = useCountUp(stats.categoryCount, statsInView);

  useEffect(() => {
    getCourses().then((courses) => {
      const published = courses.filter((c) => c.status === "published");
      const counts = new Map();
      published.forEach((c) => counts.set(c.category, (counts.get(c.category) || 0) + 1));
      setStats({ courseCount: published.length, categoryCount: counts.size });
      setTopCategories(
        [...counts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category, count]) => ({ category, count })),
      );
      setRecent(published.slice(-3).reverse());
    });
  }, []);

  return (
    <>
      <Container className="py-5">
        <Row className="g-5 align-items-start">
          <Col md={7} className="an an-1">
            <p className="eyebrow">Vol. I &middot; Guided Study</p>
            <h1>Find your next skill, well catalogued.</h1>
            <p className="lead" style={{ color: "var(--text-dim)" }}>
              A short quiz, then a reading list ranked by AI to match your
              level, your hours, and what you're actually trying to learn.
            </p>
            <div className="d-flex gap-2 mt-4">
              {currentUser?.role === "student" && (
                <Button as={Link} to="/quiz" variant="primary">
                  Take the Quiz
                </Button>
              )}
              <Button as={Link} to="/courses" variant="outline-dark">
                Browse Catalog
              </Button>
            </div>
          </Col>
          <Col md={5} className="an an-2">
            {topCategories.map(({ category, count }) => (
              <div className="toc-row" key={category}>
                <span className="num pulse-dot">&middot;</span>
                <div>
                  <h3 className="h6 mb-1">{category}</h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    {count} course{count === 1 ? "" : "s"} on the shelf
                  </p>
                </div>
                <span className="tag">
                  {getCallNumber({ category, skillLevel: "beginner", id: 0 }).split(" · ")[0]}
                  &nbsp;&middot;&nbsp;100s
                </span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2>How it works</h2>
        <div>
          {STEPS.map(({ tag, title, text }, i) => (
            <Reveal className="toc-row" delay={i * 120} key={title}>
              <span className="num">{i + 1}.</span>
              <div>
                <h3 className="h6 mb-1">{title}</h3>
                <p className="text-muted mb-0">{text}</p>
              </div>
              <span className="tag">{tag}</span>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-5">
        <div
          ref={statsRef}
          className={`stat-strip reveal ${statsInView ? "in-view" : ""}`}
        >
          <div>
            <b>{animatedCourseCount}+</b>
            <span>Published Courses</span>
          </div>
          <div>
            <b>{animatedCategoryCount}</b>
            <span>Skill Categories</span>
          </div>
          <div>
            <b>AI</b>
            <span>Powered Matching</span>
          </div>
        </div>
      </Container>

      {recent.length > 0 && (
        <Container className="py-5">
          <h2 className="mb-4">Recent acquisitions</h2>
          <Row xs={1} md={3} className="g-4">
            {recent.map((course, i) => (
              <Col key={course.id}>
                <Reveal delay={i * 120}>
                  <CourseCard course={course} />
                </Reveal>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <Reveal as="div" className="cta-band py-5 text-center">
        <Container>
          <h2>Ready to check something out?</h2>
          <p className="lead mb-4">
            It only takes a couple of minutes to get your first recommendations.
          </p>
          <Button
            as={Link}
            to={currentUser?.role === "student" ? "/quiz" : "/courses"}
            variant="primary"
            size="lg"
          >
            {currentUser?.role === "student" ? "Take the Quiz" : "Browse Courses"}
          </Button>
        </Container>
      </Reveal>
    </>
  );
}

export default HomePage;
