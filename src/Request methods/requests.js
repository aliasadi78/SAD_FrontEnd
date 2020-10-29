import React from 'react' ;
import axios from 'axios' ;

export default function updateUser (props){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NTY4ZDZiMjA0ODAwMTdmYjIwOTgiLCJpYXQiOjE2MDM4ODQ2ODV9.2iONCmNdzoYTnaHgGMcStSX6ceWrcvxzi1_vnkoAUek';
    //localStorage.getItem('token');    

    axios.put('https://parham-backend.herokuapp.com/user/update' 
    , {headers:
        { 'Authentication': 'Bearer ' + token  } 
    }
    , {
        password : props.password ,
        firstname : props.firstname ,
        lastname : props.lastname ,
        email : props.email        
    });
}

export function updateUserAvatar (){
    
}

export function logOut (){    
    localStorage.removeItem('token');
    // send log out post request to backend
    // lead to log in page
}