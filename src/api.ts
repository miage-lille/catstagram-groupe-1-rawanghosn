import { Loading, Success, Failure } from './types/api.type';
import { Picture } from './types/picture.type';

export const loading = (): Loading => ({ status: 'loading' });

export const success = (payload: Picture[]): Success => ({
  status: 'success',
  data: payload,
});

export const failure = (error: string): Failure => ({
  status: 'failure',
  error,
});

export const parseResponse = (response: Response): Promise<Picture[]> => {
  return response.json().then((data) => {
    // On mappe chaque hit dans un objet Picture
    const pictures = data.hits.map((hit: any): Picture => {
      return {
        id: hit.id, 
        previewFormat: hit.previewURL,
        webFormat: hit.webformatURL,
        largeFormat: hit.largeImageURL,
        tags: hit.tags,
        author: hit.user
      };
    });
    return pictures;
  });
};