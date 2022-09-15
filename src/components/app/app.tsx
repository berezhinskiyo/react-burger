import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import  ProtectedRoute  from '../protected-route';
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
import { useDispatch, useSelector } from '../../hooks';
import { fetchIngredients } from '../../services/store/ingredientsSlice';
import AppHeader from '../app-header';
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as {background : string};
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
        <Route path="/"  element={<HomePage />} />
        <Route path="/feed"  element={<FeedPage />} />
        <Route path="/login"  element={<ProtectedRoute anonymous={true} ><LoginPage logout={false} /></ProtectedRoute>} />
        <Route path="/logout"  element={<LoginPage logout={true} />} />
        <Route path="/register"  element={<ProtectedRoute anonymous={true} ><RegisterPage /></ProtectedRoute>} />
        <Route path="/forgot-password"  element={<ProtectedRoute anonymous={true} ><ForgotPasswordPage /></ProtectedRoute>} />
        <Route path="/reset-password"  element={<ProtectedRoute anonymous={true} ><ResetPasswordPage /></ProtectedRoute>} />

        <Route path="/profile"  element={<ProtectedRoute anonymous={false}><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/orders"  element={<ProtectedRoute anonymous={false}><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/orders/:id"  element={<ProtectedRoute anonymous={false}><FeedItem isLocal={true} /></ProtectedRoute>} />
        <Route path="/order"  element={<ProtectedRoute anonymous={false}><OrderDetails /></ProtectedRoute>} />

        <Route path="/ingredient/:id"  element={<IngredientDetails />} />
        <Route path="/feed/:id"  element={<FeedItem isLocal={false} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredient/:id"  element={
            <Modal title="Детали заказа" onCloseModal={closeModal}  >
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/profile/orders/:id"  element={
            <Modal title="" onCloseModal={closeModal}  >
              <ProtectedRoute anonymous={false}><FeedItem isLocal={true} /></ProtectedRoute>
            </Modal>
          } />
          <Route path="/feed/:id"  element={
            <Modal title="" onCloseModal={closeModal}  >
              <FeedItem isLocal={false} />
            </Modal>
          } />

          <Route path="/order"  element={
            <ProtectedRoute anonymous={false}>
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
