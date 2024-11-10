import NoteButton from '../NoteButton/NoteButton';
import './NoteAddButton.scss';

function NoteAddButton({clearForm}) {
  return (
    <NoteButton className="note-add" onClick={clearForm}>
      <svg width="20" height="21" viewBox="0 0 20 21">
        <use href="/sprite.svg#add-svg"></use>
      </svg>
      New memory
    </NoteButton>
  );
}

export default NoteAddButton;
