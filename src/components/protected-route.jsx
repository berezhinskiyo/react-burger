import { useAuth } from '../services/auth';
import { Navigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';


export function ProtectedRoute({  children, anonymous = false })  {
  const auth  = useAuth();
  const init = async () => {
    await auth.getUser();
  };

  useEffect(() => {
    init();
  }, []);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && auth.user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !auth.user){
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;

}
 /*
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const location = useLocation();
  const state = location.state;


  const init = useCallback(async () => {
   if(!auth.user){
    setIsErr(await getUser());
    }
    setUserLoaded(true);
  },[getUser, setUserLoaded]);

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  if(auth.user && onlyUnAuth){
    return <Navigate to="/" />
  }
  if((!auth.user && !onlyUnAuth) || isErr){
    return <Navigate to="/login" replace={true}
    state={{ ...state, from: location }} />
  }
  return children;

}
*/