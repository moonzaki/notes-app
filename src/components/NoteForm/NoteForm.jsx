import { useEffect, useReducer, useRef, useContext } from 'react';
import Button from '../Button/Button';
import styles from './NoteForm.module.scss';
import { INITIAL_STATE, formReducer } from './NoteForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function NoteForm({ callback, data, setCurrentItem, delItem }) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
      default:
        throw new Error();
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data, userId]);


  useEffect(() => {
    let timerId;
    if (!isValid.title
      || !isValid.date
      || !isValid.post) {
      timerId = setTimeout(() => {
        focusError(isValid);
        dispatchForm({ type: 'RESET_VALIDYTY' });
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      callback(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
      setCurrentItem(null);
    }
  }, [callback, isFormReadyToSubmit, values, userId, setCurrentItem]);


  const addNoteItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };
  
  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);
  
  const onChangeValue = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
  };
  
  const delCurrentItem = (item) => {
    if (item) {
      delItem(item);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
      setCurrentItem(null);
    }
  };
  
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <form className={styles['note-form']} onSubmit={addNoteItem}>
      <div className={styles['input-wrapper']}>
        <Input
          type="text"
          name="title"
          value={values.title}
          onChange={onChangeValue}
          isValid={isValid.title}
          ref={titleRef}
          placeholder='Entry title' />
        <div className={styles.user}>{userId}</div>
        {data?.id && <Button
          type="button"
          className={styles.delete}
          onClick={() => { delCurrentItem(data); }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href='/sprite.svg#delete-svg'></use>
          </svg>
        </Button>}
      </div>
      <div className={styles['input-wrapper']}>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="/sprite.svg#date-svg"></use>
        </svg>
        <p>Date</p>
        <Input
          type="date"
          name="date"
          isValid={isValid.date}
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          onChange={onChangeValue}
          ref={dateRef} />
      </div>
      <div className={styles['input-wrapper']}>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href={`/${baseUrl? baseUrl + '/' : ''}sprite.svg#tag-svg`}></use>
        </svg>
        <p>Tags</p>
        <input
          type="text"
          placeholder='Entry tag'
          value={values.tag}
          onChange={onChangeValue}
          className={`${styles.input}`}
          name="tag" />
      </div>
      <textarea
        type="textarea"
        name="post"
        value={values.post}
        onChange={onChangeValue}
        ref={postRef}
        id=""
        rows='10' cols='10'
        placeholder='Entry post'
        className={`${styles.input} ${isValid.post ? '' : styles.invalid}`} />
      <Button>Save</Button>
    </form >
  );
}

export default NoteForm;
