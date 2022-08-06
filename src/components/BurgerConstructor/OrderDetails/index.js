import PropTypes from 'prop-types';
import styles from './order-details.module.css'
import done from '../../../image/done.svg'

const OrderDetails = ({ num }) => {


 

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

OrderDetails.propTypes = {
    num:  PropTypes.number.isRequired
}


export default OrderDetails;