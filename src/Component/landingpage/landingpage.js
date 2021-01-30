import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import serverURL from '../../utils/serverURL';
class Landing extends Component {
    render(){
        const classes = this.props.classes;
        const FileDownload = require('js-file-download');
        const handleClick = e => {
            axios.get(serverURL() + 'public/download/app')
            .then(res=>{
                console.log(res)
                FileDownload(res.data, 'samproject.apk');
            }
            ).catch(err=>{
                console.log(err)
            })
        }
        return(
            <Container>              
                <Grid style={{fontFamily: 'Vazir',backgroundColor: '#3498db',width: '100%',height: '50px',color: 'white',padding: '1.25%'}}><h4 style={{color: 'white',fontFamily: 'Vazir'}}>آزمون ساز و مدیریت کلاس  پرهام</h4></Grid><br/>
                <Grid style={{fontFamily: 'Vazir',backgroundImage: 'url(' + require(`./image/info06.jpg`) + ')',backgroundAttachment: 'fixed',backgroundRepeat: 'repeat',padding: '10%',direction: 'rtl'}}>
                <p style={{fontSize: '20px'}}>
                    توی این دوران کرونا که آموزش مجازی شکل گرفته و مدارس و دانشگاه ها مجازی آموزش هاشون رو
ارائه میدن، مدارس هم مانند دانشگاه ها به بستری برای برگزاری آنلاین امتحانات و حل سوالات و
تمریناتشون دارن
به این ترتیب ایده اولیه ما برای ارائه خدمات آزمون آنلاین شکل گرفت به این صورت که توسط یک
بانک سواال پشتیبانی میشه و این امکان رو به معلمین و دانش آموزان میده تا بتونن تمرین و آزمون
دلخواهشون رو با استفاده از سوالات خودشون به صورت رایگان و یا با استفاده از سوالات بانک با صرف هزینه کم ایجاد کنند
                </p>
                <Grid container style={{padding: '0% 30% 0% 30%'}}>
                    <Grid item xs={12}>
                    <Grid>
                        <Link to="/signUp" style={{color: 'white',textDecoration : 'none',fontFamily: 'Vazir'}}>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{backgroundColor : '#0e918c',fontFamily: 'Vazir',marginBottom: '2%'}}
                            startIcon={<Icon>person_add</Icon>}>{"  ثبت نام  "}
                        </Button>
                        </Link>
                    </Grid>
                    </Grid><br/>
                    <Grid container>
                    <Grid item xs={12}>
                    <Grid>
                        <Link to="/signIn" style={{color: 'white',textDecoration : 'none',fontFamily: 'Vazir'}}>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{backgroundColor : '#EE6C4D',fontFamily: 'Vazir'}}
                            startIcon={<Icon>login</Icon>}><span>{"  ورود  "}</span>
                        </Button>
                        </Link>
                        </Grid></Grid></Grid><br/>
                        </Grid>
                        </Grid>
                <Grid>
                    <Grid>
                        <span ><img src={require("./image/info01.png")} style={{position: 'relative',right: '10%',width: '50%'}}></img></span>
                        <span style={{direction: 'rtl',display: 'inline-block'}}>
                            <ul style={{fontFamil: 'Vazir',fontSize:'20px'}}>
                            <li> شرکت در آزمون های آنلاین</li>
                            <li> ایجاد آزمون تمرینی</li>
                            <li> دسترسی به بانک سوال و جواب های آن</li>
                            </ul>
                        </span>
                    </Grid><br/>
                    <Grid>
                    <span ><img src={require("./image/info02.png")} style={{position: 'relative',left: '30%',width: '50%'}}></img></span>
                    <span style={{direction: 'rtl',display: 'inline-block',right: '50%',position: 'relative'}}>
                        <ul style={{fontFamil: 'Vazir',fontSize:'20px'}}>
                            <li>طراحی سوال و اضافه کردن به بانک سوال</li>
                            <li>  تایپ و آپلود عکس برای سوالات تشریحی</li>
                            <li>  تصحیح دستی سوالات تشریحی</li>
                        </ul>
                    </span>
                    </Grid><br/>
                    <Grid>
                    <span ><img src={require("./image/info03.png")} style={{position: 'relative',right: '10%',width: '50%'}}></img></span>
                    <span style={{direction: 'rtl',display: 'inline-block'}}>
                        <ul style={{fontFamil: 'Vazir',fontSize:'20px'}}>
                            <li> ایجاد کلاس</li>
                            <li> ایجاد آزمون</li>
                            <li> ایجاد تمرین</li>
                            <li> ایجاد اطلاعیه مربوط به کلاس</li>
                            <li> قابلیت تصحیح خودکار سوالات تستی</li>
                            <li> ایجاد کارنامه برای اعضای کلاس</li>
                        </ul>
                    </span>
                    </Grid><br/>
                </Grid><br/>
                <Grid style={{fontFamily: 'Vazir',background: 'rgb(52,152,219)',background: 'linear-gradient(90deg, rgba(52,152,219,1) 0%, rgba(52,152,219,1) 35%, rgba(131,229,240,1) 100%)',width: '100%',color: 'white',}}>
                    <h1 style={{fontFamily: 'Vazir',color: 'white'}}>
                     اعضای تیم</h1>
                    
