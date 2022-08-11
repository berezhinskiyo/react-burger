import styles from './ingredient-details.module.css'

import { fetchIngredients } from '../../../services/store/ingredientsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const IngredientDetails = () => {

    const dispatch = useDispatch();
    const src = useSelector(store => store.burgerIngredients.data);
    const { id } = useParams();
    const [data, setData] = useState({});


    useEffect(
        () => {
            dispatch(fetchIngredients());
        },
        []
    );
    useEffect(
        () => {
            if (src) setData(src.find(item => item._id === id))
        },
        [src]
    );


    return (
        <>
            {data && (
                <div className={styles.details}>


                    <img src={data.image} className={`${styles.details__img} pt-5`} alt={data.name} />
                    <p className={`${styles.details__text} text text_type_main-default pt-4`}>{data.name}</p>
                    <div className={`${styles.details__nutrients} pt-6 pb-15`}>
                        <div className={`${styles.details__nutrients__block} pr-5`}>
                            <p className={`${styles.details__text} text text_type_main-default`}>Калории,ккал</p>
                            <p className={`${styles.details__text} text text_type_digits-default`}>{data.calories}</p>
                        </div>
                        <div className={`${styles.details__nutrients__block} pr-5`}>
                            <p className={`${styles.details__text} text text_type_main-default`}>Белки, г</p>
                            <p className={`${styles.details__text} text text_type_digits-default`}>{data.proteins}</p>
                        </div>

                        <div className={`${styles.details__nutrients__block} pr-5`}>
                            <p className={`${styles.details__text} text text_type_main-default`}>Жиры, г</p>
                            <p className={`${styles.details__text} text text_type_digits-default`}>{data.fat}</p>
                        </div>
                        <div className={styles.details__nutrients__block}>
                            <p className={`${styles.details__text} text text_type_main-default`}>Углеводы, г</p>
                            <p className={`${styles.details__text} text text_type_digits-default`}>{data.carbohydrates}</p>
                        </div>

                    </div>

                </div>
            )}
        </>



    );

}



export default IngredientDetails;