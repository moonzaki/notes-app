import './NoteButton.scss';

function NoteButton({ children, className, ...props }) {
  const classNames = `note-button ${className ? className : ''}`;
  const { onClick } = props;
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

export default NoteButton;
