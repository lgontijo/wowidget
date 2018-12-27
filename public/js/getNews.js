let theNewApiUrls = [];
let theNewApiTitles = [];
let theNewApiImg = [];
let theNewApiSource = [];

// getNews need to wait until fire() runs in order to collect the API key.
setTimeout(getNews, 3000);

// Runs the fire() function. This returns the API key value from the database and assign them to some local variables.
fire();

// This function calls the News API and parses through the response and assigns values to the global variables.
function getNews(country = "br") {
  const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${news_api_key}`;

  // Retriving everything from the newAPI
  $.get(newsApiUrl, function(data) {
    // holds all of the articles. Its type is an object
    let articles = data.articles;

    // Retrives the entire article
    articles.forEach(function(element) {
      theNewApiUrls.push(element.article);
    });

    // Retrives the news urls
    articles.forEach(function(element) {
      theNewApiUrls.push(element.url);
    });

    // Retrives the news titles
    articles.forEach(function(element) {
      theNewApiTitles.push(element.title);
    });

    // Retrives the news images
    articles.forEach(function(element) {
      theNewApiImg.push(element.urlToImage);
    });

    // Retrives the news sources
    articles.forEach(function(element) {
      theNewApiSource.push(element.source.name);
    });
  });
}
