import React, {Component} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Material_RTL";
import M_RTL from "../M_RTL";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Icon from "@material-ui/core/Icon";
import LoadingButton from '@material-ui/lab/LoadingButton';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion,faAtom,faInfinity,faFlask,faDna,faThermometerFull,faThermometerHalf,faThermometerEmpty,faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@material-ui/core/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
class QuestionBank extends Component{
    constructor() {
        super();
        this.state = {
            base: [],
            course: [],
            hardness : [], 
            type : [],
            chapter: [],
        }
    }

    render(){
        const classes = this.props.classes;
        const [pending, setPending] = this.props.pending;
        const [pendi, setPendi] = this.props.pendi;
        const [list, setList] = this.props.list;
        const [base, setBase] = this.props.base;
        const [course, setCourse] = this.props.course;
        const [type, setType] = this.props.type;
        const [hardness, setHardness] = this.props.hardness;
        const [chapter, setChapter] = this.props.chapter;
        const [totalpage, setTotalpage] = this.props.tp;
        var tp = [];
        var res;
        const handleChangeBase = e => {
          setPending(false);
            setPendi(false);
          this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
          setTotalpage([])
          setBase(e.target.value);
          console.log(e.target.value[e.target.value.length - 1])
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(base.length < bases.length){
              setBase(bases);
            }
            else{
              setBase([]);
            }
          }
        }
        const handleChangeCourse = e => {
          setPending(false);
            setPendi(false);
            this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
            setTotalpage([]);
            this.setState({ [e.target.name]: []});
          setCourse(e.target.value);
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(course.length < courses.length){
              setCourse(courses);
            }
            else{
              setCourse([]);
            }
          }
        }
        const handleChangeHardness = e => {
          setPending(false);
            setPendi(false);
            
            setTotalpage([]);
            this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
          this.setState({ [e.target.name]: []});
          setHardness(e.target.value);
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(hardness.length < hardnesses.length){
              setHardness(hardnesses);
            }
            else{
              setHardness([]);
            }
          }
        }
        const handleChangeChapter = e => {
          setPending(false);
            setPendi(false);
            setTotalpage([]);
            this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
          this.setState({ [e.target.name]: []});
          setChapter(e.target.value);
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(chapter.length < chapters.length){
              setChapter(chapters);
            }
            else{
                setChapter([]);
            }
          }
        }
        const handleChangeType = e => {
          
          setPending(false);
            setPendi(false);
            this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
          this.setState({ [e.target.name]: []});
          setTotalpage([]);
          setType(e.target.value);
          console.log(e.target.value[e.target.value.length - 1])
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(type.length < types.length){
              setType(types);
            }
            else{
              setType([]);
            }
          }
        }
        const handleClick = e => {
          this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
            setPending(true);
            setPendi(true);
            var listbase,listcourse,listhardness,listtype,listchapter = [];
            base.map((base)=> {
              console.log(base);
              if(base==="دهم"){
                listbase = this.state.base;
                listbase.push("10")
                this.setState({ base : listbase});
                console.log(this.state);
              }
              if(base==="یازدهم"){
                listbase = this.state.base;
                listbase.push("11")
                this.setState({ base : listbase});
                
                console.log(this.state);
              }
              if(base==="دوازدهم"){
                listbase = this.state.base;
                listbase.push("12")
                this.setState({ base : listbase});
                
                console.log(this.state);
              }
            })
            course.map((course)=> {
              if(course==="ریاضی"){
                listcourse = this.state.course;
                listcourse.push("MATH")
                this.setState({ course : listcourse});
              }
              if(course==="شیمی"){
                listcourse = this.state.course;
                listcourse.push("CHEMISTRY")
                this.setState({ course : listcourse});
              }
              if(course==="فیزیک"){
                listcourse = this.state.course;
                listcourse.push("PHYSIC")
                this.setState({ course : listcourse});
              }
              if(course==="زیست"){
                listcourse = this.state.course;
                listcourse.push("BIOLOGY")
                this.setState({ course : listcourse});
              }
            })
            type.map((type)=> {
              if(type==="تستی"){
                listtype = this.state.type;
                listtype.push("TEST")
                this.setState({ type : listtype});
              }
              if(type==="تشریحی"){
                listtype = this.state.type;
                listtype.push("LONGANSWER")
                this.setState({ type : listtype});
              }
              if(type==="چندگزینه ای"){
                listtype = this.state.type;
                listtype.push("MULTICHOISE")
                this.setState({ type : listtype});
              }
              if(type==="جای خالی"){
                listtype = this.state.type;
                listtype.push("SHORTANSWER")
                this.setState({ type : listtype});
              }
            })
            hardness.map((hardness)=> {
              if(hardness==="ساده"){
                listhardness = this.state.hardness;
                listhardness.push("LOW")
                this.setState({ hardness : listhardness});
              }
              if(hardness==="متوسط"){
                listhardness = this.state.hardness;
                listhardness.push("MEDIUM")
                this.setState({ hardness : listhardness});
              }
              if(hardness==="سخت"){
                listhardness = this.state.hardness;
                listhardness.push("HARD")
                this.setState({ hardness : listhardness});
              }
            })
            chapter.map((chapter)=> {
              if(chapter==="اول"){
                listchapter = this.state.chapter;
                listchapter.push("1")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="دوم"){
                listchapter = this.state.chapter;
                listchapter.push("2")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="سوم"){
                listchapter = this.state.chapter;
                listchapter.push("3")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="چهارم"){
                listchapter = this.state.chapter;
                listchapter.push("4")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="پنجم"){
                listchapter = this.state.chapter;
                listchapter.push("5")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="ششم"){
                listchapter = this.state.chapter;
                listchapter.push("6")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="هفتم"){
                listchapter = this.state.chapter;
                listchapter.push("7")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="هشتم"){
                listchapter = this.state.chapter;
                listchapter.push("8")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="نهم"){
                listchapter = this.state.chapter;
                listchapter.push("9")
                this.setState({ chapter : listchapter});
              }
              if(chapter==="دهم"){
                listchapter = this.state.chapter;
                listchapter.push("10")
                this.setState({ chapter : listchapter});
              }
            })
            console.log(this.state)
            e.preventDefault();
            const token = localStorage.getItem('token');
            res = [];
            
            setList([]);
            const headers={
              'Authorization': token
            }
            
            axios.post("https://parham-backend.herokuapp.com/bank?page=1&limit=20",
            this.state,{headers: headers})
                .then(result => {
                  res.push(...result.data.questions);
                    console.log(result);
                    
                    console.log(res);
                    var ll = res.map((q) => q);
                    setList([...ll]);
                    console.log(list);
                    console.log(this.state);
                    setPendi(false);
                    for(var i=1;i < result.data.totalPages + 1;i++){
                      console.log(i)
                      tp.push(i)
                      console.log(tp)
                    }
                    setTotalpage([...tp])
                    console.log(totalpage)

                }).catch(error => {
                    console.log(error.messege);
                    this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
                    alert("سوالی با این مشخصات فعلا در بانک سوال موجود نمی باشد");
                    setPending(false); 
                    setPendi(false);
                    console.log("bad");
                })
        }
        const handlePage = (event,value) => {
          setPending(true);
          setPendi(true);
          
          const token = localStorage.getItem('token');
            res = [];
            var num = value.toString();
            setList([]);
            const headers={
              'Authorization': token
            }
          axios.post("https://parham-backend.herokuapp.com/bank?page="+num+"&limit=20",
            this.state,{headers: headers})
                .then(result => {
                  res.push(...result.data.questions);
                    console.log(result);
                    console.log(res)
                    var ll = res.map((q) => q);
                    setList([...ll]);
                    console.log(list);
                    console.log(this.state);
                    setPendi(false);
                    

                }).catch(error => {
                    console.log(error.messege);
                    this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
                    alert("سوالی با این مشخصات فعلا در بانک سوال موجود نمی باشد");
                    setPending(false); 
                    setPendi(false); 
                    console.log("bad");
                })
        }
        return(
            <div>
                <Material_RTL>
                <M_RTL>
                
                  <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',backgroundColor : '#1CA0A0',position: 'absolute',width: '19%',height: '40px',margin: '-1% 68px 0 0'}}>
                    <CssBaseline/>
                    <h6 style={{fontFamily: 'Vazir',margin: '10px',padding: '1%'}}>بانک سوال</h6>
                  </Container>
                  <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',backgroundColor : '#1CA0A0',position: 'absolute',width: '65.0025%',height: '40px',margin: '-1% 26.5% 0 0'}}>
                    <CssBaseline/>
                    <h6 style={{fontFamily: 'Vazir',margin: '5px',padding: '1%'}}>سوالات</h6>
                  </Container>
                  <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',backgroundColor : '#f2f2f2',position: 'absolute',width: '19%', height: '80.5%', padding: '2% 2% 0% 2%',margin: '40px 68px 0 0'}}>
                    <CssBaseline/>
                <div style={{position: 'relative',}}>
                <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label1"><span style={{fontFamily: 'Vazir',color:'blue'}}>پایه</span></InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label1"
                    id="demo-mutiple-checkbox1"
                    multiple
                    value={base}
                    onChange={handleChangeBase}
                    name="base"
                    input={<Input/> }
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{fontFamily: 'Vazir',}}
                  >
                    <MenuItem value={"all"}>
                      <Checkbox  checked={base.length === bases.length ? ("انتخاب همه") : null}  style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {bases.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={base.indexOf(name) > -1} style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={name}/>
                        </MenuItem>
                      ))}
                      
                    
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label2"><span style={{fontFamily: 'Vazir',color:'blue'}}>درس</span></InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label2"
                    id="demo-mutiple-checkbox2"
                    multiple
                    value={course}
                    onChange={handleChangeCourse}
                    name="course"
                    input={<Input/> }
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{fontFamily: 'Vazir',}}
                  >
                    <MenuItem value={"all"}>
                      <Checkbox  checked={course.length === courses.length ? ("انتخاب همه") : null}  style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {courses.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={course.indexOf(name) > -1} style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                      
                    
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label3"><span style={{fontFamily: 'Vazir',color:'blue'}}>نوع سوال</span></InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label3"
                    id="demo-mutiple-checkbox3"
                    multiple
                    value={type}
                    onChange={handleChangeType}
                    name="type"
                    input={<Input/> }
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{fontFamily: 'Vazir',}}
                  >
                    <MenuItem value={"all"}>
                      <Checkbox  checked={type.length === types.length ? ("انتخاب همه") : null}  style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {types.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={type.indexOf(name) > -1} style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                      
                    
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label4"><span style={{fontFamily: 'Vazir',color:'blue'}}>سطح سوال</span></InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label4"
                    id="demo-mutiple-checkbox4"
                    multiple
                    value={hardness}
                    onChange={handleChangeHardness}
                    name="hardness"
                    input={<Input/> }
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{fontFamily: 'Vazir',}}
                  >
                    <MenuItem value={"all"}>
                      <Checkbox  checked={hardness.length === hardnesses.length ? ("انتخاب همه") : null}  style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {hardnesses.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={hardness.indexOf(name) > -1} style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                      
                    
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label5"><span style={{fontFamily: 'Vazir',color:'blue'}}>فصل</span></InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label5"
                    id="demo-mutiple-checkbox5"
                    multiple
                    variant="outlined"
                    value={chapter}
                    onChange={handleChangeChapter}
                    name="chapter"
                    input={<Input/> }
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{fontFamily: 'Vazir',}}
                  >
                    <MenuItem value={"all"}>
                      <Checkbox  checked={chapter.length === chapters.length ? ("انتخاب همه") : null}  style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {chapters.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={chapter.indexOf(name) > -1} style={{color: '#0e918c',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={name}/>
                        </MenuItem>
                      ))}
                      
                    
                      </Select>
                    </FormControl>
                  </div>
                <br/>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid classes={classes.root} >
                        <LoadingButton onClick={handleClick} endIcon={<Icon>search</Icon>} pendingPosition="center" className={classes.topButton} pending={pendi} variant="contained"  style={{fontFamily: 'Vazir',backgroundColor: '#EE6C4D',}}>
                        جست و جو
                        </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>  
                </ValidatorForm >
                <div style={{position: 'relative',color: 'black'}}>
                        {pending ? (
                              <ThemeProvider theme={this.props.state} className={classes.root}>
      <Pagination onChange={handlePage} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalpage.length} shape="rounded" />
    </ThemeProvider>
                            )
                           : null}</div> 
                </div>
                </Container>
                <br/>
                
                {pending ? 
                  
                   pendi ? <div style={{margin: '5% 27.5% 0 0'}}><CircularProgress style={{color: '#1CA0A0'}}/></div>  :
                   <div>
                <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir', backgroundColor : "rgb(242 242 242)", position: 'fixed',width:'65%',display: 'block',height: '82%',overflow: 'hidden',margin: '25px 26.5% 19px 0px'}}>
                <CssBaseline/>
                    <div id="ress" style={{width:'100%',height:'100%',overflow: 'scroll',position: 'absolute'}}>
                      <ol style={{listStyle: 'none'}}>
                          {pending ? list.map((question)=>{
                              return(
                              <li key={question}><QC q={question} /><br/></li>
                            )
                          }) : null}
                      </ol>
                    </div> 
                </Container></div> : null}
                </M_RTL>
                </Material_RTL>
            </div>
        );
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function QC (props){
  const classes = useStyles();
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUserDrawerMethod , setopenUserDrawerMethod ] = React.useState(false);
    const handleUserDrawerMenuClick = () => {
      setopenUserDrawerMethod(!openUserDrawerMethod);
    };
    const [openCollapse, setOpenCollapse] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);

  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  var data;
  var Example;
  return (
  <div className={classes.root} style={{backgroundColor: 'white',position: 'relative',border: 'solid',margin: '6% 0% 0% 6%',right: '-2%'}}>
      <div style={{}}>
      <Typography style={{backgroundColor: 'white',color: 'black',fontFamily: 'Vazir',marginTop: '2%',direction: 'rtl',textAlign: 'right',position: 'relative'}} className={classes.heading}>
             
             <div style={{color : 'gray'}}>
             <FontAwesomeIcon icon={faQuestion} size="1x" style={{color: '#ee6c4d'}}/>
             <span>{props.q.type === "TEST" ? (<span>&nbsp;تست&nbsp;</span>) :
              props.q.type === "MULTICHOISE" ? (<span>&nbsp;چندگزینه ای&nbsp;</span>) :
              props.q.type === "SHORTANSWER" ? (<span>&nbsp;پاسخ کوتاه&nbsp;</span>) :
              props.q.type === "LONGANSWER" ? (<span>&nbsp;تشریحی&nbsp;</span>) : null
             }</span>
             <span>{props.q.course === "MATH" ? (<span>&nbsp;ریاضی&nbsp;<FontAwesomeIcon icon={faInfinity} style={{color: 'blue'}}/>&nbsp;</span>) : 
              props.q.course === "PHYSIC" ? (<span>&nbsp;فیزیک&nbsp;<FontAwesomeIcon icon={faAtom} style={{color: 'blue'}}/>&nbsp;</span>) : 
              props.q.course === "CHEMISTRY" ? (<span>&nbsp;شیمی&nbsp;<FontAwesomeIcon icon={faFlask} style={{color: 'blue'}}/>&nbsp;</span>) : 
              props.q.course === "BIOLOGY" ? (<span>&nbsp;زیست&nbsp;<FontAwesomeIcon icon={faDna} style={{color: 'blue'}}/>&nbsp;</span>) : null
             }</span>
             <span>{props.q.hardness === "LOW" ? (<span>&nbsp;ساده&nbsp;<FontAwesomeIcon icon={faThermometerEmpty} style={{color: 'green'}}/>&nbsp;</span>) : 
                    props.q.hardness === "MEDIUM" ? (<span>&nbsp;متوسط&nbsp;<FontAwesomeIcon icon={faThermometerHalf} style={{color: 'orange'}}/>&nbsp;</span>) : 
                    props.q.hardness === "HARD" ? (<span>&nbsp;سخت&nbsp;<FontAwesomeIcon icon={faThermometerFull} style={{color: 'red'}}/>&nbsp;</span>) : null
             }</span>
             <span>{props.q.base === "10" ? (<span>&nbsp;دهم&nbsp;</span>) : 
                      props.q.base === "11" ? (<span>&nbsp;یازدهم&nbsp;</span>) : 
                      props.q.base === "12" ? (<span>&nbsp;دوازدهم&nbsp;</span>) : null
             }</span>
             <span>&nbsp;فصل&nbsp;{props.q.chapter === "1" ? (<span>&nbsp;۱&nbsp;</span>) : 
                      props.q.chapter === "2" ? (<span>&nbsp;۲&nbsp;</span>) : 
                      props.q.chapter === "3" ? (<span>&nbsp;۳&nbsp;</span>) : 
                      props.q.chapter === "4" ? (<span>&nbsp;۴&nbsp;</span>) : 
                      props.q.chapter === "5" ? (<span>&nbsp;۵&nbsp;</span>) : 
                      props.q.chapter === "6" ? (<span>&nbsp;۶&nbsp;</span>) : 
                      props.q.chapter === "7" ? (<span>&nbsp;۷&nbsp;</span>) : 
                      props.q.chapter === "8" ? (<span>&nbsp;۸&nbsp;</span>) : 
                      props.q.chapter === "9" ? (<span>&nbsp;۹&nbsp;</span>) : 
                      props.q.chapter === "10" ? (<span>&nbsp;۱۰&nbsp;</span>) : null

             }</span>
             
              </div>
              
             <div style={{position: 'relative',marginTop: '1%',right: '3%',width: '95%'}}>{props.q.question}</div>
              {/* <br/><br/> */}
              <Card className={classes.root} style={{position: 'relative',right: '37%',width:'25%',}}>
              <CardMedia className={classes.media} >
      
                {props.q.imageQuestion !== null ? ( 

                console.log("EEE"),
                data = props.q.imageQuestion.toString(),
                Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpen} width="100%" height="100%" style={{cursor: 'pointer'}}/>,
                <Example data={data} />
              ): null}
              <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {}
        </DialogTitle>

        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        {props.q.imageQuestion !== null ? ( 

              console.log("EEE"),
              data = props.q.imageQuestion.toString(),
              Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpen} width="100%" height="100%"/>,
              <Example data={data}/>
              ): null}
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose} style={{fontFamily: 'Vazir',color: 'red',position: 'absolute',right:'1%',top: '2%',cursor:'pointer'}}><FontAwesomeIcon icon={faWindowClose} size="2x"/></div>
        </DialogActions>
      </Dialog>
              </CardMedia>
              </Card>
              <div style={{position : 'relative',right: '4%',marginTop: '2%'}}>
             {props.q.type === "TEST" ? (
               <div>
                <div>۱){props.q.options[0].option}</div>
                <div>۲){props.q.options[1].option}</div>
                <div>۳){props.q.options[2].option}</div>
                <div>۴){props.q.options[3].option}</div>
               </div>) : props.q.type === "MULTICHOISE" ? (
                 props.q.options.map((options) =>{
                    return(<div>{options.option}</div>)
                  }
               )) : null}</div>
             
      {openUserDrawerMethod ? <Icon style={{color: '#0e918c',position: 'relative',right: '48.5%',marginTop: '4%',cursor: 'pointer',}} button onClick={()=>{
              if(openCollapse == false)
                handleUserDrawerMenuClick();
        }}>vpn_key</Icon> : <Icon style={{color: '#0e918c',position: 'relative',right: '48.5%',marginTop: '4%',cursor: 'pointer'}} button onClick={()=>{
          if(openCollapse == false)
            handleUserDrawerMenuClick();
    }}>vpn_key</Icon>}</Typography>
      </div>
      <Collapse in={openUserDrawerMethod} timeout="auto" unmountOnExit>
        <div style={{border: 'solid'}}>
        <Typography style={{fontFamily: 'Vazir',textAlign: 'right',width: '95%',margin: '0% 3% 0% 0%',color:'black'}}>
             <hr/>
             {props.q.answers.map((answers) => {
             return (<div>{answers.answer}</div>)})}
             <Card className={classes.root} style={{position: 'relative',right: '35%',width:'27%'}}>
              <CardMedia className={classes.media}>
             {props.q.imageAnswer !== null ? ( 
                console.log("EEE"),
                data = props.q.imageAnswer.toString(),
                Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpen} width="100%" height="100%" style={{cursor: 'pointer'}}/>,
                <Example data={data}/>
                ): null}
                <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {}
        </DialogTitle>

        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        {props.q.imageAnswer !== null ? ( 

              console.log("EEE"),
              data = props.q.imageAnswer.toString(),
              Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} onClick={handleClickOpen} width="100%" height="100%" />,
              <Example data={data}/>
              ): null}
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose} style={{fontFamily: 'Vazir',color: 'red',position: 'absolute',right:'1%',top: '2%',cursor:'pointer'}}><FontAwesomeIcon icon={faWindowClose} size="2x"/></div>
        </DialogActions>
      </Dialog>
                </CardMedia>
                </Card>
           </Typography>
        </div>
      </Collapse>
 </div>)
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      fontFamily: 'Vazir',
    },
  },
};


