export const getIsLoadingClassName = (condition: boolean) => {
  return condition ? "is-loading" : "";
};

export const formatDate = (date: Date) => {
  return new Date(date.valueOf()).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const generatePassword = (): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 9; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};
