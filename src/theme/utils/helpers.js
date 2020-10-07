export const generateRandomId = (value = 8) => {
  var randomId = "";
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < value; i++)
    randomId += chars.charAt(Math.floor(Math.random() * chars.length));
  return randomId;
};
