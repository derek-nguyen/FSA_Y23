// Your code here!
import React from 'react';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';


function Counter() {
    return (
        <div i='container'>
            <div id='navbar'>
                Counter.js
            </div>
            <div id='counter'>
                <h1>0</h1>
                <button>Increment</button>
            </div>
        </div>
    )
    
}
// const Counter = () => {
//     return (
//         <div i='container'>
//             <div id='navbar'>
//                 Counter.js
//             </div>
//             <div id='counter'>
//                 <h1>0</h1>
//                 <button>Increment</button>
//             </div>
//         </div>
//     )
    
// }


ReactDOM.render(<Counter />, document.getElementById('app'));


