import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.module.css'
import { ingredientType } from '../../../utils/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

class Ingredient extends React.Component {
  render() {
    return (
      <div className={`${styles.ingredient} pl-4 pr-4`} >
        <Counter count={2} />
        <img src={this.props.data.image} className={`${styles.ingredient__img} pl-4 pr-4`} alt={this.props.data.name} />
        <div className={`${styles.ingredient__price} pt-1 pb-1`}>
          <p className='text text_type_digits-default pr-2'>{this.props.data.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.ingredient__price__text} text text_type_main-default`}>{this.props.data.name}</p>

      </div >
    );
  }
}
Ingredient.propTypes = {
  data: ingredientType
}

export default Ingredient;