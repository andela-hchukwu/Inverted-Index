/* global angular */
angular.module('invertedIndex', [])
  .controller('mainController', ['$scope', '$timeout', ($scope, $timeout) => {
    /**
     *  {Object} instanciates the invertedIndex class
     */

    const newIndex = new InvertedIndex(); // eslint-disable-line no-undef
    $scope.uploadedFiles = {};
    $scope.index = [];
    $scope.showTable = false;
    $scope.fileCount = [];
    $scope.allIndexedFiles = [];

    /** converts data to be feed to the view
     *
     * @param  {String} fileName - file name
     * @param  {Object} data  - data to transform
     * @param  {Number} count - count of object in the file
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
      $scope.index = [];
      const selected = document.getElementById('uploaded-files').value;
      const uploadedFiles = $scope.uploadedFiles;
      if ($scope.isValidFile(selected) &&
        Array.isArray(uploadedFiles[selected])) {
        newIndex.createIndex(selected, uploadedFiles[selected]);
        $scope.data = newIndex.getIndex(selected);
        if (Array.isArray($scope.data.error)
          || $scope.length($scope.data) < 1) {
          $scope.alerts('invalid json file or format', 'danger');
          return false;
        }
        const fileCount = uploadedFiles[selected].length;
        $scope.index[0] = $scope
          .transformData(selected, $scope.data, fileCount);
        $scope.fileCount[selected] = fileCount;
        if ($scope.allIndexedFiles.indexOf(selected) === -1) {
          $scope.allIndexedFiles.push(selected);
        }
        $scope.all = false;
        $scope.showTable = true;
      }
    };

     /** searches  indexed files for
     *
     * @param {String} query alue to be searched
     * @return {void}  set the index value
     */
    $scope.searchIndex = (query) => {
      $scope.index = [];
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
        $scope.all = true;
        let count = 0;
        Object.keys(newIndex.index).forEach((file) => {
          const searchData = newIndex.searchAllIndex(query);
          fileCount = $scope.fileCount[file];
          if ($scope.length(searchData) < 1) {
            return;
          }
          $scope.index[count] = $scope
          .transformData(file, searchData, fileCount);
          count += 1;
        });
        if ($scope.index.length < 1) {
          $scope.alerts('word does not exist in any file', 'danger');
        }
      } else {
        $scope.all = false;
        fileCount = $scope.fileCount[selected];
        result = newIndex.searchIndex(query, selected);
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
     * @return {Boolean}  true or flase
     */
    $scope.isValidFile = file => file.match(/\.json$/);

    /** gets the length an object
     *
     * @param {Object}  document to check
     * @return {Boolean}  true or flase
     */
    $scope.length = document => Object.keys(document).length;


    /**  configures the alert property
     *
     * @param {String} message to alert
     * @param {type} type of message
     * @param {Boolean} show for falsy
     * @param {Integer} timeout of display
     * @return {object} return
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
