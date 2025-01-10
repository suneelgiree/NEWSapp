import './App.css';
import { Navbar } from './components/Navbar';
import React, { Component } from 'react'
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<News pageSize={5} country= "us" category= "general"/>} />
        <Route exact path="/home" element={<News key="home" pageSize={5} country= "us" category= "general"/>} />
        <Route exact path="/bususess" element={<News key="bususess" pageSize={5} country= "us" category= "bususess"/>} />
        <Route exact path="/entertausment" element={<News key="entertausment" pageSize={5} country= "us" category= "entertausment"/>} />
        <Route exact path="/sports" element={<News key="sports" pageSize={5} country= "us" category= "sports"/>} />
        <Route exact path="/technology" element={<News key="technology" pageSize={5} country= "us" category= "technology"/>} />
        <Route exact path="/science" element={<News key="science" pageSize={5} country= "us" category= "science"/>} />
        <Route exact path="/general" element={<News key="general" pageSize={5} country= "us" category= "general"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

