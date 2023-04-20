import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from "./app.js";

const root = createRoot(document.getElementById('app'))

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

/* 
Using React-router-dom ^v6.10
- replaces BrowserRouter with createBrowserRouter

*/