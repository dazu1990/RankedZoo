

import React, {{ useState }} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import  from 'react'
import {useOTL}  from './hooks/useOTL';
import './App.css'
import { AnimalGrid } from './components/animal_grid';
import Home from './pages/Home';
import About from './pages/About';
import Rank from './pages/Rank';
import Grid from './pages/Grid';
import Navbar from './components/Navbar';

const App = () => {

  const animals = useOTL()
  console.log('animals _ data', animals)
  return (
    <div className="App">

      <Router>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/rank" component={Rank} />
          <Route path="/grid" component={Grid} />
      </Router>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">

      </nav>
      
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {!animals && (
        <div>Loading...</div>
      )}

      {animals && (
        <AnimalGrid animals={animals} />
      )}
    </div>

  )
}

export default App
