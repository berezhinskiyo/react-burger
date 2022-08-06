
import styles from './home.module.css'
import AppHeader from '../components/AppHeader';
import BurgerConstructor from '../components/BurgerConstructor';
import BurgerIngredients from '../components/BurgerIngredients';


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {

  return (
    <div className={styles.page}>

      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        {
          <main className={styles.main}>

            <BurgerIngredients />
            <BurgerConstructor />

          </main>
        }
      </DndProvider>

    </div>
  );
}

export default HomePage; 
