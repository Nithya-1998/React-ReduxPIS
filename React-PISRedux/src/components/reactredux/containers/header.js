import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';
class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.isLoggedIn);
        this.state = {
            isLoggedIn: false,
            isLoggedInUser: null
        }
    }

    componentDidUpdate() {
        console.log("Did Update")
        console.log(this.props.isLoggedIn);
    }

    render() {

        return (
            <div>
                <div className="container-fluid fixed-top bg-dark py-3">
                    <div className="row collapse show no-gutters d-flex h-100 position-relative">
                        <div className="col-3 px-0 w-sidebar navbar-collapse collapse d-none d-md-flex">
                        </div>
                        <div className="col px-3 px-md-0">
                            <a data-toggle="collapse" href="#" data-target=".collapse" role="button" className="text-white p-1">
                                <i className="material-icons">menu</i> &nbsp;
                                BuyKart
                                <i className="material-icons mb-2 text-light" style={{ fontSize: '30px' }}>poll</i>

                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-0">
                    <div className="row collapse show no-gutters d-flex h-100 position-relative">
                        <div className="col-3 p-0 h-100 w-sidebar navbar-collapse collapse d-none d-md-flex sidebar">
                            <div className="navbar-dark bg-dark text-white position-fixed h-100 align-self-start w-sidebar">
                                <h6 className="px-3 pt-3">
                                    <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                        <b className="text-light mr-auto ml-2">
                                            {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                                <span className="icon-button text-dark  btn-light font-weight-bold"><b>{this.props.isLoggedIn[0].toUpperCase()}</b></span>}
                                        </b>
                                    </Link>
                                    <a data-toggle="collapse" className="px-1 d-inline d-md-none text-white" href="#" data-target=".collapse">
                                    </a>
                                </h6>
                                <ul className="nav flex-column flex-nowrap text-truncate">
                                    {(this.state.isLoggedIn || this.props.isLoggedIn === null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-light font-weight-bold">
                                                        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                                                            Login</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(this.state.isLoggedIn || this.props.isLoggedIn === null) &&
                                        <li className="nav-item">
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-light font-weight-bold">
                                                        <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Signup</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(this.props.isLoggedIn !== null && !this.state.isLoggedIn) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" onClick={() => { this.setState({ isLoggedIn: true }) }}
                                                        className="btn btn-light font-weight-bold">
                                                        {/* <Link to="/" style={{ color: 'black', textDecoration: 'none' }}> */}
                                                            Logout
                                                            {/* </Link> */}
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-light font-weight-bold">
                                                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>Inventory</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-light font-weight-bold">
                                                        <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}>Dashboard</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <nav className="navbar navbar-expand-lg navbar-dark">
            //     <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>
            //         <b className="text-light mr-auto ml-2">BuyKart
            //         <i className="material-icons mb-2 text-light" style={{ fontSize: '30px' }}>poll</i>
            //         </b>
            //     </Link>
            //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>
            //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //         <ul className="navbar-nav ml-auto">
            //             {this.props.isLoggedIn === null &&
            //                 <li className="nav-item" >
            //                     <a className="nav-link">
            //                         <div className="btn-group">
            //                             <button type="button" className="btn btn-light font-weight-bold">
            //                                 <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            //                                     Login</Link>
            //                             </button>
            //                         </div>
            //                     </a>
            //                 </li>}
            //             {this.props.isLoggedIn === null &&
            //                 <li className="nav-item">
            //                     <a className="nav-link">
            //                         <div className="btn-group">
            //                             <button type="button" className="btn btn-light font-weight-bold">
            //                                 <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Signup</Link>
            //                             </button>
            //                         </div>
            //                     </a>
            //                 </li>}
            //             {this.props.isLoggedIn !== null &&
            //                 <li className="nav-item" >
            //                     <a className="nav-link">
            //                         <div className="btn-group">
            //                             <button type="button"
            //                                 className="btn btn-light font-weight-bold">
            //                                 <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            //                                     Logout</Link>
            //                             </button>
            //                         </div>
            //                     </a>
            //                 </li>}
            //             {this.props.isLoggedIn !== null &&
            //                 <li className="nav-item" >
            //                     <a className="nav-link">
            //                         <div className="btn-group">
            //                             <button type="button" className="btn btn-light font-weight-bold">
            //                                 <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}>Dashboard</Link>
            //                             </button>
            //                         </div>
            //                     </a>
            //                 </li>}
            //         </ul>
            //     </div>
            // </nav>
        );
    }
}
function storeToprops(store) {
    console.log(store.userName);
    return {
        isLoggedIn: store.userName
    }
}

export default connect(storeToprops)(Header);