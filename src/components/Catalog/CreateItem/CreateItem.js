import React from 'react'
import './create.css';

export default function CreateItem() {
  return (
    <div><section className="create-container">
    <form id="create">
        <div className="create-wrapper">
            <label htmlFor="title">Product</label>
            <input type="text" name="title" id="title" placeholder="" />
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
                <option value="">None</option>
                <option value="1">Clothes</option>
                <option value="2">Toys</option>
                <option value="3">Accessories</option>
            </select>
            <label htmlFor="password">Image</label>
            <input type="password" name="imageUrl" id="imageUrl"  placeholder="image url"/>
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
