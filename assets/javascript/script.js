var musicians = ['Nirvana', 'Eminem', 'Sublime']
var apiKey = 'dc6zaTOxFJmzC';



function renderButtons(){ 
$('#buttons').empty();
	for (var i = 0; i < musicians.length; i++){
	    var a = $('<button>') 
	    a.addClass('performer'); 
	    a.attr('data-name', musicians[i]); 
	    a.text(musicians[i]); 
	    $('#buttons').append(a); 
	}
};

function displayGif(){
	var artist = $(this).attr('data-name');
	console.log(artist);
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + artist + '&api_key=' + apiKey;
	
	$.ajax({url: queryUrl, method: 'GET'}).done(function(response) {
		console.log(response);
		var musicVenue = $('<div class="diveBar">');

		for(i=0; i<10; i++){
			var rating = response.data[i].rating;
			var displayRating = $('<p>').text('Rating: ' + rating);
			musicVenue.append(displayRating);

			//this is an animated image
			var animatedGiffy = response.data[i].images.original.url;
			//this is a still image
			var stillGiffy = response.data[i].images.original_still.url;
			var displayGiffy = $('<img>')
			displayGiffy.attr('src', stillGiffy);
			displayGiffy.attr('data-still', stillGiffy);
			displayGiffy.attr('data-animate', animatedGiffy);
			displayGiffy.attr('data-state', 'still');
			displayGiffy.addClass('whatTheGif');
			musicVenue.append(displayGiffy);
		}
		//creates an element to hold the gif
		$('#results').html(musicVenue);
	});
};

// This function allows us to add bands and musicians from the input box
$('#addBand').on('click', function(){
	var artist = $('#bandInput').val().trim();
	musicians.push(artist);
	renderButtons();
	return false;
})

function gifOff(){
	var state = $(this).attr('data-state');

	if(state === 'still'){
		$(this).attr('data-state', 'animate');
		$(this).attr('src', $(this).data('animate'));
	}
	else{
		$(this).attr('data-state', 'still');
		$(this).attr('src', $(this).data('still'));
	}

}

renderButtons();
// This function displays the gif
$(document).on('click', '.performer', displayGif);

$(document).on('click', '.whatTheGif', gifOff);


