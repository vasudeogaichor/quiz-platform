import { Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/toaster'
import "./App.css";
import LoginPage from "./components/auth/LoginForm";
import Layout from "./layouts/Layout";
import PrivateRoute from "./components/auth/PrivateRoute";
import DashboardPage from "./components/dashboard/Dashboard";
import QuizPage from "./components/quiz/quizPage";
import SettingsPage from "./components/settings/SettingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardPage />} />
             <Route path="/quiz" element={<QuizPage />} />
             <Route path="/settings" element={<SettingsPage/>} />
            {/*<Route path="/results" element={<ResultsPage />} /> */}
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
