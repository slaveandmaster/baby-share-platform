import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as UserServices from '../../services/UserServices'


import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './profile.css';
import ProfileItem from './ProfileItem/ProfileItem';
export default function Profile() {

  const { auth } = useContext(AuthContext);

  console.log(auth);
  const userId = auth.id;
  const [userData, setUserData ] = useState();
  useEffect(() => {
      UserServices.getUserInfo(userId).then(res => {
      // console.log(res);
      setUserData(res);
    })
  },[])

// console.log(userData?.myShares)
  return (
    <div><section className="profile-container">
    <h2 className="profile-title">My Profile</h2>
    <div className="card">
        <img src="../images/no-profile-picture-icon.svg" alt="" className="profile-img"/>
        <h3 className='user-name'>{auth.username}</h3>
        <p className="profile-email">{userData?.email}</p>
        <p className="profile-role">Role: {auth.roles.join(',')}</p>
    </div>
</section>

<section className="share-container">
    <h1>All my shares</h1>
    {userData?.myShares.length > 0 ? (
            userData?.myShares.map((s,i) => <ul className='myShares'><ProfileItem  key={i + 1} share={s}/> </ul>)
          ) : (
            <h3> No Records</h3>
          )}
</section></div>
  )
}
