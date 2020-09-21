import React, { Component, useState } from 'react';
import './App.css';
import Header from './components/reactredux/containers/header';
import Footer from './components/reactredux/footer/footer';
import Content from './components/reactredux/content/content';
function App() {
  return (
    <div>
      {idleLogout()}
      {console.log(idleLogout().props.children)}
      <Header></Header>
      <div className="container-fluid mb-5">
        <Content></Content>
      </div>
      <Footer></Footer>
    </div>
  );
}
export function idleLogout() {
  var t;
  var alertStatus = false;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;  // catches touchscreen presses as well      
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
  window.onclick = resetTimer;      // catches touchpad clicks as well
  window.onkeydown = resetTimer;
  window.addEventListener('scroll', resetTimer, true); // improved; see comments
  const idleAlert = () => {
    alertStatus = true;
    console.log(alertStatus);
    alert("Idle for more than a minute");
    console.log(alertStatus);
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(idleAlert, 100000);  // time is in milliseconds
    console.log(alertStatus);
  }
  return (alertStatus,
    <div>
      {alertStatus &&
        ''}
    </div>);

}
export default App;
