import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {

    constructor(){
        super(props);
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.deleteFish = this.deleteFish.bind(this);
        this.deleteFromOrder = this.deleteFromOrder.bind(this);

        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount(){
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
        if(localStorageRef){
            this.setState({order:JSON.parse(localStorageRef)});
        }
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps,nextState){
        localStorage.setItem(`order-${this.props.match.params.storeId}`,JSON.stringify(nextState.order));
    }

    addFish(fish){
        const fishes = {...this.state.fishes};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;

        this.setState({fishes: fishes});
    }

    updateFish(key,updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    deleteFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSamples(){
        this.setState({fishes: sampleFishes});
    }

    addToOrder(key){
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    }

    deleteFromOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Sea Food"/>
                    <ul className="list-of-fishes">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} 
                                            details={this.state.fishes[key]} 
                                            addToOrder={this.addToOrder} 
                                            index={key}
                                        />
                            )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    deleteFromOrder={this.deleteFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired
}

export default App;