import { useCallback, useState } from 'react';
import {Link,Navigate} from 'react-router-dom';

import baseStyles from './home.module.css';
import styles from './login.module.css';
import AppHeader from '../components/AppHeader';
import { Button,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';

export default function ForgotPasswordPage() {  

  let auth = useAuth();

  const [email, setEmail] = useState('');
  const [isOk, setIsOk] = useState(false);

  const onChange = e => {
    setEmail(e.target.value);
  };

  let reset = useCallback(
    e => {
      e.preventDefault();
      setIsOk(auth.resetPassword(email));

    },
    [email,auth]
  );


  if (isOk) {
    return (
      <Navigate
        to='/reset-password'
      />
    );
  }

  return (
    <div className={baseStyles.page}>
         <AppHeader />
      <form className={styles.main}>
      
          <p className={`text text_type_main-medium ${styles.header} `}>Восстановление пароля</p>
          <span className={`${styles.field} pt-6`}>
        <Input  name="email"  value={email}  placeholder={'Укажите e-mail'} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
       
          <Button   onClick={reset} primary={true}>
          Восстановить
          </Button>
          </span>
          <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Вспомнили пароль?&nbsp;
          <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
     
        </form>

      </div>

  );
}