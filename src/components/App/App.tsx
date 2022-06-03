import React from 'react';
import appStyles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
  return (
   <div className={appStyles.page}>
     <AppHeader />
       <main className={appStyles.main}>
         <BurgerIngredients/>
         <BurgerConstructor/>
    </main>
   </div>
      
    
  );
}

export default App; 
