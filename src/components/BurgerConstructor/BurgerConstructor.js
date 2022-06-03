import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'


class BurgerConstructor extends React.Component {
  render() {

    const buns = this.props.data.filter(item => item.type === "bun").map((item, index) => {
      return <ConstructorElement key={item._id}
        type={index === 0 ? "top" : "bottom"}
        isLocked={true}
        text={`${item.name} ${index === 0 ? '(верх)' : '(низ)'}`}
        price={item.price}
        thumbnail={item.image} />;

    });

    const others = this.props.data.filter(item => item.type !== "bun").map(item => {
      return (<ConstructorElement key={item._id}
        text={`${item.name}`}
        price={item.price}
        thumbnail={item.image} />);

    });

    return (
      <section className={`${styles.container} pt-25`} >
        <div className={styles.container}>
          {buns[0]}
        </div>
        <div className={styles.container__ingredients}>
          {others}
        </div>
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
}


const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes)
}
export default BurgerConstructor;