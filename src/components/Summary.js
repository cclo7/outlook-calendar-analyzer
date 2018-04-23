import React from "react";
import PropTypes from "prop-types";

const Summary = ({
  focusTime,
  recurringMeetingTime,
  nonRecurringMeetingTime
}) => (
  <div>
    <h2>Your Outlook Calendar Analysis</h2>
    <ul>
      <li>Focus time: {focusTime}</li>
      <li>Recurring meeting time: {recurringMeetingTime}</li>
      <li>Non-recurring meeting time: {nonRecurringMeetingTime}</li>
    </ul>
  </div>
);

Summary.propTypes = {
  focusTime: PropTypes.string,
  recurringMeetingTime: PropTypes.string,
  nonRecurringMeetingTime: PropTypes.string
};

export default Summary;
