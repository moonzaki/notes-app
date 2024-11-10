import NoteAddButton from './components/NoteAddButton/NoteAddButton';
import NoteList from './components/NoteList/NoteList';
import Sidebar from './layouts/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Content from './layouts/Content/Content';
import NoteForm from './components/NoteForm/NoteForm';
import useLocalStorage from './hooks/use-local-storage.hook';
import './App.css';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';


function mapItems(arrayItems) {
  if (!arrayItems) {
    return [];
  }

  return arrayItems.map(i => ({
    ...i,
    date: new Date(i.date)
  }));
}


function App() {
  const [items, setItems] = useLocalStorage('data');
  const [currentItem, setCurrentItem] = useState(null);



  const updateNoteList = item => {
    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if (i.id === item.id) {
          return {
            ...item
          };
        }
        return i;
      })]);
    }
  };

  const deleteItem = item => {
    setItems([...mapItems(items)].filter(i => i.id !== item.id));
  };

  return (
    <UserContextProvider>
      <div className='app'>
        <Sidebar>
          <Header />
          <NoteAddButton clearForm={() => { setCurrentItem(null); }} />
          <NoteList
            items={mapItems(items)}
            data={currentItem}
            setCurrentItem={setCurrentItem} />
        </Sidebar>
        <Content>
          <NoteForm
            callback={updateNoteList}
            data={currentItem}
            setCurrentItem={setCurrentItem}
            currentItem={currentItem}
            delItem={deleteItem}
          />
        </Content>
      </div>
    </UserContextProvider>
  );
}

export default App;
