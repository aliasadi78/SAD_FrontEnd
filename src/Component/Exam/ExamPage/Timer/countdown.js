import React from 'react';
import moment from 'moment';

const Countdown = ({ countdown, unixEndDate }) => {

  return (
    <div style={{display: 'flex',justifyContent: 'center',fontFamily: 'Vazir',position: 'relative'}}>
      <div style={{display: 'flex',justifyContent: 'center',position: 'absolute',background: '#333',display: 'inline-block',margin: '1% 5%',minWidth: '100px',padding: '20px 0',}}>
        <div style={{color: '#0fc',}} >{faNumber(countdown.hours)}</div>
        <div style={{color: 'white',}}>ساعت</div>
      </div>
      <div style={{display: 'flex',justifyContent: 'center',position: 'absolute',background: '#333',display: 'inline-block',margin: '1% 20%',minWidth: '100px',padding: '20px 0',}}>
        <div style={{color: '#0fc',}} >{faNumber(countdown.mins)}</div>
        <div style={{color: 'white',}}>دقیقه</div>
      </div>
      <div style={{display: 'flex',justifyContent: 'center',position: 'absolute',background: '#333',display: 'inline-block',margin: '1% 35%',minWidth: '100px',padding: '20px 0',}}>
        <div style={{color: '#0fc',}} >{faNumber(countdown.secs)}</div>
        <div style={{color: 'white',}}>ثانیه</div>
      </div>
    </div>
  );
}
function faNumber(n){
  const farsidigit = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return n
  .toString()
  .split("")
  .map(x => farsidigit[x])
  .join("")
}
export default Countdown;