import Cards from "./cards.js";
export default class Game {
  constructor () {
    this.secondCard;
    let CardPromise = Cards.getDeck();
    CardPromise.then(function(response) {
      this.id = (JSON.parse(response)).deck_id;
      this.firstCard = (JSON.parse(response)).cards[0].value
    });
  }
  
  draw(deckID) {
    let drawPromise = Cards.getCard(deckID);
    drawPromise.then(function(response) {
      let secondCard = (JSON.parse(response)).cards[0].value;
      bot.sendMessage({
        to:channelID,
        message: secondCard
      });
    })
  }
}