var topics = ['star wars','revenge of the sith','the force awakens','the last jedi','solo a star wars story','marvel','ant man','infinity war','iron man','spider man','guardians of the galaxy','doctor strange','deadpool','pixar','disney'];

for (var movies in topics){
    var button = $('<button>');
    var i = topics[movies];
    button.attr('class','btn btn-outline-warning');
    button.text(i);
    $('#buttons').append(button);
    console.log(i);
}

$('#movie-button').on('click',function(){
    event.preventDefault();
    var movie = $('#movie-text').val();
    var trimmedMovie = $.trim(movie);
    topics.push(trimmedMovie);
    var newButton = $('<button>').text(trimmedMovie);
    newButton.attr('class','btn btn-outline-warning');
    if (trimmedMovie != ''){
        $('#buttons').append(newButton);
    }
});

$(document).on('click','#buttons button',function(){
    var gif = $(this).text();
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=sno2ugMbcJoxYMAueEL8SGpMXOOips2B&tag="+gif;
    console.log(queryURL);
    console.log(gif);
    $('#gifs').empty();
    for (i=0;i<10;i++){
    $.ajax({
        url: queryURL
    }).then(function(response){
        console.log(response);
        console.log(response.data.title);
        console.log(response.data.images.original_still.url);
        console.log(response.data.image_original_url);
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
        $('#gifs').append(div);
        $(div).append(p,a,img);
    });
    }
});

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

$('#clear').on('click',function(){
    $('#gifs').empty();
});