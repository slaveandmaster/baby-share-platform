import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import './details.css'

import * as ShareService from '../../../services/ShareService';
import * as UserService from '../../../services/UserServices';

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ShareContext } from "../../../context/ShareContext";

import Rating from "./Rating/Rating";
import { toast } from "react-toastify";
import Review from "./Review/Review";

export default function DetailsItem() {

    const {auth} = useContext(AuthContext);
    const { onDelete } = useContext(ShareContext);

    const {shareId} = useParams();
    const navigate = useNavigate();
    const [share, setShare] = useState([]);
    const [review, setReview] = useState();

    const isOwner = !!(auth.id === share.userInfo?.owner);
    const isAdmin = !!auth.isAdmin;
    console.log(share);
    // console.log(isOwner);

    // console.log(shareId);
    // console.log(share);
    //get share info
    useEffect(() => {
        ShareService.getById(shareId).then((data) => {
            // console.log(data.ownerId[0].reviews);
            // console.log(data.ownerId[0]._id);
            setShare(data);
            //get user reviews
            UserService.getUserReview(data.ownerId[0]._id).then(res=> {
              setReview(res);
            })
        });
      },[])
      const image = share.result?.imageUrl == "none.jpg" || share.result?.imageUrl == undefined ? '../images/no-image.jpg' : share.result?.imageUrl;
      console.log(review);
      //handlers
      const reviewClickHandler = (e) => {
        e.preventDefault();
        let alreadyReviewd = !!share?.ownerId[0].reviews.find(
          
          (r) => r.user.toString() === auth.id.toString());
          if (alreadyReviewd) {
            alert('You are already voted!');
            return;
          } 
          const {rating, comment} = Object.fromEntries(new FormData(e.target));
          //create request to make rating
          UserService.createReview(share.userInfo?.owner, rating, comment).then(res => {
            //update review
           setReview(res.info);
           toast.success('Review was added successfully')

          })
          //reset uncontrolled form
          e.target.reset()
    }
    console.log(review);
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
        <Rating value={review?.rating}
            />
        <article className="user-raiting">Reviews: {review?.numReviews}</article>
        <div className="reviews-list">
          <h3 className="review-header">Reviews:</h3>
          {review?.reviews.length > 0 ? (
            review?.reviews.map((r) => <Review key={r._id} reviewItem={r}/>)
          ) : (
            <h3> No Records</h3>
          )}
          {/* <article className="review-item">
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
          </article> */}
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
            <textarea id="comment" name="comment"></textarea>
            <input type="submit" value="Review" />
          </form>
        </article>
      </section>
    </div>
  );
}
