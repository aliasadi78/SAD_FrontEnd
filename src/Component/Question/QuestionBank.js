import React, {Component} from 'react';
import { makeStyles } from "@material-ui/core/styles";
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
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import { ThemeProvider } from '@material-ui/core/styles';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import QuestionCard from './QuestionCard'; 
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
        const [category, setCategory] = this.props.category;
        const [base, setBase] = this.props.base;
        const [course, setCourse] = this.props.course;
        const [type, setType] = this.props.type;
        const [hardness, setHardness] = this.props.hardness;
        const [chapter, setChapter] = this.props.chapter;
        const [totalpage, setTotalpage] = this.props.totalpage;
        const [check,setCheck] = this.props.check;
        var res;
        if(check != true ){
        axios.get(serverURL() + "public/question/category", tokenConfig() )
        .then(res => {
            setCategory(res.data);
            setCheck(true);
        })
        .catch(e => {
            console.log(e);
        });}
        console.log(category.base)
        const handleChangeBase = e => {
          setPending(false);
          setPendi(false);
          this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
          setTotalpage([])
          setBase(e.target.value);
          console.log(e.target.value[e.target.value.length - 1])
          if(e.target.value[e.target.value.length - 1] === 'all'){
            if(base.length < (Object.values(category.base)).length){
              setBase(Object.values(category.base));
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
            if(course.length < (Object.values(category.course)).length){
              setCourse(Object.values(category.course));
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
            if(hardness.length < (Object.values(category.hardness)).length){
              setHardness(Object.values(category.hardness));
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
            if(chapter.length < (Object.values(category.chapter)).length){
              setChapter(Object.values(category.chapter));
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
            if(type.length < (Object.values(category.type)).length){
              setType(Object.values(category.type));
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
            base.map((base) =>{
              for (const [bases, selectBase] of Object.entries(category.base)) {
                if (selectBase === base) {
                  listbase = this.state.base;
                  listbase.push(bases)
                  this.setState({ base : listbase});
                }
              }
            })
            course.map((course) =>{
              for (const [courses, selectCourse] of Object.entries(category.course)) {
                  if (selectCourse === course) {
                    listcourse = this.state.course;
                    listcourse.push(courses)
                    this.setState({ course : listcourse});
                  }
                }
            })
            type.map((type) =>{
              for (const [types, selectType] of Object.entries(category.type)) {
                  if (selectType === type) {
                    listtype = this.state.type;
                    listtype.push(types)
                    this.setState({ type : listtype});
                  }
                }
            })
            hardness.map((hardness) =>{
              for (const [hardnesses, selectHardness] of Object.entries(category.hardness)) {
                  if (selectHardness === hardness) {
                    listhardness = this.state.hardness;
                    listhardness.push(hardnesses)
                    this.setState({ hardness : listhardness});
                  }
                }
            })
            chapter.map((chapter) =>{
              for (const [chapters, selectChapter] of Object.entries(category.chapter)) {
                  if (selectChapter === chapter) {
                    listchapter = this.state.chapter;
                    listchapter.push(chapters)
                    this.setState({ chapter : listchapter});
                  }
                }
            })
            console.log(this.state)
            e.preventDefault();
            res = [];
            setList([]);
            axios.post(serverURL() + "bank?page=1&limit=20",
            this.state,tokenConfig())
                .then(result => {
                  res.push(...result.data.questions);
                    console.log(result);
                    console.log(res);
                    var ll = res.map((q) => q);
                    setList([...ll]);
                    console.log(this.state);
                    setPendi(false);
                    setTotalpage(result.data.totalPages)
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
            res = [];
            var num = value.toString();
            setList([]);
          axios.post(serverURL() + "bank?page="+num+"&limit=20",
              this.state,tokenConfig())
                .then(result => {
                  res.push(...result.data.questions);
                    console.log(result);
                    var ll = res.map((q) => q);
                    setList([...ll]);
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
                      <Checkbox  checked={base.length === Object.values(category.base).length ? ("انتخاب همه") : null}  style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {(Object.values(category.base)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={base.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
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
                      <Checkbox  checked={course.length === Object.values(category.course).length ? ("انتخاب همه") : null}  style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {(Object.values(category.course)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={course.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
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
                      <Checkbox  checked={type.length === Object.values(category.type).length ? ("انتخاب همه") : null}  style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {(Object.values(category.type)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={type.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
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
                      <Checkbox  checked={hardness.length === Object.values(category.hardness).length ? ("انتخاب همه") : null}  style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {(Object.values(category.hardness)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={hardness.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
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
                      <Checkbox  checked={chapter.length === (Object.values(category.chapter)).length ? ("انتخاب همه") : null}  style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                      <ListItemText primary={'انتخاب همه'} />
                      </MenuItem>
                      {(Object.values(category.chapter)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={chapter.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
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
                                <Pagination onChange={handlePage} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalpage} shape="rounded" />
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
                              <li key={question}><QuestionCard q={question} category={category}/><br/></li>
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
const useStyles = makeStyles((theme) => ({
  '@global':{
    '.MuiListItemText-primary' : {
    display: 'block',
    fontFamily: 'Vazir',
    },
    root: {
      maxWidth: 345,
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: '70%',
      maxWidth: '70%',
    },
}));
export default () => {
    const classes = useStyles();
    const pending = React.useState(false);
    const pendi = React.useState(false);
    const list = React.useState([]);
    const category = React.useState({type:{},base:{},chapter:{},hardness:{},course:{}});
    const base = React.useState([]);
    const course = React.useState([]);
    const hardness = React.useState([]);
    const type = React.useState([]);
    const chapter = React.useState([]);
    const totalpage = React.useState(0);
    const check = React.useState(false);
    return (        
        <QuestionBank classes={classes} category={category} base={base} course={course} type={type} hardness={hardness} chapter={chapter} pending={pending} pendi={pendi} list={list} totalpage={totalpage} check={check}/>    
    )
}