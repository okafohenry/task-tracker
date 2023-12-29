
/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

// const API_USER_URL = 'http://localhost:4040/'
const API_USER_URL = "https://mock-api.binaryboxtuts.com/";

let access = "";
if (typeof window !== "undefined") {
  access = localStorage.getItem("tracka-token");
}

const requestHeader = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Binarybox-Api-Key": "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt"
};


export async function request(url, method, payload, token, text, form) {

  requestHeader["Authorization"] = token ? `Bearer ${access}` : "";
  // handle get method 
  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
    .then((res) => {
      if (text === true) {
        return res.text();
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw new Error(err);
      // return err;
    });

  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
