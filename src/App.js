import { Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';
import NotFound404 from './pages/not-found';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';
import ProfilePage from './pages/profile';
import { ProvideAuth } from './services/auth';
import Modal from './components/Modal'
import IngredientDetails from './components/BurgerIngredients/IngredientDetails'
import OrderDetails from './components/BurgerConstructor/OrderDetails'

import { useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();
  const state = location.state;
  const background = state?.background;

  return (
    <ProvideAuth>

      <Routes location={background || location}>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact={true} element={<ProtectedRoute onlyUnAuth={true} ><LoginPage logout={false} /></ProtectedRoute>} />
        <Route path="/logout" exact={true} element={<LoginPage logout={true} />} />
        <Route path="/register" exact={true} element={<ProtectedRoute onlyUnAuth={true} ><RegisterPage /></ProtectedRoute>} />
        <Route path="/forgot-password" exact={true} element={<ProtectedRoute onlyUnAuth={true} ><ForgotPasswordPage /></ProtectedRoute>} />
        <Route path="/reset-password" exact={true} element={<ProtectedRoute onlyUnAuth={true} ><ResetPasswordPage /></ProtectedRoute>} />

        <Route path="/profile" exact={true} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/order" exact={true} element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

        <Route path="/ingredient/:id" exact={true} element={<IngredientDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredient/:id" exact={true} element={
            <Modal title="Детали заказа" >
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/order" exact={true} element={
            <ProtectedRoute>
              <Modal title="" >
                <OrderDetails />
              </Modal>
            </ProtectedRoute>} />

        </Routes>
      )}


    </ProvideAuth>
  );
}

export default App; 
