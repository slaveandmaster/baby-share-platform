import React from "react";
import './catalog.css';
export default function Catalog() {
  return (
    <div>
      <section className="catalog-items">
        <h3 className="catalog-items-title">
          <i className="fa-solid fa-circle-arrow-right"></i>Всички споделяния
        </h3>
        <div className="catalog-wrapper">
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/toys.jpg" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/toys2.jpg" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/toys3.jpg" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/maze-and-puzzles.jfif" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/maze-and-puzzles.jfif" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
          <article className="catalog-item">
            <article className="catalog-item-img">
              <img src="./images/maze-and-puzzles.jfif" alt="" />
            </article>
            <p className="catalog-item-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              nobis sed fugiat ea consectetur est illo nam, totam quo assumenda
              iure accusantium mollitia necessitatibus magnam repudiandae qui
              quisquam cupiditate! Eveniet?
            </p>
            <button className="catalog-item-view">Преглед</button>
          </article>
        </div>
      </section>
    </div>
  );
}
