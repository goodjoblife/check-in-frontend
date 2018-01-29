
import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';

import Button from '../../components/Button.component';
import { pad } from '../../utils/format';
import StyledReminderList from './ReminderList.style';
import StyledTable from '../../styles/table.style';
import { apiEndpoint } from '../../constants/config.constant';

// const MIN_INTERVAL = 10;  // 10 mins

class ReminderList extends React.Component {
  static propTypes = {
      params: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      reminders: null,
    }
  }

  componentDidMount() {
    this.getWeeklyReminders();
  }

  getWeeklyReminders = () => {
    const key = this.props.params.key;
    const url = `${apiEndpoint}/api/users/${key}/weekly-reminders`;

    axios.get(url).then(response => {
      this.setState({ reminders: response.data });
    });
  }

  deleteWeeklyReminder = (reminderId) => {
    const key = this.props.params.key;
    const url = `${apiEndpoint}/api/users/${key}/weekly-reminders/${reminderId}`;
    axios.delete(url).then(response => {
      const index = this.state.reminders.findIndex((r) => (r._id === reminderId));
      this.setState({ reminders:
        update(this.state.reminders, {
          $splice: [[index, 1]],
        }),
      });
    });
  }

  /*
  handleReminderDay = (day) => () => {
    this.setState({
      reminderDays: update(this.state.reminderDays, {
        [day]: {
          $set: !this.state.reminderDays[day],
        },
      }),
    });
  }

  handleReminderTime = (event) => {
    this.setState({
      reminderTime: event.target.value,
    });
  }

  handleSaveButton = () => {
    // get reminder time
    const timeStr = this.state.reminderTime;
    if (timeStr) {
      const tmp = timeStr.split(':');
      let hour = parseInt(tmp[0], 10);
      let min = parseInt(tmp[1], 10);
      min = Math.round(min / MIN_INTERVAL) * MIN_INTERVAL;
      if (min === 60) {
        min = 0;
        hour = (hour + 1 >= 24) ? 0 : hour + 1;
      }
      const reminderTime = `${pad(hour, 2)}:${pad(min, 2)}`;
      this.setState({
        reminderTime,
      });
      this.dispatchSaveReminderAPI(reminderTime);
    } else {
      alert("尚未設定時間，請先設定時間！");
    }
  }
  */

  handleDeleteButtonFactory = (reminderId) => (event) => {
    event.preventDefault();
    this.deleteWeeklyReminder(reminderId);
  }

  /*
  dispatchSaveReminderAPI = (reminderTime) => {
    const key = this.props.params.key;
    const url = `${apiEndpoint}/api/users/${key}/reminders`;
    const { reminderType, reminderDays, reminderText } = this.state;
    axios.post(url, {
      type: reminderType,
      days: reminderDays,
      time: reminderTime,
      text: reminderText,
    }).then(response => {
        if (response.data.success) {
          window.MessengerExtensions.requestCloseBrowser(function success() {
            console.log('webview closed');
          }, function error(err) {
            console.log('error:', err);
          });
        } else {
          alert("設定失敗");
        }
    });
  }*/

  renderWeeklyRemindersTable() {
    const { reminders } = this.state;
    if (!reminders) { return null; }
      return (
        <div className="section">
          <StyledTable>
            <thead>
              <tr>
                <th> 日期 </th>
                <th> 時間 </th>
                <th> 文字 </th>
                <th> 操作 </th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => this.renderWeeklyReminderRow(reminder))}
            </tbody>
          </StyledTable>
        </div>
    );
  }

  renderWeeklyReminderRow(reminder, index) {
    const reminderId = reminder._id;
    const { days, hour, min, text } = reminder;
    return (
      <tr key={reminderId}>
        <td data-th="日期">{this.renderReminderDate(days)}</td>
        <td data-th="時間">{this.renderReminderTime(hour, min)}</td>
        <td data-th="文字">{this.renderReminderText(text)}</td>
        <td data-th="操作">{this.renderButtons(reminderId)}</td>
      </tr>
    );
  }

  renderReminderDate = (days) => {
    const weekDayName = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const names = [];
    days.forEach((flag, index) => {
      if (flag) { names.push(weekDayName[index]) }
    });
    return (
      <div>
        {`每${names.join(', ')}`}
      </div>
    );
  }

  renderReminderTime = (hour, min) => {
    const time = `${pad(hour, 2)}:${pad(min, 2)}`;
    return (<div>{time}</div>);
  }

  renderReminderText = (text) => (<div>{text}</div>);

  /*
  renderReminderDate = (days) => {
    const weekDayName = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return (
      <div>
        {weekDayName.map((name, index) => {
          return (
            <div key={`week-day-btn-${index}`}>
              <input
                value={`${index}`}
                type="checkbox"
                checked={days[index]}
                onChange={this.handleReminderDay(index)}
              />
              {name}
            </div>
          );
        })}
      </div>
    );
  }

  renderReminderTime = (hour, min) => {
    const time = `${pad(hour, 2)}:${pad(min, 2)}`;
    return (
      <div>
        <input
          value={time}
          onChange={this.handleReminderTime}
          type="time"
          step="600"
        />
      </div>
    )
  }

  renderReminderText = (text) => {
    return (
      <div>
        <input
          type="text"
          value={text}
          onChange={(event) => { this.setState({ reminderText: event.target.value })}}
        />
      </div>
    )
  }*/

  renderButtons = (reminderId) => (
    <div>
      {this.renderDeleteButton(reminderId)}
    </div>
  );

  /*
  renderUpdateButton = (reminderId) => (
    <button onClick={this.handleSaveButton}>更新</button>
  );*/

  renderDeleteButton = (reminderId) => (
    <Button className="button" onClick={this.handleDeleteButtonFactory(reminderId)}>刪除</Button>
  );

  render() {
    return (
      <StyledReminderList>
        <h1> 每週提醒 </h1>
        {this.renderWeeklyRemindersTable()}
      </StyledReminderList>
    );
  }
}

export default ReminderList;