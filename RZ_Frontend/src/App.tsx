

import React, { useState } from 'react';

// import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// import { createBrowserHistory } from "history";
import { useFetchAnimals, useJwtAuth, useFetchRankings } from './hooks';


import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
// import Rank from './pages/Rank';
// import Grid from './pages/Grid';
import {Navbar} from './components/navbar';


const App = () => {
  const jwtToken = useJwtAuth()
  if(jwtToken) {
    console.log('jwtToken - init', jwtToken)
  };




  const animals = useFetchAnimals();
  const allRankings = useFetchRankings();
  console.log('animals _ data', animals)
  console.log('rankings _ data', allRankings)

  const navItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '/about',
    },
    {
      name: 'Rank',
      link: '/rank',
    },
    {
      name: 'Animals',
      link: '/animals',
    },
  ];
  return (
    <div className="App">
      <Navbar navItems={navItems}/>
      <div className='py-20 w-full flex justify-center border-2 border-black border-solid'>
      <BrowserRouter>
      <Routes>

          <Route path="/" element={
            <HomePage animals={animals}></HomePage>
          } />
          <Route path="/about" element={
            <AboutPage></AboutPage>
          } />
          {/* <Route path="/rank" component={Rank} />
          <Route path="/animals" component={Grid} /> */}

      </Routes>
      </BrowserRouter>
      

      </div>
    </div>

  )
}

export default App
