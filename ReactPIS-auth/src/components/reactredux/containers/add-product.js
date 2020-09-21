import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../actions/actionAddProduct';
import { SketchPicker } from 'react-color';
import './allProductsstyle.css';
class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cost: '',
            inStock: 0,
            description: '',
            category: '',
            outOfstock: 0,
            quantity: 0,
            color: '',
            size: 0,
            type: '',
            manufacturer: '',
            material: '',
            supplier: '',
            warranty: 0,
            gender: ''
        }
    }
    handleStock = (event) => {
        event.preventDefault();
        this.setState({ inStock: event.target.value })
    }
    handleTitleChange = (event) => {
        event.preventDefault();
        this.setState({ title: event.target.value })
    }
    handleCostChange = (event) => {
        event.preventDefault();
        this.setState({ cost: event.target.value })
    }
    handleDescription = (event) => {
        event.preventDefault();
        this.setState({ description: event.target.value })
    }
    handleCategory = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value })
    }
    handleUrl = (event) => {
        event.preventDefault();
        this.setState({ imgurl: event.target.value })
    }
    handleOutofstock = (event) => {
        event.preventDefault();
        this.setState({ outOfstock: event.target.value })
    }
    handleQuantity = (event) => {
        event.preventDefault();
        this.setState({ quantity: event.target.value })
    }
    handleColor = (color) => {
        this.setState({ color: color.hex })
    }
    handleManufacturer = (event) => {
        event.preventDefault();
        this.setState({ manufacturer: event.target.value })
    }
    handleMaterial = (event) => {
        event.preventDefault();
        this.setState({ material: event.target.value })
    }
    handleSupplier = (event) => {
        event.preventDefault();
        this.setState({ supplier: event.target.value })
    }
    handleWarranty = (event) => {
        event.preventDefault();
        this.setState({ warranty: event.target.value })
    }
    handleSize = (event) => {
        event.preventDefault();
        this.setState({ size: event.target.value })
    }
    handleType = (event) => {
        event.preventDefault();
        this.setState({ type: event.target.value })
    }
    handleGender = (event) => {
        event.preventDefault();
        this.setState({ gender: event.target.value })
    }
    onSave = (event) => {
        event.preventDefault();
        console.log("Product Added Successfully...");
        let addedProd = {
            "title": this.state.title,
            "cost": Number(this.state.cost),
            "inStock": Number(this.state.inStock),
            "description": this.state.description,
            "category": this.state.category,
            "imageurl": this.state.imgurl,
            "outOfstock": Number(this.state.outOfstock),
            "quantity": Number(this.state.quantity),
            "color": this.state.color,
            "type": this.state.type,
            "manufacturer": this.state.manufacturer,
            "material": this.state.material,
            "size": Number(this.state.size),
            "warranty": Number(this.state.warranty),
            "supplier": this.state.supplier,
            "gender": this.state.gender
        }
        console.log(addedProd);
        this.props.sendAddProduct(addedProd);
        this.props.history.push('/products');
        // return addedProd;
    }
    render() {
        return (
            <div>
                <form>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-lg-7">
                                <div className="card mt-4 mb-5">
                                    <div className="card-title h1 ml-4 mt-4">Add Details</div>
                                    <div className="mt-2 ml-4 mr-4">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Product Name : </b></label>
                                                <input type="text" id="productName" className="title" value={this.state.title} onChange={this.handleTitleChange}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Cost : </b></label>
                                                <input type="number" id="productcost" className="cost" value={this.state.cost} onChange={this.handleCostChange}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Product ImageUrl : </b></label>
                                                <input type="text" id="imgUrl" className="imgUrl" value={this.state.imgurl} onChange={this.handleUrl}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>In Stock : </b></label>
                                                <input type="number" id="productcost" className="instock" value={this.state.instock} onChange={this.handleStock}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Out of Stock : </b></label>
                                                <input type="number" id="outOfstock" className="outOfstock" value={this.state.outOfstock} onChange={this.handleOutofstock}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Quantity : </b></label>
                                                <input type="number" id="quantity" className="quantity" value={this.state.quantity} onChange={this.handleQuantity}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Description : </b></label>
                                                <input type="text" id="productdescription" className="productdescription" value={this.state.description} onChange={this.handleDescription}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Category : </b></label>
                                                <select id="category" className="category" value={this.state.category} onChange={this.handleCategory}>
                                                    <option value="" selected>Select</option>
                                                    <option value="Shoe">Shoe</option>
                                                    <option value="Crocs">Crocs</option>
                                                    <option value="Sandal">Sandal</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Gender </b></label>
                                                <select id="gender" className="gender" value={this.state.gender} onChange={this.handleGender}>
                                                    <option value="" selected>Select</option>
                                                    <option value="F">Female</option>
                                                    <option value="M">Male</option>
                                                    <option value="k-F">Kids-F</option>
                                                    <option value="k-M">Kids-M</option>
                                                    <option value="B">M/F</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Color </b></label>
                                                <SketchPicker color={this.state.color} className="color" onChange={this.handleColor}></SketchPicker>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Size </b></label>
                                                <input type="number" id="size" className="size" value={this.state.size} onChange={this.handleSize}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Type </b></label>
                                                <select id="type" className="type" value={this.state.type} onChange={this.handleType}>
                                                    <option value="" selected>Select</option>
                                                    <option value="Lace Ups">Lace Ups</option>
                                                    <option value="Canvas Shoes">Canvas Shoes</option>
                                                    <option value="Flip Flops">Flip Flops</option>
                                                    <option value="Loafers">Loafers</option>
                                                    <option value="Heels">Heels</option>
                                                    <option value="Boots">Boots</option>
                                                    <option value="Slip-On">Slip-On</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Supplier </b></label>
                                                <input type="text" id="supplier" className="supplier" value={this.state.supplier} onChange={this.handleSupplier}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Material </b></label>
                                                <select id="material" className="material" value={this.state.material} onChange={this.handleMaterial}>
                                                    <option value="" selected>Select</option>
                                                    <option value="Leather">Leather</option>
                                                    <option value="Artificial Leather">Artificial Leather</option>
                                                    <option value="Synthetic">Synthetic</option>
                                                    <option value="Textiles Fabric">Textiles Fabric</option>
                                                    <option value="Rubber">Rubber</option>
                                                    <option value="PVC">PVC</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Manufacturer </b></label>
                                                <input type="text" id="manufacturer" className="manufacturer" value={this.state.manufacturer} onChange={this.handleManufacturer}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label><b>Warranty </b></label>
                                                <input type="number" id="warranty" className="warranty" value={this.state.warranty} onChange={this.handleWarranty}></input>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <div className="btn-group mb-4 mt-4">
                                                    <button type="button" onClick={this.onSave} className="btn btn-success font-weight-bold">
                                                        Save Changes
                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
function dispatchToAction(dispatch) {
    return bindActionCreators({
        sendAddProduct: addProduct
    }, dispatch)
}


export default connect(null, dispatchToAction)(AddProduct);