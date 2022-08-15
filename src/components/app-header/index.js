import React from 'react';
import { Link } from 'react-router-dom';
import { useMatch } from "react-router-dom";
import styles from './app-header.module.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'



const AppHeader = () => {

  const isRoot = useMatch("/");
  const isProfile = useMatch("/profile");
  const isFeed = useMatch("/feed");

  return (
    <header className={styles.header}>
      <div className={`${styles.header__left_block} pb-4 pt-4`}>

        <Link to="/" className={`${styles.block} ${isRoot && styles.active} text text_type_main-default pl-5 pr-5`}>
          <BurgerIcon type={`${isRoot ? "primary" : "secondary"}`} />
          <p className={`text text_type_main-default ${!isRoot && "text_color_inactive"} pl-2 `}>
            Конструктор
          </p>
        </Link>

        <Link to="/feed" className={`${styles.block} ${isFeed && styles.active} text text_type_main-default pl-5 pr-5`}>
          <ListIcon type={`${isFeed ? "primary" : "secondary"}`} />
          <p className={`text text_type_main-default ${!isFeed && "text_color_inactive"}  pl-2`}>
            Лента заказов
          </p>
        </Link>
      </div>
      <Link to="/" >
        <Logo />
      </Link>
      <Link to="/profile" className={`${styles.block} ${isProfile && styles.active}  text text_type_main-default ыpl-5 pr-5 pb-4 pt-4`}>
        <ProfileIcon type={`${isProfile ? "primary" : "secondary"}`} />
        <p className={`text text_type_main-default ${!isProfile && "text_color_inactive"}  pl-2`}>
          Личный кабинет
        </p>
      </Link>


    </header>
  );
}


export default AppHeader;