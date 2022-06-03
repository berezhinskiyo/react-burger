import React from 'react';
import styles from './burger-ingredients.module.css'
import Part from './Part/Part'
import { data } from '../../utils/data'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


class BurgerIngredients extends React.Component {


  state = { tab: 'two' };

  setTab = (val) => {
    this.setState({
      tab: val
    });

  };

  render() {
    const buns = data.filter(item => item.type === "bun").map(item => {
      return <Part data={item} key={item._id}></Part>;
    });

    const sauce = data.filter(item => item.type === "sauce").map(item => {
      return <Part data={item} key={item._id}></Part>;
    });

    const main = data.filter(item => item.type === "main").map(item => {
      return <Part data={item} key={item._id}></Part>;
    });

    return (
      <section className={styles.container}>
        <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
        <div className={styles.container__navigator}>
          <Tab value="one" active={this.state.tab === 'one'} onClick={this.setTab}>
            Булки
          </Tab>
          <Tab value="two" active={this.state.tab === 'two'} onClick={this.setTab}>
            Соусы
          </Tab>
          <Tab value="three" active={this.state.tab === 'three'} onClick={this.setTab}>
            Начинки
          </Tab>

        </div>
        <div className={styles.container__ingredient}>
          <h2 className='text text_type_main-medium pt-10 pb-6'>Булки</h2>

          <div className={styles.container__parts}>
            {buns}
          </div>
          <h2 className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
          <div className={styles.container__parts}>
            {sauce}
          </div>

          <h2 className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
          <div className={styles.container__parts}>
            {main}
          </div>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;