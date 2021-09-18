import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ onLoadMore }) {
  return (
    <div className={styles.Button_wrapper}>
      <button type="button" className={styles.Button} onClick={onLoadMore}>
        Завантижи ще <BiChevronsDown className={styles.arrow} />
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
