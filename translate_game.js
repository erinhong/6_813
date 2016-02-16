// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	//try to make this not inside function 
	function generateRandomWord(){
		var test_word = test_words[Math.floor(Math.random()*current_dict_length)]; 
		return test_word;  
	}

	function getKeyByValue(dictionary,value){
		for (var key_index in Object.keys(dictionary)){
			if (Object.keys(dictionary)[key_index] == value){ 
				var correct_key = Object.keys(dictionary)[key_index]; 
				return correct_key; 
			}
		}return ""; 
	}

	function checkGuess(dictionary,test_word,guess){
		var correct_answer = getKeyByValue(dictionary,guess); 
		if (correct_answer != ""){
			if (correct_answer == guess){
				return true; 
			}
		}
	return false; 
	}

	document.getElementById("user_guess").focus();
	var lang_to	= "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.values(current_dict).length;
	var test_words = Object.values(current_dict); 
	//First generated word 
	var test_word = generateRandomWord(test_words);

	//Code for when user wants to see answer 
	var button = $("#see_answer_button"); 
	$(button).click(function(){

		var current_test_word = test_word; 
		test_word = generateRandomWord(); 
		var guess = document.getElementById("user_guess"); 
		var current_guess = guess.value; 
		var correct = checkGuess(current_dict,current_test_word,current_guess); 
		alert(correct);
		guess.value=""; 
		guess.focus(); 
	}); 


    });

