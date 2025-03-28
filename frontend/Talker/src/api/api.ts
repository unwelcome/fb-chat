import axios from "axios";
import { DEVMODE, API, type ISignUp, type ILogIn } from "@/helpers/constants";
import { GET_COOKIE } from "@/helpers/functions";

//create account
export function API_SignUp(data: ISignUp) {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/signup`, data)
      .then(response => {
        if(DEVMODE) console.log('SignUp request success: ', response);
        resolve(response);
      })
      .catch(err => {
        if(DEVMODE) console.log('SignUp request error: ', err);
        reject(err);
      });
  });
}

//login into account
export function API_LogIn(data: ILogIn) {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/login`, data)
      .then(response => {
        if(DEVMODE) console.log('LogIn request success: ', response);
        resolve(response);
      })
      .catch(err => {
        if(DEVMODE) console.log('LogIn request error: ', err);
        reject(err);
      });
  });
}

//получение топ сикрет информейшн
export function API_GetSecretData(){
  return new Promise((resolve, reject) => {
    axios.get(`${API}/auth/secret`,  {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Sercet data get success: ', response);
      resolve(response);
    })
    .catch(err => {
      if(DEVMODE) console.log('Sercet data get error: ', err);
      reject(err);
    })
  });
};

//проверка аутентификации пользователя
// export function API_Authenticate(){
//   return new Promise((resolve, reject) => {
//     axios.get(`${API}/login`,  {
//       headers: {
//         Authorization: 'Bearer ' + GET_COOKIE('access_token'),
//       }
//      })
//     .then(response => {
//       if(DEVMODE) console.log('Authentication success: ', response);
//       resolve(response);
//     })
//     .catch(error => {
//       if(DEVMODE) console.log('Authentication error: ', error);
//       reject(error);
//     })
//   });
// };