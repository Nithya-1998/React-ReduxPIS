import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { sendProducts } from '../actions/actionProduct';
import deleteAction from '../actions/actionDelete';
import { Link } from 'react-router-dom';
import './allProductsstyle.css';
import $ from 'jquery';
class AllProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            searchValue: '',
            isTitleSearch: true,
            isCategorySearch: true,
            isManufacturerSearch: true,
            isSupplierSearch: true,
            isDeleteAll: false,
            isRestore: false,
            restoreDatas: [],
            delCount: [],
            delLength: 0
        }
        console.log("In constructor")
        this.getAllProducts();
    }
    componentWillReceiveProps() {
        console.log(this.props.allProducts);
        console.log(this.state.allProducts);
        console.log(this.renderAllProducts())
        console.log("Will Receive Props");
    }
    componentDidCatch() {
        console.log("In catch");
    }
    componentDidUpdate() {
        this.renderAllProducts();
        console.log(this.renderAllProducts())
        console.log("Did Update");
    }
    componentDidMount() {
        console.log("In did mount");
        console.log(this.getAllProducts());
        console.log(this.state.allProducts);
    }
    getAllProducts = () => {
        axios.get('http://localhost:3000/allProduct').then((response) => {
            console.log(response.data);
            this.setState({ allProducts: response.data });
            this.props.sendAllProducts(response.data);
            return response.data;
        }, (error) => {
            console.log(error.data);
        })
    }
    handleSearch = (event) => {
        event.preventDefault();
        console.log(this.state.allProducts);
        let val = event.target.value
        if (val === '' || val.length === 0) {
            this.getAllProducts();
        }
        if (this.state.isTitleSearch || this.state.isManufacturerSearch || this.state.isSupplierSearch || this.state.isCategorySearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return (prod.manufacturer.toLowerCase().match(val.toLowerCase()) ||
                    prod.title.toLowerCase().match(val.toLowerCase()) ||
                    prod.category.toLowerCase().match(val.toLowerCase()) ||
                    prod.supplier.toLowerCase().match(val.toLowerCase())
                );
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
    }
    onDelete = (product) => {
        this.setState({ isRestore: true });
        let productDeleted = product
        this.props.deleteProduct(product);
        this.renderAllProducts();
        console.log(this.props.allProducts);
        console.log(this.state.allProducts);
        setTimeout(() => {
            this.getAllProducts();
        }, 500);
        console.log(productDeleted);
        axios.post('http://localhost:3000/restoredProducts/', productDeleted).then((res) => {
            console.log(res.data)
            axios.get('http://localhost:3000/restoredProducts/').then((res) => {
                this.setState({ restoreDatas: res.data })
                console.log(res.data);
            }, (error) => {
                console.log(error.data);
            })
        }, (error) => {
            console.log(error.data)
        })
        console.log(this.props.allProducts);
        console.log(this.state.allProducts);
    }
    handleStock = (e) => {
        console.log(e);
        let allProd = this.props.allProducts;
        console.log(allProd);
        console.log(this.state.allProducts);
        let stock = [];
        switch (e) {
            case 'all': {
                stock = this.props.allProducts;
                this.setState({ allProducts: stock });
                return stock;
            }
            case '10': {
                stock = this.props.allProducts.filter((ps) => {
                    return ps.inStock < 10;
                })
                console.log(stock);
                this.setState({ allProducts: stock });
                return stock;
            }
            case '10-80': {
                stock = this.props.allProducts.filter((ps) => {
                    return (ps.inStock >= 10 && ps.inStock <= 80);
                })
                console.log(stock);
                this.setState({ allProducts: stock });
                return stock;
            }
            case '80': {
                stock = this.props.allProducts.filter((ps) => {
                    return (ps.inStock > 80);
                })
                console.log(stock);
                this.setState({ allProducts: stock });
                return stock;
            }
            default:
                break;
        }
        return allProd;
    }
    compareAZ = (a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
    compareZA = (a, b) => {
        if (a.title > b.title) {
            return -1;
        }
        if (a.title < b.title) {
            return 1;
        }
        return 0;
    }
    compareLH = (a, b) => {
        if (a.inStock < b.inStock) {
            return -1;
        }
        if (a.inStock > b.inStock) {
            return 1;
        }
        return 0;
    }
    compareHL = (a, b) => {
        if (a.inStock > b.inStock) {
            return -1;
        }
        if (a.inStock < b.inStock) {
            return 1;
        }
        return 0;
    }
    compareId = (a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    handleSort = (e) => {
        console.log(e);
        let allprod = this.props.allProducts;
        let sortProd = [];
        switch (e) {
            case 'A-Z': {
                sortProd = this.props.allProducts.sort(this.compareAZ);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'Z-A': {
                sortProd = this.props.allProducts.sort(this.compareZA);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'L-H': {
                sortProd = this.props.allProducts.sort(this.compareLH);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'H-L': {
                sortProd = this.props.allProducts.sort(this.compareHL);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'Id': {
                sortProd = this.props.allProducts.sort(this.compareId);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            default:
                break;
        }
    }
    handleBulkDelete = (product, e) => {
        e.preventDefault();
        console.log(e.target.checked);
        console.log(this.state.delCount);
        console.log(product);
        if (product && e.target.checked) {
            this.state.delCount.push(product.id);
        } else {
            this.state.delCount.pop(product.id);
        }
        this.setState({ delLength: this.state.delCount.length })
        console.log(this.state.delCount.length);
    }
    handleRemove = (e) => {
        e.preventDefault();
        this.setState({ isDeleteAll: false, isRestore: true });
        console.log(this.state.delCount.length);
        console.log(this.state.delCount[0]);
        let restoreData = [];
        for (var i = 0; i < this.state.delCount.length; i++) {
            restoreData.push(
                this.props.allProducts.filter((prod) => {
                    return prod.id === this.state.delCount[i];
                }))
        }
        for (var i = 0; i < this.state.delCount.length; i++) {
            console.log(i);
            axios.delete('http://localhost:3000/allProduct/' + this.state.delCount[i]).then((res) => {
                console.log(res.data)
            }, (error) => {
                console.log(error.data)
            })
        }
        setTimeout(() => {
            this.getAllProducts();
        }, 500);
        for (var i = 0; i < this.state.delCount.length; i++) {
            axios.post('http://localhost:3000/restoredProducts/', restoreData[i][0]).then((res) => {
                console.log(res.data)
            }, (error) => {
                console.log(error.data)
            })
        }
        setTimeout(() => {
            axios.get('http://localhost:3000/restoredProducts/').then((res) => {
                this.setState({ restoreDatas: res.data })
                console.log(res.data);
            }, (error) => {
                console.log(error.data);
            })
        }, 500);
    }
    mytab = (product, e) => {
        // e.preventDefault();
        console.log(product);
        console.log(e.target.isConnected);
        if (e.target.isConnected) {
            console.log($(document));
        }
        let ff = $('#myTable tbody tr').on("click", function () {
            $(this).addClass('bg-info').siblings().removeClass('bg-info');;
            // $(this).removeClass('bg-info').siblings();
            // $(this).addClass('bg-info').siblings().removeClass('bg-info');
        });
        console.log(ff);
    }
    renderAllProducts = () => {
        return this.state.allProducts.map((product, i) => {
            return (
                <tr key={product.id} data-testid={'product-item-' + i} onClick={(e) => this.mytab(product, e)} data-click-to-select="true">
                    <th scope="row">{product.id}</th>
                    <td><img src={product.imageurl} style={{ height: '40px', width: '40px' }} /></td>
                    <td>{product.title}</td>
                    <td>{product.cost}</td>
                    <td>{product.category}</td>
                    <td><span style={{ color: product.color }}><i className="material-icons">brightness_1</i></span></td>
                    <td>{product.size}</td>
                    <td>{product.manufacturer}</td>
                    <td>{product.type}</td>
                    <td>{product.supplier}</td>
                    <td>{product.material}</td>
                    <td>{product.warranty}</td>
                    <td>{product.description}</td>
                    <td>{product.inStock}</td>
                    <td>{product.outOfstock}</td>
                    <td>{product.quantity}</td>
                    <td>
                        <span>
                            <Link
                                to={
                                    {
                                        pathname: '/edit',
                                        state: product
                                    }
                                } style={{ textDecoration: "none", color: 'white', fontSize: '25px' }}>
                                <small> <i className="material-icons text-dark font-weight-bold">create</i></small>
                            </Link>
                        </span>
                    </td>
                    <td>
                        <span onClick={() => this.onDelete(product)} value={product} style={{ cursor: 'pointer' }} >
                            <i className="material-icons text-danger" style={{ cursor: 'pointer', fontSize: '30px' }}>delete</i>
                        </span>
                    </td>
                    {/* {this.state.isDeleteAll &&
                        <td><input type="checkbox" id="delete" value={product} onChange={() => this.handleBulkDelete(product)}></input></td>} */}
                    {this.state.isDeleteAll &&
                        <td><input type="checkbox" id="deleteAll" style={{ cursor: "pointer" }} onChange={(e) => this.handleBulkDelete(product, e)} ></input></td>}
                </tr>
            )
        })
    }
    handleSelect = (e) => {
        e.preventDefault();
        if (!e.target.value) {
            this.setState({ isDeleteAll: true })
        } else {
            this.setState({ isDeleteAll: false })
        }
    }
    handleRestore = (product, e) => {
        e.preventDefault();
        console.log(this.state.restoreDatas);
        console.log(product);
        let resData = product;
        this.setState({ isRestore: false });
        axios.delete('http://localhost:3000/restoredProducts/' + product.id).then((res) => {
            axios.get('http://localhost:3000/restoredProducts/').then((res) => {
                this.setState({ restoreDatas: res.data });
                console.log(res.data);
            })
        }, (error) => {
            console.log(error.data);
        })
        axios.post('http://localhost:3000/allProduct/', resData).then((res) => {
            console.log(res.data);
        }, (error) => {
            console.log(error.data);
        })
        setTimeout(() => {
            this.getAllProducts();
        }, 500);
    }
    renderRestoreData = () => {
        console.log(this.state.restoreDatas.length);
        if (!this.state.restoreDatas.length) {
            return (
                <div className="modal-body text-center">
                    No Products Found
                </div>);
        }
        return this.state.restoreDatas.map((product) => {
            return (<div className="modal-body">
                <span key={product.id} className="float-left font-weight-bold">
                    <span className="text-black font-weight-bold">{product.id}</span>&nbsp;
                    <span className="text-info font-weight-bold">{product.title}</span>
                </span>
                <span className="icon-button ml-auto">
                    <i className="material-icons text-white" onClick={(e) => this.handleRestore(product, e)} style={{ cursor: "pointer", fontSize: '20px', float: 'right' }}>restore_from_trash</i>
                </span>
            </div>)
        })

    }

    render() {
        return (
            <div>
                <span className="row">
                    <span className="col-lg-6 col-sm-12 col-md-12 input-group-text bg-white" id="search"><i className="material-icons">search</i>
                        <input type="text" className="dropdown-item" onChange={this.handleSearch} placeholder="Search by Title,Manufacturer,Supplier,Category..." />
                    </span>
                    <nav className="col-sm-12 col-lg-6 col-md-12 navbar navbar-expand-lg navbar-white bg-white">
                        <button className="navbar-toggler ml-auto bg-dark" type="button" data-toggle="collapse" data-target="#navbardropdown">
                            <i className="material-icons text-white">menu</i>
                        </button>
                        <div className="collapse navbar-collapse navbar-light" id="navbardropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <div className="d-flex">
                                        <div className="flex-shrink-1">
                                            <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">search</i>  Select type
                                            </a>
                                            <div className="dropdown-menu">
                                                <div className="dropdown-item bg-dark text-light" data-target="#cost">
                                                    Product
                                                </div>
                                                <div className="dropdown-item">
                                                    <span style={{ cursor: "pointer" }}>Manufacturer </span>
                                                    <input type="checkbox" style={{ cursor: "pointer", float: 'right' }} value={this.state.isManufacturerSearch} onChange={() => { this.setState({ isManufacturerSearch: true }) }} />
                                                </div>
                                                <div className="dropdown-item">
                                                    <span style={{ cursor: "pointer" }}>Supplier</span>
                                                    <input type="checkbox" style={{ cursor: "pointer", float: 'right' }} value={this.state.isSupplierSearch} onChange={() => { this.setState({ isSupplierSearch: true }) }} />
                                                </div>
                                                <div className="dropdown-item">
                                                    <span style={{ cursor: "pointer" }}>Category</span>
                                                    <input type="checkbox" style={{ cursor: "pointer", float: 'right' }} value={this.state.isCategorySearch} onChange={() => { this.setState({ isCategorySearch: true }) }} />
                                                </div>
                                                <div className="dropdown-item">
                                                    <span style={{ cursor: "pointer" }}>Title</span>
                                                    <input type="checkbox" style={{ cursor: "pointer", float: 'right' }} value={this.state.isTitleSearch} onChange={() => { this.setState({ isTitleSearch: true }) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>&nbsp;
                                <li className="nav-item dropdown">
                                    <div className="d-flex">
                                        <div className="flex-shrink-1">
                                            <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                data-toggle="dropdown">
                                                <i className="material-icons">sort</i>
                                            Sort
                                        </a>
                                            <div className="dropdown-menu">
                                                <button onClick={() => this.handleSort('A-Z')} className="dropdown-item">Title <b>A-Z</b></button>
                                                <button onClick={() => this.handleSort('Z-A')} className="dropdown-item">Title <b>Z-A</b></button>
                                                <button onClick={() => this.handleSort('H-L')} className="dropdown-item">Stock <b>H-L</b></button>
                                                <button onClick={() => this.handleSort('L-H')} className="dropdown-item">Stock <b>L-H</b></button>
                                                <button onClick={() => this.handleSort('Id')} className="dropdown-item"><b>All Products</b></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>&nbsp;
                                <li className="nav-item dropdown">
                                    <div className="d-flex">
                                        <div className="flex-shrink-1">
                                            <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">filter_list</i>
                                              Filter
                                         </a>
                                            <div className="dropdown-menu">
                                                <div className="dropdown-item bg-dark text-light" data-target="#cost">
                                                    Stock
                                                </div>
                                                <button onClick={() => this.handleStock('all')} className="dropdown-item">All Stock</button>
                                                <button onClick={() => this.handleStock('10')} className="dropdown-item"> Below 10</button>
                                                <button onClick={() => this.handleStock('10-80')} className="dropdown-item"> 10 - 80</button>
                                                <button onClick={() => this.handleStock('80')} className="dropdown-item"> Above 80</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <button type="button" className="btn btn-dark mt-2">
                                    <Link to={
                                        {
                                            pathname: '/add',
                                            state: this.state
                                        }
                                    } style={{ textDecoration: "none" }}>
                                        <i className="material-icons text-white font-weight-bold" style={{ fontSize: '18px' }}>add</i>
                                        <span className="text-white font-weight-bold">Add Product</span></Link>
                                </button>
                            </div>
                            <div>
                                <button type="button" onClick={this.handleSelect} className="btn btn-dark font-weight-bold mt-2">Select More</button>
                            </div>
                            {this.state.isDeleteAll &&
                                <span className="icon-button ml-5 mr-5 mt-2">
                                    <i className="material-icons text-white" style={{ cursor: "pointer", fontSize: '30px', float: 'left' }} data-toggle="modal" data-target="#myModal">delete</i>
                                </span>
                            }
                            {this.state.isRestore &&
                                <div className="icon-button mt-2 mr-5 ml-5">
                                    <i className="material-icons text-white" style={{ cursor: "pointer", fontSize: '30px', float: 'left' }} data-toggle="modal" data-target="#restore">restore_from_trash</i>
                                </div>
                            }
                        </div>
                    </nav>
                    {/* </span> */}
                </span>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body text-center">
                                Are you sure?
                                <br />
                                Delete <b>{this.state.delLength}</b> Selected Products?
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark mr-auto" onClick={this.handleRemove} data-dismiss="modal">Delete</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal" id="restore">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="text-black font-weight-bold text-center">Restore Product</span>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            {this.renderRestoreData()}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={() => { this.setState({ isRestore: false }) }} data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="table-responsive" id="myTable">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr className="bg-dark text-white">
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Manufacturer</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Supplier</th>
                                    <th scope="col">Material</th>
                                    <th scope="col">Warranty</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">In Stock</th>
                                    <th scope="col">Out of Stock</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                    {this.state.isDeleteAll &&
                                        <th scope="col">Select Product</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllProducts()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
function storeToprops(store) {
    console.log(store);
    return {
        allProducts: store.allProducts
    }
}
function dispatchToAction(dispatch) {
    return bindActionCreators({
        sendAllProducts: sendProducts,
        deleteProduct: deleteAction
    }, dispatch)
}

export default connect(storeToprops, dispatchToAction)(AllProducts);