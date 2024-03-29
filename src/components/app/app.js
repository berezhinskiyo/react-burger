import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import NotFound404 from '../../pages/not-found';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import FeedPage from '../../pages/feed';
import { ProvideAuth } from '../../services/auth';
import Modal from '../modal'
import IngredientDetails from '../burger-ingredients/ingredient-details'
import OrderDetails from '../burger-constructor/order-details'
import FeedItem from '../feed/feed-item'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/store/ingredientsSlice';
import AppHeader from '../app-header';


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  const background = state?.background;
  const counter = useSelector(store => store.burgerСonstructor.counter);

  useEffect(
    () => {
      dispatch(fetchIngredients());
    },
    []
  );
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };
  const closeModalOrderDetail = () => {
    if (Object.keys(counter)?.length === 0)
      navigate(-1);
  };
  return (
    <ProvideAuth>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/feed" exact={true} element={<FeedPage />} />
        <Route path="/login" exact={true} element={<ProtectedRoute anonymous={true} ><LoginPage logout={false} /></ProtectedRoute>} />
        <Route path="/logout" exact={true} element={<LoginPage logout={true} />} />
        <Route path="/register" exact={true} element={<ProtectedRoute anonymous={true} ><RegisterPage /></ProtectedRoute>} />
        <Route path="/forgot-password" exact={true} element={<ProtectedRoute anonymous={true} ><ForgotPasswordPage /></ProtectedRoute>} />
        <Route path="/reset-password" exact={true} element={<ProtectedRoute anonymous={true} ><ResetPasswordPage /></ProtectedRoute>} />

        <Route path="/profile" exact={true} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/orders" exact={true} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/orders/:id" exact={true} element={<ProtectedRoute><FeedItem isLocal={true} /></ProtectedRoute>} />
        <Route path="/order" exact={true} element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

        <Route path="/ingredient/:id" exact={true} element={<IngredientDetails />} />
        <Route path="/feed/:id" exact={true} element={<FeedItem isLocal={false} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredient/:id" exact={true} element={
            <Modal title="Детали заказа" onCloseModal={closeModal}  >
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/profile/orders/:id" exact={true} element={
            <Modal title="" onCloseModal={closeModal}  >
              <ProtectedRoute><FeedItem isLocal={true} /></ProtectedRoute>
            </Modal>
          } />
          <Route path="/feed/:id" exact={true} element={
            <Modal title="" onCloseModal={closeModal}  >
              <FeedItem isLocal={false} />
            </Modal>
          } />

          <Route path="/order" exact={true} element={
            <ProtectedRoute>
              <Modal title="" onCloseModal={closeModalOrderDetail} >
                <OrderDetails />
              </Modal>
            </ProtectedRoute>} />

        </Routes>
      )}


    </ProvideAuth>
  );
}

export default App; 
