import { useAuth } from '../services/auth';
import { Navigate ,useLocation} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

export function ProtectedRoute({ onlyUnAuth,children, ...rest })  {
  let { getUser, ...auth } = useAuth();
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