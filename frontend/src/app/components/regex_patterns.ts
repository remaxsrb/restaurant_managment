export const RegexPatterns = {
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[\W_]).{6,10}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  ADDRESS: /^[A-Za-z\s]+\d{1,3}$/,
  PHONE_NUMBER: /^06\d{8}$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  FILE_FORMAT: /\.(png|jpg)$/i,
};
