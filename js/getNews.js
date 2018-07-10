let theNewApiUrls = [];
let theNewApiTitles = [];
let theNewApiImg = [];
let theNewApiSource = [];

setTimeout(delayNews,3000);
fire();
function delayNews(){
  const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + news_api_key;
  //Retriving everything from the newAPI
  $.get(newsApiUrl, function(data){
    // console.log(data);
  });

  //Retriving the urls from the newAPI
  $.get(newsApiUrl, function(data){
    let links = (data.articles)
    links.forEach(function(element){
      theNewApiUrls.push(element.url);

    });
    // console.log(theNewApiUrls);
  });

  //Retriving the titles from the newAPI
  $.get(newsApiUrl, function(data){
    let titles = (data.articles)
    titles.forEach(function(element){
      theNewApiTitles.push(element.title);

    });
    // console.log(theNewApiTitles);
  });

  //Retriving the img url from the newAPI
  $.get(newsApiUrl, function(data){
    let img = (data.articles)
    img.forEach(function (element){
      theNewApiImg.push(element.urlToImage);

    });
    // console.log(theNewApiImg);
  });

  $.get(newsApiUrl, function(data){
    let source = (data.articles)
    source.forEach(function(element){
      theNewApiSource.push(element.source.name);
    });
  });
};
