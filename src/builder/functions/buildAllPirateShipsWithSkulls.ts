const buildAllPirateShipsWithSkulls = (buildPirateShipsWithSkulls) => {
    const pirateShips1 = buildPirateShipsWithSkulls(2, 1);
    const pirateShips2 = buildPirateShipsWithSkulls(4, 2);
    const pirateShips3 = buildPirateShipsWithSkulls(4, 3);
    const pirateShips4 = buildPirateShipsWithSkulls(2, 4);

    const pirateShipsWithSkulls = [
        ...pirateShips1,
        ...pirateShips2,
        ...pirateShips3,
        ...pirateShips4,
    ];
    return pirateShipsWithSkulls;
}

export default buildAllPirateShipsWithSkulls