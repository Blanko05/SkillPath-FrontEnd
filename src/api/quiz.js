import client from "./client.js";

export async function submitQuiz(quizData) {
  const response = await client.post("/quiz", quizData);
  return response.data;
}

export async function getQuizResponseById(id) {
  const response = await client.get(`/quiz/${id}`);
  return response.data;
}

export async function getQuizHistory(userId) {
  const response = await client.get(`/quiz?userId=${userId}`);
  return response.data;
}
