"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const PostureCard = ({ title, color, icon, description }) => {
  return (
    <div
      className={`rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-white ${color} transition-transform transform hover:scale-105`}
    >
      <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full mb-4">
        <FontAwesomeIcon icon={icon} className="text-3xl text-gray-800" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
      <p className="text-sm text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default PostureCard;