import {
  useContext,
  useEffect,
  useState,
} from "react";
import { Card } from "../Card";
import { CardInterface } from "../../../../../model";
import { SocketContext } from "../../SocketContext";
import { HandContainer } from "./";

interface HandProps {
  length?: number;
}

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
