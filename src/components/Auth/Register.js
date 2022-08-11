import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./login.css";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { onRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  //validate fields
  const validateName = (formValue) => {
    const errors = {};
    const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formValue.username) {
      errors.username = "Username is required!";
    } else if (formValue.username.length < 3) {
      errors.username =
        "Username must be at least 3 characters long and maximum 20";
    } else if (formValue.username.length > 20) {
      errors.username = "Username must be no more than 20 characters";
    }
    if (!formValue.email) {
      errors.email = "Email is required!";
    } else if (!mailPattern.test(formValue.email)) {
      errors.email = "Input valid email address!";
    }
    if (!formValue.password) {
      errors.password = "Password is required!";
    } else if (formValue.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (formValue.password.length > 20) {
      errors.password = "Password length must be max 20 characters";
    }

    return errors;
  };

  //error handling
  useEffect(() => {
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPass } = Object.fromEntries(
      new FormData(e.target)
    );
    console.log(password);
    const confirmPassword = new FormData(e.target).get("confPassword");
    if (password != confirmPassword) {
      toast.error("Password don`t mactch!");
      return;
    }
    //TODO form validation and fix error handling on request
    register(username, email, password)
      .then((res) => {
        if (res.code === 409) {
          return;
        }
        onRegister(res);
        toast.success("Register Successfully!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message.split(":")[1]);
      });
    console.log(username);
  };

  return (
    <div>
      <pre>
        {JSON.stringify(errors, null, 2)}
        {JSON.stringify(values, null, 2)} {JSON.stringify(isDisabled)}
      </pre>
      <section className="register-container">
        <img className="logo-img" src="../images/logo2.png" />
        <form id="register" onSubmit={onSubmit}>
          <div className="register-wrapper">
            {errors.length > 0 &&
              Object.values(errors).map((err) => {
                console.log(err);
                return <p>{err}</p>;
              })}
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={onChangeHandler}
              onBlur={(e) => setErrors(validateName(values))}
            />
            {errors.username && <p className="form-error">{errors.username}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="John@abv.bg"
              onChange={onChangeHandler}
              onBlur={(e) => setErrors(validateName(values))}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChangeHandler}
              onBlur={(e) => setErrors(validateName(values))}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
            <label htmlFor="confPassword">Confirm Password</label>
            <input
              type="password"
              name="confPassword"
              id="confPassword"
              onChange={onChangeHandler}
              onBlur={(e) => setErrors(validateName(values))}
            />
            <input
              type="submit"
              className="btn submit"
              disabled={isDisabled}
              value="Register"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
