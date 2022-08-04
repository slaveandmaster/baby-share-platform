import React from 'react'
import './profile.css';
export default function Profile() {
  return (
    <div><section className="profile-container">
    <h2 className="profile-title">My Profile</h2>
    <div className="card">
        <img src="../images/no-profile-picture-icon.svg" alt="" className="profile-img"/>
        <h3>John Doe</h3>
        <p className="profile-email">John@abv.bg</p>
        <p className="profile-role">Role: User</p>
        <p className="profile-phone">Phone: 0888 888 888</p>
    </div>
</section>

<section className="share-container">
    <h1>All my shares</h1>
</section></div>
  )
}
