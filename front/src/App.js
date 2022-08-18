import React, { Suspense, lazy} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from 'pages/auth/LoginPage';
import ManagementPage from 'pages/management/ManagementPage';
import MainPage from 'pages/main/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/main/:page' element={<MainPage />} />
          <Route path='/management/:page' element={<ManagementPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
