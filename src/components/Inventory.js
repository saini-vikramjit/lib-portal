import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';

class Inventory extends React.Component {
    
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.changeFishData = this.changeFishData.bind(this);
    }

    changeFishData(e,key){
        const fish = this.props.fishes[key];
        const updatedFish = {...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key,updatedFish);
    }

    renderInventory(key){
        const fish = this.props.fishes[key];
        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={(e) => this.changeFishData(e,key)} />
                <input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={(e) => this.changeFishData(e,key)}/>
                <select value={fish.status} name="status" placeholder="Fish Status" onChange={(e) => this.changeFishData(e,key)}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.changeFishData(e,key)}></textarea>
                <input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={(e) => this.changeFishData(e,key)}/>
                <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render(){
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map((key) => this.renderInventory(key))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Samples</button>
            </div>    
        )
    }
}

Inventory.propTypes = {
    deleteFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired
}

export default Inventory;