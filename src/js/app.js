angular.module('invertedIndex', [])
  .controller('mainController', ['$scope', '$timeout', ($scope, $timeout) => {
    /**
     *  {Object} instanciates the invertedIndex class
     */
    const indexer = new InvertedIndex();

    $scope.uploadedFiles = {};

    $scope.index = [];

    $scope.showTable = false;

    $scope.fileCount = [];

    $scope.allIndexedFiles = [];

    /** converts data to be feed to the view
     *
     * @param  {String} fileName - file name
     * @param  {Object} data  - data to transform
     * @param  {count} count - count of object in the file
     * @return {Object} return fileName, data and count
     */
    $scope.transformData = (fileName, data, count) => ({
      fileName,
      data,
      count
    });

    /**
     * creates an inverted Index
     * @return {Boolean} return false for invalid file
     */
    $scope.createIndex = () => {
      const selected = document.getElementById('uploaded-files').value;
      const uploadedFiles = $scope.uploadedFiles;
      if ($scope.isValidFile(selected) &&
        uploadedFiles.hasOwnProperty(selected)) {
        const data = indexer.createIndex(selected, uploadedFiles[selected]);
        if (data.hasOwnProperty('error') || $scope.length(data) < 1) {
          $scope.alerts('invalid json file or format', 'danger');
          return false;
        }
        const fileCount = uploadedFiles[selected].length;
        $scope.index[0] = $scope.transformData(selected, data, fileCount);
        $scope.fileCount[selected] = fileCount;
        if ($scope.allIndexedFiles.indexOf(selected) === -1) {
          $scope.allIndexedFiles.push(selected);
        }
        $scope.showTable = true;
      }
    };

    /** searches  indexed files for
     *
     * @param {String} query alue to be searched
     * @return {void}  set the index value
     */
    $scope.searchIndex = (query) => {
      let result;
      const selected = document.getElementById('indexed-files').value;
      let fileCount = null;
      $scope.index = [];
      // checks if a query was passed in
      if (!query || selected === '--select a file--') {
        $scope.alerts('please enter a query and select file  to search',
          'danger ', true, 5000);
        return false;
      }
      // displays serach result for all indexed files
      if (selected === 'all') {
        let count = 0;
        for (const file in indexer.indexedFiles) {
          const searchData = indexer.searchIndex(query, file);
          fileCount = $scope.fileCount[file];
          if ($scope.length(searchData) < 1) {
            continue;
          }
          $scope.index[count] = $scope
            .transformData(file, searchData, fileCount);
          count++;
        }
        if ($scope.index.length < 1) {
          $scope.alerts('word does not exist in any file', 'danger');
        }
      } else {
        fileCount = $scope.fileCount[selected];
        result = indexer.searchIndex(query, selected);
        if ($scope.length(result) > 0) {
          $scope.index[0] = $scope.transformData(selected, result, fileCount);
        } else {
          $scope.alerts('no index found with that query', 'danger');
        }
      }
    };


    /** checks for a valid json file
     *
     * @param {String}  file to check
     * @return {Boolen}  true or flase
     */
    $scope.isValidFile = file => file.match(/\.json$/);

    /** gets the length an object
     *
     * @param {Object}  object to check
     * @return {Int}  true or flase
     */
    $scope.length = object => Object.keys(object).length;


    /**  configures the alert property
     *
     * @param {Strimg} message to alert
     * @param {tye} type of message
     * @param {Boolean} show message
     * @param {Integer} timeout of display
     * @return {null} no return statement
     */
    $scope.alerts = (message, type, show, timeout) => {
      $scope.alert = {
        message,
        type,
        show: true
      };
      $timeout(() => {
        $scope.alert.show = false;
      }, timeout || 5000);
    };
  }]);
