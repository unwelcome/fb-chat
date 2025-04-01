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

//create session account
export function API_SessionRegister(data: ISignUp) {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/register`, data)
      .then(response => {
        if(DEVMODE) console.log('Register post success: ', response);
        resolve(response);
      })
      .catch(err => {
        if(DEVMODE) console.log('Register post error: ', err);
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

//login into session account
export function API_SessionLogIn(data: ILogIn) {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/login`, data)
      .then(response => {
        if(DEVMODE) console.log('LogIn post success: ', response);
        resolve(response);
      })
      .catch(err => {
        if(DEVMODE) console.log('LogIn post error: ', err);
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

//session logout
export function API_SessionLogout(){
  return new Promise((resolve, reject) => {
    axios.post(`${API}/logout`)
    .then(response => {
      if(DEVMODE) console.log('Logout post success: ', response);
      resolve(response);
    })
    .catch(err => {
      if(DEVMODE) console.log('Logout post error: ', err);
      reject(err);
    })
  });
};

//получение session profile
export function API_SessionProfile(){
  return new Promise((resolve, reject) => {
    axios.get(`${API}/profile`)
    .then(response => {
      if(DEVMODE) console.log('Profile get success: ', response);
      resolve(response);
    })
    .catch(err => {
      if(DEVMODE) console.log('Profile get error: ', err);
      reject(err);
    })
  });
};

//получение session data
export function API_SessionData(){
  return new Promise((resolve, reject) => {
    axios.get(`${API}/data`)
    .then(response => {
      if(DEVMODE) console.log('Data get success: ', response);
      resolve(response);
    })
    .catch(err => {
      if(DEVMODE) console.log('Data get error: ', err);
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