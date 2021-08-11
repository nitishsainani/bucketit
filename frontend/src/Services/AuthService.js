import axios from "axios";
import { BASE_URL } from "./Constants";
const ls = require('local-storage');

class AuthService {
  static keys = {
    accessToken: 'accessToken',
    accessExpireDate: 'accessExpireDate',
    refreshToken: 'refreshToken',
    refreshExpireDate: 'refreshExpireDate',
    userObject: 'userObject',
  }

  static async refreshToken() {
    let res = await axios.post(BASE_URL + 'auth/refresh-tokens', {refreshToken: await ls.get(this.keys.refreshToken)})
    await this.setAccessToken(res.data.access);
    await this.setRefreshToken(res.data.refresh);
  }

  static async isLogin() {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const isLogin = await parseInt(await ls.get(this.keys.refreshExpireDate)) > date.getTime();
    !isLogin && await this.logout();
    return isLogin;
  }

  static async getAuthorizationHeader() {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    if(parseInt(await ls.get(this.keys.accessExpireDate)) > date.getTime()) {
      return {
        Authorization: "Bearer " + await ls.get(this.keys.accessToken),
      }
    } else if (parseInt(await ls.get(this.keys.refreshExpireDate)) < date.getTime()){
      ls.clear()

    } else {
      await this.refreshToken();
      return {
        Authorization: "Bearer " + await ls.get(this.keys.accessToken),
      }
    }
  }

  static async logout() {
    return ls.clear();
  }

  static async setRefreshToken(refreshTokenData) {
    await ls.set(this.keys.refreshToken, refreshTokenData.token);
    await ls.set(this.keys.refreshExpireDate, Date.parse(refreshTokenData.expires));
  }

  static async setAccessToken(accessTokenData) {
    await ls.set(this.keys.accessToken, accessTokenData.token);
    await ls.set(this.keys.accessExpireDate, Date.parse(accessTokenData.expires));
  }

  static async setUserObject(user) {
    await ls.set(this.keys.userObject, user);
    console.log(await this.getLoggedInUserObject());
  }

  static async getLoggedInUserObject() {
    return await ls.get(this.keys.userObject);
  }

  static async register(firstName, lastName, email, password) {
    let res = await axios.post(BASE_URL + 'auth/register/', {firstName, lastName, email, password}, );
    await this.setRefreshToken(res.data.tokens.refresh);
    await this.setAccessToken(res.data.tokens.access);
    await this.setUserObject(res.data.user);
  }

  static async login(email, password) {
    let res = await axios.post(BASE_URL + 'auth/login/', {email, password},);
    await this.setRefreshToken(res.data.tokens.refresh);
    await this.setAccessToken(res.data.tokens.access);
    await this.setUserObject(res.data.user);
  }
}

export default AuthService;
