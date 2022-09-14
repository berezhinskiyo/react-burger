import {ChangeEvent, FormEvent, useCallback, useState } from 'react';
import {Link, Navigate, useLocation} from 'react-router-dom';

import baseStyles from './home.module.css';
import styles from './login.module.css';
import { Button,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';

export default function ForgotPasswordPage() {  

  let auth = useAuth()!;
  const location = useLocation();

  const state = location.state;

  const [email, setEmail] = useState('');
  const [isOk, setIsOk] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  let reset = useCallback <(e: FormEvent) => void>(
    (e: FormEvent) => {
      e.preventDefault();
      let is_ok  = false;
      auth.forgotPassword({email}).then(res=> is_ok = res != undefined ? true : res!);
   
      setIsOk(is_ok);

    },
    [email,auth]
  );


  if (isOk) {
    return (
      <Navigate
        to='/reset-password'
        state={{ ...(state as object), from: location }} 
      />
    );
  }

  return (
    <div className={baseStyles.page}>

      <form className={styles.main} onSubmit = {reset}>
      
          <p className={`text text_type_main-medium ${styles.header} `}>Восстановление пароля</p>
          <span className={`${styles.field} pt-6`}>
        <Input  name="email"  value={email}  placeholder={'Укажите e-mail'} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
       
          <Button   type='primary'>
          Восстановить
          </Button>
          </span>
          <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Вспомнили пароль?&nbsp;
          <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
     
        </form>

      </div>

  );
}