import React from 'react';
import axios from 'axios' ;
import serverURL  from '../../../utils/serverURL';
import  tokenConfig  from '../../../utils/tokenConfig' ;

export default function Report(props){
    
    const classId = props.match.params.classId ;
    const [karname , setKarname] = React.useState(null);
    console.log(classId);
    axios.get(serverURL() + "class/" + classId + "/report" , tokenConfig())
    .then(res => {
        console.log(res);
        setKarname(res.data)
    })
    .catch(err => {

    });

    return (
        <div
        dangerouslySetInnerHTML={{
            __html: karname
        }}
        >            
        </div>    
    )
}