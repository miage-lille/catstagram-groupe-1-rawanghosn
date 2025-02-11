import { Picture } from './picture.type';

export type Increment = { type: 'INCREMENT' };
export type Decrement = { type: 'DECREMENT' };;
export type SelectPicture = { type: 'SELECT_PICTURE'; picture: Picture };
export type CloseModal = { type: 'CLOSE_MODAL' };

// Exercice 5
export type FetchCatsRequest = { type: 'FETCH_CATS_REQUEST'; method: 'GET'; path: string };
import { Success } from './api.type';

export type FetchCatsCommit = {
  type: 'FETCH_CATS_COMMIT';
  payload: Success;
};
export type FetchCatsRollback = { type: 'FETCH_CATS_ROLLBACK'; error: Error };

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

// Exercice 3
export const selectPicture = (picture: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', picture });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });


export type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback;
