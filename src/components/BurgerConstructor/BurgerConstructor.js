import { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css'
import OrderDetails from './OrderDetails/OrderDetails'
import Modal from './../Modal/Modal'
import ConstructorIngredient from './ConstructorIngredient/ConstructorIngredient'


import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';




import { fetchOrder } from '../../services/store/orderSlice';
import { addIngredient, removeIngredient } from '../../services/store/constructorSlice';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const bun = useSelector(store => store.burgerСonstructor.constructorBun);
  const others = useSelector(store => store.burgerСonstructor.constructorOthers);


  const num = useSelector(store => store.order.num);

  const [{ isHover, itemData }, dropTarget] = useDrop({
    accept: "type",
    collect: monitor => ({
      isHover: monitor.isOver(),
      itemData: monitor.getItem()
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });


  const [visible, setVisible] = useState(false);

  const Ids = useMemo(() => {

    return others && bun ? others.map(item => item.item._id) : []
  }, [others, bun]);


  const handleOpenModal = () => {

    dispatch(fetchOrder(Ids));
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
    let _result = 0;
    if (othersArray && bunItem) {
      _result = othersArray.reduce((sum, a) => sum + a.item.price, 0);
    }
    if (bunItem) {
      _result += bunItem.item.price * 2
    }
    return _result;
  }


  return (
    <section className={`${styles.container} pt-25`} >
      <div className={styles.container}>
        {
          bun &&
          (<div className='pl-10'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.item.name} (верх)`}
              price={bun.item.price}
              thumbnail={bun.item.image} />
          </div>)
        }
      </div>
      <ul className={styles.container__ingredients} ref={dropTarget}>
        {
          others.map((item, index) => {
            return (
              <ConstructorIngredient
                key={item.uuid}
                index={index}
                text={item.item.name}
                price={item.item.price}
                thumbnail={item.item.image}
                handleClose={() => {
                  dispatch(removeIngredient(index));

                }}
              />
            );

          })}
      </ul>
      <div className={styles.container}>
        {bun &&
          (<div className='pl-10'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.item.name} (низ)`}
              price={bun.item.price}
              thumbnail={bun.item.image} />
          </div>)}
      </div>

      <div className={`${styles.price} pt-10 pb-1`}>
        <p className='text text_type_digits-medium pr-10'>{calcTotal(bun, others)} <CurrencyIcon /></p>
        {visible && modal}
        <Button type="primary" onClick={handleOpenModal} disabled={!bun}>
          Оформить заказ
        </Button>
      </div>
    </section >
  );
}


export default BurgerConstructor;