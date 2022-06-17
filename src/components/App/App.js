import React, { useState, useEffect } from 'react';
import appStyles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { DataContext } from '../../services/appContext';
import { getIngredients } from '../../services/api';

function App() {

  const [data, setData] = useState([]);



  useEffect(() => getIngredients(setData)
    , []);



  return (
    <div className={appStyles.page}>
      <DataContext.Provider value={{ data, setData }}>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DataContext.Provider>
    </div>
  );
}

export default App; 
