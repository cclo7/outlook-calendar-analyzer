import axios from "axios";

function fetchCalendarViewByUrl(url, token, data) {
  return axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (!res.data.value.length) {
        return data;
      }

      data = data.concat(res.data.value);
      const nextLink = res.data["@odata.nextLink"];
      if (nextLink) {
        return fetchCalendarViewByUrl(nextLink, token, data);
      } else {
        return data;
      }
    });
}

function getCalendarView(token, startDateTime, endDateTime, data = []) {
  const select = "subject,start,end,type,responseStatus";
  const url =
    `https://graph.microsoft.com/v1.0/me/calendar/calendarview?` +
    `startDateTime=${startDateTime}` +
    `&endDateTime=${endDateTime}` +
    `&$select=${select}`;

  return fetchCalendarViewByUrl(url, token, data);
}

export default {
  getCalendarView
};
