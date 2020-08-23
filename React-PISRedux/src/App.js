import React from 'react';
import './App.css';
import Header from './components/reactredux/containers/header';
import Footer from './components/reactredux/footer/footer';
import Content from './components/reactredux/content/content';
function App() {
  return (
    <div>
      <Header></Header>
      <div className="container-fluid mb-5">
        <Content></Content>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
