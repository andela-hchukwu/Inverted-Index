/**
 * Inverted index class
 */
class InvertedIndex {

  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexedFiles = [];
  }


  /**  strips all non-character values.
   *
   *  @param {String} text to be stripped
   *  @return {Array} array of stripped values
   */
  strip(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/g);
  }


  /** creates an inverted index
   *
   * @param {String} fileName name of file to be indexed
   * @param {Object} fileData Array of file to be indexed
   * @return {Object} data to be indexed
   */
  createIndex(fileName, fileData) {
    const terms = {};
    let count = 0;
    if (typeof (fileData) !== 'object') {
      return 'invalid json file';
    }
    try {
      for (const book of fileData) {
        count++;
        for (const key in book) {
          this.strip(book[key]).forEach((word) => {
            if (!terms.hasOwnProperty(word)) {
              terms[word] = [];
            }
            if (terms[word].indexOf(count) > -1) {
              return;
            }
            terms[word].push(count);
          });
        }
      }
    } catch (e) {
      return { error: 'invalid json format' };
    }

    this.indexedFiles[fileName] = terms;
    return terms;
  }


  /**  get an indexed file
   *
   * @param {String} fileName  name
   * @return {Object} file - the index file
   */
  getIndex(fileName) {
    const file = this.indexedFiles[fileName];
    return file || 'file not found';
  }


  /** search inverted index
   *
   * @function
   * @param {String} query - value for query
   * @param {String} fileName - name of fileto be queried
   * @return {Object} return search query
   */
  searchIndex(query, fileName) {
    const fileToSearch = this.getIndex(fileName);
    const found = {};
    if (!query || typeof (fileToSearch) === 'string') {
      return 'no query to search';
    }
    this.strip(query).forEach((word) => {
      if (fileToSearch.hasOwnProperty(word)) {
        found[word] = fileToSearch[word];
      }
    });
    return found;
  }
}

