const buildAllerchantShips = (buildMerchantShipsWithGold, merchantShipPrototype) => {
    const merchantShips2 = buildMerchantShipsWithGold(5, 2, merchantShipPrototype);
    const merchantShips3 = buildMerchantShipsWithGold(6, 3, merchantShipPrototype);
    const merchantShips4 = buildMerchantShipsWithGold(5, 4, merchantShipPrototype);
    const merchantShips5 = buildMerchantShipsWithGold(5, 5, merchantShipPrototype);
    const merchantShips6 = buildMerchantShipsWithGold(2, 6, merchantShipPrototype);
    const merchantShips7 = buildMerchantShipsWithGold(1, 7, merchantShipPrototype);
    const merchantShips8 = buildMerchantShipsWithGold(1, 8, merchantShipPrototype);

    const merchantShips = [
        ...merchantShips2,
        ...merchantShips3,
        ...merchantShips4,
        ...merchantShips5,
        ...merchantShips6,
        ...merchantShips7,
        ...merchantShips8,
    ];
    return merchantShips;
}

export default buildAllerchantShips