import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Collapse from '@material-ui/core/Collapse';
import Shenase from './Shenase';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Icon from "@material-ui/core/Icon";

function QuestionCard (props){
  const [openDialogQuestion, setOpenDialogQuestion] = React.useState(false);
  const [openDialogAnswer, setOpenDialogAnswer] = React.useState(false);
  const [openCollapse , setopenCollapse ] = React.useState(false);
  const handleCollapse = () => {
    setopenCollapse(!openCollapse);
  };
  const handleClickOpenQuestion = () => {
    setOpenDialogQuestion(true);
  };

  const handleCloseQuestion = () => {
    setOpenDialogQuestion(false);
  };
  const handleClickOpenAnswer = () => {
    setOpenDialogAnswer(true);
  };
  const handleCloseAnswer = () => {
    setOpenDialogAnswer(false);
  };
  var data;
  var Example;
  return (
    <div style={{position: 'relative',right: '-10%',width: '112%',backgroundColor:'white'}}>
      <div style={{}}>
      <Typography style={{backgroundColor: 'white',color: 'black',fontFamily: 'Vazir',direction: 'rtl',textAlign: 'right',}} >
        <div style={{color : 'gray'}}>
          <Shenase q={props.q} category={props.category}/>
        </div>
          <div style={{textAlign: 'justify',margin: '0 5px 0 5px'}}>{props.q.question}</div>
            <Card style={{position: 'relative',right: '37%',width:'25%',}}>
              <CardMedia title="بزرگ نمایی تصویر">
                {props.q.imageQuestion !== null ? ( 
                data = props.q.imageQuestion.toString(),
                Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpenQuestion} width="100%" height="100%" style={{cursor: 'pointer'}}/>,
                <Example data={data} />
              ): null}
                <Dialog
                  open={openDialogQuestion}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseQuestion}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    {props.q.imageQuestion !== null ? ( 
                      <Example data={data}/>
                      ): null}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div onClick={handleCloseQuestion} style={{fontFamily: 'Vazir',color: 'red',position: 'absolute',right:'1%',top: '2%',cursor:'pointer'}}><FontAwesomeIcon icon={faWindowClose} size="2x"/></div>
                  </DialogActions>
                </Dialog>
              </CardMedia>
            </Card>
            <div style={{position : 'relative',right: '2%',marginTop: '1%'}}>
              {props.q.type === "TEST" ? (
               <div>
                <div>۱){props.q.options[0].option}</div>
                <div>۲){props.q.options[1].option}</div>
                <div>۳){props.q.options[2].option}</div>
                <div>۴){props.q.options[3].option}</div>
               </div>) : props.q.type === "MULTICHOISE" ? (
                 props.q.options.map((options) =>{
                    return(<div><li>{options.option}</li></div>)
                  }
               )) : null}
            </div>
            {openCollapse ? <Icon title="بستن جواب" style={{color: '#1CA0A0',position: 'relative',right: '48.5%',cursor: 'pointer',}}   button  onClick={()=>{
                  handleCollapse();
            }}>vpn_key</Icon>: <Icon title="دیدن جواب" style={{color: '#1CA0A0',position: 'relative',right: '48.5%',cursor: 'pointer'}} button onClick={()=>{
                  handleCollapse();
            }}>vpn_key</Icon>}</Typography>
        </div>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit >
          <Typography style={{fontFamily: 'Vazir',textAlign: 'right',color:'black'}}>
            <hr/>
            {props.q.answers.map((answers) => {
            return (<div>{answers.answer}</div>)})}
            <Card style={{position: 'relative',right: '35%',width:'27%'}}>
              <CardMedia title="بزرگ نمایی تصویر">
                {props.q.imageAnswer !== null ? ( 
                  data = props.q.imageAnswer.toString(),
                  Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpenAnswer} width="100%" height="100%" style={{cursor: 'pointer'}}/>,
                  <Example data={data}/>
                  ): null}
                <Dialog
                  open={openDialogAnswer}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseAnswer}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  {props.q.imageAnswer !== null ? ( 
                    <Example data={data}/>
                    ): null}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div onClick={handleCloseAnswer} style={{fontFamily: 'Vazir',color: 'red',position: 'absolute',right:'1%',top: '2%',cursor:'pointer'}}><FontAwesomeIcon icon={faWindowClose} size="2x"/></div>
                  </DialogActions>
                </Dialog>
              </CardMedia>
            </Card>
          </Typography>
      </Collapse>
 </div>)
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default QuestionCard;