                    <Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/rezaa.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>رضا موسویان</span><br/><span>Back-End</span></span></Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/amirali.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>امیرعلی پاکدامن</span><br/><span>Back-End</span></span></Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/hamidrezaazarbad.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>حمیدرضا آذرباد</span><br/><span>Front-End Flutter</span></span></Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/mahdi.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>محمدمهدی سوری</span><br/><span>Front-End Flutter</span></span></Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/parsa.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>پارسا عیسی زاده</span><br/><span>Front-End React js</span></span></Grid>
                        <Grid style={{display:'inline-block',margin: '2%'}}><img className={classes.image} src={require("./image/aliasadi.jpeg")} width='150px' height='150px' style={{borderRadius: '50%',color: 'white',margin:'2%'}}></img><br/><span><span>علی اسدی</span><br/><span>Front-End React js</span></span></Grid>
                    </Grid>
                </Grid>
                <Grid style={{fontFamily: 'Vazir',background: 'rgb(52,152,219)',background: 'linear-gradient(90deg, rgba(52,152,219,1) 0%, rgba(52,152,219,1) 35%, rgba(131,229,240,1) 100%)',width: '100%',color: 'white'}}>
                    <h1 style={{fontFamily: 'Vazir',color: 'white'}}>
                    ما را در شبکه های اجتماعی همراهی کنید</h1>
                    <h6 style={{fontFamily: 'Vazir',color: 'white'}}>
                    جدیدترین و بروزترین اخبار ما را در شبکه های اجتماعی دنبال کنید
                    </h6>
                    <Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        <span ><Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}> اینستاگرام</span>} ><a href="http://www.instagram.com/online_exam_parham" target="_blank"><img className={classes.image} src={require("./image/instagram.png")} width='100px' height='100px' style={{borderRadius: '50px',color: 'white',margin:'2%'}}></img></a></Tooltip></span>
                        <span ><Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}>تلگرام</span>} ><a href="http://www.t.me/online_exam_parham" target="_blank"><img className={classes.image} src={require("./image/telegram.png")} width='100px' height='100px' style={{borderRadius: '50px',color: 'white',margin:'2%'}}></img></a></Tooltip></span>  
                        <span ><Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}>دانلود اپلیکیشن اندروید</span>} ><Button onClick={handleClick}><img className={classes.image} src={require("./image/android.png")} width='100px' height='100px' style={{borderRadius: '50px',color: 'white',margin:'2%'}}></img></Button></Tooltip></span>  
                         </Grid>
                </Grid><br/>
                <Grid style={{fontFamily: 'Vazir',backgroundColor: '#3498db',width: '100%',height: '50px',color: 'white',padding: '1.25%',}}><span>&#169;</span>{"کلیه حقوق مادی و معنوی این سایت متعلق به تیم پرهام می باشد"}</Grid>
            </Container>
        )
    }
}
const useStyles = makeStyles((theme) => ({
    image: {
        filter: 'grayscale(50%)',
        "&:hover": {
            filter: 'grayscale(0)',
          },
    },
    bg:{
        backgroundImage: 'url(' + require(`./image/info04.jpg`) + ')',
    }
}));
export default () => {
    const classes = useStyles();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    return (        
        <Landing classes={classes}  />    
    )
}

