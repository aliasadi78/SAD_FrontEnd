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
import DeleteIcon from '@material-ui/icons/Delete' ;
import Icon from '@material-ui/core/Icon' ;


import EditProfileValidationForms_Personal from './Editform_Personal'
import EditProfileValidationForms_Account from './EditForm_Account'
import { deleteUser , updateUser , updateUserAvatar , logOut} from './../Request methods/requests' ;

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
            // main : '#3D5A80' ,
            // main : '#008280' ,
            // main : '#4ea8de' ,
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
    flexGrow: 1,
    margin : theme.spacing(5) ,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',    
    boxShadow: '0 3px 5px 2px rgba(250, 250, 250, .3)',
  },
  Button :{
    // margin : theme.spacing.unit ,
    position : 'fixed' ,    
    paddingBottom: theme.spacing.unit * 2,
    bottom : 0 ,
  },
  tabs: {    
    // background: 'linear-gradient(180deg, rgba(9,237,206,0.9559174011401436) 0%, rgba(80,151,224,0.9391106784510679) 100%)' ,    
    borderRight: `1px solid ${theme.palette.divider}`,
    // backgroundColor : '#BFD7EA' ,
    fontWeight : 'bold' ,
    backgroundColor : '#98C1D9' ,
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
    <div className={classes.root} >
      {/* <View 
        style = { { borderRadius : 25  } }
        > */}
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
                <Tab label="اطلاعات" {...a11yProps(0)} />
                <Tab label="رمز عبور" {...a11yProps(1)} />                      
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}                  
                >
                  Delete
                </Button>
            </Tabs>
            <TabPanel value={value} index={0} className = "classes.tabPanel" >
                <EditProfileValidationForms_Personal />
            </TabPanel>
            <TabPanel value={value} index={1} className = "classes.tabPanel">
                <EditProfileValidationForms_Account />
            </TabPanel>            
        </ThemeProvider>
        
    </div>
  );
}