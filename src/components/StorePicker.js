import React from 'react';
import { getFunName } from '../helper';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {

    getToStore(e){
        e.preventDefault();
        const storeId = this.storeInput.value;
        this.props.history.push(`/store/${storeId}`);
    }

    render(){
        return (
            <form className="store-selector" onSubmit={ (event) => this.getToStore(event) }>
                <h2>Please enter the store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={ (input) => { this.storeInput = input; }} />
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

StorePicker.propTypes = {
    history: PropTypes.any
}

export default StorePicker;