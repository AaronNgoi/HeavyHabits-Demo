export const getDayOfWeek = (date) => {
  return date.toLocaleDateString('en-AU', { weekday: 'long' });
};
