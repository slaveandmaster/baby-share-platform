import React from "react";
import { Link } from "react-router-dom";

export default function CatalogItem({share}) {
  const image = share.imageUrl == "none.jpg" || share.imageUrl == undefined ? './images/no-image.jpg' : share.imageUrl;
  return (
    <>
      <article className="catalog-item">
        <article className="catalog-item-img">
          <img src={image} alt="" />
        </article>
        <p className="catalog-item-desc">
          {share.shortDesc}
        </p>
        <Link to={`/catalog/${share._id}`}><button  className="catalog-item-view">Преглед</button></Link>
      </article>
    </>
  );
}
