
import styles from './burger-constructor.module.css'

import ConstructorIngredient from './constructor-ingredient'

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from '../../hooks';

import { addIngredient, removeIngredient } from '../../services/store/constructorSlice';

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth';

import { useEffect } from 'react';
import { TConstructorItem, TIngredient } from '../../types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

const BurgerConstructor = () => {

  const auth = useAuth();
  const init = async () => {
    await auth!.getUser();
  };

  useEffect(() => {
    init();
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;

  const bun = useSelector(store => store.burgerСonstructor.constructorBun);
  const others = useSelector(store => store.burgerСonstructor.constructorOthers);




  const [{ isHover, itemData }, dropTarget] = useDrop({
    accept: "type",
    collect: monitor => ({
      isHover: monitor.isOver(),
      itemData: monitor.getItem()
    }),
    drop(ingredient) {
      //ActionCreatorWithPayload<{payload: number, type: string}>
      dispatch(addIngredient(ingredient as TIngredient));
    },
  });


  const calcTotal = (bunItem:TConstructorItem|undefined, othersArray:Array<TConstructorItem>) : number => {
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
                  dispatch(removeIngredient(item));

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
        <p className='text text_type_digits-medium pr-10'>{calcTotal(bun, others)} <CurrencyIcon type='primary' /></p>

        {auth!.user && (<Link
          to={!bun ? '#' : `/order`}
          state={{ ...(state as object), background: location }}>
          <Button type="primary" disabled={!bun}>
            Оформить заказ
          </Button>
        </Link>)}
        {auth!.user && (<Link
          to={`/login`}
          state={{ ...(state as object), from: location }}>
          <Button type="primary" disabled={!bun}>
            Оформить заказ
          </Button>
        </Link>)}

      </div>
    </section >
  );
}


export default BurgerConstructor;