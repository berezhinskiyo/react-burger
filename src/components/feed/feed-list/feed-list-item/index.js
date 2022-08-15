import { useEffect, useState } from 'react';
import Ingredients from '../../../ingredients';
import { convertIdsToImages, calcTotal, uniqueIngredients } from '../../../../utils/data'
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './item.module.css';

const FeedListItem = ({ feedItem }) => {
    const { data } = useSelector(store => store.burgerIngredients);
    const [ingredients, SetIngredients] = useState([])
    useEffect(() => {

        SetIngredients(convertIdsToImages(data, feedItem.ingredients));

    }, [data]);

    return (
        <div className={styles.container}>
            <div className={`${styles.container_row} pt-6 pl-6  pr-6`}>
                <p className='text text_type_digits-default'> #{feedItem.number}</p>
                <p className='text text_type_main-small text_color_inactive'> {`${feedItem.createdAt}`}</p>
            </div>
            <p className='text text_type_main-medium pt-6 pl-6 pr-6'>{feedItem.name}</p>
            <div className={`${styles.container_row} pt-6 pl-6 pr-6 pb-6`}>
                <Ingredients data={uniqueIngredients(ingredients)} />
                <p className='text text_type_digits-default'>{calcTotal(ingredients)} <CurrencyIcon /></p>
            </div>

        </div>
    );


}
export default FeedListItem;