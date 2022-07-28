import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
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
    color || "linear-gradient(to top, cyan, lightblue)"};
`;

export const Card: React.FC<{
  type: string;
  attributes: any;
}> = ({ type, attributes }) => {

  return (
    <StyledCard
      id={JSON.stringify({ type, attributes })}
      draggable="true"
      color={attributes?.color || null}
    >
      <h1>{type}</h1>
      <hr style={{ width: "70%" }} />
      <h2>{attributes?.coins || attributes?.skulls || "*"}</h2>
    </StyledCard>
  );
};
