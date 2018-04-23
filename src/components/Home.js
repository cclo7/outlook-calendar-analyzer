import React, { Component } from "react";
import hello from "hellojs/dist/hello.all.js";
import Summary from "./Summary";
import calendarDataProvider from "../calendar-data-provider";
import calendarUtil from "../calendar-util";
class Home extends Component {
  constructor(props) {
    super(props);

    const msft = hello("msft").getAuthResponse();

    this.state = {
      token: msft.access_token
    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    const startDateTime = "2018-04-23T19:00:00.0000000";
    const endDateTime = "2018-04-30T19:00:00.0000000";
    calendarDataProvider
      .getCalendarView(token, startDateTime, endDateTime)
      .then(calendarEvents => {
        console.log(calendarEvents);
        const calendarAnalysis = calendarUtil.analyzeCalendar(calendarEvents);
        this.setState({
          focusTime: calendarAnalysis.focusTime,
          recurringMeetingTime: calendarAnalysis.recurringMeetingTime,
          nonRecurringMeetingTime: calendarAnalysis.nonRecurringMeetingTime
        });
      });
  }

  onLogout() {
    hello("msft")
      .logout()
      .then(
        () => this.props.history.push("/"),
        e => console.error(e.error.message)
      );
  }

  render() {
    return (
      <div>
        <Summary
          focusTime={this.state.focusTime}
          recurringMeetingTime={this.state.recurringMeetingTime}
          nonRecurringMeetingTime={this.state.nonRecurringMeetingTime}
        />
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default Home;
