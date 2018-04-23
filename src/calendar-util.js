import moment from "moment";

const MINUTES_IN_WORK_WEEK = 40 * 30;

class CalendarAnalysis {
  constructor(focusTime, recurringMeetingTime, nonRecurringMeetingTime) {
    this.focusTime = focusTime;
    this.recurringMeetingTime = recurringMeetingTime;
    this.nonRecurringMeetingTime = nonRecurringMeetingTime;
  }
}

function getDurationForDisplay(timeInMinutes) {
  return moment
    .duration({
      minutes: timeInMinutes
    })
    .asHours()
    .toString();
}

function analyzeCalendar(calendarEvents) {
  let recurringMeetingTime = 0;
  let nonRecurringMeetingTime = 0;

  calendarEvents.forEach(element => {
    if (element.responseStatus.response !== "accepted") {
      return;
    }

    const start = moment(element.start.dateTime);
    const end = moment(element.end.dateTime);
    const duration = end.diff(start, "minutes");
    if (element.type === "singleInstance") {
      nonRecurringMeetingTime += duration;
    } else {
      recurringMeetingTime += duration;
    }
  });

  const recurringMeetingTimeDisplay = getDurationForDisplay(
    recurringMeetingTime
  );
  const nonRecurringMeetingTimeDisplay = getDurationForDisplay(
    nonRecurringMeetingTime
  );

  const focusTimeDisplay = getDurationForDisplay(
    MINUTES_IN_WORK_WEEK - recurringMeetingTime - nonRecurringMeetingTime
  );

  return new CalendarAnalysis(
    focusTimeDisplay,
    recurringMeetingTimeDisplay,
    nonRecurringMeetingTimeDisplay
  );
}

export default {
  analyzeCalendar
};
