import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>        
          <ListItem button >
            <ListItemIcon>        
              <AccountBoxIcon style={{ color: "#3D5A80" ,  textAlign : 'right' }} />
            </ListItemIcon>
            <ListItemText style={{ textAlign : 'right'}}>
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' , textAlign : 'right' }}> 
                حساب کاربری
              </Typography>
            </ListItemText>
          </ListItem>
          <Link color="inherit" href="/questionBank" >
            <ListItem button >
              <ListItemIcon>
              <LibraryBooksIcon style={{ color: "#3D5A80" }} />
              </ListItemIcon>
              <ListItemText style={{ textAlign : 'right'}}>
                <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' , textAlign : 'right' }}> 
                  بانک سوال
                </Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link color="inherit" href="/user/classes" >
            <ListItem button  >
              <ListItemIcon>
              <ClassIcon style={{ color: "#3D5A80" }} />
              </ListItemIcon>
              <ListItemText  style={{ textAlign : 'right'}} >
                <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}> 
                  کلاس ها 
                </Typography>
              </ListItemText>
            </ListItem>         
          </Link>
  </div>
);

export const secondaryListItems = (
  <div>        
  </div>  
);