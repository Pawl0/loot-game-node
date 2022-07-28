import {
  useContext,
  useEffect,
  useState,
} from "react";
import { Card } from "./Card";
import { CardInterface } from "../../../../model";
import styled from "styled-components";
import { SocketContext } from "../SocketContext";

interface HandProps {
  length?: number;
}

const HandContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  column-gap: 8px;
`;

export const Hand = ({
  length = 7,
}: HandProps) => {
  const [cards, setCards] = useState<
    CardInterface[]
  >([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.getHand(length).then((hand) => {
      setCards(hand);
    });
  }, []);

  return (
    <HandContainer>
      {cards.map((card, index) => (
        <Card
          key={index}
          type={card.type}
          attributes={card.attributes}
        />
      ))}
    </HandContainer>
  );
};
