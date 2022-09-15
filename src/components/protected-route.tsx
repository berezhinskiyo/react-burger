import { useAuth } from '../services/auth';
import { Navigate ,useLocation} from 'react-router-dom';
import { FC, ReactNode, useEffect } from 'react';

const  ProtectedRoute : FC<{ anonymous:boolean; children?: ReactNode;}>= ({anonymous = false, children })  => {
  const auth  = useAuth();
  const init = async () => {
    await auth?.getUser();
  };

  useEffect(() => {
    init();
  }, []);

  const location = useLocation();
  const  from  = (location.state as {from : string}).from || '/';


  //const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && auth?.user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !auth?.user){
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>;

}
export default ProtectedRoute;