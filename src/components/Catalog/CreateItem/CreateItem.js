import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as ShareService from "../../../services/ShareService";
import { useContext } from "react";
import { ShareContext } from "../../../context/ShareContext";

import "./create.css";

export default function CreateItem() {
  const [currentShare, setCurrentShare] = useState({
    title: "",
    category: "",
    imageUrl: "",
    shortDesc: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const isValid = !Object.values(errors).some((x) => x);

  const [categories, setCategories] = useState([]);

  const { onCreate } = useContext(ShareContext);

  const navigate = useNavigate();

  //get categories
  useEffect(() => {
    ShareService.getCats().then((res) => {
      setCategories(res);
    });
  }, []);

  //handlers
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setCurrentShare((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const onCreateItemHandler = (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    ShareService.create(fields)
      .then((res) => {
        console.log(res);
        onCreate(res);
        navigate("/catalog");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //TODO VALIDATIONS
  const validateName = (e, minlen, maxlen) => {
    setErrors((errors) => ({
      ...errors,
      [e.target.name]:
        e.target.value.length < minlen || e.target.value.length > maxlen,
    }));
  };

  return (
    <div>
      <pre>{JSON.stringify(errors)}</pre>
      <section className="create-container">
        <form id="create" onSubmit={onCreateItemHandler}>
          <div className="create-wrapper">
            <label htmlFor="title">Product</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder=""
              onChange={onChangeHandler}
              onBlur={(e) => validateName(e, 4, 20)}
            />
            {errors.title && (
              <p className="form-error">
                Name should be at least 4 characters long and max 20!
              </p>
            )}
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={currentShare.category[0]?._id}
              onChange={onChangeHandler}
            >
              <option value="">Select Category</option>

              {categories.length > 0 &&
                categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
            </select>
            <label htmlFor="imageUrl">Image</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="image url"
              onChange={onChangeHandler}
            />
            <label htmlFor="email">Short Description</label>
            <input
              type="text"
              name="shortDesc"
              id="shortDesc"
              placeholder="short description"
              onChange={onChangeHandler}
              onBlur={(e) => validateName(e, 10, 20)}
            />
            {errors.shortDesc && (
              <p className="form-error">
                Short Description should be at least 10 characters long and max
                20!
              </p>
            )}
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={onChangeHandler}
              onBlur={(e) => validateName(e, 10, 150)}
            ></textarea>
            {errors.description && (
              <p className="form-error">
                Description should be at least 10 characters long and max 150!
              </p>
            )}
            <input
              type="submit"
              className="btn submit"
              disabled={!isValid}
              value="Create"
            />
          </div>
        </form>
        {/* <img className="logo-img" src="./images/logo2.png"/> */}
      </section>
    </div>
  );
}
