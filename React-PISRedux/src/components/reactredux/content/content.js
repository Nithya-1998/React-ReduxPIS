import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../containers/login';
import Signup from '../containers/signup';
import Dashboard from '../containers/dashboard';
import EditProduct from '../containers/edit-product';
import AddProduct from '../containers/add-product';
// import AllProduct from './products/products';
import AllProducts from '../containers/allproducts';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    {/* <Route path="/products" component={AllProduct}></Route> */}
                    <Route path="/products" component={AllProducts}></Route>
                    <Route path="/allproducts" component={AllProducts}></Route>
                    {/* <Route path="/products" component={ProductTable}></Route> */}
                    <Route path="/edit" component={EditProduct} />
                    <Route path="/edit/:id" component={EditProduct} />
                    <Route path="/add/:id" component={AddProduct} />
                    <Route path="/add" component={AddProduct} />
                    {/* <Route path="/dashboard" component={Dashboard} /> */}
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Content;