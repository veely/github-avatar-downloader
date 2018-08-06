var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    cb(err, obj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function (response) {
         console.log('downloading image...');
    })
    .pipe(fs.createWriteStream(filePath));

}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   // console.log(result);
//   for (let key of result) {
//     console.log(key.avatar_url);
//   }
// });