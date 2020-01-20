import React from 'react';
import './EditNewProduct.scss';

export default class EditNewProduct extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: props.product.name,
            price: props.product.price
        };
    }

    render() {
        return <div className="add-new-product">
            <div className="add-new-product--title">
                Edit Product
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
                Edit
            </div>
        </div>;
    }
}
