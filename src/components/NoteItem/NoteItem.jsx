import './NoteItem.scss';

function NoteItem({ title, date, post }) {
  const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

  return (
    <>
      <h2 className="note-item__title">{title}</h2>
      <div className="note-item__body">
        <div className="note-item__date">{formatedDate}</div>
        <div className="note-item__text">{post}</div>
      </div>
    </>
  );
}

export default NoteItem;
