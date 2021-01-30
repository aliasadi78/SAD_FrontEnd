import React from 'react';
import moment from 'moment';

const SettingsModal = ({ dateValue, timeValue, ampmValue, handleChange, handleSubmit, settingsFormError, errorMessage, showModal}) => {

  return (
    <div  id="modal">
      <div >
        <div >Set New Countdown</div>
        <div >
          <form onSubmit={(event) => handleSubmit(event, dateValue, timeValue, ampmValue)}>
            <div >
              <label htmlFor="date-value">Date</label>
              <input type="text" name="dateValue" onChange={(event) => handleChange(event)} value={"12-17-2020"} placeholder="MM-DD-YYYY" id="date-value" required />
            </div>
            <div >
              <label htmlFor="time-value">Time</label>
              <input type="text" name="timeValue" onChange={(event) => handleChange(event)} value={"22:22"} placeholder="hh:mm" id="time-value" required />
            </div>
            <div >
              <label htmlFor="ampm-value">AM/PM</label>
              <div>
                <select name="ampmValue" onChange={(event) => handleChange(event)} value={ampmValue} id="ampm-value">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>
            <div >
              <input type="submit" value="Start" />
              <input type="button" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          {settingsFormError ? <p ><span ></span> {errorMessage}</p>: null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;