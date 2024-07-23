export const RegexPatterns = {
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[\W_]).{6,10}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,

  STREET_NAME: /^([A-Za-z]+(?:\s+[A-Za-z]+)*)$/,
  STREET_NUMBER: /^(\d{1,3}[a-zA-Z]?)$/,

  PHONE_NUMBER: /^06\d{7,8}$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  FILE_FORMAT: /\.(png|jpg)$/i,
  JSON: /\.json$/,

};
