import './NoteButton.scss';

function NoteButton({ children, className, onClick }) {
  const classNames = `note-button ${className ? className : ''}`;
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

export default NoteButton;
