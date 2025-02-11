import { Loop, liftState } from 'redux-loop';
import { loop, Cmd } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Option, some, none } from 'fp-ts/Option';
import { ApiState, Loading } from './types/api.type';
import { loading, success, failure } from './api';
import { fetchCatsCommit, fetchCatsRequest } from './actions';
import { Picture } from './types/picture.type';
import { fetchCats } from './commands';

// State
export type State = {
  counter: number;
  pictures: ApiState;
  pictureSelected: Option<Picture>;
  loading: boolean;
  error: string | null;
};

// State par défaut
export const defaultState: State = {
  counter: 3,
  pictures: loading(),
  pictureSelected: none,
  loading: false,
  error: null,
};

// Reducer
export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState;
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return loop(
        { ...state, counter: newCounter, pictures: loading() },
        fetchCats(newCounter) 
      );
    }
    case 'DECREMENT': {
      const newCounter = Math.max(3, state.counter - 1);
      return loop(
        { ...state, counter: newCounter, pictures: loading() },
        fetchCats(newCounter)
      );
    }
    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: action.payload };
    
    case 'FETCH_CATS_ROLLBACK':
      return loop(
        { ...state, pictures: failure(action.error.message) },
        Cmd.run(() => console.error(action.error.message))
      );
    case 'FETCH_CATS_REQUEST':
      return { ...state, pictures: loading() };

    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: some(action.picture) };

    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: none };

    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) => state.pictureSelected;

export default compose(liftState, reducer);
