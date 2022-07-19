import { API } from '../../API';
import axios from 'axios'
export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (localStorage.getItem("auth")) {
    return JSON.parse(localStorage.getItem("auth"));
    //return localStorage.getItem("auth");

  } else {
    return false;
  }
};

// export const user = async () => {
//   const { token } = JSON.parse(localStorage.getItem("auth"))
//   try {

//     const response = await axios
//       .get(`${'http://localhost:5000'}/api/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//     const userData = response.data.data
//     return userData
//   }

//   catch (err) {
//     console.log(err);
//   }
// }

export const signout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("userData");
  //window.location.replace('/')
  window.location.reload();
  return true;
};

