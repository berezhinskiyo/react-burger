import React from 'react';
import styles from './ingredient.module.css'
import Modal from './../../Modal/Modal'
import IngredientDetails from './../IngredientDetails/IngredientDetails'
import { ingredientType } from '../../../utils/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const Ingredient = (props) => {


  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  }
  const handleCloseModal = () => {
    setVisible(false);
  }
  const handleEscKeydown = (e) => {
    e.key === "Escape" && handleCloseModal();
  };
  const modal = (
    <Modal
      title="Детали заказа"
      onClose={handleCloseModal}
      onEscKeydown={handleEscKeydown}
    >
      <IngredientDetails data={props.data} onClose={handleCloseModal} ></IngredientDetails>
    </Modal>
  );

  return (
    <div className={`${styles.ingredient} pl-4 pr-4`} >
      <Counter count={2} />
      <img src={props.data.image} className={`${styles.ingredient__img} pl-4 pr-4`} alt={props.data.name} onClick={handleOpenModal} />
      {visible && modal}
      <div className={`${styles.ingredient__price} pt-1 pb-1`}>
        <p className='text text_type_digits-default pr-2'>{props.data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.ingredient__price__text} text text_type_main-default`}>{props.data.name}</p>

    </div >
  );
}

Ingredient.propTypes = {
  data: ingredientType
}

export default Ingredient;