import { useContext, useState, createContext } from 'react';

import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { loginRequest, getUserRequest, logoutRequest, registerRequest, passwordResetRequest, resetRequest } from './api';



const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (getCookie('accessToken')) {
      return await getUserRequest()
        //.then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
          }
          return data.success;
        }).catch(() => {
          deleteCookie('accessToken')
          return false;

        });
    }
  };

  const _login = res => {
    let authToken = res.accessToken;//.split('Bearer ')[1];
    if (authToken) {
      setCookie('accessToken', authToken);
    }

    let refreshToken = res.refreshToken;
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    return res;
  }



  const signIn = async form => {
    const data = await loginRequest(form)
      .then(res => _login(res))

    if (data.success) {
      setUser(data.user);
    }
  };


  const signUp = async ({ email, password, name }) => {
    const data = await registerRequest(email, password, name)
      .then(res => _login(res))
    if (data.success) {
      setUser(data.user);
    }
  };

  const forgotPassword = async ({ email }) => {
    const data = await passwordResetRequest(email)
    return data.success;
  };
  const resetPassword = async ({ password, code }) => {
    const data = await resetRequest(password, code)
    return data.success;
  };


  const signOut = async () => {
    await logoutRequest(getCookie('refreshToken'));
    setUser(null);
  };




  return {
    user,
    getUser,
    signIn,
    signOut,
    signUp,
    forgotPassword,
    resetPassword
  };
}