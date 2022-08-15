import { useEffect, useState } from 'react';
import { uniqueIngredientsWithCount, calcTotal, convertIdsToImages, getStateName, convertDate } from '../../../utils/data'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-item.module.css';

const FeedItem = () => {
    const { orders } = useSelector(store => store.orders);
    const { data } = useSelector(store => store.burgerIngredients);
    const { id } = useParams();


    if (orders?.length > 0) {

        const order = orders.find(item => item._id === id);
        const source_ingredients = convertIdsToImages(data, order.ingredients);
        const ingredients = uniqueIngredientsWithCount(source_ingredients);
        const total = calcTotal(source_ingredients);
        return (
            <div className={styles.container}>
                <p className={`text text_type_digits-default ${styles.number} `}> #{order.number}</p>
                <p className='text text_type_main-default pt-10'>{order.name}</p>
                <p className={`${styles.green} text text_type_main-small pt-10`}>{getStateName(order.status)}</p>
                <p className='text text_type_main-default pt-5'>Состав:</p>
                <div className={`${styles.container_ingredients} pt-6`}>
                    {ingredients.map((item, i) => (
                        <div key={i} className={`${styles.container_row}`}>
                            <div className={`${styles.container_row_box}`}>
                                <div key={i} style={{ backgroundImage: `url(${item.item.image})` }} className={`${styles.image}`}></div>
                                <p className='text text_type_main-small pl-4'>{item.item.name}</p>
                            </div>
                            <div className={`${styles.container_row_box}`}>
                                <p className={`text  text_type_digits-default pr-2`}> {`${item.count} x ${item.item.price}`}</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${styles.container_row} pt-10 pd-10`}>
                    <p className='text text_type_main-small text_color_inactive '> {`${convertDate(order.createdAt)}`}</p>
                    <div className={`${styles.container_row_box}`}><p className='text text_type_digits-default pr-2'> {total}</p><CurrencyIcon /></div>
                </div>
            </div>
        );
    }

}
export default FeedItem;