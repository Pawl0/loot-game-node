const buildAllPirateShipsWithSkulls = (buildPirateShipsWithSkulls, pirateShipPrototype) => {
    const pirateShips1 = buildPirateShipsWithSkulls(2, 1, pirateShipPrototype);
    const pirateShips2 = buildPirateShipsWithSkulls(4, 2, pirateShipPrototype);
    const pirateShips3 = buildPirateShipsWithSkulls(4, 3, pirateShipPrototype);
    const pirateShips4 = buildPirateShipsWithSkulls(2, 4, pirateShipPrototype);

    const pirateShipsWithSkulls = [
        ...pirateShips1,
        ...pirateShips2,
        ...pirateShips3,
        ...pirateShips4,
    ];
    return pirateShipsWithSkulls;
}

export default buildAllPirateShipsWithSkulls