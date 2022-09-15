import { ChangeEvent, FormEvent, useCallback} from 'react';
import {Link, Navigate} from 'react-router-dom';
import baseStyles from './home.module.css';
import styles from './login.module.css';
import { Button, PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../services/auth';
import useForm from '../hooks/useForm';
import { TName } from '../types';

export default function RegisterPage() {  

  let auth = useAuth();
 
  const [form, onChange] = useForm<TName>({ email: '', password: '' ,name:''});

  let send = useCallback(
    (e:FormEvent) => {
      e.preventDefault();
      auth!.signUp(form as TName);
    },
    [form,auth]
  );


  
  if (auth!.user) {
    return (
      <Navigate
        to='/login'
      />
    );
  }

  return (
    <div className={baseStyles.page}>

      <form className={styles.main} onSubmit = {send}>
      
        <p className={`text text_type_main-medium ${styles.header} `}>Регистрация</p>
        <span className={`${styles.field} pt-6`}>
          <Input  name="name"   placeholder={'Имя'}   value={(form as TName).name} onChange={onChange as (event: ChangeEvent<HTMLInputElement>)=>void}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
          <Input  name="email"   placeholder={'E-mail'}   value={(form as TName).email} onChange={onChange as (event: ChangeEvent<HTMLInputElement>)=>void}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
          <PasswordInput  name="password" value={(form as TName).password} onChange={onChange as (event: ChangeEvent<HTMLInputElement>)=>void}></PasswordInput>
        </span>
        <span className={`${styles.button} pt-6`}>
          <Button type = 'primary'>Зарегистрироваться</Button>
        </span>
        <p className={`text text_type_main-default text_color_inactive pt-20 ${styles.text}`}>Уже зарегистрированы?&nbsp;
        <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
        </form>

      </div>

  );
}