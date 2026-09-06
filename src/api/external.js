import axios from "axios";

// Both of these hit third-party APIs directly from the browser (not through
// our own backend) - that's the point of this feature, so they use plain
// axios rather than the app's ./client.js, which is scoped to our own API
// and tacks on x-role/x-user-id headers that these services don't need.

const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

// No API key, no quota - Wikipedia's REST API is public and CORS-enabled.
export async function getWikipediaSummary(topic) {
  try {
    const response = await axios.get(
      `${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(topic)}`,
    );
    return {
      title: response.data.title,
      extract: response.data.extract,
      pageUrl: response.data.content_urls?.desktop?.page,
    };
  } catch (error) {
    // 404 means no matching article - not an error worth surfacing to the user.
    return null;
  }
}

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

// Requires a free YouTube Data API v3 key 
// Without one configured, this quietly returns no results instead of failing.
export async function getRelatedVideos(query) {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) {
    return [];
  }
  try {
    const response = await axios.get(YOUTUBE_SEARCH_URL, {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 3,
        q: query,
        key: apiKey,
      },
    });
    return response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    return [];
  }
}
