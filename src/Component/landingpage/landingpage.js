import React, {Component} from 'react';
import styles from "./dist/css/style.module.css";
import '../../App.css';
// import "./dist/js/main.min.js";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import axios from 'axios';
import serverURL from '../../utils/serverURL';

class Landing extends Component {
    render(){
            const classes =  this.props.classes;
            const FileDownload = require('js-file-download');
        const handleClick = e => {
            axios.get(serverURL() + 'public/download/app')
            .then(res=>{
                console.log(res)
                FileDownload(res.data, 'samproject.apk');
            }
            ).catch(err=>{
                console.log(err)
            })}
        return(
            
            <div>
                <div className={classes.box1}>
                    <div style={{position: 'absolute',top:'3%',left:'3%',width: '20%'}}>
                        <span>
                        <Link to="/signUp" style={{color: 'white',textDecoration : 'none',fontFamily: 'Vazir'}}>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{backgroundColor : '#0e918c',fontFamily: 'Vazir',marginBottom: '2%',width:'43%',margin:'3%'}}
                            startIcon={<Icon>person_add</Icon>}>{"  ثبت نام  "}
                        </Button>
                        </Link>
                        </span>
                        <span>
                        <Link to="/signIn" style={{color: 'white',textDecoration : 'none',fontFamily: 'Vazir'}}>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{backgroundColor : '#EE6C4D',fontFamily: 'Vazir',width:'43%'}}
                            startIcon={<Icon>login</Icon>}><span>{"  ورود  "}</span>
                        </Button>
                        </Link>
                        </span>
                    </div>
                <span style={{position: 'relative',top:'10%',textAlign:'center'}}><h2 style={{fontFamily:'Vazir',color: 'white',top: '30%',position: 'relative'}}>آزمون ساز آنلاین و مدیریت کلاس</h2></span>
                <span style={{fontFamily: 'vazir',color: 'black',background: 'white',position: 'absolute',zIndex:'100',width: '60%',height: '380px',top: '75%',right:'20%',borderRadius: '5px',boxShadow: '0 16px 48px #E3E7EB'}}>
                <span style={{fontFamily: 'vazir',color: 'black',width: '75%',top: '25%',right: '12%',position: 'absolute',direction: 'rtl',textAlign: 'justify'}}>      
                توی این دوران کرونا که آموزش مجازی شکل گرفته و مدارس و دانشگاه ها مجازی آموزش هاشون رو
                    ارائه میدن، مدارس هم مانند دانشگاه ها به بستری برای برگزاری آنلاین امتحانات و حل سوالات و
                    تمریناتشون دارن
                    به این ترتیب ایده اولیه ما برای ارائه خدمات آزمون آنلاین شکل گرفت به این صورت که توسط یک
                    بانک سواال پشتیبانی میشه و این امکان رو به معلمین و دانش آموزان میده تا بتونن تمرین و آزمون
                    دلخواهشون رو با استفاده از سوالات خودشون به صورت رایگان و یا با استفاده از سوالات بانک با صرف هزینه کم ایجاد کنند
                    </span>

                </span>
                
