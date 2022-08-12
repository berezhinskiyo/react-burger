import { useCallback, useState} from 'react';
import {Link, Navigate,useLocation} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';

export default function ResetPasswordPage() {  

  const auth = useAuth();

  const location = useLocation();


  const [form, setValue] = useState({ password: '' ,code:''});
  const [isOk, setIsOk] = useState(false);


  const reset = useCallback(
    e => {
      e.preventDefault();
      setIsOk(auth.reset(form));
    },
    [form,auth]
  );

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  
  if (isOk) {
    return (
      <Navigate
        to='/login'
      />
    );
  }
  if (!location.state || !location.state?.from?.pathname === '/forgot-password' ) {
    return (
      <Navigate
      to='/forgot-password'
    />
   
    );
  }


  return (

    <div className={baseStyles.page}>

      <form className={styles.main} onSubmit={reset}>
      
        <p className={`text text_type_main-medium ${styles.header} `}>Восстановление пароля</p>
        <span className={`${styles.field} pt-6`}>
        <PasswordInput className={`${styles.field}`}  placeholder="Введите новый пароль" name="password" value={form.password} onChange={onChange}></PasswordInput>

        </span>
        <span className={`${styles.field} pt-6`}>
        <Input  name="code"   placeholder={'Введите код из письма'}  value={form.code} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
       
        <Button   primary={true}>
        Сохранить
        </Button>
        </span>
        <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Вспомнили пароль?&nbsp;
        <Link to={{ pathname: `/login` }} className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
     
        </form>

      </div>

  );
}