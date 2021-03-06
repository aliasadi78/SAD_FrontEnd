import React from 'react';
import moment from 'moment';

const Countdown = ({ countdown, unixEndDate }) => {

  return (
    <div style={{display: 'flex',justifyContent: 'center'}}>
      {countdown.days > 0 ? (
        <div style={{background: 'rgb(23 138 138)',borderRadius: '20px',minWidth: '100px',padding: '20px 0',}}>
          <div style={{color: '#0fc',}} >{faNumber(countdown.days)}</div>
          <div style={{color: 'white',}}>روز</div>
        </div>
      ): null}
      <div style={{background: 'rgb(23 138 138)',borderRadius: '20px',minWidth: '100px',padding: '20px 0',}}>
        <div style={{color: '#0fc',}} >{faNumber(countdown.hours)}</div>
        <div style={{color: 'white',}}>ساعت</div>
      </div>
      <div style={{background: 'rgb(23 138 138)',borderRadius: '20px',minWidth: '100px',padding: '20px 0',}}>
        <div style={{color: '#0fc',}} >{faNumber(countdown.mins)}</div>
        <div style={{color: 'white',}}>دقیقه</div>
      </div>
      <div style={{background: 'rgb(23 138 138)',borderRadius: '20px',minWidth: '100px',padding: '20px 0',}}>
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