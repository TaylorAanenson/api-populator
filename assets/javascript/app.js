// Arrays for buttons
var topics = ['puppy','dog','kitten','cat','lion','tiger','cheetah','bear','polar bear','panda bear','giraffe','shark','whale','penguin','raccoon','rabbit','hamster']
var films = ['the empire strikes back','revenge of the sith','the force awakens','the last jedi','solo a star wars story','ant man','infinity war','iron man','spider man homecoming','guardians of the galaxy','guardians of the galaxy vol 2','doctor strange','deadpool'];
var bands = ['blessthefall','a day to remember','the amity affliction','asking alexandria','the devil wears prada','of mice & men','we came as romans','my chemical romance','red hot chili peppers','green day'];
var selected = [];

// Buttons for different apps on page
$('#animal-gifs').on('click',function(){
    $('#movies').hide();
    $('#movie-buttons').hide();
    $('#movie-form').hide();
    $('#bands').hide();
    $('#bands-buttons').hide();
    $('#bands-form').hide();
    $('#more').show();
    $('#gifs').show();
    $('#gif-buttons').show();
    $('#gif-form').show();
});

$('#movie-info').on('click',function(){
    $('#more').hide();
    $('#gifs').hide();
    $('#gif-buttons').hide();
    $('#gif-form').hide();
    $('#bands').hide();
    $('#bands-buttons').hide();
    $('#bands-form').hide();
    $('#movies').show();
    $('#movie-buttons').show();
    $('#movie-form').show();
});

$('#bands-in-town').on('click',function(){
    $('#more').hide();
    $('#gifs').hide();
    $('#gif-buttons').hide();
    $('#gif-form').hide();
    $('#movies').hide();
    $('#movie-buttons').hide();
    $('#movie-form').hide();
    $('#bands').show();
    $('#bands-buttons').show();
    $('#bands-form').show();
});

// Button makers
for (var animals in topics){
    var button = $('<button>');
    var i = topics[animals];
    button.attr('class','btn btn-outline-warning');
    button.text(i);
    $('#gif-buttons').append(button);
}

for (var movies in films){
    var button = $('<button>');
    var i = films[movies];
    button.attr('class','btn btn-outline-warning');
    button.text(i);
    $('#movie-buttons').append(button);
}

for (var band in bands){
    var button = $('<button>');
    var i = bands[band];
    button.attr('class','btn btn-outline-warning');
    button.text(i);
    $('#bands-buttons').append(button);
}

// New button makers
$('#gif-button').on('click',function(){
    event.preventDefault();
    var gif = $('#gif-text').val();
    var trimmedgif = $.trim(gif);
    films.push(trimmedgif);
    var newButton = $('<button>').text(trimmedgif);
    newButton.attr('class','btn btn-outline-warning');
    $('#gif-text').val('');
    if (trimmedgif != ''){
        $('#gif-buttons').append(newButton);
    }
});

$('#movie-button').on('click',function(){
    event.preventDefault();
    var movie = $('#movie-text').val();
    var trimmedMovie = $.trim(movie);
    films.push(trimmedMovie);
    var newButton = $('<button>').text(trimmedMovie);
    newButton.attr('class','btn btn-outline-warning');
    $('#movie-text').val('');
    if (trimmedMovie != ''){
        $('#movie-buttons').append(newButton);
    }
});

$('#bands-button').on('click',function(){
    event.preventDefault();
    var band = $('#bands-text').val();
    var trimmedBand = $.trim(band);
    films.push(trimmedBand);
    var newButton = $('<button>').text(trimmedBand);
    newButton.attr('class','btn btn-outline-warning');
    $('#bands-text').val('');
    if (trimmedBand != ''){
        $('#bands-buttons').append(newButton);
    }
});

// Gif generator

$(document).on('click','#gif-buttons button',function(){
    var gif = $(this).text();
    selected = [];
    selected.push(gif);
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=sno2ugMbcJoxYMAueEL8SGpMXOOips2B&tag="+gif;
    $('#gifs').empty();
    for (i=0;i<10;i++){
    $.ajax({
        url: queryURL
    }).then(function(response){
        console.log(response);
        var div = $('<div>');
        div.attr('class','card-body col-lg-6');
        var p = $('<h4>');
        p.attr('class','card-title');
        p.text(response.data.title);
        var a = $('<a>');
        var b = $('<a>');
        a.attr('class','card-text');
        b.attr('class','source card-text');
        a.attr('href',response.data.url).text('Giphy Page');
        b.attr('href',response.data.source).text('Source Page');
        a.attr('target','_blank');
        b.attr('target','_blank');
        var img = $('<img>');
        img.attr('class','card-img-bottom')
        img.attr('src',response.data.images.original_still.url);
        img.attr('data-still',response.data.images.original_still.url);
        img.attr('data-animate',response.data.image_original_url);
        img.attr('data-state','still');
        $(div).append(p,a,b,img);
        $('#gifs').append(div);
    });
    }
});

