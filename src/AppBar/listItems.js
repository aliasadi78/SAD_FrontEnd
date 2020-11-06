import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    listItem : {
      alignItems : 'end' ,
    },
}));

export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>        
        <AccountBoxIcon style={{ color: "#3D5A80" }} />
      </ListItemIcon>
      <ListItemText  primary="حساب کاربری "  />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <LibraryBooksIcon style={{ color: "#3D5A80" }} />
      </ListItemIcon>
      <ListItemText dir="rtl" style={{fontFamily: 'Vazir'}} primary="بانک سوال" />
    </ListItem>   

    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon style={{ color: "#3D5A80" }} />        
      </ListItemIcon>  
      <ListItemText style={{fontFamily: 'Vazir'}} primary="خروج" />
    </ListItem> 
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset style={{fontFamily: 'Vazir'}}> <b> کلاس ها  </b></ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: "#3D5A80" }} />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>    
  </div>
);