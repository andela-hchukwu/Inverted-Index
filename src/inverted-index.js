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

  /**
   * @param{String} fileName - The name of the file to be indexed
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(fileName, fileToIndex) {
    const wordsToIndex = [];
    const fileIndex = {};
    const fileLength = fileToIndex.length;
    if (fileLength === 0) {
      return 'JSON file is empty';
    }
    fileToIndex.forEach((document) => {
      if (document.text) {
        wordsToIndex
        .push(`${document.text.toLowerCase()}`);
      }
    });
    const uniqueContent = InvertedIndex.uniqueWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      fileIndex[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexPosition > -1) {
          fileIndex[word].push(indexPosition);
        }
      });
    });
    this.index[fileName] = fileIndex;
  }

}
