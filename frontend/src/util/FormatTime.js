export const formatTimeISO = (startTime) => {
  if (!startTime) return false;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dateTime = startTime.split("T");
  const date = dateTime[0].split("-");
  const month = date[1].startsWith("0") ? date[1].charAt(1) : date[1];
  const day = date[2].startsWith("0") ? date[2].charAt(1) : date[2];
  let dayOfWeek = week[new Date(dateTime[0]).getDay()];
  const result = `${date[0]}.${month}.${day}.(${dayOfWeek}) ${dateTime[1]}`;
  return result;
};

export const formatTime = (startTime) => {
  if (!startTime) return false;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dateTime = startTime.split(" ");
  const date = dateTime[0].split("-");
  const month = date[1].startsWith("0") ? date[1].charAt(1) : date[1];
  const day = date[2].startsWith("0") ? date[2].charAt(1) : date[2];
  let dayOfWeek = week[new Date(dateTime[0]).getDay()];
  const time = dateTime[1].split(":");
  const result = `${date[0]}.${month}.${day}.(${dayOfWeek}) ${time[0]}:${time[1]}`;
  return result;
};
