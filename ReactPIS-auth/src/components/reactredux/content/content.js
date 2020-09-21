import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../containers/login';
import Signup from '../containers/signup';
import Dashboard from '../containers/dashboard';
import EditProduct from '../containers/edit-product';
import AddProduct from '../containers/add-product';
// import AllProduct from './products/products';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import AllProducts from '../containers/allproducts';
import { connect } from 'react-redux';
import NotFound from './notfound';
const requireLogin = (to, from, next, isLoggedIn) => {
    if (to.meta.auth) {
        console.log(to.meta.isLoggedIn);
        if (to.meta.isLoggedIn != null) {
            next();
        }
    } else {
        next();
    }
};
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <GuardProvider guards={[requireLogin]}>
                    <Switch>
                        <GuardedRoute exact path="/" component={Login}></GuardedRoute>
                        <GuardedRoute path="/login" component={Login}></GuardedRoute>
                        <GuardedRoute path="/signup" component={Signup}></GuardedRoute>
                        {/* <Route path="/products" component={AllProduct}></Route> */}
                        <GuardedRoute path="/products" component={AllProducts} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} ></GuardedRoute>
                        <GuardedRoute path="/allproducts" component={AllProducts} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} ></GuardedRoute>
                        {/* <Route path="/products" component={ProductTable}></Route> */}
                        <GuardedRoute path="/edit" component={EditProduct} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} />
                        <GuardedRoute path="/edit/:id" component={EditProduct} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} />
                        <GuardedRoute path="/add/:id" component={AddProduct} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} />
                        <GuardedRoute path="/add" component={AddProduct} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} />
                        {/* <Route path="/dashboard" component={Dashboard} /> */}
                        <GuardedRoute path="/dashboard" component={Dashboard} meta={{ auth: true, isLoggedIn: this.props.isLoggedIn }} isLoggedIn={this.props.isLoggedIn} />
                        <GuardedRoute path="*" component={NotFound} />
                    </Switch>
                </GuardProvider>
            </div>
        );
    }
}
function storeToprops(store) {
    console.log(store.userName);
    return {
        isLoggedIn: store.userName
    }
}

export default connect(storeToprops, null)(Content);