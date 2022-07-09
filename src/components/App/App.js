
import appStyles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {




  return (
    <div className={appStyles.page}>

      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        {
          <main className={appStyles.main}>

            <BurgerIngredients />
            <BurgerConstructor />

          </main>
        }
      </DndProvider>

    </div>
  );
}

export default App; 
