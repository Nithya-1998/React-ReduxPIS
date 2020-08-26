import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { sendProducts } from '../actions/actionProduct';
import deleteAction from '../actions/actionDelete';
import { Link } from 'react-router-dom';

class AllProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            searchValue: '',
            isTitleSearch: true,
            isCategorySearch: false,
            isManufacturerSearch: false,
            isSupplierSearch: false,
            isDeleteAll: false,
            delCount: []
        }
        console.log("In constructor")
        this.getAllProducts();
    }
    componentWillMount() {
        // if (this.props.allProducts.length === 0) {
        axios.get('http://localhost:3000/allProduct').then((response) => {
            console.log(response.data);
            this.setState({ allProducts: response.data });
            this.props.sendAllProducts(response.data);
        }, (error) => {
            console.log(error.data);
        })
        console.log("In Will mount");
        console.log(this.state.allProducts);
        // }
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
        if (this.state.isCategorySearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.category.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isTitleSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.title.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isManufacturerSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.manufacturer.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
        if (this.state.isSupplierSearch) {
            let searchProd = this.state.allProducts.filter((prod) => {
                return prod.supplier.toLowerCase().match(val.toLowerCase());
            });
            console.log(searchProd);
            this.setState({ allProducts: searchProd });
        }
    }
    onDelete = (product) => {
        console.log(product);
        this.props.deleteProduct(product);
        this.renderAllProducts();
        console.log(this.props.allProducts);
        console.log(this.state.allProducts);
        setTimeout(() => {
            this.getAllProducts();
        }, 500);
        console.log(this.props.allProducts);
        console.log(this.state.allProducts);
    }
    searchManufacturer = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: true, isCategorySearch: false, isSupplierSearch: false, isTitleSearch: false })
    }
    searchCategory = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: true, isSupplierSearch: false, isTitleSearch: false })
    }
    searchTitle = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: false, isSupplierSearch: false, isTitleSearch: true })
    }
    searchSupplier = (event) => {
        event.preventDefault();
        this.setState({ isManufacturerSearch: false, isCategorySearch: false, isSupplierSearch: true, isTitleSearch: false })
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
                stock = this.state.allProducts.filter((ps) => {
                    return ps.inStock < 10;
                })
                console.log(stock);
                this.setState({ allProducts: stock });
                return stock;
            }
            case '10-80': {
                stock = this.state.allProducts.filter((ps) => {
                    return (ps.inStock >= 10 && ps.inStock <= 80);
                })
                console.log(stock);
                this.setState({ allProducts: stock });
                return stock;
            }
            case '80': {
                stock = this.state.allProducts.filter((ps) => {
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
                sortProd = this.state.allProducts.sort(this.compareAZ);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'Z-A': {
                sortProd = this.state.allProducts.sort(this.compareZA);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'L-H': {
                sortProd = this.state.allProducts.sort(this.compareLH);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'H-L': {
                sortProd = this.state.allProducts.sort(this.compareHL);
                this.setState({ allProducts: sortProd })
                return sortProd;
            }
            case 'Id': {
                sortProd = this.state.allProducts.sort(this.compareId);
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
        console.log(this.state.delCount);
    }
    handleRemove = (e) => {
        e.preventDefault();
        console.log(this.state.delCount.length);
        console.log(this.state.delCount[0]);
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

    }

    renderAllProducts = () => {
        return this.state.allProducts.map((product) => {
            return (
                <tr key={product.id}>
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
                        <button>
                            <Link
                                to={
                                    {
                                        pathname: '/edit',
                                        state: product
                                    }
                                } style={{ textDecoration: "none", color: 'white' }}>
                                <small> <i className="material-icons text-dark font-weight-bold">create</i></small>
                            </Link>
                        </button>
                    </td>
                    <td>
                        <button onClick={() => this.onDelete(product)} value={product} style={{ cursor: 'pointer' }} >
                            <i className="material-icons text-danger">delete</i>
                        </button>
                    </td>
                    {/* {this.state.isDeleteAll &&
                        <td><input type="checkbox" id="delete" value={product} onChange={() => this.handleBulkDelete(product)}></input></td>} */}
                    {this.state.isDeleteAll &&
                        <td><input type="checkbox" id="deleteAll" value={product} onChange={(e) => this.handleBulkDelete(product, e)}></input></td>}
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

    render() {
        return (
            <div>
                <span className="input-group-text" id="search"><i className="material-icons">search</i>
                    <input type="text" className="dropdown-item" onChange={this.handleSearch} placeholder="Search here..." />
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbardropdown">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse  navbar-light navbar-light" id="navbardropdown">
                            <ul className="navbar-nav">
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
                                </li>
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
                                <li className="nav-item dropdown">
                                    <div className="d-flex">
                                        <div className="flex-shrink-1">
                                            <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                                Select <i className="material-icons">search</i> type
                                         </a>
                                            <div className="dropdown-menu">
                                                <div className="dropdown-item bg-dark text-light" data-target="#cost">
                                                    Product
                                            </div>
                                                <button onClick={this.searchManufacturer} className="dropdown-item">Manufacturer</button>
                                                <button onClick={this.searchSupplier} className="dropdown-item">Supplier</button>
                                                <button onClick={this.searchCategory} className="dropdown-item">Category</button>
                                                <button onClick={this.searchTitle} className="dropdown-item">Title</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <a >
                        <button type="button" className="btn btn-dark">
                            <Link to={
                                {
                                    pathname: '/add',
                                    state: this.state
                                }
                            } style={{ textDecoration: "none" }}>
                                <i className="material-icons text-light font-weight-bold">add</i>
                                <span className="text-light font-weight-bold">Add Product</span></Link>
                        </button>
                    </a>
                    <button type="button" onClick={this.handleSelect} className="btn btn-dark">Select More</button>
                    {this.state.isDeleteAll && <button type="button" onClick={this.handleRemove} className="btn btn-dark">
                        <i className="material-icons text-danger">delete</i>
                    </button>}
                </span>
                <div class="container-fluid">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr class="bg-dark text-white">
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
                                        <th scope="col">DeleteAll</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllProducts()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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