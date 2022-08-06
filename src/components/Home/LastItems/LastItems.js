import React from "react";
import { Link } from "react-router-dom";
export default function LastItems({items}) {
  return (
    <div>
      <article className="item">
        <article className="item-img">
          <img src="./images/toys.jpg" alt="" />
        </article>
        <p className="item-desc">
          {items.shortDesc}
        </p>
        <Link to={`/catalog/${items._id}`}><button className="item-view">Преглед</button></Link>
      </article>
    </div>
  );
}
