import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import './details.css'

import * as ShareService from '../../../services/ShareService';

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ShareContext } from "../../../context/ShareContext";

import Rating from "./Rating/Rating";

export default function DetailsItem() {

    const {auth} = useContext(AuthContext);
    const { onDelete } = useContext(ShareContext);

    const {shareId} = useParams();
    const navigate = useNavigate();
    const [share, setShare] = useState([]);

    const isOwner = !!(auth.id === share.userInfo?.owner);
    const isAdmin = !!auth.isAdmin;

    // console.log(isOwner);

    // console.log(shareId);
    // console.log(share);
    //get share info
    useEffect(() => {
        ShareService.getById(shareId).then((data) => {
            
            setShare(data);
        })
    },[])
    const image = share.result?.imageUrl == "none.jpg" || share.result?.imageUrl == undefined ? '../images/no-image.jpg' : share.result?.imageUrl;
    
    
    //handlers
    const reviewClickHandler = (e) => {
      e.preventDefault();
      const { rating , comment } = new FormData(e.target);
      console.log(rating +"-"+ comment);
    }
    //delete
    const deleteClickHandler = (shareId) => {
        //console.log(shareId);
        ShareService.remove(shareId).then(res => {
            onDelete(shareId);
            navigate('/catalog');
        }).catch((err) => {
          console.log(err);
        })
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
            <li className="list-details-item">Name: {share.title}</li>
            <li className="list-details-item">Category: {share.category?.name}</li>
            <li className="list-details-item">
              Short Desc: {share.shortDesc}
            </li>
            <li className="list-details-item">
              Description: {share.description}
            </li>
            <li className="list-details-item">Contact: {share.userInfo?.email}</li>
          </ul>
          {(isOwner || isAdmin) && 
          
          <div className="product-buttons">
            <Link to={`/catalog/${share._id}/edit`}><button>Edit</button></Link><button onClick={() => deleteClickHandler(share._id)}>Delete</button>
          </div>
          }
        </article>
      </section>
      <section className="user-review">
        <article className="user-info">Published by: {share.userInfo?.username}</article>
        <Rating value={4}
            text={`1 reviews`} />
        <article className="user-raiting">Reviews: 50</article>
        <div className="reviews-list">
          <h3 className="review-header">Reviews:</h3>
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
          <form id="review" onSubmit={reviewClickHandler}>
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
            <input type="submit" value="Review" />
          </form>
        </article>
      </section>
    </div>
  );
}
