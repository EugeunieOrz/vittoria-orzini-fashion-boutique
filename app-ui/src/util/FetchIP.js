import fetch from 'cross-fetch';

export default {
fetchFirst: function(){
    fetch('https://www.reddit.com/r/reactjs.json').then(function (response) {
      console.log(response);
         return response.json();
    }).then(function (result) {
      console.log(result);
         return result.data.children;
    });
 }
}
