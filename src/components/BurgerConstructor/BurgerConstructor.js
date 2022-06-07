import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import { ingredientType } from '../../utils/types'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerConstructor = (props) => {

  const buns = props.data.filter(item => item.type === "bun").map((item, index) => {
    return (<div className='pl-10'>
      <ConstructorElement key={item._id}
        type={index === 0 ? "top" : "bottom"}
        isLocked={true}
        text={`${item.name} ${index === 0 ? '(верх)' : '(низ)'}`}
        price={item.price}
        thumbnail={item.image} />
    </div>);

  });

  const others = props.data.filter(item => item.type !== "bun").map(item => {
    return (<li className={styles.constructor__element} key={item._id}>
      <span className="pr-4">
        <DragIcon type="primary" />
      </span>
      <div className={`${styles.item} pr-4`}>
        <ConstructorElement key={item._id}
          text={`${item.name}`}
          price={item.price}
          thumbnail={item.image} />
      </div>
    </li>);

  });

  return (
    <section className={`${styles.container} pt-25`} >
      <div className={styles.container}>
        {buns[0]}
      </div>
      <ul className={styles.container__ingredients}>
        {others}
      </ul>
      <div className={styles.container}>
        {buns[1]}
      </div>

      <div className={`${styles.price} pt-10 pb-1`}>
        <p className='text text_type_digits-medium pr-10'>10000 <CurrencyIcon /></p>

        <Button type="primary" >
          Оформить заказ
        </Button>
      </div>
    </section >
  );
}




BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType)
}
export default BurgerConstructor;