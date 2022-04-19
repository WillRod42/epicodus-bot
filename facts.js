import XMLHttpRequest from "xhr2";

export default class Facts {
  static getFact() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = "https://uselessfacts.jsph.pl/random.json?language=en";
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