const request = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (res.status === 403) {
        localStorage.removeItem("auth");
      }
      const error = await res.json();
      throw new Error(error.message);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createOptions = (method = "get", data) => {
  let options = {
    method,
    headers: {},
  };
  
  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userInfo = localStorage.getItem("auth");
  const auth = JSON.parse(userInfo || {});
  if (userInfo && auth.accessToken != null) {
    options.headers["x-access-token"] = auth.accessToken;
  }
  return options;
};

//get , post , put, delete request methods

const get = (url) => {
    return request(url, createOptions());
}

const post = (url, data) => {
    return request(url, createOptions('post', data));
}

const put = (url, data) => {
    return request(url, createOptions('put', data));
}

const del = (url) => {
    return request(url, createOptions('delete'));
}


const handleResponse = (response) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
  
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
    })
  }
  
  export { get, post, put, del, handleResponse };
  