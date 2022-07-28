import styled from "styled-components";

export const GameContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Table = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    brown,
    red
  );
  border-radius: 32px;
  box-shadow: 20px 20px 33px 10px;
`;
