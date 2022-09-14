import { useSelector, useDispatch } from '../../../hooks';
import styles from './list.module.css';
import FeedListItem from './feed-list-item';
import { wsUrl, wsUrlLocal } from '../../../services/api'
import { getToken } from '../../../utils/cookie'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../../services/action-types';
import { useEffect } from 'react';


const FeedList = ({ isLocal = false }) => {
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store.orders);
    const { ordersLocal } = useSelector(store => store.ordersLocal);
    useEffect(
        () => {
            if (isLocal === true)
                dispatch({ type: WS_CONNECTION_START, payload: `${wsUrlLocal}?token=${getToken()}` });
            else
                dispatch({ type: WS_CONNECTION_START, payload: wsUrl });

            return () => {
                dispatch({ type: WS_CONNECTION_CLOSED });
            };
        },
        []
    );
    return (

        <div className={`${styles.container} pb-6`}>

            {isLocal === true ? ordersLocal?.map(m => <FeedListItem key={m._id} feedItem={m} />) : orders?.map(m => <FeedListItem key={m._id} feedItem={m} />)}
        </div>
    );
}
export default FeedList;