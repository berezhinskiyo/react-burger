import { useCallback, useState ,useEffect} from 'react';
import {Link,Navigate} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import AppHeader from '../components/AppHeader';
import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';

export default function LoginPage({logout}) {  
  let auth = useAuth();

 
  const [form, setValue] = useState({ email: '', password: ''});

  let login = useCallback(
    e => {
      e.preventDefault();
      auth.signIn(form);
    },
    [form,auth]
  );
  
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
   if(logout)
    auth.signOut();
  }, [auth,logout]);


  if (auth.user && !logout) {
    return (
      <Navigate
        to='/'
      />
    );
  }
  return (
    <div className={baseStyles.page}>
         <AppHeader />
      <form className={styles.main}>
      
          <p className={`text text_type_main-medium ${styles.header} `}>Вход</p>
          <span className={`${styles.field} pt-6`}>
        <Input  name="email"   placeholder={'E-mail'}   value={form.email} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
        <PasswordInput className={`${styles.field}`}  placeholder="Password" name="password" value={form.password} onChange={onChange}></PasswordInput>
        </span>
          <span className={`${styles.button} pt-6`}>
          <Button   onClick={login} primary={true}>
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