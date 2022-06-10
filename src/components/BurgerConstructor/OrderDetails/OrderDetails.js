import styles from './order-details.module.css'
import { orderType } from '../../../utils/types'
import done from '../../../image/done.svg'

const OrderDetails = ({ data }) => {


    return (
        <div className={styles.details}>
            <p className={`${styles.details__number} text text_type_digits-large pt-10`}>{data.number}</p>
            <p className={`${styles.details__text} text text_type_main-medium pt-8`}>идентификатор заказа</p>

            <img src={done} className={`${styles.details__img} pt-15`} alt={data.number} />

            <p className={`${styles.details__text} text text_type_main-default pt-15`}>{data.status}</p>
            <p className={`${styles.details__description} text text_type_main-default pt-2 pb-30`}>{data.description}</p>

        </div>
    );

}

OrderDetails.propTypes = {
    data: orderType.isRequired
}

export default OrderDetails;