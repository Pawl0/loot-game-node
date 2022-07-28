import { useEffect, useState } from 'react'
import { Card } from './Card'
import { CardInterface, DeckInterface } from '../../../../model'
import { Socket } from 'socket.io-client'
import styled from "styled-components";

interface HandProps {
    length?: number
    socket: Socket
}

const HandContainer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center ;
    width: 100%;
    column-gap: 8px;
`

export const Hand = ({ length = 7, socket }: HandProps) => {
    const [cards, setCards] = useState<CardInterface[]>([])

    useEffect(() => {
        socket.emit("get-hand", { socketID: socket.id, length })
    }, [])

    socket.on("on-get-hand", (hand) => {
        setCards(hand)
    })

    useEffect(() => {
        console.log({ cards })
    }, [cards])

    return <HandContainer>{cards.map((card, index) => <Card key={index} type={card.type} attributes={card.attributes} />)}</HandContainer>
}