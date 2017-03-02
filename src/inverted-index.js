/**
 * Inverted index class
 */
class InvertedIndex {
  /**
   * Inverted index constructor
   */
  constructor() {
    // Object to hold the index
    this.index = {};
  }

  /**
   * @param{String} words - String to tokenize
   * @return{Array} list of words devoid of special characters or symbols
   */
  static tokenize(words) {
    return words.trim().replace(/-/g, ' ')
      .replace(/[.,/#!$%^&@*;:'{}=_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static uniqueWords(words) {
    const tokens = InvertedIndex.tokenize(words);
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
      return 'JSON file is Empty';
    }
    fileToIndex.forEach((document) => {
      if (document.text) {
        wordsToIndex
          .push(`${document.title.toLowerCase()} ${document.text
            .toLowerCase()}`);
      }
    });
    const uniqueContent = InvertedIndex.uniqueWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      fileIndex[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          fileIndex[word].push(indexPosition);
        }
      });
    });
    this.index[fileName] = fileIndex;
    // return this.index;
  }

  /**
   * @param{String} fileName - The name of the file whose index is required
   * @return{Object} index - The correct mapping of words
   *  to locations for specified file
   */
  getIndex(fileName) {
    const file = this.index[fileName];
    return file || undefined;
  }

  /**
   * @param{String} searchQuery - Words to search for
   * @param{String} indexToSearch - Index to query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchQuery, indexToSearch) {
    const searchResult = {};
    const searchTerms = InvertedIndex.uniqueWords(searchQuery);
    searchTerms.forEach((word) => {
      if (indexToSearch) {
        if (this.index[indexToSearch][word]) {
          searchResult[word] = this.index[indexToSearch][word];
        } else {
          searchResult[word] =
            `We are Sorry but ${word} is not found in our database`;
        }
      } else {
        Object.keys(this.index).forEach((key) => {
          if (this.index[key][word]) {
            searchResult[word] = this.index[key][word];
          } else {
            searchResult[word] =
              `We are Sorry but ${word} is not found in our database`;
          }
        });
      }
    });
    return searchResult;
  }

}

module.exports = InvertedIndex;
