import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.node.isRequired
});

export const ingredientDetailsType = PropTypes.shape({

    name: PropTypes.string.isRequired,
    image: PropTypes.node.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
});

export const orderType = PropTypes.shape({
    number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
});

export const constructorIngredientType = {

    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.node.isRequired,
    price: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired
};