import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileItem({ share }) {
    const navigate = useNavigate();
  return (
    <div>
      <a onClick={(e) => navigate(`/catalog/${share._id}`)}><li className="myShare-items">
        {share.title} {share.shortDesc}
      </li>
      </a>
    </div>
  );
}
