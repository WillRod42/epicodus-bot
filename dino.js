import XMLHttpRequest from "xhr2";

export default class Dino {
  static getDino(words, paragraphs) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dinoipsum.com/api/?format=text&paragraphs=${paragraphs}&words=${words}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}


