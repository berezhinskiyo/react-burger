
import styles from './home.module.css'
import BurgerConstructor from '../components/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients';


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {

  return (
    <div className={styles.page}>


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
