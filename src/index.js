import React from 'react';
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'; /*import for google auth*/

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from "./Context/Context";

const CLIENT_ID = "836275110441-psg7v88gkf8p9dj7i0odc9b8ehl4cmb7.apps.googleusercontent.com";

/*linking google oath to this project*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Context>
            <App />
        </Context>
        </GoogleOAuthProvider>
    </React.StrictMode>


);

reportWebVitals();