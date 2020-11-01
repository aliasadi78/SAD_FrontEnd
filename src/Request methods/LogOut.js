import React from 'react';
import axios from 'axios';

export default function logOut (){    
        
    localStorage.removeItem('token');
    // send log out post request to backend
    // what the hell ??
    // axios.post('https://parham-backend.herokuapp.com/user/logout' , 
    // {Headers:
    //     { 'Authorization': 'Bearer ' + token  } 
    // })
    // lead to log in page
}