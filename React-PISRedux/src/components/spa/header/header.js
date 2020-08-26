import React from 'react';
import NavigationBar from './navbar';

class Header extends React.Component {

    render() {
        return (
            <span>
                <NavigationBar></NavigationBar>
            </span>
        );
    }
}

export default Header;