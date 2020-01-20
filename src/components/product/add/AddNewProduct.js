import React from 'react';
import './AddNewProduct.scss';

export default class AddNewProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            price: 0
        };
    }

    render() {
        return <div className="add-new-product">
            <div className="add-new-product--title">
                Add New Product
            </div>
            <div className="add-new-product--section">
                <div className="add-new-product--section--label">
                    Name
                </div>
                <div className="add-new-product--section--data">
                    <input 
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                        type="text" />
                </div>
            </div>
            <div className="add-new-product--section">
                <div className="add-new-product--section--label">
                    Price
                </div>
                <div className="add-new-product--section--data">
                    <input 
                        value={this.state.price}
                        onChange={e => this.setState({price: e.target.value})}
                        type="number" />
                </div>
            </div>
            <div
                onClick={e => this.props.onSubmit(this.state.name, this.state.price)} 
                className="add-new-product--button">
                Add
            </div>
        </div>;
    }
}
