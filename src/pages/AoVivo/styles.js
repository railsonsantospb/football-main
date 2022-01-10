import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const VideoBox = styled.div`
  width: 100%;
  margin: 25px 0;
`;

export const VideoTitleCategory = styled.h2`
  margin-left: 50px;
`;

export const VideoCarrosel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  button {
    width: 40px;
    height: 40px;
    margin: 5px;
    background-color: transparent;
    border: none;
    outline: none;

    &:hover {
      cursor: pointer;
    }

    &:active {
      background-color: #555;
    }
  }
`;

export const VideoList = styled.ul`
  width: 100%;
  list-style: none;

  overflow-y: hidden;
  overflow-x: hidden;
  scroll-behavior: smooth;

  display: flex;
  flex-direction: row;

`;

export const VideoItem = styled.li`
  margin: 4px;

  img {
    width: 200px;
    height: 140px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px #222;
  }

  video {
    width: 200px;
    height: 140px;
    background-color: #111;
  }

  video + video {
    margin-left: 10px;
  }
`;
