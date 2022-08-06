import React, { useCallback, useState } from 'react';
import {Link} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import AppHeader from '../components/AppHeader';

import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'


export default function ResetPasswordPage() {  



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
      
          <p className={`text text_type_main-medium ${styles.header} `}>Восстановление пароля</p>
          <span className={`${styles.field} pt-6`}>
        <PasswordInput className={`${styles.field}`}  placeholder="Введите новый пароль"
            name="password"></PasswordInput>

            </span>
          <span className={`${styles.field} pt-6`}>
        <Input  name="code"   placeholder={'Введите код из письма'}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
       
          <Button   onClick={login} primary={true}>
          Сохранить
          </Button>
          </span>
          <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Вспомнили пароль?&nbsp;
          <Link to={{ pathname: `/login` }} className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
     
        </form>

      </div>

  );
}