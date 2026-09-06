import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { getCourses } from "../api/courses.js";
import CourseCard from "../Components/CourseCard.jsx";
import Reveal from "../Components/Reveal.jsx";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [skillLevel, setSkillLevel] = useState("all");

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data.filter((course) => course.status === "published"));
    });
  }, []);

  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || course.category === category;
    const matchesSkillLevel =
      skillLevel === "all" || course.skillLevel === skillLevel;
    return matchesSearch && matchesCategory && matchesSkillLevel;
  });

  return (
    <Container>
      <h1>Courses</h1>

      <Row className="mb-4 g-2">
        <Col md={4}>
          <Form.Control
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="all">All skill levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredCourses.map((course, i) => (
          <Col key={course.id}>
            <Reveal delay={(i % 6) * 80}>
              <CourseCard course={course} />
            </Reveal>
          </Col>
        ))}
      </Row>

      {filteredCourses.length === 0 && (
        <p className="text-muted mt-4">No courses match your filters.</p>
      )}
    </Container>
  );
}

export default CoursesPage;
