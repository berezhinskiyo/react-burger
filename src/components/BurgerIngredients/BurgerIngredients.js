import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import Ingredient from './Ingredient/Ingredient'
import { ingredientType } from '../../utils/types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


class BurgerIngredients extends React.Component {

  constructor(props) {
    super(props);
    this.bunsRef = React.createRef();
    this.saucesRef = React.createRef()
    this.mainRef = React.createRef()
  }
  bun = 'bun';
  sauce = 'sauce';
  main = 'main';

  state = { tab: this.bun };

  setTab = (val) => {
    switch (val) {
      case this.bun:
        this.bunsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case this.sauce:
        this.saucesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        this.mainRef.current.scrollIntoView({ behavior: "smooth" });
        break;
    }

    this.setState({
      tab: val
    });


  };


  render() {
    const buns = this.props.data.filter(item => item.type === this.bun).map(item => {
      return <Ingredient data={item} key={item._id}></Ingredient>;
    });

    const sauce = this.props.data.filter(item => item.type === this.sauce).map(item => {
      return <Ingredient data={item} key={item._id}></Ingredient>;
    });

    const main = this.props.data.filter(item => item.type === this.main).map(item => {
      return <Ingredient data={item} key={item._id}></Ingredient>;
    });

    return (
      <section className={styles.container}>
        <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
        <div className={styles.container__navigator}>
          <Tab value={this.bun} active={this.state.tab === this.bun} onClick={this.setTab}>
            Булки
          </Tab>
          <Tab value={this.sauce} active={this.state.tab === this.sauce} onClick={this.setTab}>
            Соусы
          </Tab>
          <Tab value={this.main} active={this.state.tab === this.main} onClick={this.setTab}>
            Начинки
          </Tab>

        </div>
        <div className={styles.container__ingredient}>
          <h2 ref={this.bunsRef} className='text text_type_main-medium pt-10 pb-6'>Булки</h2>

          <div className={styles.container__parts}>
            {buns}
          </div>
          <h2 ref={this.saucesRef} className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
          <div className={styles.container__parts}>
            {sauce}
          </div>

          <h2 ref={this.mainRef} className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
          <div className={styles.container__parts}>
            {main}
          </div>
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType)
}
export default BurgerIngredients;