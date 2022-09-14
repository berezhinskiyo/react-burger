import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ingredients from '../../../ingredients';
import { convertIdsToImages, calcTotal, uniqueIngredients, convertDate } from '../../../../utils/data'
import { useSelector } from '../../../../hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './item.module.css';
import { TIngredient, TIngredientShort, TOrder } from '../../../../types';

const FeedListItem:FC<TOrder> = (feedItem ) => {
    const { data } = useSelector(store => store.burgerIngredients);
    const [ingredients, SetIngredients] = useState<Array<TIngredientShort>>([])
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        convertIdsToImages(data!, feedItem.ingredients!)
        SetIngredients(convertIdsToImages(data!, feedItem.ingredients!));

    }, [data]);

    return (
        <Link to={`${feedItem._id}`} state={{ ...(state as object), background: location }} className={styles.container}>
            <div className={`${styles.container_row} pt-6 pl-6  pr-6`}>
                <p className='text text_type_digits-default'> #{feedItem.number}</p>
                <p className='text text_type_main-small text_color_inactive'> {`${convertDate(feedItem.createdAt)}`}</p>
            </div>
            <p className='text text_type_main-medium pt-6 pl-6 pr-6'>{feedItem.name}</p>
            <div className={`${styles.container_row} pt-6 pl-6 pr-6 pb-6`}>
                <Ingredients data={uniqueIngredients(ingredients)} />
                <div className={`${styles.container_row_box} pb-6`}>
                    <p className='text text_type_digits-default pr-2'>{calcTotal(ingredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </Link>
    );


}
export default FeedListItem;