import React from 'react';
import * as ShareService from '../../services/ShareService';

import { useState, useEffect } from 'react';
import LastItems from './LastItems/LastItems';

export default function Home() {
    const [lastItems , setLastItems] = useState();

    useEffect(() => {
        ShareService.getLastFive().then((data) => {
            console.log(data.slice(0,4));
            let items = data.slice(0,4);
            setLastItems(items);

        })
    },[])

    //TODO map for items
  return (
    <div>
    <section className="last-items">
            <h3 className="last-items-title"><i className="fa-solid fa-circle-arrow-right"></i>Последно добавени</h3>
            <div className="item-wrapper">
                {lastItems && lastItems.map((item)=> (
                    <LastItems key={item._id} items={item} />
                ))}
        </div>
        </section>
        <section className="last-items">
            <h3 className="last-items-title"><i className="fa-solid fa-circle-arrow-right"></i>Топ 5 Дарителя</h3>
            <div className="top-item-wrapper">
                <ul className="top-list-avatars">
                    <li className="top-list-item"><img src="./images/avatrar.svg" alt="avatar"/></li>
                    <li className="top-list-item"><img src="./images/avatrar.svg" alt="avatar"/></li>
                    <li className="top-list-item"><img src="./images/avatrar.svg" alt="avatar"/></li>
                    <li className="top-list-item"><img src="./images/avatrar.svg" alt="avatar"/></li>
                    <li className="top-list-item"><img src="./images/avatrar.svg" alt="avatar"/></li>
                </ul>

            </div>
        </section>
    </div>
  )
}
