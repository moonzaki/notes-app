import { useContext } from 'react';
import NoteButton from '../NoteButton/NoteButton';
import NoteItem from '../NoteItem/NoteItem';
import './NoteList.scss';
import { UserContext } from '../../context/user.context';

function NoteList({ items, data, setCurrentItem }) {
  const { userId } = useContext(UserContext);
  const { id } = data ? data : { id: null };
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
  };

  if (items.length === 0) {
    return <p className='note-empty'>Add you`r notes</p>;
  }

  return (
    <>
      <div className="note-list">
        {items
          .filter(el => el.userId === userId)
          .sort(sortItems)
          .map(item => (
            <NoteButton
              key={item.id}
              className={id && id === item.id ? 'active' : ''}
              onClick={() => setCurrentItem(item)}
            >
              <NoteItem
                title={item.title}
                date={item.date}
                post={item.post} />
            </NoteButton>)
          )}
      </div>
    </>
  );
}

export default NoteList;
