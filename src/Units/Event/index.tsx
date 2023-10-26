import React from "react";
import styles from "./styles.module.scss";

type EventProps = {
  color: "purple" | "teal" | "blue";
};

const Event: React.FC<EventProps> = ({ color }) => {
  return <div className={`${styles.event} ${styles[color]}`}></div>;
};

export default Event;
