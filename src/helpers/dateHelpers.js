export const getDayOfWeek = (date) => {
  const options = { weekday: 'long', timeZone: 'Australia/Melbourne' };
  return date.toLocaleDateString('en-AU', options);
};
