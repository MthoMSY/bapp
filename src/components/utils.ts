export const getIsLoadingClassName = (condition: boolean) => {
  return condition ? "is-loading" : "";
};

export const formatDate = (date: Date) => {
  return new Date(date.valueOf()).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
}
