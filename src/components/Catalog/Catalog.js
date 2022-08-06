import React from "react";
import Search from "../Search/Search";
import ReactPaginate from "react-paginate";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShareContext } from "../../context/ShareContext";

import CatalogItem  from '../Catalog/CatalogItem/CatalogItem';

import './catalog.css';
export default function Catalog({itemsPerPage}) {

  const { shares } = useContext(ShareContext);

  //pagination settings
  const [currentItems, setCurrentItems] = useState([...shares]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  
  useEffect(() => {
    const endOffset = Number(itemOffset) + Number(itemsPerPage);
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(shares.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(shares.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, shares]);


  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % shares.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  
  return (
    <div>
      <section className="catalog-items">
        <h3 className="catalog-items-title">
          <i className="fa-solid fa-circle-arrow-right"></i>Всички споделяния
        </h3>
      <Search />
        <div className="catalog-wrapper">
          {shares?.length > 0 ? (
            currentItems.map((s) => <CatalogItem key={s._id} share={s}/>)
          ) : (
            <h3> No Records</h3>
          )}
          {/* <article className="catalog-item">
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
          </article> */}
        </div>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="pagination__link"
          nextClassName="page-item"
          nextLinkClassName="pagination__link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
        {/* Display paragraph: If there is no games  */}
      </section>
    </div>
  );
}
