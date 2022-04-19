export default class Pair {
  static group = [];
  static channels = [];

  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  static pairUsers() {
    let pairs = [];
    let pair = [];
    let count = 0;

    this.shuffleArray(this.group).forEach(function(user) {
      pair.push(user);
      count++;

      if (count === 2) {
        pairs.push(pair);
        pair = [];
        count = 0;
      }
    });

    if (pairs.length === 0) {
      pairs.push([]);
    }

    if (pair.length > 0) {
      pairs[0].push(pair[0]);
    }

    return pairs;
  }

  static replaceBackTicks(string) {
    return string.replace(/\`/g, "\'");
  }
}