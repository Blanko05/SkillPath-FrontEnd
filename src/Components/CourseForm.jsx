import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const emptyValues = {
  title: "",
  description: "",
  content: "",
  category: "",
  skillLevel: "beginner",
  durationHours: 1,
  status: "draft",
};

// Create/edit form for a manager's own courses - manager ownership is set
// server-side from the logged-in user, so there's no manager picker here.
function CourseForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues });

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Full course content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="The longer write-up shown on the course detail page..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Skill level</Form.Label>
        <Form.Select
          value={values.skillLevel}
          onChange={(e) => handleChange("skillLevel", e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duration (hours)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={values.durationHours}
          onChange={(e) => handleChange("durationHours", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={values.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary" className="me-2">
        {submitLabel}
      </Button>
      {onCancel && (
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Form>
  );
}

export default CourseForm;
