export default {
  required(val, name) {
    return val => !!val || `${name} is required!`;
  },
  email(val) {
    return val => /.+@.+\..+/.test(val) || "E-mail must be valid";
  },

  minPrice(val, max) {
    return (
      (val || "") < parseInt(max) || `Min price should be less than max price`
    );
  },
  maxPrice(val, min) {
    return (val || "") > parseInt(min) || `Max price be greater than min price`;
  },

  fileSize(val, name, size) {
    var converSize = size * 1024000; // convert to MB
    return val =>
      !val ||
      val.size < converSize ||
      `${name} size should be less than ${size} MB!`;
  },

  phoneNumber(val) {
    return val =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val) ||
      "Phone number must be valid";
  }
};
