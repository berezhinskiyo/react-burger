import React from 'react';
import styles from './ingredient.module.css'
import { ingredientType } from '../../../services/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Ingredient = ({ data }) => {

  const counter = useSelector(store => store.burgerСonstructor.counter);
  const [visible, setVisible] = React.useState(false);

  const [{ isDrag }, drag] = useDrag({
    type: "type",
    item: data,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })


  const location = useLocation();
  const state = location.state;
  return (
    <>
      {!isDrag &&
        <div ref={drag} className={`${styles.ingredient} pl-4 pr-4`} >
          <Counter count={counter[data._id]} />
          <Link
            to={`/ingredient/${data._id}`}
            state={{ ...state, background: location }}>
            <img src={data.image} className={`${styles.ingredient__img} pl-4 pr-4`} alt={data.name} />
          </Link>
          {/*visible && modal*/}
          <div className={`${styles.ingredient__price * counter[data._id]} pt-1 pb-1`}>
            <p className='text text_type_digits-default pr-2'>{data.price}</p>
            <CurrencyIcon />
          </div>
          <p className={`${styles.ingredient__price__text} text text_type_main-default`}>{data.name}</p>

        </div >
      }
    </>
  );
}

Ingredient.propTypes = {
  data: ingredientType.isRequired
}

export default Ingredient;