export const isEmailValid = value => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(value).toLowerCase());
  return Boolean(value && isValid);
};

export const isPhoneNumberValid = value => {
  return Boolean(value && /^\d{9}$/.test(value));
};
