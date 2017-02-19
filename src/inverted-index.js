class InvertedIndex{
	
	constructor() {
		/**
		 * Initialize an empty array to hold the
		 * concantenated words formed from title and text
		 * contents.
		 */ 
		this.indexWords = [];
		/**
		 * Initialize an empty object to hold the mapping
		 * of the words to their file location 
		 */
		this.index ={};
	}
	
	/**
	 * This Method returns an array of tokens/words from the provided input
	 * after removing special characters and white spaces
	 * @params{String} str - String to be tokonized
	 */
	tokenize(str) {
	    var cleanString = str.trim().replace(/-/g, " ").replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, "").toLowerCase().split(" ").sort();
	    return cleanString;
	}
	
	/**
	 * This method returns an array of tokenized unique words
	 * of the provided input
	 * @param{String} str - The string to be filtered
	 */
	uniqueWords(str) {
		var tokens = this.tokenize(str);
		return tokens.filter(function (item, pos) {
      		return tokens.indexOf(item) === pos;
		});
	}
}