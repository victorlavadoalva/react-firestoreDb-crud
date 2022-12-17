import React, { useState } from "react";
import Show from "./Show";

const Principal = () => {
  const [componentToShow, setComponentToShow] = useState("room");

  const handleClick = (e) => {
    setComponentToShow(e.target.name);
  };

  return (
    <>
      <h2>CRUD ROOMS - CLIENTS</h2>
      <div>
        <img
          src={require("../images/hotel.jpg")}
          onClick={handleClick}
          name="room"
          alt="ROOM"
          width={100}
          height={100}
        />
        <img
          src={require("../images/person.jpg")}
          onClick={handleClick}
          name="client"
          alt="CLIENT"
          width={100}
          height={100}
        />
      </div>

      <h3>
        {componentToShow === "room" ? (
          <Show name="rooms" />
        ) : (
          <Show name="clients" />
        )}
      </h3>
    </>
  );
};

export default Principal;
