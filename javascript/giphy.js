// Request with Giphy API 
// Create an array of thematic topics 
// Build a form/input 
// Create buttons from array 
// Allow new entries to be added to array 
// Allow new entries to generate a new button
// For centering divs, buttons, use index.html and style="text-align:center;"

// Giphy API Key:  WxPRwzSdMXDIOYktHQsS6bmcpCpBnfVb

var genres = ["Action", "Anime", "Comedy", "Crime", "Kids", "Racing", "Spooky", "Silly", "Thriller", "War"]
console.log(genres);

var apiKey = "WxPRwzSdMXDIOYktHQsS6bmcpCpBnfVb";
var numResults = 10;
var primaryGenre = ""
var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;


function giphyResults (numResults,queryURL) {
    console.log(numResults);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function(response) {
            $("#imageArea").empty();
            for (var i = 0; i <response.data.length; i++) {
                var imgURL = response.data[i].images.original_still.url;
                //console.log(imgURL);
                //console.log(response.data[i].images.original_still.url);
                var imageArea = $('<div>');
                imageArea.addClass("well");
                imageArea.attr('id', 'imageNum-' + i);
                $('#imageArea').append(imageArea);
                $("#imageNum-" + i).append(image);
                var image = $("<img>").attr("src", imgURL);
                $(".imageArea").append(image);
            }
        })
    }
giphyResults ();

//take user search value and create new API request, run results function
$("#searchbtn").on('click',function() {
    console.log("searchingtesting");
    primaryGenre = $("#genre-input").val().trim();
        console.log(primaryGenre);
    var newURL = queryURLBase + "&q=" + primaryGenre + "-movie&limit=10&offset=0&rating=PG-13&lang=en"
        console.log(newURL);
    giphyResults(numResults,newURL);
    return false;
});

//make the buttons
function buttonMaker() {
    $("#buttonArea").empty();
    for(var i = 0; i < genres.length; i++) {
    var genresButtons = $("<button>");
    $("#buttonArea").append(genresButtons);
    genresButtons.addClass("genre-button-color genre-button genres");
    genresButtons.attr("data-name", genres[i]);
    genresButtons.attr('id', 'genArrayNum-' + i);
    genresButtons.attr('id', 'testbutton');
    genresButtons.text(genres[i]);
    genresButtons.val(genres[i]);
    }
}
buttonMaker() ;

//add a button after search
//creation of the button inits request to API
$("#searchbtn").on("click", function(event) {
    event.preventDefault();
    var addedGenre = $("#genre-input").val().trim();
    genres.push(addedGenre);
    buttonMaker();
    console.log(genres);
});

//Took a long time to figure out how to point to the value and figure out how to use delegate,
$("#buttonArea").on('click', ".genre-button", function(event) {
    event.preventDefault();
    secondaryGenre = $(this).text();
    console.log(secondaryGenre);
    var newtwoURL = queryURLBase + "&q=" + secondaryGenre + "-movie&limit=10&offset=0&rating=PG-13&lang=en"
    console.log(newtwoURL);
    giphyResults(numResults,newtwoURL);
});