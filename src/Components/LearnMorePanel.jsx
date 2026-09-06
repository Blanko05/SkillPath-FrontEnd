import { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getWikipediaSummary } from "../api/external.js";

// Background reading pulled live from Wikipedia for the course's category -
// demonstrates calling a third-party API directly from the frontend.
function LearnMorePanel({ topic }) {
  const [summary, setSummary] = useState(undefined);

  useEffect(() => {
    setSummary(undefined);
    getWikipediaSummary(topic).then(setSummary);
  }, [topic]);

  if (summary === undefined) {
    return <Spinner animation="border" size="sm" />;
  }

  if (summary === null) {
    return null;
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Learn more about {summary.title}</Card.Title>
        <Card.Text>{summary.extract}</Card.Text>
        {summary.pageUrl && (
          <a href={summary.pageUrl} target="_blank" rel="noopener noreferrer">
            Read more on Wikipedia
          </a>
        )}
      </Card.Body>
    </Card>
  );
}

export default LearnMorePanel;
