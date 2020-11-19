export default function(){
    const token = localStorage.getItem('token');
    return {
        mode: "cors",
        headers: {            
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
}