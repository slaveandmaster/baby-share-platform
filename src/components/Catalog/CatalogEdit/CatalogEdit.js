import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as ShareService from '../../../services/ShareService';
import { useContext } from "react";
import { ShareContext } from "../../../context/ShareContext";

export default function CatalogEdit() {
    const {shareId} = useParams();
    const [currentShare, setCurrentShare] = useState();
    const [selected, setSelected] = useState();
    const [categories, setCategories] = useState();
    const { onEdit } = useContext(ShareContext);
    console.log(shareId);
    console.log(selected)
    useEffect(() => {
        ShareService.shareBydId(shareId).then((data)=> {
            console.log(data);
            setCurrentShare(data);
        });
        ShareService.getCats().then((cat) => {
            console.log(cat);
            setCategories(cat);
        })
    },[])
    return (
        <div>
      <div>
        <section className="create-container">
          <form id="create">
            <div className="create-wrapper">
              <label htmlFor="title">Product</label>
              <input type="text" name="title" id="title" placeholder="" defaultValue={currentShare?.title} />
              <label htmlFor="category">Category</label>
              <select name="category" id="category" value={selected} onChange={(e) => setSelected(e.target.value)}>
                {/* <option value="">None</option>
                <option value="1">Clothes</option>
                <option value="2">Toys</option>
                const isSelected = currentShare?.category === cat.name;
                <option value="3">Accessories</option> */}
                {categories?.map((cat, i)=> (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
                {/* (
                  currentShare?.category == cat.name ?
                    <option selected value={cat.name}>
                      {cat.name}
                    </option>
                  :
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>) */}
              </select>
              <label htmlFor="imageUrl">Image</label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="image url"
                defaultValue={currentShare?.imageUrl}
              />
              <label htmlFor="shortDesc">Shrot Description</label>
              <input
                type="text"
                name="shortDesc"
                id="shortDesc"
                placeholder="short description"
                defaultValue={currentShare?.shortDesc}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                defaultValue={currentShare?.description}
              ></textarea>
              <input type="submit" className="btn submit" value="Create" />
            </div>
          </form>
          {/* <img className="logo-img" src="./images/logo2.png"/> */}
        </section>
      </div>
    </div>
  );
}
