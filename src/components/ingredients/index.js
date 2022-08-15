import styles from './ingredients.module.css'
import React from 'react';

const Ingredients = ({ data }) => {
    if (data) {

        return (
            <div className={`${styles.container}`}>
                {
                    data.map((item, i) => <div key={i}
                        style={{ zIndex: i, left: `${i * 48}px`, backgroundImage: `url(${item.image})` }} className={`${styles.image}`}
                        alt={item.name} ></div>)
                }
            </div>)
    }
}
export default Ingredients;