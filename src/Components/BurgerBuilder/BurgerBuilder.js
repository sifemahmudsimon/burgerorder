import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Summery from "./Summery/Summery";
import { Navigate } from "react-router-dom";

const INGREDIENT_PRICE = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: "salad", amount: 0 },
      { type: "cheese", amount: 0 },
      { type: "meat", amount: 0 },
    ],
    totalPrice: 80,
    modalOpen: false,
    purchaseable: false,
    onoClickCheckout: false,
  };

  updatePurchaseable = (ingredients) => {
    const sum = ingredients.reduce((sum, element) => {
      return sum + element.amount;
    }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleCheckout = () => {
    this.setState({
      onoClickCheckout: true
    })
  }

  addIngredientHandle = (type) => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    for (let items of ingredients) {
      if (items.type === type) {
        items.amount++;
      }
      this.setState({ ingredients: ingredients, totalPrice: newPrice });
      this.updatePurchaseable(ingredients);
    }
  };
  removeIngredientHandle = (type) => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    for (let items of ingredients) {
      if (items.type === type) {
        if (items.amount <= 0) {
          return;
        }
        items.amount--;
      }
      this.setState({ ingredients: ingredients, totalPrice: newPrice });
      this.updatePurchaseable(ingredients);
    }
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.state.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandle}
            ingredientRemoved={this.removeIngredientHandle}
            price={this.state.totalPrice}
            toggleModal={this.toggleModal}
            purchaseable={this.state.purchaseable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Orer Summery</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
            <Summery ingredients={this.state.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleCheckout}>
              Continute to checkout
            </Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
          {this.state.onoClickCheckout && <Navigate to="/checkout" replace={true}/>}
        </Modal>
      </div>
    );
  }
}
