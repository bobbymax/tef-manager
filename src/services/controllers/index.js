/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-named-as-default */
/* eslint-disable quotes */
/* eslint-disable no-return-await */
import axios from "axios";
import { API } from "../utils";
import authHeader from "./auth.header";

const options = {
  headers: authHeader(),
};

export const collection = async (url) =>
  await axios.get(`${API.url + url}`, options);

export const bulk = async (url, data) =>
  await axios.post(`${API.url + url}`, data, options);

export const fetch = async (url, id) =>
  await axios.get(`${API.url + url}/${id}`, options);

export const store = async (url, data) =>
  await axios.post(`${API.url + url}`, data, options);

export const alter = async (url, id, data) =>
  await axios.patch(`${API.url + url}/${id}`, data, options);

export const destroy = async (url, id) =>
  await axios.delete(`${API.url + url}/${id}`, options);

export const batch = async (...requests) => {
  const result = await axios.all(...requests);
  return Promise.resolve(result);
};
