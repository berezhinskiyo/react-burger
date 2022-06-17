import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react';
import styles from './burger-constructor.module.css'
import OrderDetails from './OrderDetails/OrderDetails'
import Modal from './../Modal/Modal'
import { postOrders } from '../../services/api';

import { DataContext } from '../../services/appContext';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerConstructor = () => {

  const { data } = useContext(DataContext);
  const [visible, setVisible] = useState(false);



  const bun = data.filter(item => item.type === "bun").at(1);
  const notBun = data.filter(item => item.type !== "bun");
  const randomSet = useMemo(() => Array.from({ length: 5 }, () => Math.floor(Math.random() * notBun.length)), [data]);
  const others = useMemo(() => notBun.filter((item, index) => randomSet.includes(index)), [data]);
  const Ids = useMemo(() => others && bun ? others.map(item => item._id) : [], [data]);

  const [num, setNum] = useState(0);

  const postOrdersWrapper = useCallback(() => {
    return postOrders(Ids)
      .then((response) => {
        console.log(response);
        setNum(response.order.number)
      }
      )
      .catch((err) => console.log(err))
  }, [data])

  const handleOpenModal = () => {
    if (num === 0) {
      postOrdersWrapper();
    }
    setVisible(true);
  }
  const handleCloseModal = () => {
    setVisible(false);
  }

  const modal = (
    <Modal title="" onClose={handleCloseModal}>
      <OrderDetails num={num} onClose={handleCloseModal} />
    </Modal>
  );



  const calcTotal = (bunItem, othersArray) => {
    if (othersArray === undefined || bunItem === undefined)
      return 0;
    else
      return othersArray.reduce((sum, a) => sum + a.price, 0) + bunItem.price * 2;
  }

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
        <p className='text text_type_digits-medium pr-10'>{calcTotal(bun, others)} <CurrencyIcon /></p>
        {visible && modal}
        <Button type="primary" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section >
  );
}

/*BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}*/
export default BurgerConstructor;