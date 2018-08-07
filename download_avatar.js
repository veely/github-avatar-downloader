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
    .on('end', function (end) {
      console.log('download complete.')
    })
    .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (err) {
    console.log("Errors:", err);
  }
  if (process.argv[2] && process.argv[3]) {
    for (let key of result) {
      downloadImageByURL(key.avatar_url, "avatars/" + key.login + ".jpg");
    }
  } else {
    console.log("You must enter an owner and a repo name respectively!")
  }
});