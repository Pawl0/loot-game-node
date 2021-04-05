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
}> = ({ type, attributes }) => {

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }
  
  const onDragEnter = (event: React.DragEvent) => {
    console.log("Drag Enter")
    console.log("target: ", event.target.id)
    event.target.style.background = "red"
  }

  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
      event.target.style.background = ""
  }

  const onDrop = (event: React.DragEvent) => {
    console.log("Drop Event")
    event.preventDefault();
    event.target.style.visibility = "hidden";
  }

  const onDragStart = (event: React.DragEvent) => {
    console.log("Drag start")
    event.target.style.opacity = "0.8"
  }

  const onDragEnd = (event: React.DragEvent) => {
    event.preventDefault()
    console.log("Drag end")
    event.target.style.opacity = "1"
  }

  return (
        <StyledCard
          id={JSON.stringify({type, attributes})}
          draggable="true"
          color={attributes?.color || null}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
            <h1>{type}</h1>
            <hr style={{ width: "70%" }} />
            <h2>{attributes?.coins || attributes?.skulls || "*"}</h2>
        </StyledCard>
  );
};