const bases = [
  'دهم',
  'یازدهم',
  'دوازدهم'
];
const courses = [
  'ریاضی',
  'شیمی',
  'فیزیک',
  'زیست',
];
const hardnesses=[
  'ساده',
  'متوسط',
  'سخت'
];
const types = [
  'تستی',
  'تشریحی',
  'چندگزینه ای',
  'جای خالی',
];
const chapters=[
  'اول',
  'دوم',
  'سوم',
  'چهارم',
  'پنجم',
  'ششم',
  'هفتم',
  'هشتم',
  'نهم',
  'دهم'
];

function getStyles(base, baseName, theme) {
  return {
    fontWeight:
      baseName.indexOf(base) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const useStyles = makeStyles((theme) => ({

  '@global':{
    '.MuiListItemText-primary' : {
    display: 'block',
    fontFamily: 'Vazir',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  },
    paper: {
      marginTop: theme.spacing(1),
      display: 'inlineBlock',
      flexDirection: 'column',
      alignItems: 'center',      
      color : '#3D5A80' , 
      backgroundColor: 'white',
      color : 'white' ,
      borderRadius: '5px',       
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: '70%',
        maxWidth: '70%',
        
      },
      
}));
const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  faIR,
);
  
export default () => {
    const classes = useStyles();
    const theme = useTheme();
    const pending = React.useState(false);
    const pendi = React.useState(false);
    const list = React.useState([]);
    const base = React.useState([]);
    const course = React.useState([]);
    const hardness = React.useState([]);
    const type = React.useState([]);
    const chapter = React.useState([]);
    const tp = React.useState([]);
    return (        
        <QuestionBank classes={classes}  theme={theme} base={base} course={course} type={type} hardness={hardness} chapter={chapter} pending={pending} pendi={pendi} list={list} tp={tp}/>    
        
        )
}