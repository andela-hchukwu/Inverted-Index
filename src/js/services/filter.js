angular.module('invertedIndex')
  /*
  * creates a range filter
  */
  .filter('range', () => {
    return (input, number) => {
      for (let i = 0; parseInt(number) > i; i++) {
        input.push(i);
      }
      return input;
    };
  });
