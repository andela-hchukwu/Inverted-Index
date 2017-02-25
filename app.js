const invertedApp = angular
  .module('InvertedIndex', [])
  .controller('invertedController', ($scope) => {
    const newIndex = new InvertedIndex();   
  /**
   * @param{String} msg
   * @return{null} no return statement
   */
    function setMessage(msg) {
      $scope.$apply(() => {
        $scope.uploadError = msg;
      });
    }

    $scope.uploadFile = () => {
      $scope.validSearch = false;
      $scope.indexExists = false;
      $scope.theFile = document.getElementById('select-files').files[0];
      const reader = new FileReader();
      reader.readAsText($scope.theFile);

      reader.onload = (e) => {
        if (!$scope.theFile.name.toLowerCase().match(/\.json$/)) {
          $scope.uploadSuccess = false;
          setMessage('This is not a JSON file.');
          return;
        }
        try {
          const filed = JSON.parse(e.target.result);
          if (filed.length === 0 || !filed[0].title || !filed[0].text) {
            $scope.uploadSuccess = false;
            setMessage('This is an Empty JSON File');
            $scope.$apply();
          } else {
            $scope.uploadSuccess = true;
          }
          $scope.filed = filed;
          $scope.$apply();
        } catch (e) {
          setMessage(e);
        }
      };
    };

    $scope.createIndex = () => {
      if ($scope.uploadSuccess) {
        newIndex.createIndex($scope.theFile.name, $scope.filed);
        $scope.range = [];
        const filedLength = $scope.filed.length;
        for (let docIndex = 0; docIndex < filedLength; docIndex++) {
          $scope.range.push(docIndex);
        }
        $scope.indexExists = true;
      } else {
        $scope.indexExists = false;
        setMessage('Upload a valid JSON file first.');
      }
      $scope.indexObject = newIndex.getIndex($scope.theFile.name);
    };
    $scope.searchFile = () => {
      if ($scope.indexExists) {
        $scope.searchItem = $scope.searchTerm;
        $scope.searchResults = newIndex
          .searchIndex($scope.searchItem, $scope.theFile.name);
        $scope.validSearch = true;
      } else {
        $scope.validSearch = false;
      }
    };
  });
