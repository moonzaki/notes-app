import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user.context';
import useLocalStorage from '../../hooks/use-local-storage.hook';
import styles from './SelectUser.module.scss';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const [storage, setStorage] = useLocalStorage('storage', {});

  useEffect(() => {
    if (!Object.hasOwn(storage, 'state')) {
      setStorage({
        ...storage,
        state: {
          ...storage.state,
          token: userId
        }
      });
    }
  }, [userId, setStorage, storage.state, storage]);

  const changeUser = (e) => {
    setUserId(+e.target.value);
    setStorage({ ...storage, state: { ...storage.state, token: +e.target.value } });
  };

  return (
    <select className={styles.select} name="user" id="user" value={userId} onChange={changeUser}>
      <option value="1">User-1</option>
      <option value="2">User-2</option>
    </select>
  );
}

export default SelectUser;
