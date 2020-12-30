import React from 'react';
import moment from 'moment';
import SettingsModal from './settings-modal';
import Countdown from './countdown';
import axios from 'axios';
import tokenConfig from '../../../../utils/tokenConfig';
import serverURL from '../../../../utils/serverURL';
import { useHistory } from "react-router-dom";

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
      errorMessage: '',
    };
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
        infoMessage: 'زمان شما در آزمون به پایان رسیده است'
      });
      // window.location.href = "/user/classes/"
    }
  }

  playTimer(unixEndDate) {
    const history = this.props.history;
    var offset = new Date().getTimezoneOffset() * (-60);
    const distance = unixEndDate - moment().format('X') + offset;
    if (distance > 0 && this.props.time !== "") {
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
      window.location.href = "/user/classes/"
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
          {this.props.time !== "" ? this.handleSubmit(this.props.time.split("T")[0],this.props.time.split("T")[1].split(".")[0],this.state.ampmValue):null}
          {this.state.isCountdownSet ? <Countdown countdown={this.state.countdown} unixEndDate={this.renderCountdownDate().unixEndDate} /> : <p style={{color : 'white'}} > {this.state.infoMessage}</p>}
      </div>
    );
  }
}
export default (props) => {
  const examId = props.examId ; 
  const time = props.time; 
  const history = useHistory();
  return (        
      <Timer examId = {examId} time={time} history={history}/>    
  )
}