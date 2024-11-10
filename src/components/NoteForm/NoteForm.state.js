export const INITIAL_STATE = {
  isValid: {
    title: true,
    date: true,
    post: true
  },
  values: {
    title: '',
    date: '',
    post: '',
    tag: ''
  },
  isFormReadyToSubmit: false
};

//State - предыдущее состояние
//Action - то что нужно сделать, будет иметь тип и будет иметь доп. данные (пейлоад)
export const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_VALUE':
      return {
        ...state, values: {
          ...state.values, ...action.payload
        }
      };
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'CLEAR':
      return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false };
    case 'RESET_VALIDYTY':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'SUBMIT': {
      const titletValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      const postValidity = state.values.post?.trim().length;
      return {
        ...state,
        isValid: {
          title: titletValidity,
          date: dateValidity,
          post: postValidity
        },
        isFormReadyToSubmit: titletValidity && dateValidity && postValidity
      };
    }
    default:
      throw new Error();
  }
};
