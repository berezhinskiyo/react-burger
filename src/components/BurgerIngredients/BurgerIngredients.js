import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import Part from './Part/Part'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


class BurgerIngredients extends React.Component {


  state = { tab: 'two' };

  setTab = (val) => {
    this.setState({
      tab: val
    });

  };

  render() {
    const buns = this.props.data.filter(item => item.type === "bun").map(item => {
      return <Part data={item} key={item._id}></Part>;
    });

    const sauce = this.props.data.filter(item => item.type === "sauce").map(item => {
      return <Part data={item} key={item._id}></Part>;
    });

    const main = this.props.data.filter(item => item.type === "main").map(item => {
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
const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes)
}
export default BurgerIngredients;