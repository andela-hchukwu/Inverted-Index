/*eslint-disable*/
angular.module('invertedIndex')
  /*
  * creates a range filter
  */
  .filter('range', () => (input, number) => {
    for (let i = 0; parseInt(number) > i; i++) {
      input.push(i);
    }
    return input;
  });
