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
      .replace(/[^A-z\s]/g, '')
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
   * checks the content of the uploaded json file and returns
   * true if the file follows the allowed format
   * @param {Array} file the content of the file
   * @returns {boolean} returns a boolean
   */
  static validateFileData(file) {
    if (!Array.isArray(file) || file.length < 1) {
      return false;
    }
    for (let i = 0; i < file.length; i += 1) {
      if (!file[i].title || !file[i].text) {
        return false;
      }
    }
    return true;
  }

  /**
   * @param{String} fileName - The name of the file to be indexed
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(fileName, fileToIndex) {
    const wordsToIndex = [];
    const fileIndex = {};
    const readFile = InvertedIndex.validateFileData(fileToIndex);
    if (!readFile) {
      return false;
    }
    fileToIndex.forEach((document) => {
      if (document.text && document.title) {
        wordsToIndex
          .push(`${document.text
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
   * @param{String} fileName - file to query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchQuery, fileName) {
    const fileToSearch = this.getIndex(fileName);
    const searchResult = {};
    if (!searchQuery || typeof (fileToSearch) === 'string') {
      return 'no query to search';
    }
    InvertedIndex.uniqueWords(searchQuery).forEach((word) => {
      if (Array.isArray(fileToSearch[word])) {
        searchResult[word] = fileToSearch[word];
      }
    });
    return searchResult;
  }

}

module.exports = InvertedIndex;
