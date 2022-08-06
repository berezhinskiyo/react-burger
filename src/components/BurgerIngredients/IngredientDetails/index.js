import styles from './ingredient-details.module.css'
import { ingredientDetailsType } from '../../../services/types'

const IngredientDetails = ({ data }) => {


    return (
        (
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
        )
    );

}

IngredientDetails.propTypes = {
    data: ingredientDetailsType
}

export default IngredientDetails;