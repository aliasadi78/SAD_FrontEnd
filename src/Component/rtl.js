import {create} from "jss";
import React from "react";
import rtl from 'jss-rtl';
import {StylesProvider , jssPreset} from '@material-ui/core/styles';
const jss = create({plugins: [...jssPreset().plugins, rtl()]});
function RTL(props){
    return(
        // eslint-disable-next-line react/react-in-jsx-scope
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    )
}
export default RTL;