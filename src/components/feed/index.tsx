import styles from './feed.module.css'
import FeedList from './feed-list'
import Summary from './summary'
import React from 'react';
const Feed = () => {
    return (
        <div className={styles.main}>
            <p className='text text_type_main-large pt-10 pb-6'>Лента заказов</p>
            <div className={styles.container}>
                <FeedList />
                <Summary />
            </div>
        </div>
    );

}
export default Feed;