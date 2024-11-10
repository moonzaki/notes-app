import NoteButton from '../NoteButton/NoteButton';
import './NoteAddButton.scss';

function NoteAddButton({ clearForm }) {

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <NoteButton className="note-add" onClick={clearForm}>
      <svg width="20" height="21" viewBox="0 0 20 21">
        <use href={`${baseUrl ? baseUrl + '/' : ''}sprite.svg#add-svg`}></use>
      </svg>
      New memory
    </NoteButton>
  );
}

export default NoteAddButton;
