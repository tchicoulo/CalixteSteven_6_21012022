export default class Gallery {
  constructor(arrayMedias = []) {
    this.arrayMedias = arrayMedias;
  }

  sortByPopularity() {
    this.arrayMedias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }

  sortByDate() {
    this.arrayMedias.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  sortByTitle() {
    this.arrayMedias.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  counterOfLikes() {
    let initialValue = 0;
    let total = this.arrayMedias.reduce(function (acc, val) {
      return acc + val.likes;
    }, initialValue);
    return total;
  }
}
