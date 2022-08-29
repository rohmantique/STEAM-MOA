import { atom } from "recoil";
import jwt_decode from 'jwt-decode';


const authToken = sessionStorage.getItem('token')
let userId = null
if (authToken) {
  const decoded =  jwt_decode(authToken);
  userId = decoded.sub
}


export const auth = atom({
  key: "auth",
  default: {
    isLoggedIn:(authToken ? true: false), //인증상태
    token:(authToken ? authToken:null), //access token
    userId: userId,
  },
});
