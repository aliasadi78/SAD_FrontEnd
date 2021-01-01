import React, {Component} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
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
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import QuestionCard from './ExamQuestionCard'; 
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
    componentWillMount(){
        const [pending, setPending] = this.props.pending;
        const [pendi, setPendi] = this.props.pendi;
        const [list, setList] = this.props.list;
        const [category, setCategory] = this.props.category;
        const [totalpage, setTotalpage] = this.props.totalpage;
        const [check,setCheck] = this.props.check;
        var res;
          if(check != true ){
            axios.get(serverURL() + "public/question/category" )
            .then(res => {
                setCategory(res.data);
                console.log(this.state)
                this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
                setPending(true);
                setPendi(true);
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
                        setCheck(true);
                        
                    }).catch(error => {
                        console.log(error.messege);
                        this.setState({ base : [],course: [],hardness: [],chapter: [],type :[]});
                        alert("سوالی با این مشخصات فعلا در بانک سوال موجود نمی باشد");
                        setPending(false); 
                        setPendi(false);
                        console.log("bad");
                        setCheck(true);
                    })
                    setCheck(true);
            })
            .catch(e => {
                console.log(e);
            });
            
            }}
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
        var res;
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
                  <Container className={classes.paper} alignItems="center" component="main" style={{position: 'relative',fontFamily: 'Vazir',backgroundColor : '#f2f2f2',width: '109%',margin: '0px -4% 0px 0px',}}>
                    <CssBaseline/>
                <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                <Grid  item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label1"><span style={{fontFamily: 'Vazir',color:'#1CA0A0'}}>پایه</span></InputLabel>
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
                        <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{'انتخاب همه'}</span> }/>
                      </MenuItem>
                      {(Object.values(category.base)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={base.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{name}</span>}/>
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label2"><span style={{fontFamily: 'Vazir',color:'#1CA0A0'}}>درس</span></InputLabel>
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
                      <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{'انتخاب همه'}</span> } />
                      </MenuItem>
                      {(Object.values(category.course)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={course.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{name}</span>} />
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label3"><span style={{fontFamily: 'Vazir',color:'#1CA0A0'}}>نوع سوال</span></InputLabel>
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
                      <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{'انتخاب همه'}</span> } />
                      </MenuItem>
                      {(Object.values(category.type)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={type.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{name}</span>} />
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label4"><span style={{fontFamily: 'Vazir',color:'#1CA0A0'}}>سطح سوال</span></InputLabel>
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
                      <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{'انتخاب همه'}</span> } />
                      </MenuItem>
                      {(Object.values(category.hardness)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={hardness.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{name}</span>} />
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label5"><span style={{fontFamily: 'Vazir',color:'#1CA0A0'}}>فصل</span></InputLabel>
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
                      <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{'انتخاب همه'}</span> } />
                      </MenuItem>
                      {(Object.values(category.chapter)).map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox  checked={chapter.indexOf(name) > -1} style={{color: '#1CA0A0',fontFamily: 'Vazir'}}/>
                          <ListItemText primary={<span style={{fontFamily: 'Vazir'}}>{name}</span>}/>
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                  </Grid>
                <br/>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid classes={classes.root} >
                        <LoadingButton onClick={handleClick} startIcon={<Icon>search</Icon>} pendingPosition="center" className={classes.topButton} pending={pendi} variant="contained"  style={{fontFamily: 'Vazir',backgroundColor: '#EE6C4D',position: 'relative',right: '-1%'}}>
                        جست و جو
                        </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>  
                <Grid >
                        {pending ? (
                              <Grid style={{display: 'flex',justifyContent: 'center'}}>
                                <Pagination onChange={handlePage} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalpage} shape="rounded" />
                              </Grid>
                            )
                        : null}
                    </Grid> 
                </ValidatorForm >
                </Container>
                <br/>
                {pending ? 
                   pendi ? <div style={{margin: '5% 0 0 0'}}><CircularProgress style={{color: '#1CA0A0'}}/></div>  :
                   <div>
                <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir', backgroundColor : "rgb(242 242 242)",width: '109%',marginRight: '-4%',paddingTop: '2%'}}>
                <CssBaseline/>
                  <Grid item xs={12}>
                    <Grid>
                      <div id="ress">
                      <ol style={{listStyle: 'none',}}>
                          {pending ? list.map((question)=>{
                              return(
                              <li key={question}><QuestionCard q={question} category={category}/><br/></li>
                            )
                          }) : null}
                      </ol>
                    </div>
                    </Grid>
                  </Grid>
{/*                      
                    <Grid >
                        {pending ? (
                              <Grid style={{display: 'flex',justifyContent: 'center'}}>
                                <Pagination onChange={handlePage} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalpage} shape="rounded" />
                              </Grid>
                            )
                        : null}
                    </Grid>  */}
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
    color: 'red'
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
      flexGrow: 1,
      width : '100%'    
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '17%',
      maxWidth: '17%',
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