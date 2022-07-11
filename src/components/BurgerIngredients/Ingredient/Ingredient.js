import React from 'react';
import styles from './ingredient.module.css'
import Modal from './../../Modal/Modal'
import IngredientDetails from './../IngredientDetails/IngredientDetails'
import { ingredientType } from '../../../services/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

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

  const handleOpenModal = () => {
    setVisible(true);
  }
  const handleCloseModal = () => {
    setVisible(false);
  }

  const modal = (
    <Modal title="Детали заказа" onClose={handleCloseModal}>
      <IngredientDetails data={data} onClose={handleCloseModal}></IngredientDetails>
    </Modal>
  );

  return (
    <>
      {!isDrag &&
        <div ref={drag} className={`${styles.ingredient} pl-4 pr-4`} >
          <Counter count={counter[data._id]} />
          <img src={data.image} className={`${styles.ingredient__img} pl-4 pr-4`} alt={data.name} onClick={handleOpenModal} />
          {visible && modal}
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