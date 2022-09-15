import styles from './ingredients.module.css'
import React, { FC } from 'react';
import { TIngredient, TIngredientShort } from '../../types';

const Ingredients: FC<{data:Array<TIngredientShort>}> = ({data} ) => {
    if (data) {

        return (
            <div className={`${styles.container}`}>
                {
                    data.map((item, i) => <div key={i}
                        style={{ zIndex: data.length - i, left: `${i * 48}px`, top: `${-i * 64}px`, backgroundImage: `url(${item.image})` }} className={`${styles.image}`}></div>)
                }
            </div>)
    } 
    else
    {
        return <></>;
    }
}
export default Ingredients;

