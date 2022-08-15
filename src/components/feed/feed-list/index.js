import { useSelector } from 'react-redux';
import styles from './list.module.css';
import FeedListItem from './feed-list-item';


const FeedList = (isLocal = false) => {

    const { orders } = useSelector(store => store.orders);
    const { ordersLocal } = useSelector(store => store.ordersLocal);
    return (<>

        <div className={`${styles.container} pb-6`}>

            {isLocal ? ordersLocal?.map(m => <FeedListItem key={m._id} feedItem={m} />) : orders?.map(m => <FeedListItem key={m._id} feedItem={m} />)}
        </div>
    </>);
}
export default FeedList;