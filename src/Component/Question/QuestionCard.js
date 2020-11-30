import React , {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const classes = this.props.classes;
//     // alert("function qc");
//     const text = props.name;
//     console.log(props.name);
function QuestionCard(props){
    const classes = useStyles();
    console.log(props.q);
    console.log(props);
    return (
      <div className={classes.root}>
             <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>{props.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                      {props.q}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
          </div>
      );
  }
  

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'inlineBlock',
      flexDirection: 'column',
      alignItems: 'center',      
      color : '#3D5A80' , 
      backgroundColor: 'white',
    //   padding: '10px',
      borderRadius: '5px',      
    //   opacity: '95%' ,       
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
}));
export default () => {
    const classes = useStyles();
    // const pending = React.useState(false);
    const name = React.useState("");
    return (        
        <QuestionCard classes={classes}/>    
    )
}