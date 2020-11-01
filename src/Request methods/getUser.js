import axios from 'axios';

export default function GetUser (){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NTY4ZDZiMjA0ODAwMTdmYjIwOTgiLCJpYXQiOjE2MDM4ODQ2ODV9.2iONCmNdzoYTnaHgGMcStSX6ceWrcvxzi1_vnkoAUek';
    //localStorage.getItem('token');    

    // axios.get(
    //   'https://parham-backend.herokuapp.com/user' , {headers:
    //   { 'Authorization': ' Bearer ' + token  }
    // })
    // .then( res => {  
    //   console.log(res.data.user.email);
    // })
    // .catch()
  
    return axios.get(
        'https://parham-backend.herokuapp.com/user' , {headers:
      { 'Authorization': ' Bearer ' + token  }
    })
  }