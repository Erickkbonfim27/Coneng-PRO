import React from "react";
import Style from "./card.modules.css";

export default function card({
  title,
  respeito,
  ponntualidade,
  avaliation,
  usuoepi,
  ranking,
  nivel,
  grauSatisfacoo,
}) {
  return (
    <div>
      <h4>{title}</h4>
      <div className={Style.infos}>
        <span>
          <p>{avaliation}</p>
        </span>
        <span>
          <p>{usuoepi}</p>
        </span>
        <span>
          <p>{ranking}</p>
        </span>
        <span>
          <p>{nivel}</p>
        </span>
        <span>
          <p>{grauSatisfacoo}</p>
        </span>
      </div>
    </div>
  );
}
