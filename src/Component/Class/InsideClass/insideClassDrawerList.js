import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => redirectTo('editProfile')}>
            <ListItemIcon>        
              <AccountBoxIcon style={{ color: "#3D5A80" ,  textAlign : 'right' }} />
            </ListItemIcon>
            <ListItemText style={{ textAlign : 'right'}}>
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' , textAlign : 'right' }}> 
                حساب کاربری
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button  onClick={() => redirectTo('questionBank')}>
            <ListItemIcon>
            <LibraryBooksIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText style={{ textAlign : 'right'}}>
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' , textAlign : 'right' }}> 
                بانک سوال
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button  onClick={() => redirectTo('classesPage')}>
            <ListItemIcon>
            <ClassIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText  style={{ textAlign : 'right'}} >
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}> 
                کلاس ها 
              </Typography>
            </ListItemText>
          </ListItem>         
  </div>
);

export const secondaryListItems = (
  <div>

    <Divider />

    <ListItem button  onClick={() => redirectTo('classesPage')}>
      <ListItemIcon>
      <PeopleAltIcon style={{ color: "#3D5A80" }} />            
        </ListItemIcon>
        <ListItemText  style={{ textAlign : 'right'}} >
          <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}> 
            اعضا
          </Typography>
        </ListItemText>              
        
    </ListItem> 
  </div>  
);



function redirectTo(){

}