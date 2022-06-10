import React from 'react';
import appStyles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
const URL = 'https://norma.nomoreparties.space/api';
const [data, setData] = React.useState([]);

React.useEffect(()=>{
    fetch(`${URL}/ingredients`)
    .then((response)=>response.ok ? response.json() : Promise.reject(response))
    .then((response) => setData(response.data))
    .catch((err) => console.log(err));
  },[]);

  return (
   <div className={appStyles.page}>
     <AppHeader />
       <main className={appStyles.main}>
         <BurgerIngredients data = {data}/>
         <BurgerConstructor data = {data}/>
    </main>
   </div>
  );
}

export default App; 
