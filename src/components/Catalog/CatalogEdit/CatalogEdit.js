import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as ShareService from "../../../services/ShareService";
import { useContext } from "react";
import { ShareContext } from "../../../context/ShareContext";

export default function CatalogEdit() {
  const { shareId } = useParams();
  const [currentShare, setCurrentShare] = useState({
    title: '',
    category: '',
    imageUrl: '',
    shortDesc: '',
    description: '',
    isActive: ''
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { onEdit } = useContext(ShareContext);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setCurrentShare((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const onCheckBoxHandler = (e) => {
    setCurrentShare(values => ({ 
      ...values,
      [e.target.name] : e.target.type == "checkbox" ? e.target.checked : !e.target.checked
    }))
  }

  const updateItem = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    //let fields = Object.fromEntries(new FormData(e.target));
    const fields = {
      title: formData.get('title'),
      category: formData.get('category'),
      imageUrl: formData.get('imageUrl'),
      shortDesc: formData.get('shortDesc'),
      description: formData.get('description'),
      isActive: formData.get('isActive') == "on" ? true : false
    }
    console.log(fields)
    ShareService.update(shareId, fields).then(res => {
      console.log(res);
      onEdit(res);
      navigate('/catalog');
      
    }).catch((error) => {
      console.log(error);
    })
  }
  // console.log(shareId);
  // console.log(selected);
  // console.log(currentShare)
  useEffect(() => {
    ShareService.shareBydId(shareId).then((data) => {
      console.log(data);
      setCurrentShare(data);
    });
    ShareService.getCats().then((cat) => {
      console.log(cat);
      setCategories(cat);
    });
  }, [shareId]);
  // console.log(currentShare.category);
  return (
    <div>
      <pre>{JSON.stringify(currentShare)}</pre>
      <div>
        <section className="create-container">
          <form id="create" onSubmit={updateItem}>
            <div className="create-wrapper">
              <label htmlFor="title">Product</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder=""
                defaultValue={currentShare?.title}
              />
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
                defaultValue={currentShare?.imageUrl}
                onChange={onChangeHandler}
              />
              <label htmlFor="shortDesc">Shrot Description</label>
              <input
                type="text"
                name="shortDesc"
                id="shortDesc"
                placeholder="short description"
                defaultValue={currentShare?.shortDesc}
                onChange={onChangeHandler}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                defaultValue={currentShare?.description}
                onChange={onChangeHandler}
              ></textarea>
              <label htmlFor="isActive">Active</label>
              <input type="checkbox" name="isActive" checked={currentShare.isActive} onChange={onCheckBoxHandler}/>
              <input type="submit" className="btn submit" value="Create" />
            </div>
          </form>
          {/* <img className="logo-img" src="./images/logo2.png"/> */}
        </section>
      </div>
    </div>
  );
}
