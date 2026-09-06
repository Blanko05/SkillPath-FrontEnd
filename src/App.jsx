import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext.jsx";
import NavBar from "./Components/NavBar.jsx";
import RequireRole from "./Components/RequireRole.jsx";
import HomePage from "./Pages/HomePage.jsx";
import CoursesPage from "./Pages/CoursesPage.jsx";
import CourseDetailPage from "./Pages/CourseDetailPage.jsx";
import QuizPage from "./Pages/QuizPage.jsx";
import RecommendationsPage from "./Pages/RecommendationsPage.jsx";
import QuizHistoryPage from "./Pages/QuizHistoryPage.jsx";
import MyEnrollmentsPage from "./Pages/MyEnrollmentsPage.jsx";
import ManagerDashboardPage from "./Pages/ManagerDashboardPage.jsx";
import AdminDashboardPage from "./Pages/AdminDashboardPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/quiz"
            element={
              <RequireRole allowed={["student"]}>
                <QuizPage />
              </RequireRole>
            }
          />
          <Route
            path="/recommendations/:id"
            element={
              <RequireRole allowed={["student"]}>
                <RecommendationsPage />
              </RequireRole>
            }
          />
          <Route
            path="/quiz-history"
            element={
              <RequireRole allowed={["student"]}>
                <QuizHistoryPage />
              </RequireRole>
            }
          />
          <Route
            path="/my-enrollments"
            element={
              <RequireRole allowed={["student"]}>
                <MyEnrollmentsPage />
              </RequireRole>
            }
          />

          <Route
            path="/manager"
            element={
              <RequireRole allowed={["manager"]}>
                <ManagerDashboardPage />
              </RequireRole>
            }
          />

          <Route
            path="/admin"
            element={
              <RequireRole allowed={["admin"]}>
                <AdminDashboardPage />
              </RequireRole>
            }
          />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
