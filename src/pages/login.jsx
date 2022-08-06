import React, { useCallback, useState } from 'react';
import {Link} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import AppHeader from '../components/AppHeader';
import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'


export default function LoginPage() {  

  const onChange = e => {
   console.log(e);
  };

  let login = useCallback(
    e => {
      e.preventDefault();
    },
    []
  );

  return (
    <div className={baseStyles.page}>
         <AppHeader />
      <form className={styles.main}>
      
          <p className={`text text_type_main-medium ${styles.header} `}>Вход</p>
          <span className={`${styles.field} pt-6`}>
        <Input  name="email"   placeholder={'E-mail'}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
        <PasswordInput className={`${styles.field}`}  placeholder="Password"
            name="password"
            onChange={onChange}></PasswordInput>

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