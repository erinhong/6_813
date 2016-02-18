// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	
	var lang_to	= "English";
	var lang_from = "Spanish";
	$("#lang_to").html(lang_to);
	$("#lang_from").html(lang_from);

	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.keys(current_dict).length;
	var keys = Object.keys(current_dict); 

	var current_answer = ""; 
	var current_test_word = ""; 
	var correctness = false; 
	var guess_char_limit = 40;
	var check = "✓"; 

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
	var answer_button = $("#see_answer_button"); 
	$(answer_button).click(function(){
		//submit, clear entry, refocus 
		submit(guess.value); 
		guess.value=""; 
		guess.focus(); 
	}); 

	//Code for when user wants to reset counter
	// User will receive notification and can continue playing game 
	var counter_button = $("#reset_button");
	$(counter_button).click(function(){
		completed=0;
		got_correct=0;
		updateScore();
		addResetNotification();
		guess.focus(); 
	});



	//Code for when the user presses enter in the input box 
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

	function submit(guess){
		var static1 = document.getElementById("static1");
		var static2 = document.getElementById("static2");
		if (static1 && static2){
			static1.parentElement.removeChild(static1);
			static2.parentElement.removeChild(static2);
		}
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

	//generates next test word 
	function generateRandomWord(){
		var answer = keys[Math.floor(Math.random()*current_dict_length)];
		var test_word =  current_dict[answer]; 
		current_answer = answer; 
		current_test_word = test_word; 
	}

	//updates the score of correct words 
	function updateScore(){
		$("#num_correct").html(got_correct);
		$("#completed").html(completed);
	}

	//will check the correctness of user's guess
	function checkGuess(guess){ 
		if (current_answer == guess){
				return true; 
		}
	return false; 
	}

	//function to update the test word in the view
	function updateTestWord(test_word){
		var text_box = $(".test_word"); 
		$(text_box).html(test_word); 
	}

	//will alert the user that the counter has been reset 
	function addResetNotification(){
		var table = document.getElementById("table");
		var new_row = table.insertRow(2); 
		var col1 = document.createElement("td"); 
		var col2 = document.createElement("td");
		var col3 = document.createElement("td"); 
		col1.textContent = "░░░░░░░░";
		col2.textContent = "COUNTER RESET"; 
		col3.textContent = "░░░░░░░░";
		$(new_row).append(col1); 
		$(new_row).append(col2); 
		$(new_row).append(col3); 
	}

	//function to add new guess and test word to the past guesses 
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

			col3.textContent = check; 
		}
		$(new_row).append(col1); 
		$(new_row).append(col2); 
		$(new_row).append(col3); 

	}

});

