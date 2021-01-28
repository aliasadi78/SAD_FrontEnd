export default function(){
    const token = localStorage.getItem('token');
    return {
        mode: 'cors',
        headers: {      
            'Access-Control-Allow-Origin': '*',      
            'Content-Type': 'application/json',
            'Authorization': token,
            mode: 'cors',
        }
    };
}