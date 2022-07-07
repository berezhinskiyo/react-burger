import React, { useContext } from 'react';
import styles from './burger-ingredients.module.css'
import Ingredient from './Ingredient/Ingredient'
import { DataContext } from '../../services/appContext';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerIngredients = () => {

  const { data } = useContext(DataContext);

  const bunsRef = React.createRef();
  const saucesRef = React.createRef()
  const mainRef = React.createRef()

  const bun = 'bun';
  const sauce = 'sauce';
  const main = 'main';
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


  const buns = data.filter(item => item.type === bun);

  const sauces = data.filter(item => item.type === sauce);

  const mains = data.filter(item => item.type === main);

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
      <div className={styles.container__ingredient}>
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
    </section>
  );
}

export default BurgerIngredients;