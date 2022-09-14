
import { useContext, useState, createContext, FunctionComponent, PropsWithChildren  } from 'react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { loginRequest, getUserRequest, logoutRequest, registerRequest, passwordResetRequest, resetRequest} from './api';

import { TRes, TPassword,TEmail,TName,TEmailOnly } from '../types';

const AuthContext = createContext<ProviderType|undefined>(undefined);

export const  ProvideAuth = ({children} : PropsWithChildren )   =>  {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
type ProviderType ={
  user : string|undefined;
  getUser : () => Promise<boolean|undefined>;
  signIn: (form : TEmail) => Promise<boolean|undefined>;
  signOut: () => Promise<void>;
  signUp: (arg : TName) => Promise<void>;
  forgotPassword: (arg : TEmailOnly) => Promise<boolean|undefined>;
  resetPassword: (arg: TPassword) => Promise<boolean|undefined>;
}
export function useProvideAuth() : ProviderType{
  const [user, setUser] = useState<string>();

  const getUser = async () : Promise<boolean|undefined> => {
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

  const _login = (res:TRes) : TRes=> {
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



  const signIn = async (form:TEmail) : Promise<boolean> => {
    try {
      const data = await loginRequest(form)
        .then(res => _login(res))

      if (data.success) {
        setUser(data.user);
      }
    } catch (e) {
      console.log(e);
    }
    finally{
      return true;
    }
  };


  const signUp = async ({ email, password, name } :TName) : Promise<void> => {
    try {
      const data = await registerRequest({email, password, name})
        .then(res => _login(res))
      if (data.success) {
        setUser(data.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const forgotPassword = async ( email  : TEmailOnly) : Promise<boolean> => {
    try {
      const data = await passwordResetRequest(email)
      return data.success;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const resetPassword = async ({ password, token }: TPassword) : Promise<boolean> => {
    try {
      const data = await resetRequest({password, token})
      return data.success;
    } catch (e) {
      console.log(e);
      return false;
    }
  };


  const signOut = async () => {
    try {
      //await logoutRequest(getCookie('refreshToken'));
      await logoutRequest();
      setUser(undefined);
    } catch (e) {
      console.log(e);

    }
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