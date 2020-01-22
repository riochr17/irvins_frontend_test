import React from 'react';
import './SinglePage.scss';

import Popup from "reactjs-popup";
import GeneralTable from './../components/gen-table/GeneralTable';
import AddNewProduct from './../components/product/add/AddNewProduct';
import EditNewProduct from './../components/product/edit/EditNewProduct';
import DeleteProduct from './../components/product/delete/DeleteProduct';
import Loading from './../components/loading/Loading';

import { getAllProduct, postNewProduct, putProductChanges, deleteProduct } from './../api/product';

export default class SinglePage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            is_loading: false,
            is_add_popup_open: false,
            is_edit_popup_open: false,
            is_delete_popup_open: false,
            products: [],
            active_product: null
        };
    }

    getProducts() {
        this.setState({is_loading: true});
        getAllProduct(result => {
            this.setState({
                is_loading: false,
                products: result.data
            })
        }, error => {
            this.setState({is_loading: false});
            alert(error);
        });
    }

    postNewProduct(name, price) {
        this.setState({is_loading: true});
        postNewProduct({
                "name": name,
                "price": price
        }, result => {
            this.state.products.unshift(result.data);
            this.setState({
                is_loading: false,
                products: this.state.products,
                is_add_popup_open: false
            })
        }, error => {
            this.setState({is_loading: false});
            alert(error);
        });
    }

    putProductChanges(name, price) {
        this.setState({is_loading: true});
        putProductChanges({
            "id": this.state.active_product._id,
            "name": name,
            "price": price
        }, (result) => {
            this.state.products = this.state.products.map(product => {
                if (product._id == result.data._id) {
                    product = result.data;
                }

                return product;
            });
            this.setState({
                is_loading: false,
                products: this.state.products,
                is_edit_popup_open: false
            })
        }, (error) => {
            this.setState({is_loading: false});
            alert(error);
        });
    }

    deleteProduct() {
        this.setState({is_loading: true});
        deleteProduct({
            "id": this.state.active_product._id
        },(result) => {
            this.state.products = this.state.products.filter(product => product._id != result.data[0]);
            this.setState({
                is_loading: false,
                products: this.state.products,
                is_delete_popup_open: false
            })
        }, (error) => {
            this.setState({is_loading: false});
            alert(error);
        });
    }

    showEditPopup(product) {
        this.setState({
            is_edit_popup_open: true,
            active_product: product
        });
    }

    showDeletePopup(product) {
        this.setState({
            is_delete_popup_open: true,
            active_product: product
        });
    }

    componentDidMount() {
        this.getProducts();
    }
    
    render() {
        return <div className="single-page">
            <Popup
                open={this.state.is_edit_popup_open}
                onClose={_ => this.setState({is_edit_popup_open: false})}
                onOpen={_ => this.setState({is_edit_popup_open: true})}
                modal
                closeOnDocumentClick>
                <EditNewProduct product={this.state.active_product} onSubmit={(name, price) => this.putProductChanges(name, price)} />
            </Popup>
            <Popup
                open={this.state.is_delete_popup_open}
                onClose={_ => this.setState({is_delete_popup_open: false})}
                onOpen={_ => this.setState({is_delete_popup_open: true})}
                modal
                closeOnDocumentClick>
                <DeleteProduct product={this.state.active_product} onDelete={() => this.deleteProduct()} />
            </Popup>
            <div className="single-page--new">
                <Popup 
                    open={this.state.is_add_popup_open}
                    onClose={_ => this.setState({is_add_popup_open: false})}
                    onOpen={_ => this.setState({is_add_popup_open: true})}
                    trigger={
                        <a href="#" onClick={() => {}}>
                            + Add New Product
                        </a>
                    } 
                    modal
                    closeOnDocumentClick>
                    <AddNewProduct onSubmit={(name, price) => this.postNewProduct(name, price)} />
                </Popup>
            </div>
            {
                this.state.is_loading
                ? <Loading />
                : this.state.products.length === 0
                    ? (<div className="single-page--no-product">
                        No product yet
                    </div>)
                    : (<GeneralTable 
                        header={[{
                            label: "Name",
                            key: "name"
                        }, {
                            label: "Price",
                            key: "price"
                        }]}
                        header_action={[{
                            label: "",
                            item_label: row_data => 'Edit',
                            action: row_data => {
                                this.showEditPopup(row_data)
                            }
                        }, {
                            label: "",
                            item_label: row_data => 'Delete',
                            action: row_data => {
                                this.showDeletePopup(row_data)
                            }
                        }]}
                        data={this.state.products} />)
            }
        </div>
    }
}