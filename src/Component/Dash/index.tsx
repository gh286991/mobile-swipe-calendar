import React from "react";
import styles from "./styles.module.scss";

type DashProps = {
  color: "purple" | "teal" | "blue";
};

const Dash: React.FC<DashProps> = ({ color }) => {
  return <div className={`${styles.dash} ${styles[color]}`}></div>;
};

export default Dash;
