import React from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allproduct: [],
            chartData: [],
            isInstock: false,
            isSalesExpenseYear: false,
            isSalesExpenseWeek: false,
            isGenderType: false,
            isCategoryType: false,
            pietype: true,
            bartype: false,
            default: true
        }
    }
    componentWillMount() {
        this.getAllProducts();
    }
    getAllProducts = () => {
        console.log(this.props.allproduct);
        this.setState({ allproduct: this.props.allproduct });
    }
    renderInStockData = () => {
        let chD = [['Product Name', 'In Stock', 'Out of Stock']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            return (chD.push([prod.title, prod.inStock, prod.outOfstock]))
        })
        return chD;
    }
    renderMenData = () => {
        let chD = [['Product Name', 'Men Stock']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            if (prod.gender === 'M' || prod.gender === 'F/M') {
                return (chD.push([prod.title, prod.inStock]))
            }
        })
        return chD;
    }
    renderCategoryType = () => {
        let chD = [['Product Category', 'Stock']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            return (chD.push([prod.category, prod.inStock]))
        })
        return chD;
    }
    renderWoMenData = () => {
        let chD = [['Product Name', 'Women Stock']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            if (prod.gender === 'F' || prod.gender === 'F/M') {
                return (chD.push([prod.title, prod.inStock]))
            }
        })
        return chD;
    }
    renderKidData = () => {
        let chD = [['Product Name', 'Kid Stock']];
        console.log(chD);
        let s = this.state.allproduct.map((prod) => {
            if (prod.gender === 'K-M' || prod.gender === 'K-F') {
                return (chD.push([prod.title, prod.inStock]))
            }
        })
        return chD;
    }
    renderData = () => {
        console.log(this.renderInStockData());
        if (this.state.isInstock) {
            return (
                <div>
                    {this.state.pietype &&
                        <Chart
                            width={'500px'}
                            height={'500px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.renderInStockData()}
                            options={{
                                title: 'Current Product Stock Availability',
                            }}
                        />}
                    {this.state.bartype &&
                        <Chart
                            width={'500px'}
                            height={'700px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.renderInStockData()}
                            options={{
                                title: 'Current Product Stock Availability',
                            }}
                        />}
                </div>
            )
        }
        if (this.state.isCategoryType) {
            return (
                <div>
                    {this.state.pietype &&
                        <Chart
                            width={'500px'}
                            height={'500px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.renderCategoryType()}
                            options={{
                                title: 'Product Category Vs Stock',
                            }}
                        />}
                    {this.state.bartype &&
                        <Chart
                            width={'500px'}
                            height={'700px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.renderCategoryType()}
                            options={{
                                title: 'Product Category Vs Stock',
                            }}
                        />}
                </div>
            )
        }
        if (this.state.isGenderType) {
            return (
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.renderMenData()}
                        options={{
                            title: 'Men Stock',
                        }}
                    />
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.renderWoMenData()}
                        options={{
                            title: 'Women Stock',
                        }}
                    />
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.renderKidData()}
                        options={{
                            title: 'Kids Stock',
                        }}
                    />
                </div>
            )
        }
        if (this.state.isSalesExpenseYear) {
            return (
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Sales', 'Expenses'],
                        ['2015', 1000, 400],
                        ['2016', 1170, 460],
                        ['2017', 660, 1120],
                        ['2018', 1030, 540],
                        ['2019', 1200, 750],
                        ['2020', 1020, 640]
                    ]}
                    options={{
                        title: 'Company Performance',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: '50%', height: '70%' },
                    }}
                />
            )
        }
        if (this.state.isSalesExpenseWeek) {
            return (
                <Chart
                    width={'700px'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Week', 'Sales', 'Expenses'],
                        ['Mon', 700, 400],
                        ['Tues', 1200, 590],
                        ['Wed', 660, 1120],
                        ['Thurs', 1030, 540],
                        ['Fri', 1000, 690],
                        ['Sat', 780, 540],
                        ['Sun', 1100, 470],
                    ]}
                    options={{
                        title: 'Company Performance',
                        hAxis: { title: 'Week', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: '50%', height: '70%' },
                    }}
                />
            )
        }
    }
    handleInstock = (e) => {
        e.preventDefault();
        this.setState({ isInstock: true, isGenderType: false, isSalesExpenseYear: false, isSalesExpenseWeek: false, isCategoryType: false })
    }
    handleGenderType = (e) => {
        e.preventDefault();
        this.setState({ isInstock: false, isGenderType: true, isSalesExpenseYear: false, isSalesExpenseWeek: false, isCategoryType: false })
    }
    handleSalesExpenseYear = (e) => {
        e.preventDefault();
        this.setState({ isInstock: false, isGenderType: false, isSalesExpenseYear: true, isSalesExpenseWeek: false, isCategoryType: false })
    }
    handleSalesExpenseWeek = (e) => {
        e.preventDefault();
        this.setState({ isInstock: false, isGenderType: false, isSalesExpenseYear: false, isSalesExpenseWeek: true, isCategoryType: false })
    }
    handleCategoryType = (e) => {
        e.preventDefault();
        this.setState({ isInstock: false, isGenderType: false, isSalesExpenseYear: false, isSalesExpenseWeek: false, isCategoryType: true })
    }
    handlePieChart = (e) => {
        e.preventDefault();
        this.setState({ pietype: true, bartype: false })
    }
    handleBarChart = (e) => {
        e.preventDefault();
        this.setState({ pietype: false, bartype: true })
    }
    renderDataStock = () => {

    }
    render() {
        return (
            <div>
                <div><h2>Dashboard</h2></div>
                <ul className="nav nav-tabs nav-fill nav-justified mb-3" role="tablist">
                    <li className="nav-item">
                        <button onClick={this.handlePieChart} className="btn btn-info mr-3 ml-3">
                            Pie
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.handleBarChart} className="btn btn-dark text-light mr-3 ml-3">
                            Bar
                        </button>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <div className="d-flex">
                            <div className="flex-shrink-1">
                                <a className="nav-link bg-light text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                    data-toggle="dropdown">
                                    <i className="material-icons">filter</i>
                                            Category
                                        </a>
                                <div className="dropdown-menu">
                                    <button onClick={this.handleInstock} className="dropdown-item"><b>Product Stock</b></button>
                                    <button onClick={this.handleCategoryType} className="dropdown-item"><b>Sales Vs Product Category/Week</b></button>
                                    <button onClick={this.handleGenderType} className="dropdown-item"><b>Stock Vs Gender Type</b></button>
                                    <button onClick={this.handleSalesExpenseYear} className="dropdown-item"><b>Sales Vs Expenses/Year</b></button>
                                    <button onClick={this.handleSalesExpenseWeek} className="dropdown-item"><b>Sales Vs Expenses/Week</b></button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                {this.renderData()}
            </div>
        );
    }
}
function storeToprops(store) {
    return {
        allproduct: store.allProducts
    }
}

export default connect(storeToprops)(Dashboard);