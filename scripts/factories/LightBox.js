export default class LightBox {
  constructor(arrayMedias = [], currentMedia = 0) {
    this.arrayMedias = arrayMedias;
    this.currentMedia = currentMedia;
  }

  next() {}

  prev() {}

  sortByPopularity() {
    let sortby = this.arrayMedias.sort(function (a, b) {
      return a.likes - b.likes;
    });
    console.log(sortby);
  }

  sortByDate() {}

  sortByTitle() {}
}
