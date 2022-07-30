import React from "react";
import { StyledCard } from ".";

export const Card: React.FC<{
  type: string;
  attributes: any;
}> = ({ type, attributes }) => {
  return (
    <StyledCard
      id={JSON.stringify({ type, attributes })}
      draggable="true"
      color={attributes?.color || null}
      datatype={type}
    >
      <h1>{type}</h1>
      <hr style={{ width: "70%" }} />
      <h2>
        {attributes?.coins ||
          attributes?.skulls ||
          "*"}
      </h2>
    </StyledCard>
  );
};
