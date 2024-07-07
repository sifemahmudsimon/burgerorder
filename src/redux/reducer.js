import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICE = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

const INGREDIENT_STATE = {
  ingredients: [    
    { type: "cheese", amount: 0 },
    { type: "salad", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 80,
  purchaseable: false,
};

export const reducer = (state = INGREDIENT_STATE, action) => {
  const ingredients = [...state.ingredients];

  switch (action.type) {
    
    case actionTypes.ADD_INGREDIENT:
      for (let items of ingredients) {
        if (items.type === action.payload) {
          items.amount++;
        }        
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
      };

    case actionTypes.REMOVE_INGREDIENT:

      for (let items of ingredients) {
        if (items.type === action.payload) {
          if (items.amount <= 0) {
            return state;
          }
          items.amount--;
        }
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
      };

    case actionTypes.UPDATE_PURCHASEABLE:
        const sum = state.ingredients.reduce((sum,element)=>{
            return sum +element.amount;
        },0)
        return{
            ...state,
            purchaseable: sum>0
        }


    default:
      return state;
  }
};
