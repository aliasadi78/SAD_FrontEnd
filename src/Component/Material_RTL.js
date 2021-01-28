import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

class Material_RTL extends Component {
    render() {

        const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
        const theme = createMuiTheme({
            direction: 'rtl',
            fontFamily: 'Vazir',
        });

        return (

            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <div dir="rtl">
                        {this.props.children}
                    </div>
                </ThemeProvider>
            </StylesProvider>

        );

    }
}

export default Material_RTL;