import React from "react";
import * as ShareService from "../../services/ShareService";
import * as UserService from "../../services/UserServices";

import { useState, useEffect } from "react";
import LastItems from "./LastItems/LastItems";
import TopUsers from "./TopUsers/TopUsers";

export default function Home() {
  const [lastItems, setLastItems] = useState();
  const [topUsers, setTopUsers] = useState();

  useEffect(() => {
    ShareService.getLastFive().then((data) => {
      console.log(data.slice(0, 4));
      let items = data.slice(0, 4);
      setLastItems(items);
    });
    UserService.getTopUsers().then((top) => {
      console.log(top.slice(0, 5));
      setTopUsers(top.slice(0, 5));
    });
  }, []);

  //TODO map for items
  return (
    <div>
      <section className="slogon">
        <p><q>When you make a child happy, the best gift you will ever get will be the smile of that child!</q></p>
      </section>
      <section className="last-items">
        <h3 className="last-items-title">
          <i className="fa-solid fa-circle-arrow-right"></i>Последно добавени
        </h3>
        <div className="item-wrapper">
          {lastItems &&
            lastItems.map((item) => <LastItems key={item._id} items={item} />)}
        </div>
      </section>
      <section className="last-items">
        <h3 className="last-items-title">
          <i className="fa-solid fa-circle-arrow-right"></i>Топ 5 Потребителя
        </h3>
        <div className="top-item-wrapper">
          <ul className="top-list-avatars">
            {topUsers &&
              topUsers.map((user) => (
                <TopUsers key={user._id} userList={user} />
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
