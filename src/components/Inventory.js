import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class Inventory extends React.Component {
    
    constructor(props){
        super(props);
        this.renderInventory = this.renderInventory.bind(this);
        this.changeFishData = this.changeFishData.bind(this);

        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount(){
        const me = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user)
              me.authHandler(user);
        });
    }

    logout = () => {
        const me = this;
        firebase.auth().signOut().then(function(){
            me.setState({uid: null});
        }).catch(function(error){
            console.log(error);
        });
    }

    authenicate = (e) => {
        
        e.preventDefault();
        console.log(e.target.value);
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        firebase.auth().signInWithPopup(provider)
            .then(this.authHandler)
            .catch(function(error) {
                console.error(error);
                return;
            });
    }

    authHandler = (authData) => {

        const uid = (authData.user !== undefined) ? authData.user.uid : authData.uid;
        const storeRef = firebase.database().ref(this.props.storeId);
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            if(!data.owner){
                storeRef.set({
                    owner: uid
                });
            }

            this.setState({
                uid: uid,
                owner: data.owner || uid
            });
        });
    }

    renderLogin = () => {
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage store's inventory</p>
                <button className="github" value="github.com" onClick={ this.authenicate }>Login with Github</button>
            </nav>
        )
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

        const logout = <button onClick={this.logout}>Logout</button>;

        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }

        if(this.state.uid !== this.state.owner){
            return(
                <div>
                    <p>Sorry you aren't owner of the store</p>
                    {logout}
                </div>    
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
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
    updateFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
}

export default Inventory;