import React from 'react' ;

const token = () => {
    const [value , setValue] = React.useState(
        localStorage.getItem('token') || ''
    );
        
    
}