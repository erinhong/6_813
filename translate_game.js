// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	function generateRandomWord(){
		var random_word = test_words[Math.floor(Math.random()*current_dict_length)]; 
		return random_word;  
	}

	document.getElementById("user_guess").focus();
	var lang_to	= "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.values(current_dict).length;
	alert(current_dict_length);
	var test_words = Object.values(current_dict); 
	//First generated word 
	var next_word = generateRandomWord(test_words);
	alert(next_word);

	//Code for when user wants to see answer 
	var button = $("#see_answer_button"); 
	$(button).click(function(){
		next_word = generateRandomWord(); 
		var guess = document.getElementById("user_guess"); 
		var previous_guess = guess.value; 
		alert("previous_guess"+previous_guess);
		guess.value=""; 
		guess.focus(); 

		
	}); 


    });

