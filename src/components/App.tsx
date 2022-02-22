import React from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './home/home';
import { Login } from './login/login';
import { NotFound } from './notFound';
import PrivateRoute from './private-route';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
