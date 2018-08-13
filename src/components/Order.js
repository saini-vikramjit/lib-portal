import React from 'react';
import { formatPrice } from '../helper';
import PropTypes from 'prop-types';

class Order extends React.Component {
    
    constructor(){
        super(props);
    }

    renderOrder = (key) => {

        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const deleteButton = <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>;

        if(!fish || fish.status === "unavailable"){
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {deleteButton}</li>
        }

        return(
            <li key={key}>
                <span>{count}lbs {fish.name} {deleteButton}</span>
                <span className="price">{formatPrice(fish.price * count)}</span>
            </li>
        )
    }
    
    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevVal,key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            if(isAvailable)
                return prevVal += fish.price * count;  
            else
                return prevVal;
        },0);
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    deleteFromOrder: PropTypes.func.isRequired
}

export default Order;