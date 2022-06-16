import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import { ingredientType } from '../../utils/types'
import OrderDetails from './OrderDetails/OrderDetails'
import Modal from './../Modal/Modal'
import { order } from '../../utils/data'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerConstructor = ({ data }) => {
  console.log(data);
  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  }
  const handleCloseModal = () => {
    setVisible(false);
  }

  const modal = (
    <Modal title="" onClose={handleCloseModal}>
      <OrderDetails data={order} onClose={handleCloseModal} />
    </Modal>
  );

  const bun = data.filter(item => item.type === "bun").at(1);
  const others = data.filter(item => item.type !== "bun");

  return (
    <section className={`${styles.container} pt-25`} >
      <div className={styles.container}>
        {
          bun &&
          (<div className='pl-10' key={bun._id}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image} />
          </div>)
        }
      </div>
      <ul className={styles.container__ingredients}>
        {others.map(item => {
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

        })}
      </ul>
      <div className={styles.container}>
        {bun &&
          (<div className='pl-10' key={bun._id}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image} />
          </div>)}
      </div>

      <div className={`${styles.price} pt-10 pb-1`}>
        <p className='text text_type_digits-medium pr-10'>10000 <CurrencyIcon /></p>
        {visible && modal}
        <Button type="primary" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section >
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
export default BurgerConstructor;