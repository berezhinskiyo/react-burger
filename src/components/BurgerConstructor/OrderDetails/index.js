
import styles from './order-details.module.css'
import done from '../../../image/done.svg'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../../../services/store/orderSlice';
import { useCallback, useEffect, useState } from 'react';


const OrderDetails = () => {
    const dispatch = useDispatch();
    const num = useSelector(store => store.order.num);
    const counter = useSelector(store => store.burgerСonstructor.counter);



    useEffect(() => {
        dispatch(fetchOrder(Object.keys(counter)));
    }, []);



    return (
        <div className={styles.details}>
            <p className={`${styles.details__number} text text_type_digits-large pt-10`}>{num}</p>
            <p className={`${styles.details__text} text text_type_main-medium pt-8`}>идентификатор заказа</p>

            <img src={done} className={`${styles.details__img} pt-15`} alt={num} />

            <p className={`${styles.details__text} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={`${styles.details__description} text text_type_main-default pt-2 pb-30`}>Дождитесь готовности на орбитальной станции</p>

        </div>
    );

}



export default OrderDetails;