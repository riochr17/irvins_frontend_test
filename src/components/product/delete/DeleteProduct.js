import React from 'react';
import './DeleteProduct.scss';

export default class DeleteProduct extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: props.product.name
        };
    }

    render() {
        return <div className="add-new-product">
            <div className="add-new-product--title">
                Delete Product
            </div>
            <div className="add-new-product--section">
                <div className="add-new-product--section--label">
                    Do you want to remove {this.state.name}
                </div>
            </div>
            <div
                onClick={e => this.props.onDelete()} 
                className="add-new-product--button">
                Remove
            </div>
        </div>;
    }
}