// More gifs generator
$('#more').on('click',function(){
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=sno2ugMbcJoxYMAueEL8SGpMXOOips2B&tag="+selected;
    for (i=0;i<10;i++){
    $.ajax({
        url: queryURL
    }).then(function(response){
        console.log(response);
        var div = $('<div>');
        div.attr('class','card-body col-lg-6');
        var p = $('<h4>');
        p.attr('class','card-title');
        p.text(response.data.title);
        var a = $('<a>');
        a.attr('class','card-text');
        a.attr('href',response.data.url).text('Giphy Page');
        a.attr('target','_blank');
        var img = $('<img>');
        img.attr('class','card-img-bottom')
        img.attr('src',response.data.images.original_still.url);
        img.attr('data-still',response.data.images.original_still.url);
        img.attr('data-animate',response.data.image_original_url);
        img.attr('data-state','still');
        $(div).append(p,a,img);
        $('#gifs').append(div);
    });
    }
});

// Gif player
$(document).on('click','.card-img-bottom',function(){
    var gifs = $(this);
    if (gifs.attr('data-state') == 'still'){
        gifs.attr('data-state','animate');
        gifs.attr('src',gifs.attr('data-animate'));
    }else {
        gifs.attr('data-state','still');
        gifs.attr('src',gifs.attr('data-still'));
    }
});

// Clears page
$('#clear').on('click',function(){
    $('#gifs').empty();
    $('#movies').empty();
    $('#bands').empty();
});

// Movie info generator
$(document).on('click','#movie-buttons button',function(){
    var movie = $(this).text();
    var queryURL = "https://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy";
    $('#movies').empty();
    $.ajax({
        url: queryURL
    }).then(function(response){
        console.log(response);
        var img = $('<img>');
        img.attr('src',response.Poster);
        var posterDiv = $('<div>');
        var infoDiv = $('<div>');
        var movieSite = $('<a>');
        movieSite.attr('href',response.Website).text('Movie Site');
        movieSite.attr('target','_blank');
        posterDiv.append(img);
        infoDiv.attr('class','movie-info card-body col-lg-7');
        infoDiv.append('<h1>'+response.Title+'</h1>'+'<br>'+'Rated: '+response.Rated+'<br>'+'Released: '+response.Released+'<br>'+'Plot: '+response.Plot+'<br>'+'<h4>'+'Ratings'+'</h4>'+'<br>'+'Internet Movie Database: '+response.Ratings[0].Value+'<br>'+'Rotten Tomatoes: '+response.Ratings[1].Value+'<br>'+'Metacritic: '+response.Ratings[2].Value+'<br>'+'<br>'+'Actors: '+response.Actors+'<br>'+'Awards: '+response.Awards+'<br>'+'Box Office: '+response.BoxOffice+'<br>'+'DVD Release: '+response.DVD+'<br>'+'Director: '+response.Director+'<br>'+'Genre: '+response.Genre+'<br>'+'Producer: '+response.Production+'<br>'+'Runtime: '+response.Runtime+'<br>');
        infoDiv.append(movieSite);
        $('#movies').append(posterDiv);
        $('#movies').append(infoDiv);
    });
  });
  $(document).on('click','#bands-buttons button',function(){
    var artist = $(this).text();
    var queryURL = "https://rest.bandsintown.com/artists/"+artist+"?app_id=codingbootcamp";
    $('#bands').empty();
    $.ajax({
        url: queryURL
    }).then(function(response){
        console.log(response);
        var img = $('<img>');
        img.attr('id','band-img');
        img.attr('src',response.image_url);
        var textDiv = $('<div>');
        var name = $('<h1>');
        var text = $('<p>');
        var events = $('<a>');
        var facebook = $('<a>')
        textDiv.attr('class','card-body col-lg-5');
        name.attr('id','name')
        name.text(response.name);
        text.append('<br>'+'Fans tracking artist: '+response.tracker_count+'<br>','Number of upcoming events: '+response.upcoming_event_count+'<br>');
        events.attr('id','events')
        events.attr('href',response.url);
        events.attr('target','_blank');
        events.text('See events');
        facebook.attr('id','facebook');
        facebook.attr('href',response.facebook_page_url);
        facebook.attr('target','_blank');
        facebook.text('Facebook');
        textDiv.append(name,text,events,facebook);
        $('#bands').append(img);
        $('#bands').append(textDiv);
    });
});