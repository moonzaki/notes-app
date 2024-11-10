import './button.css';

function Button({ children, onClick, className, type }) {
  const classNames = `button accent ${className ? className : ''}`;
  return (
    <button className={classNames} onClick={onClick} type={type} > {children}</button >
  );
}

export default Button;
