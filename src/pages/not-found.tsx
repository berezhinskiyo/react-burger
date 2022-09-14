import styles from './home.module.css';

export default function NotFound404() 
{

  return (
    <div className={styles.page}>
     
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
     
        </div>
    
  );
}