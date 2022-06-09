import React from 'react';
import appStyles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//import { data } from '../../utils/data';

function App() {
const url = 'https://norma.nomoreparties.space/api/ingredients';
const [data, setData] = React.useState([]);

React.useEffect(()=>{
    fetch(url)
    .then((response)=>response.ok ? response.json() : Promise.reject(response))
    .then((response) => setData(response.data))
    .then((response) => console.log(response))
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
