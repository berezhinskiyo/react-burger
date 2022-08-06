import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound404 from './pages/not-found';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />

        <Route path="/login" exact={true} element={<LoginPage />} />

        <Route path="/register" exact={true} element={<RegisterPage />} />

        <Route path="/forgot-password" exact={true} element={<ForgotPasswordPage />} />

        <Route path="/reset-password" exact={true} element={<ResetPasswordPage />} />

        <Route element={<NotFound404 />} />

      </Routes>
    </Router>
  );
}

export default App; 
