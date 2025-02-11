import { Cmd } from 'redux-loop';
import { parseResponse } from './api';
import { fetchCatsRequest, fetchCatsCommit, fetchCatsRollback } from './actions';
export const fetchCats = (counter: number) => {
  return Cmd.run(async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=48759792-4bf55c0efb566aa37a62fbce0&per_page=${counter}&q=cat`
      );
      const pictures = await parseResponse(response);
      console.log('Fetched pictures:', pictures);
      return fetchCatsCommit(pictures);  
    } catch (error: unknown) {
      console.error('Error fetching cats:', error); 
      if (error instanceof Error) {
        return fetchCatsRollback(error);  
      }
      return fetchCatsRollback(new Error('An unknown error occurred'));  
    }
  }, {
    successActionCreator: (value: any) => value,
    failActionCreator: (error: Error) => fetchCatsRollback(error),
  });
};