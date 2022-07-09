
import React, { useEffect } from 'react';
import styles from './burger-ingredients.module.css'
import Ingredient from './Ingredient/Ingredient'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/store/ingredientsSlice';
import { bun, sauce, main } from '../../utils/data';

const BurgerIngredients = () => {

  const dispatch = useDispatch();

  const { buns, sauces, mains } = useSelector(store => store.burgerIngredients);

  useEffect(
    () => {
      dispatch(fetchIngredients());
    },
    [dispatch]
  );

  const bunsRef = React.createRef();
  const saucesRef = React.createRef()
  const mainRef = React.createRef()


  const [tab, setTab] = React.useState(bun)



  const switchTab = (val) => {
    switch (val) {
      case bun:
        bunsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case sauce:
        saucesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        mainRef.current.scrollIntoView({ behavior: "smooth" });
        break;
    }
    setTab(val);
  };

  const scrollHandler = (event) => {

    if (event.currentTarget.scrollTop >= (mainRef.current.offsetTop - bunsRef.current.offsetTop)) {
      setTab(main);
    } else if (event.currentTarget.scrollTop >= (saucesRef.current.offsetTop - bunsRef.current.offsetTop)) {
      setTab(sauce);
    } else setTab(bun);

  }
  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
      <div className={styles.container__navigator}>
        <Tab value={bun} active={tab === bun} onClick={switchTab}>
          Булки
        </Tab>
        <Tab value={sauce} active={tab === sauce} onClick={switchTab}>
          Соусы
        </Tab>
        <Tab value={main} active={tab === main} onClick={switchTab}>
          Начинки
        </Tab>

      </div>
      <div className={styles.container__ingredient} onScroll={scrollHandler}>
        <h2 ref={bunsRef} className='text text_type_main-medium pt-10 pb-6'>Булки</h2>

        <div className={styles.container__parts}>
          {buns.map(item => {
            return <Ingredient data={item} key={item._id}></Ingredient>;
          })}
        </div>
        <h2 ref={saucesRef} className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
        <div className={styles.container__parts}>
          {sauces.map(item => {
            return <Ingredient data={item} key={item._id}></Ingredient>;
          })}
        </div>

        <h2 ref={mainRef} className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
        <div className={styles.container__parts}>
          {mains.map(item => {
            return <Ingredient data={item} key={item._id}></Ingredient>;
          })}
        </div>
      </div>
    </section >
  );
}

export default BurgerIngredients;