                </div>
                <div className={classes.threeangle}></div>
                    <div style={{fontFamily:'vazir',marginTop:'10%',width: '90%',position: 'relative',left: '5%'}}>
                        <div>امکانات</div>
                        <Grid container spacing={3} style={{marginTop:'5%'}}>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',height: '200px',padding: '20%'}}>
                                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{position:'relative',left:'40%'}}>
                                            <g fill="none" fill-rule="evenodd">
                                                <path fill="#84E482" d="M48 16v32H16z"/>
                                                <path fill="#0EB3CE" d="M0 0h32v32H0z"/>
                                            </g>
                                        </svg><h4 style={{fontFamily:'vazir'}}>ایجاد کلاس</h4>
                                </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',height: '200px',padding: '20%'}}>
                                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{position:'relative',left:'40%'}}>
                                            <g fill="none" fill-rule="evenodd">
                                            <path fill="#84E482" d="M48 16v32H16z"/>
                                                <path fill="#0EB3CE" d="M0 0v32h32z"/>
                                                <circle fill="#02C6A4" cx="29" cy="9" r="4"/>
                                            </g>
                                        </svg><h4 style={{fontFamily:'vazir'}}>بانک سوال</h4></Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',height: '200px',padding: '20%'}}>
                                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{position:'relative',left:'40%'}}>
                                            <g fill="none" fill-rule="evenodd">
                                            <path fill="#0EB3CE" d="M0 0h32v32H0z"/>
                                                <path fill="#84E482" d="M16 16h32L16 48z"/>
                                            </g>
                                        </svg><h4 style={{fontFamily:'vazir'}}>طرح سوال</h4></Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',height: '200px',padding: '20%'}}>
                                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{position:'relative',left:'40%'}}>
                                            <g fill="none" fill-rule="evenodd">
                                            <path d="M32 40H0c0-8.837 7.163-16 16-16s16 7.163 16 16z" fill="#84E482" />
                                                <path fill="#03C5A4" d="M12 8h8v8h-8z"/>
                                                <path fill="#0EB3CE" d="M32 0h16v48H32z"/>
                                            </g>
                                        </svg><h4 style={{fontFamily:'vazir'}}>ایجاد آزمون</h4></Paper>
                                </Grid>
                        </Grid><br/>
                        <Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                    <img src={require("./image/info01.png")} width="480" height="360"/>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div >
                                    <p style={{marginTop: '30%'}}><ul style={{fontFamily: 'Vazir',listStyle:'none'}}>
                                    <li> شرکت در آزمون های آنلاین</li>
                                    <li> ایجاد آزمون تمرینی</li>
                                    <li> دسترسی به بانک سوال و جواب های آن</li>
                                    </ul>
                                </p>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                    <p style={{marginTop: '30%'}}>
                                    <ul style={{fontFamily: 'Vazir',listStyle:'none'}}>
                                        <li>طراحی سوال و اضافه کردن به بانک سوال</li>
                                        <li>  تایپ و آپلود عکس برای سوالات تشریحی</li>
                                        <li>  تصحیح دستی سوالات تشریحی</li>
                                    </ul>
                                </p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                    <img src={require("./image/info02.png")} width="480" height="360"/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                    <img src={require("./image/info03.png")} width="480" height="360"/>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                    <p style={{marginTop: '20%'}}>
                                    <ul style={{fontFamily: 'Vazir',listStyle:'none'}}>
                                        <li> ایجاد کلاس</li>
                                        <li> ایجاد آزمون</li>
                                        <li> ایجاد اطلاعیه مربوط به کلاس</li>
                                        <li> قابلیت تصحیح خودکار سوالات تستی</li>
                                        <li> ایجاد کارنامه برای اعضای کلاس</li>
                                    </ul>
                                </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid><br/>
                        <div><h3 style={{fontFamily: 'Vazir'}}>اعضای تیم</h3></div><br/>
                        <Grid>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/rezaa.jpeg")} style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>رضا موسویان</div>
                                            <span>Back End</span>
                                    </Paper>
                                    </Grid>
                                    <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/amirali.jpeg")} style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>امیرعلی پاکدامن</div>
                                            <span>Back End</span>
                                    </Paper>
                                    </Grid>
                                    <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/hamidrezaazarbad.jpeg")}  style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>حمیدرضا آذرباد</div>
                                            <span>Front End Flutter</span>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/mahdi.jpeg")} style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>محمد مهدی سوری</div>
                                            <span>Front End Flutter</span>
                                    </Paper>
                                    </Grid>
                                    <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/parsa.jpeg")}  style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>پارسا عیسی زاده</div>
                                            <span>Front End ReactJS</span>
                                    </Paper>
                                    </Grid>
                                    <Grid item xs>
                                    <Paper className={classes.paper} style={{boxShadow: '0 16px 48px #E3E7EB',padding: '2%'}}>
                                    <img src={require("./image/aliasadi.jpeg")} style={{borderRadius: "50%",width:"150px", height:"150px",position: "relative",left: "30%"}}/>
                                            <div style={{color: '#00C6A7'}}>علی اسدی</div>
                                            <span>Front End Reactjs</span>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid><br/>
                        
                </div>
                <footer style={{borderTop: 'solid 1px'}}>
                        <a href="#">
                            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{position: 'relative',left: '95%',marginTop:'2%'}}>
                                <defs>
                                    <radialGradient cy="0%" fx="50%" fy="0%" r="100%" id="logo-gradient-footer">
                                        <stop stop-color="#00A2B8" offset="0%"/>
                                        <stop stop-color="#00F9D2" offset="100%"/>
                                    </radialGradient>
                                </defs>
                                <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-10a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill="url(#logo-gradient-footer)" fill-rule="evenodd"/>
                            </svg>
                        </a>
                        <div  style={{position: 'relative',left: '3%',marginTop: '-2%'}}>
                            <span style={{display: 'inline-block',float: 'left'}}><a href="http://www.instagram.com/online_exam_parham" target="_blank">
                                <img src={require("./image/instagram.png")}  style={{borderRadius: "50%",width:"30px",height: "30px"}}/>
                            </a></span>
                            <span><a href="http://www.t.me/online_exam_parham" target="_blank">
                                <img src={require("./image/telegram.png")}  style={{borderRadius: "50%",width:"30px",height: "30px"}}/>
                            </a></span>
                            <span><Button onClick={handleClick}><img className={classes.image} src={require("./image/android.png")} width='30px' height='30px' style={{borderRadius: '50px',color: 'white',margin:'2%'}}></img></Button></span>
                        </div>
                        <div class="footer-copyright" style={{direction: "rtl"}}>&copy; تمام حقوق مادی و معنوی این سایت متعلق به تیم پرهام می باشد</div>
                        </footer>
            </div>
        )
    }
}
(function () {
    const doc = document.documentElement
  
    doc.classList.remove('no-js')
    doc.classList.add('js')
  
    // Reveal animations
    if (document.body.classList.contains('has-animations')) {
      /* global ScrollReveal */
      const sr = window.sr = ScrollReveal()
  
      sr.reveal('.hero-title, .hero-paragraph, .hero-cta', {
        duration: 1000,
        distance: '40px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        origin: 'bottom',
        interval: 150
      })
  
      sr.reveal('.feature, .pricing-table', {
        duration: 600,
        distance: '40px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        interval: 100,
        origin: 'bottom',
        viewFactor: 0.5
      })
  
      sr.reveal('.feature-extended-image', {
        duration: 600,
        scale: 0.9,
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        viewFactor: 0.5
      })
    }
  }());
  (function(){
      const e=document.documentElement;
      e.classList.remove("no-js");
      e.classList.add("js");
      if(document.body.classList.contains("has-animations")){
            const e=window.sr=ScrollReveal();
            e.reveal(".hero-title, .hero-paragraph, .hero-cta",{duration:1e3,distance:"40px",easing:"cubic-bezier(0.5, -0.01, 0, 1.005)",origin:"bottom",interval:150})
            e.reveal(".feature, .pricing-table",{duration:600,distance:"40px",easing:"cubic-bezier(0.5, -0.01, 0, 1.005)",interval:100,origin:"bottom",viewFactor:.5})
            e.reveal(".feature-extended-image",{duration:600,scale:.9,easing:"cubic-bezier(0.5, -0.01, 0, 1.005)",viewFactor:.5})
        }}()
)
const useStyles = makeStyles((theme) => ({
    image: {
        filter: 'grayscale(50%)',
        "&:hover": {
            filter: 'grayscale(0)',
          },
    },
    box1:{
        background:'linear-gradient(57deg, #00C6A7 0%, #1E4D92 100%)',
        height: '350px',
        position: 'relative',
    },
    threeangle:{
        // width:'0',
        // height:'0',
        // borderTop : '0px solid transparent',
        // borderLeft : '1500px solid green',
        // borderBottom : '250px solid transparent'
        width: '1500px',
        height: '250px',
        background: 'linear-gradient(to top left, #fff 0%, #fff 50%,#1E4D92  0%, #00C6A7 100%)',
        
    },







}));
export default () => {
    const classes = useStyles();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    return (        
        <Landing classes={classes}  />    
    )
}