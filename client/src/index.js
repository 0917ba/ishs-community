// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {BrowserRouter} from "react-router-dom";
// import Header from "./layout/Header";
// import Footer from "./layout/Footer";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>

//     <div className='body'>
//       <Header/>
//       <App/>
//     </div>

//     <Footer/>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);