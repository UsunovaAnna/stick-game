// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .




$(document).ready(function() {

	var gameId = 0; 
	var sticks = 0; /* кол-во палочек в игре */

	$('#switcher').click( function() {
		var first = $('#first_player').val();
		$('#first_player').val( $('#second_player').val() );
		$('#second_player').val(first);
	})

	$('#starter').click( function() {
		$.ajax({
		  type: "POST",
		  url: '/games.json',
		  data: { game : {first_player: $('#first_player').val(), second_player: $('#second_player').val(), sticks: $('#sticks').val() } }
		}).done(function( result ) {
			
		   gameId = result.id;
		   sticks = result.sticks; 
		   var step = 0;

		   $('#history').html('');
		   $('#history').append('<p>Первый игрок: <strong>'+ $('#first_player').val() +'</strong></p>');
		   $('#history').append('<p></strong> Второй игрок <strong>'+ $('#second_player').val() +'</strong></p>');
		   $('#history').append('<p>Палочек в игре: <strong>'+ sticks +'</strong></p>');
		   $('#history').append('<table id="game_logs" border="1" cellspacing="0"></table>');
		   if ( $('#first_player').val() == 'browser' )
		   {
		   		step = getRandomSticks(1,3);
		   }
		   first_step = { step : step , sticks: result.sticks - step, game_id: result.id, player: 'browser' };
		   stepup(first_step);
		});
	})	

});


function getRandomSticks(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function show(step)
{
	$('#game_logs').append('<tr><td><strong>'+ step.player +'</strong> Взял: </td><td> ' + step.step + '</td> <td>Осталось: </td><td>' + step.sticks + '</td></tr>');
}

function stepup(step)
{
	if ( step.step > 0 )
	{
		if ( step.sticks <= 0 )
		{
			var wins = 'browser';
			if ( step.player == wins )
			{
				wins = 'host'
			}
			$('#history').append('<h3>'+ wins +' Wins!</h3>');
			return;
		}

		
		show(step);
		if ( step.player != 'browser' )
		{
			delete step.created_at;
			delete step.updated_at;
			delete step.id;
			step.player = 'browser';
			if (step.sticks > 3)
			{
				step.step = getRandomSticks(1,3);
			}
			else
			{
				if ( step.sticks > 1 )
				{
					step.step = step.sticks - 1;	
				}
				else
				{
					step.step = 1;
				}
			}
			step.sticks = step.sticks - step.step;
			if ( step.sticks > 0 ) show(step);
		}
	}
	
	$.ajax({
	  type: "POST",
	  url: '/histories.json',
	  data: { history : step }
	}).done(function( result ) {
	   stepup(result);
	});

}