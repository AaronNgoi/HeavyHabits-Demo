export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Australia/Melbourne",
  };
  return date.toLocaleDateString('en-AU', options);
};
