import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import {Link} from "react-router-dom"; 
import ExpandMore from '@material-ui/icons/ExpandMore';
import BallotIcon from '@material-ui/icons/Ballot';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
// ------------------------
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';
import LogOutDialog from '../User/LogoutDialog';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import {connect} from 'react-redux' ;

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingRight: theme.spacing(5),
      },    
}));

function DrawerList(props){

    const classes = useStyles();

    const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
    const [openUserDrawerMethod , setopenUserDrawerMethod ] = React.useState(false);
    const handleUserDrawerMenuClick = () => {
        setopenUserDrawerMethod(!openUserDrawerMethod);        
    };
    
    if(props.isDrawerOpen == true)        
    {
        console.log("closed");
    }

    return(    
        
        <List>
            
                <ListItem button onClick={()=>{                    
                if( props.isDrawerOpen == true)
                    handleUserDrawerMenuClick();
                }}>
                <ListItemIcon>        
                    <AccountBoxIcon style={{ color: "#3D5A80" , marginLeft : '2px'}} />
                </ListItemIcon>
                <ListItemText>
                <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir', textalign : 'right' }}>            
                    حساب کاربری
                </Typography>
                </ListItemText>
                {props.isDrawerOpen && openUserDrawerMethod ? <ExpandLess/> : <ExpandMore />}
                </ListItem>            

            <Collapse in={props.isDrawerOpen && openUserDrawerMethod} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                <Link to = "/profile/edit">
                    <ListItem button                     
                    className={classes.nested}>
                        <ListItemIcon>        
                            <EditIcon style={{ color: "#3D5A80" }} />
                        </ListItemIcon>
                        <ListItemText>
                        <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                            ویرایش اطلاعات 
                        </Typography>
                        </ListItemText>
                </ListItem>
                </Link>

                <Link to="/user/questions" >
                    <ListItem button                     
                    className={classes.nested}>
                    <ListItemIcon>
                        <BallotIcon style={{ color: "#3D5A80" }} />
                    </ListItemIcon>
                    <ListItemText >
                        <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                        سوالات 
                        </Typography>
                    </ListItemText>
                    </ListItem>
                </Link>

                <Link to="/user/classes" >
                    <ListItem button className={classes.nested} >
                    <ListItemIcon>
                    <ClassIcon style={{ color: "#3D5A80" }} />
                    </ListItemIcon>
                    <ListItemText  style={{fontFamily: 'Vazir'}} >
                        <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>
                        کلاس ها
                        </Typography>            
                    </ListItemText>
                    </ListItem>    
                </Link>

                </List>
            </Collapse>
            
            <Link to="/questionBank" >
                <ListItem button>
                <ListItemIcon>
                <LibraryBooksIcon style={{ color: "#3D5A80" }} />
                </ListItemIcon>
                <ListItemText >
                    <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                    بانک سوال
                    </Typography>
                </ListItemText>
                </ListItem>   
            </Link>            

            <Link to="logoutDialog" >
                <ListItem button onClick={()=>{
                    setOpenLogoutDialog(true);
                }} >
                <ListItemIcon>
                    <ExitToAppIcon style={{ color: "#3D5A80" }} />        
                </ListItemIcon>  
                <ListItemText >
                    <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                    خروج
                    </Typography>
                </ListItemText>
                </ListItem>   
            </Link>

            
            {
              openLogoutDialog == true &&
              <LogOutDialog />
            }

        </List>        
    );
}

const mapStateToProps= (state) => {
    return {
        isDrawerOpen : state.dashboard.isDrawerOpen
    }
}

export default connect(mapStateToProps)(DrawerList)