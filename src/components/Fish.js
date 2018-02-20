import React from 'react';
import PropTypes from 'prop-types';

class Fish extends React.Component {
    render(){
        const {details, index} = this.props;
        const isAvailable = details.status === "available"
        const buttonText = isAvailable ? "Add To Order" : "Sold Out!";
        return(
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{details.price}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    addToOrder: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired
}

export default Fish;