import React from 'react';
import styles from './part.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

class Part extends React.Component {
  render() {
    return (
      <div className={`${styles.part} pl-4 pr-4`} >
        <Counter count={2} />
        <img src={this.props.data.image} className={`${styles.part__img} pl-4 pr-4`} alt={this.props.data.name} />
        <div className={`${styles.part__price} pt-1 pb-1`}>
          <p className='text text_type_digits-default pr-2'>{this.props.data.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.part__price__text} text text_type_main-default`}>{this.props.data.name}</p>

      </div >
    );
  }
}

export default Part;