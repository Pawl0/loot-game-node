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
  width: 250px;
  height: 300px;
  margin-bottom: 32px;
  background: ${({ color }) =>
    color || "linear-gradient(to top, cyan, lightblue)"};
`;

export const Card: React.FC<{
  type: string;
  attributes: any;
}> = ({ type, attributes, position }) => {
  const onAnimationEnd = () => {
    console.log("Animation End Card type: ", type);
    console.log("Animation End Card attributes: ", attributes);
  };

  return (
        <StyledCard
            color={attributes.color}
            onAnimationEnd={onAnimationEnd}
        >
            <h1>{type}</h1>
            <hr style={{ width: "70%" }} />
            <h2>{attributes.coins || attributes.skulls}</h2>
        </StyledCard>
  );
};