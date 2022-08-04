import React from "react";

export default function CatalogItem() {
  return (
    <>
      <article className="catalog-item">
        <article className="catalog-item-img">
          <img src="./images/toys.jpg" alt="" />
        </article>
        <p className="catalog-item-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nobis
          sed fugiat ea consectetur est illo nam, totam quo assumenda iure
          accusantium mollitia necessitatibus magnam repudiandae qui quisquam
          cupiditate! Eveniet?
        </p>
        <button className="catalog-item-view">Преглед</button>
      </article>
    </>
  );
}
