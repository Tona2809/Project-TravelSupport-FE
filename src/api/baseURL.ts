export const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Authentication
export const SIGN_IN = BASE_URL + "authenticate/login";
export const REFRESH_TOKEN = BASE_URL + "authenticate/refreshtoken";

//Email
export const EMAIL_VERIFY = BASE_URL + "authenticate/verify";

//Owner
export const REGISTER_FOR_OWNER = BASE_URL + "authenticate/owner";
export const SEND_EMAIL_FOR_OWNER = BASE_URL + "authenticate/sendOwnerRegister";
export const GET_OWNER_STAY = BASE_URL + "stay/OwnedStay";

// Customer
export const REGISTER_FOR_CUSTOMER = BASE_URL + "authenticate/create/customer";
export const ADD_STAY_INTO_LIKELIST = BASE_URL + "stay/likeList";

//Booking
export const BOOKING = BASE_URL + "booking";
export const BOOKING_BY_PAYPAL_CANCEL = BOOKING + "booking/pay/cancel";
export const BOOKING_BY_PAYPAL_SUCCESS = BOOKING + "booking/pay/success";

//Province
export const PROVINCE = BASE_URL + "province";
export const IMAGE_FOR_PROVINCE = PROVINCE + "/image";

//Review
export const REVIEW = BASE_URL + "review";

//Stay
export const STAY = BASE_URL + "stay";
export const SEARCH_STAY_BY_PROVINCE = STAY + "/paging";
export const SEARCH_STAY_BY_CRITERIA = STAY + "/search";
export const GET_AMENITIES_BY_STAY = STAY + "/stayAmenities";
export const IMAGE_FOR_STAY = STAY + "/image";
export const STAY_RATING = BASE_URL + "stayrating";
export const GET_RATING_BY_STAY = BASE_URL + "stayrating/getByStay";

//User
export const USER = BASE_URL + "user";
export const SEARCH_USER_BY_CRITERIA = USER + "/search";
