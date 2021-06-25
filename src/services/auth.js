import axios from "axios";
import config from "@/config/app";

const auth = {
  async login(email, password) {
    if (email === null || !email.length) throw new Error("Empty value");
    if (password === null || !password.length) throw new Error("Empty value");

    return axios
      .post(`${config.API_LOCATION}/users/iniciar/login/`, { email, password })
      .then(({ data: { access_token } }) => access_token);
  },

  async register(user) {
    console.log(user.password, user.password_confirmation);
    if (user.password !== user.password_confirmation)
      throw new Error("Password not match");

    return axios.post(`${config.API_LOCATION}/users/create/cli/`, {
      ...user,
      fecha_nacimiento: user.fecha_nacimiento
        .split("-")
        .reverse()
        .join("-")
    });
  }
};

export default auth;
