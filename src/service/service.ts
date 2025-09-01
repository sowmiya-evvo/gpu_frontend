import axios from "axios";
import { logOutEffect } from "../utils";

class Service {
  private service;
  private token;
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
    this.token = JSON.parse(window.localStorage.getItem("token") || "{}");
  }

  handleSuccess(response: any) {
    return response;
  }

  handleError = (error: any) => {
    if (
      error?.message === "Network request failed" ||
      error?.message === "Network Error"
    ) {
      console.log(
        "Network Error",
        "Please check your connection",
        "iconNoInet"
      );
    }

    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("initialData");
      alert("Token has expired, please relogin");
      logOutEffect();
    }
    return Promise.reject(error);
  };

  get(path: any, params: any, callback: any) {
    return this.service
      .get(path, {
        params,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getWithToken(path: any, params: any, callback: any) {
    return this.service
      .get(path, {
        params,
        headers: {
          Authorization: `Bearer ${params}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getArrayBuffer(path: any, params: any, callback: any) {
    return this.service
      .get(path, {
        params,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  getBlob(path: any, params: any, callback: any) {
    return this.service
      .get(path, {
        params,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postBlob(path: any, params: any, callback: any) {
    return this.service
      .post(path, {
        params,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  patch(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  put(put: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "PUT",
        url: put,
        responseType: "json",
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  putMultipartWithToken(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "PUT",
        url: path,
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  post(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postWithoutToken(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postMultipart(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postMultipartWithToken(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postArrayBuffer(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "arraybuffer",
        data: payload,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postWithoutHeader(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  delete(path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }

  postWithToken(token: any, path: any, payload: any, callback: any) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) =>
        callback ? callback(response.status, response.data) : response
      );
  }
}

export default new Service();
