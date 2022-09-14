import { FC, FormEvent, useCallback ,useEffect} from 'react';
import {Link,Navigate,useLocation} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';
import useForm from '../hooks/useForm';

const LoginPage:FC<{logout:boolean;}> = ({logout}) => {  
  let auth = useAuth();
  const location = useLocation();

  const [form, onChange] = useForm({ email: '', password: ''});
 
  const login = useCallback(
    (e : FormEvent) => {
      e.preventDefault();
      auth!.signIn(form);
    },
    [form,auth]
  );
  

  useEffect(() => {
   if(logout)
    auth!.signOut();
  }, [auth,logout]);


  if (auth!.user && !logout) {
    return (
      <Navigate
        to={(location?.state  as  {from : string}).from || '/'}
      />
    );
  }
  return (
    <div className={baseStyles.page}>
         
      <form className={styles.main} onSubmit={login}>
      
          <p className={`text text_type_main-medium ${styles.header} `}>Вход</p>
          <span className={`${styles.field} pt-6`}>
        <Input  name="email"   placeholder={'E-mail'}   value={form.email} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
        <PasswordInput   name="password" value={form.password} onChange={onChange}></PasswordInput>
        </span>
          <span className={`${styles.button} pt-6`}>
          <Button  type='primary' >
            Войти
          </Button>
          </span>
        
          <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Вы - новый пользователь?&nbsp;
          <Link to='/register' className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link></p>
          <p className={`text text_type_main-default text_color_inactive pt-4  ${styles.text}`}>Забыли пароль?&nbsp;
          <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link></p>
        </form>

      </div>

  );
}

export default LoginPage;