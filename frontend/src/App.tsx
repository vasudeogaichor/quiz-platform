import { Routes, Route } from "react-router-dom";
import { Toaster } from '@/components/ui/toaster'
import "./App.css";
import LoginPage from "./components/auth/LoginForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Route>
        </Route> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
