export function createCardsArray(data, cardsCount) {
  const copiedData = [...data];
  const cards = [];

  const createCardIndex = () => Math.floor(Math.random() * copiedData.length);

  for (let i = 0; i < cardsCount / 2; i += 1) {
    let cardIndex = createCardIndex();
    let card = copiedData[cardIndex];
    copiedData.splice(cardIndex, 1);
    cards.push(card);
  }

  return [...cards, ...cards].flat();
}