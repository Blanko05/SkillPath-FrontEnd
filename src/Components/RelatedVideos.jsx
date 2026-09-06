import { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { getRelatedVideos } from "../api/external.js";

// Related tutorial videos pulled live from YouTube for the course's title -
// second third-party API called directly from the frontend.
function RelatedVideos({ query }) {
  const [videos, setVideos] = useState(undefined);

  useEffect(() => {
    setVideos(undefined);
    getRelatedVideos(`${query} tutorial`).then(setVideos);
  }, [query]);

  if (videos === undefined) {
    return <Spinner animation="border" size="sm" />;
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h5>Related videos</h5>
      <Row xs={1} md={3} className="g-3">
        {videos.map((video) => (
          <Col key={video.videoId}>
            <Card
              as="a"
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none h-100"
            >
              <Card.Img variant="top" src={video.thumbnailUrl} />
              <Card.Body>
                <Card.Text className="small mb-1">{video.title}</Card.Text>
                <Card.Text className="text-muted small mb-0">
                  {video.channelTitle}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default RelatedVideos;
