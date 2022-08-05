import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import './details.css'

import * as ShareService from '../../../services/ShareService';

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function DetailsItem() {

    const {auth} = useContext(AuthContext);
    const {shareId} = useParams();
    const navigate = useNavigate();
    const [share, setShare] = useState([]);

    console.log(shareId);

    //get share info
    useEffect(() => {
        ShareService.getById(shareId).then((data) => {
            
            setShare(data);
        })
    },[])
    const image = share.result?.imageUrl == "none.jpg" || share.result?.imageUrl == undefined ? '../images/no-image.jpg' : share.result?.imageUrl;
    
    
    //handlers

    //delete
    const deleteClickHandler = (shareId) => {
        console.log(shareId);
        console.log("delete");
    }
  return (
    <div>
      <section className="details-container">
        <article className="product-image">
          <img src={image} alt="" />
        </article>
        <article className="product-info">
          <ul className="list-details">
            <li className="list-details-item">Name: {share.result?.title}</li>
            <li className="list-details-item">Category: {share.result?.category}</li>
            <li className="list-details-item">
              Short Desc: {share.result?.shortDesc}
            </li>
            <li className="list-details-item">
              {share.result?.description}
            </li>
            <li className="list-details-item">Contact: {share.userInfo?.email}</li>
          </ul>
          <div className="product-buttons">
            <Link to={`/catalog/${share.result?._id}/edit`}><button>Edit</button></Link><button onClick={() => deleteClickHandler(share.result?._id)}>Delete</button>
          </div>
        </article>
      </section>
      <section className="user-review">
        <article className="user-info">Published by: {share.userInfo?.username}</article>
        <article className="user-raiting">Reviews: 50</article>
        <div className="reviews-list">
          <h3>Reviews:</h3>
          <article className="review-item">
            <p className="review-author">Peter Jackson</p>
            <p className="review-comment">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusamus eius, neque inventore sunt deserunt vero quidem a,
              dolorum modi pariatur in, maxime aperiam dolores adipisci laborum
              velit reprehenderit eveniet ut.
            </p>
          </article>
          <article className="review-item">
            <p className="review-author">Peter Jackson</p>
            <p className="review-comment">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusamus eius, neque inventore sunt deserunt vero quidem a,
              dolorum modi pariatur in, maxime aperiam dolores adipisci laborum
              velit reprehenderit eveniet ut.
            </p>
          </article>
          <article className="review-item">
            <p className="review-author">Peter Jackson</p>
            <p className="review-comment">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusamus eius, neque inventore sunt deserunt vero quidem a,
              dolorum modi pariatur in, maxime aperiam dolores adipisci laborum
              velit reprehenderit eveniet ut.
            </p>
          </article>
        </div>
        <article className="review-comments">
          <form id="review">
            <label htmlFor="rating">Rating</label>
            <select name="rating" id="rating">
              <option value=""></option>
              <option value="1">Bad</option>
              <option value="2">Fair</option>
              <option value="3">Good</option>
              <option value="4">Very Good</option>
              <option value="5">Excelent</option>
            </select>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment"></textarea>
            <input type="submit" value="Submit" />
          </form>
        </article>
      </section>
    </div>
  );
}
