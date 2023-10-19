import React from 'react';
import styles from './styles.module.scss';

type DotProps = {
  color: 'purple' | 'teal' | 'blue';
};

const Dot: React.FC<DotProps> = ({ color }) => {
  return (
    <div className={`${styles.dot} ${styles[color]}`}></div>
  );
}

export default Dot;