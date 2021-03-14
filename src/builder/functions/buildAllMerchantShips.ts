const buildAllerchantShips = (buildMerchantShipsWithGold) => {
    const merchantShips2 = buildMerchantShipsWithGold(5, 2);
    const merchantShips3 = buildMerchantShipsWithGold(6, 3);
    const merchantShips4 = buildMerchantShipsWithGold(5, 4);
    const merchantShips5 = buildMerchantShipsWithGold(5, 5);
    const merchantShips6 = buildMerchantShipsWithGold(2, 6);
    const merchantShips7 = buildMerchantShipsWithGold(1, 7);
    const merchantShips8 = buildMerchantShipsWithGold(1, 8);

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