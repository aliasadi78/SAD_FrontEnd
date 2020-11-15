import React from 'react';
import PropTypes from 'prop-types';
import { 
    makeStyles ,
    ThemeProvider 
    } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import View, { createMuiTheme } from '@material-ui/core/'
import Button from '@material-ui/core/Button' ;

import EditProfileValidationForms_Account from './EditForm_Account'
import axios from 'axios';
import PersonalForms from './Editform_Personal';
import logOut from './../Request methods/LogOut';
import Material_RTL from './Material_RTL';
import RTL from './M_RTL';
import Vazir from '../fonts/Vazir.ttf';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const theme = createMuiTheme({
    palette:{
        primary : {
          main : '#3D5A80' ,            
        } , 
        secondary : {
          main : '#EE6C4D'
        },
    }
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {        
    backgroundColor: theme.palette.background.paper,
    display: 'flex',    
    boxShadow: '0 3px 5px 5px rgba(204, 204, 204, .6)',
    width : '60%' ,   
    // borderRadius : 15 ,   
  },
  button :{    
    margin : theme.spacing.unit * 1.5 ,    
    paddingBottom: theme.spacing.unit * 2,
    bottom : 0 ,
    fixed : 'bottom'
  },
  tabs: {        
    borderRight: `1px solid ${theme.palette.divider}`,    
    fontWeight : 'bold' ,       
  },
  tabPanel :{
    backgroundColor : '#BFD7EA' ,                
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return (
    <div className={classes.root}  >               
          <ThemeProvider theme={theme}>                            
              <Tabs                   
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
                  textColor ="primary"
                  indicatorColor = "primary"
                  >                    
                  <Tab label="اطلاعات" {...a11yProps(0)}  style={{fontFamily: 'Vazir'}}/>
                  <Tab label="رمز عبور" {...a11yProps(1)} style={{fontFamily: 'Vazir'}} />                      س                  
              </Tabs>
              <TabPanel value={value} index={0}  >
                  <PersonalForms />
              </TabPanel>
              <TabPanel value={value} index={1} >
                  <EditProfileValidationForms_Account />
              </TabPanel>            
          </ThemeProvider>        
    </div>
  );
}