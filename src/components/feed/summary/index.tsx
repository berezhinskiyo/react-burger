import styles from './summary.module.css';
import { useSelector } from '../../../hooks';
import { getUnReady, getReady } from '../../../utils/data'

const Summary = () => {

    const { totalToday, total, orders } = useSelector(store => store.orders);
    return (

        <div className={styles.container}>
            <div className={styles.container_row}>
                <div className={styles.container_column_header}>
                    <p className='text text_type_main-default pb-6'>Готовы:</p>
                    <div className={styles.container_column}>
                        {getReady(orders).map((item) => (<p key={item._id} className={`text text_type_main-default pb-2 ${styles.ready}`}>{`${item.number}`}</p>))}
                    </div>
                </div>
                <div className={styles.container_column_header}>
                    <p className='text text_type_main-default pb-6'>В работе:</p>
                    <div className={styles.container_column}>
                        {getUnReady(orders).map((item) => (<p key={item._id} className={`text text_type_main-default pb-2`}>{`${item.number}`}</p>))}
                    </div>
                </div>
            </div>
            <p className='text text_type_main-default pt-15'>Выполнено за все время:</p>
            <p className='text text_type_digits-large'>{total}</p>
            <p className='text text_type_main-default pt-15'>Выполнено за сегодня:</p>
            <p className='text text_type_digits-large'>{totalToday}</p>
        </div>

    );
}
export default Summary;