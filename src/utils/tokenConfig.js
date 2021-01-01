export default function(){
    const token = localStorage.getItem('token');
    return {
        mode: "cors",
        headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'XMLHttpRequest, x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
            'Access-Control-Max-Age': '1000',        
            'Content-Type': 'application/json',
            'Authorization': token,
            mode: "cors",
        }
    };
}