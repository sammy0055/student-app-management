import axios from "./axios";

export const signup_student = (studentData) => {
  return axios({
    method: "POST",
    url: "/signUp_student",
    data: studentData,
  });
};

export const signUp_staff = (staffData) => {
  return axios({
    method: "POST",
    url: "/signUp_staff",
    data: staffData,
  });
};

export const logIn = (data) => {
  return axios({
    method: "POST",
    url: "/login",
    data: data,
  });
};

export const getUser = (token) => {
  return axios({
    method: "GET",
    url: "/getCurentUser",
    headers: { Authorization: token },
  });
};

export const getCourse = (data, token) => {
  return axios({
    method: "POST",
    url: "/getCourse",
    data: data,
    headers: { Authorization: token },
  });
};

export const AddCourse = (data, token) => {
  return axios({
    method: "POST",
    url: "/AddCourse",
    data: data,
    headers: { Authorization: token },
  });
};

export const updateCourse = (data, token) => {
  return axios({
    method: "put",
    url: "/updateCourse",
    data: data,
    headers: { Authorization: token },
  });
};
