import XMLHttpRequest from "xhr2";

export default class Cards {
  static getDeck() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  static getCard(deckID) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}