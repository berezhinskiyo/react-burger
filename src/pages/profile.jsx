import {Link,useMatch} from 'react-router-dom';

import baseStyles from './home.module.css';
import styles from './profile.module.css';
import { PasswordInput,Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect ,useState} from 'react';
import { useAuth } from '../services/auth';
import FeedList from '../components/feed/feed-list'

export default function ProfilePage() {  
  let auth = useAuth();
  const [form, setValue] = useState({ email: '', password: '' ,name:''});

  
  const isProfile = useMatch("/profile");
  const isOrders = useMatch("/profile/orders");

  useEffect(() => {
    if (auth.user) setValue(auth.user)
  }, [setValue,auth.user]);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={baseStyles.page}>

      <div className={styles.main}>
       <nav className={styles.column}>
        <ul className={styles.ul}> 
        <li className={styles.li}> 
        <Link to='/profile' className={`text text_type_main-medium pt-4 ${!isProfile && "text_color_inactive"}  ${styles.link}`}>Профиль</Link>
        </li>
        <li className={styles.li}> 
        <Link to='/profile/orders' className={`text text_type_main-medium pt-4 ${!isOrders && "text_color_inactive"}  ${styles.link}`}>История заказов</Link>
        </li>
        <li className={styles.li}>  
        <Link to='/logout' className={`text text_type_main-medium pt-4 text_color_inactive ${styles.link}`}>Выход</Link>
        </li>
        </ul>
     

       <p className={`text text_type_main-default text_color_inactive pt-20  ${styles.text}`}>В этом разделе вы можете
изменить свои персональные данные</p>
      
   
       </nav>

       {isProfile && (
       <div className={styles.column}>
       <span className={`${styles.field}`}>
        <Input  name="name" placeholder={'Имя'} value={form.name} onChange={onChange} ></Input>
        </span>
        <span className={`${styles.field} pt-6 `}>
        <Input  name="email" placeholder={'Логин'} value={form.email} onChange={onChange}></Input>
        </span>
        <span className={`${styles.field} pt-6`}>
        <PasswordInput className={`${styles.field}`}  placeholder="Password" name="password" value="" onChange={onChange}></PasswordInput>
       </span>
       </div>
       )}
        {isOrders && (
           <FeedList isLocal={true} />
        )}
       </div>
       </div>
  );
}