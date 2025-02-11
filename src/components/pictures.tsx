import React from 'react';
import styled from 'styled-components';
import { picturesSelector, getSelectedPicture } from '../reducer';
import { useSelector, useDispatch } from 'react-redux';
import { selectPicture, closeModal } from '../types/actions.type';
import ModalPortal from './modal';
import { isSome } from 'fp-ts/Option';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  if (pictures.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (pictures.status === 'failure') {
    return <div>Error: {pictures.error}</div>;
  }

  return (
    <Container>
      {pictures.data.map((pic, index) => (
        <Image
          key={index}
          src={pic.webFormat} 
          alt={`Picture ${index}`}
          onClick={() => dispatch(selectPicture(pic))}
        />
      ))}
      {isSome(selectedPicture) && (
        <ModalPortal
          largeFormat={selectedPicture.value.largeFormat}
          close={() => dispatch(closeModal())}
        />
      )}
    </Container>
  );
};

export default Pictures;
