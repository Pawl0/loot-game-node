import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  border-style: solid;
  border-color: black;
  border-width: 3px;
  box-shadow: 2px 3px 0 0;
  width: 120px;
  height: 200px;
  margin-bottom: 32px;
  background: ${({ color }) =>
    color ||
    "linear-gradient(to top, cyan, lightblue)"};
`;
