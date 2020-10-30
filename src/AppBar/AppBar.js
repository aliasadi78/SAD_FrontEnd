import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import NavbarPage from './NavBar';

const useStyles = makeStyles((theme)=>({
    appbar : {
        width: '100%',
        height : '10%' ,
        bottom : '0' ,
        backgroundColor : '#3D5A80' ,
        bottom : theme.spacing.unit , 
        position : 'sticky' ,                     
        offset: theme.mixins.toolbar,
    },    
    menuButton : {                 
    },
    title :{
        flexGrow : 1 ,
    },
    toolbar : {        
        backgroundColor : '#3D5A80' ,
    },
}));

export default function MenuAppBar(){
    const classes = useStyles();
    const [auth , setAuth] = React.useState(true);
    const [anchorEl , setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    return (                                     
            <div>
            {/* <AppBar position="static" className={classes.appbar}>
            
            <Toolbar className ={classes.appbar}>                    
                <Typography variant="h6" className={classes.title}>        
                </Typography>
                {auth && (
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >            
                        حساب کاربری
                        <AccountCircle />            
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>
            </AppBar>             */}

        <SideNav
        className = {classes.toolbar}
        onSelect={(selected) => {
            // Add your code here
        }}        
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">

                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.5em' }} />
                        {/* </IconButton> */}
                        <span class="material-icons">
                        account_circle
                        </span>
                    </NavIcon>
                    <NavText>
                        حساب کاربری
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.5em' }} />
                        <span class="material-icons">
                        account_balance
                        </span>
                    </NavIcon>
                    <NavText>
                        کلاس ها
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            تمام شده
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            مشغول
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    </div>
    );
}