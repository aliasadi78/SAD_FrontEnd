import React from 'react';
import moment from 'moment';
import SettingsModal from './settings-modal';
import Countdown from './countdown';
import axios from 'axios';
import tokenConfig from '../../../../utils/tokenConfig';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateValue: '',
      timeValue: '',
      ampmValue: 'am',
      countdown: {
        days: '',
        hours: '',
        mins: '',
        secs: ''
      },
      isCountdownSet: true,
      isModalOpen: false,
      infoMessage: '',
      settingsFormError: false,
      errorMessage: ''
    };
    axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig() )
    .then(res=>{
      console.log(res.data.user_examEndTime.split("T"))
      console.log(res.data.user_examEndTime.split("T")[1].split("."))
      this.setState({dateValue:res.data.user_examEndTime.split("T"),
                     timeValue:res.data.user_examEndTime.split("T")[1].split(".")})
      console.log(this.state)
    }).catch(err=>{
      console.log(err)
    })
    this.timer = null;
    this.countDownDate = {
      dateValue: this.state.dateValue,
      timeValue: this.state.timeValue,
      ampmValue: this.state.ampmValue,
      unixEndDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  renderCountdownDate(countDownDate) {
    if (countDownDate ){ 
        localStorage.setItem('countDownDate',JSON.stringify(countDownDate))
    }
    return JSON.parse(localStorage.getItem('countDownDate')) || this.countDownDate;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(dateValue, timeValue, ampmValue) {
    const unixEndDate = Number(moment(`${dateValue} ${timeValue} ${ampmValue}`, 'YYYY-MM-DD hh:mm:ss A').format('X'));
      this.startCountdown(this.renderCountdownDate({
        dateValue,
        timeValue,
        ampmValue,
        unixEndDate
      }));
  }

  startCountdown(endDate) {
    clearInterval(this.timer);
    this.timer = null;

    if (endDate.unixEndDate !== '') {
      this.timer = setInterval(() => this.playTimer(endDate.unixEndDate), 1000);
    }
    else {
      this.setState({
        isCountdownSet: false,
        infoMessage: 'Click the Settings button to start a new countdown.'
      });
    }
  }

  playTimer(unixEndDate) {
    const distance = unixEndDate - moment().format('X');

    if (distance > 0) {
      this.setState({
        countdown: {
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt(distance % (60 * 60 * 24) / (60 * 60), 10),
          mins: parseInt(distance % (60 * 60) / (60), 10),
          secs: parseInt(distance % 60, 10)
        },
        isCountdownSet: true,
        infoMessage: ''
      });
    }
    else {
      clearInterval(this.timer);
      this.timer = null;
      this.renderCountdownDate(this.countDownDate);
      this.setState({
        isCountdownSet: false,
        infoMessage: 'آزمون در دسترس نمی باشد!'
      });
    }
  }

  clearCountdown() {

  }

  showModal(status) {
    this.setState({
      dateValue: this.renderCountdownDate().dateValue,
      timeValue: this.renderCountdownDate().timeValue,
      ampmValue: this.renderCountdownDate().ampmValue,
      isModalOpen: status,
      settingsFormError: false
    });
  }

  componentDidMount() {
    this.startCountdown(this.renderCountdownDate());

    window.addEventListener('click', event => {

      if (event.target.id === 'modal') {
        this.showModal(false);
      }
    });
  }

  render() {
    return (
      <div>
          {1===1 ? this.handleSubmit(this.state.dateValue,this.state.timeValue,this.state.ampmValue):null}
          {this.state.isCountdownSet ? <Countdown countdown={this.state.countdown} unixEndDate={this.renderCountdownDate().unixEndDate} /> : <p style={{color : 'white'}} > {this.state.infoMessage}</p>}
      </div>
    );
  }
}

export default Timer;
