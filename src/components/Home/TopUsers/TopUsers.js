import React from 'react'

export default function TopUsers({userList}) {
  return (
    <div>
    <li className="top-list-item"><img src="./images/avatar.jpg" alt="avatar"/>{userList.username}</li>
    </div>
  )
}
