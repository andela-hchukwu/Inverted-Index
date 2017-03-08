/**
 * Inverted index class
 */
class InvertedIndex {

  /**
   * Inverted index constructor
   */
  constructor() {
    // Object to hold the indexes
    this.index = {};

    this.searchResults = {};
  }

  /**
   * @param{String} str - String to be tokonized
   * @return{Array} cleanContent
   */
  static tokenize(str) {
    const strip = str.trim().replace(/-/g, ' ')
      .replace(/[.,/#!$%^&@*;:'{}=_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
    return strip;
  }

  /**
   * @param{String} str - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static uniqueWords(str) {
    const tokens = this.tokenize(str);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }


}
