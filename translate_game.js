// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	
	var lang_to	= "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.keys(current_dict).length;
	var keys = Object.keys(current_dict); 

	var current_answer = ""; 
	var current_test_word = ""; 
	var correctness = false; 
	var guess_char_limit = 40;

	var guess = document.getElementById("user_guess"); 
	var autocomplete_length = 0; 

	//for additional features 
	var completed = 0 ; 
	var got_correct = 0 ; 

	//Begin with focus and generate first word 
	guess.focus(); 
	generateRandomWord();
	updateTestWord(current_test_word); 
	updateScore();

	//Code for when user wants to see answer 
	var button = $("#see_answer_button"); 
	$(button).click(function(){
		//submit, clear entry, refocus 
		submit(guess.value); 
		guess.value=""; 
		guess.focus(); 
	}); 

	$(guess).keypress(function(e){
		if (e.keyCode ==13){
			// if entered while autocomplete was closed or length is 0. 
			submit(guess.value); 
			guess.value = ""; 
			guess.focus(); 
			$(guess).autocomplete("close");
		}
	});

	//Code to handle different states for autocomplete of input box 
	$("#user_guess").autocomplete({
		source: keys,
		minLength:2, 
		select: function(event,ui){
			var selected_guess = ui.item.value; 
			submit(selected_guess); 
			//clear and re-focus 
			$(this).val("");
			$(this).focus(); 
			return false;
		}
	});

/*
	//Code to handle the countdown timer 
	window.onload = function(){
		var oneMin = 60, display = document.querySelector("#timer"); 
		Timer(oneMin,display);
	};
*/ 

	function submit(guess){
		completed +=1; 
		correctness = checkGuess(guess); 
		if (correctness){
			got_correct+=1; 
		}
		updateScore(); 
		addEntry(current_test_word,guess,current_answer,correctness); 
		generateRandomWord(); 
		updateTestWord(current_test_word); 
	}

	function generateRandomWord(){
		var answer = keys[Math.floor(Math.random()*current_dict_length)];
		var test_word =  current_dict[answer]; 
		current_answer = answer; 
		current_test_word = test_word; 
	}

	function updateScore(){
		$("#score").html(got_correct); 
	}

	function checkGuess(guess){ 
		if (current_answer == guess){
				return true; 
		}
	return false; 
	}

	function updateTestWord(test_word){
		var text_box = $(".test_word"); 
		$(text_box).html(test_word); 
	}

	function addEntry(test_word,guess,current_answer,correctness){
		var table = document.getElementById("table");
		var new_row = table.insertRow(2);
		var existing_rows = 0; 

		if ($(".entry_row")[0]){
			existing_rows = $(".entry_row").length; 
		}

		if (guess.length >guess_char_limit){
			guess = guess.substring(0,guess_char_limit)+"...";
		}

		var new_id = "row"+existing_rows+1; 
		$(new_row).attr("id",new_id); //#row1, #row2! 
		$(new_row).addClass("entry_row"); 
		var col1 = document.createElement("td"); //test_word
		var col2 = document.createElement("td"); // guess
		var col3 = document.createElement("td"); // current_answer 

		if (!correctness){//if answer is wrong 
			
			$(col1).addClass("red");
			col1.textContent = test_word; 
			
			$(col2).addClass("red"); 
			$(col2).addClass("strikethrough"); 
			col2.textContent = guess;
			
			$(col3).addClass("red"); 
			col3.textContent = current_answer;

		}
		else{//answered correctly! 
			$(col1).addClass("blue");
			col1.textContent = test_word; 

			$(col2).addClass("blue");
			col2.textContent = current_answer; 

			col3.textContent = "✓"; 
		}
		$(new_row).append(col1); 
		$(new_row).append(col2); 
		$(new_row).append(col3); 

	}
	// Code for Timer adapted from below 
	// http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
/*
	function Timer(duration,display){
		var timer = duration, minutes, seconds; 
		setInterval(function(){
			minutes = parseInt(timer/60,10); 
			seconds = parseInt(timer%60,10); 
			minutes = minutes <10 ? "0" + minutes : minutes; 
			seconds = seconds <10 ? "0" + seconds : seconds; 

			display.textContent = minutes + ":" + seconds; 
			if (--timer<0){
				timer = 0,0,0;
			}
		},1000); 
	}
*/ 
});

