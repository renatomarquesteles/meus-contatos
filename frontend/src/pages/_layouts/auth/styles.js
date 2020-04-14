import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 1053px;
    height: 823px;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  background: #00b0ff;
  overflow-x: hidden;
`;
