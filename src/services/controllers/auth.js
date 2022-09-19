/* eslint-disable quotes */
/* eslint-disable no-return-await */
import axios from "axios";
import { API } from "../utils";

export const login = async (data) => {
  const { email, password } = data;
  return await axios.post(`${API.url}login`, { email, password });
};
