import { forwardRef } from 'react';
import styles from './Input.module.scss';
import csn from 'classnames';

const Input = forwardRef(function Input({ className, isValid, ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={csn(className, styles.input, {
        [styles.invalid]: !isValid
      })}

    />
  );
});

export default Input;
