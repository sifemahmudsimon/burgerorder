import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Summery from "./Summery/Summery";
import { Navigate } from "react-router-dom";

import {connect} from 'react-redux';
import {addIngredient,removeIngredient,updatePurchaseable} from '../../redux/actionCreators';

const mapStateToProps = state => {
  return{
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchaseable: () => dispatch(updatePurchaseable())
  }
}

class BurgerBuilder extends Component {
  state = { 
    modalOpen: false,
    onoClickCheckout: false,
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
    this.props.addIngredient(type);
    this.props.updatePurchaseable();
    }
  
  removeIngredientHandle = (type) => {
    this.props.removeIngredient(type);
    this.props.updatePurchaseable();
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandle}
            ingredientRemoved={this.removeIngredientHandle}
            price={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchaseable={this.props.purchaseable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Orer Summery</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
            <Summery ingredients={this.props.ingredients} />
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

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)