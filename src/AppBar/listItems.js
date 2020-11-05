import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
      <ListItemText primary="بانک سوال" />
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