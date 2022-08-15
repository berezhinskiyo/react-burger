import { useSelector } from 'react-redux';
import styles from './list.module.css';
import FeedListItem from './feed-list-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const FeedList = () => {

    const { orders } = useSelector(store => store.orders);
    return (<>
        
        <div className={`${styles.container} pb-6`}>

            {orders?.map(m => <FeedListItem key={m._id} feedItem={m} />)}
        </div>
    </>);
}
export default FeedList;