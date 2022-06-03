import React from 'react';
import styles from './app-header.module.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'



class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.header__left_block} pb-4 pt-4`}>

          <div className={`${styles.block} pl-5 pr-5`}>
            <BurgerIcon />
            <p className={`text text_type_main-default pl-2`}>
              Конструктор
            </p>
          </div>
          <div className={styles.block}>
            <ListIcon type='secondary' />
            <p className={`text text_type_main-default text_color_inactive pl-2`}>
              Лента заказов
            </p>
          </div>
        </div>

        <Logo />
        <div className={`${styles.block} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon />
          <p className={`text text_type_main-default text_color_inactive pl-2`}>
            Личный кабинет
          </p>
        </div>


      </header>
    );
  }
}

export default AppHeader;