import { BASE_URL } from "./Constants";
import axios from "axios";
import AuthService from "./AuthService";


class ProfileService {
  static async editProfile(firstName, lastName, portfolioLink, aboutMe, profession, profileImage, ) {
    let res = axios.patch(
      BASE_URL + 'profile/',
      {firstName, lastName, portfolioLink, aboutMe, profession, profileImage, },
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }

  static async getProfile() {
    let res = axios.get(
      BASE_URL + 'profile/',
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }
}

export default ProfileService;
