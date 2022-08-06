import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import * as ShareService from '../../../services/ShareService';
import { useContext } from 'react';
import { ShareContext } from '../../../context/ShareContext';

import './create.css';

export default function CreateItem() {

  const [currentShare, setCurrentShare] = useState({
    title: '',
    category: '',
    imageUrl: '',
    shortDesc: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);

  const { onCreate } = useContext(ShareContext);

  const navigate = useNavigate();


  //get categories
  useEffect(() => {
    ShareService.getCats().then(res => {
      setCategories(res);
    });
  },[]);

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
    ShareService.create(fields).then(res => {
      console.log(res);
      onCreate(res);
      navigate('/catalog');
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div><section className="create-container">
    <form id="create" onSubmit={onCreateItemHandler}>
        <div className="create-wrapper">
            <label htmlFor="title">Product</label>
            <input type="text" name="title" id="title" placeholder="" />
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
            <input type="text" name="imageUrl" id="imageUrl"  placeholder="image url"/>
            <label htmlFor="email">Shrot Description</label>
            <input type="text" name="shortDesc" id="shortDesc" placeholder="short description" />
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10"></textarea>
            <input type="submit" className="btn submit" value="Create" />
        </div>
    </form>
    {/* <img className="logo-img" src="./images/logo2.png"/> */}
</section></div>
  )
}
