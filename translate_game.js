// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	
	var lang_to	= "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.keys(current_dict).length;
	var answer_words = Object.keys(current_dict); 
	var keys = Object.keys(current_dict); 

	var current_answer = ""; 
	var current_test_word = ""; 
	var correctness = false; 
	var guess = document.getElementById("user_guess"); 
	guess.focus(); 

	//First generated word 
	var next = generateRandomWord();
	updateTestWord(current_test_word); 

	//Code for when user wants to see answer 
	var button = $("#see_answer_button"); 
	$(button).click(function(){

		submit(guess.value); 

		//Reset the text field and re-focus on the text box 
		guess.value=""; 
		guess.focus(); 
	}); 

	$(guess).keyup(function(e){
		if (e.keyCode ==13){
			// if entered while autocomplete was closed
			if (!!$($("#user_guess").autocomplete('widget')).is(":visible")){
				$("#user_guess").autocomplete("close"); 
				submit(guess.value); 
				guess.value = ""; 
				guess.focus(); 
			}
		}
	})


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
		correctness = checkGuess(guess); 
		addEntry(current_test_word,guess,current_answer,correctness); 
		generateRandomWord(); 
		updateTestWord(current_test_word); 
	}

	function generateRandomWord(){
		var answer = answer_words[Math.floor(Math.random()*current_dict_length)];
		var test_word =  current_dict[answer]; 
		current_answer = answer; 
		current_test_word = test_word; 
		return [test_word,answer];
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

		if ($(".history_row")[0]){
			existing_rows = $(".history_row").length; 
		}

		var new_id = "row"+existing_rows+1; 
		$(new_row).attr("id",new_id); //#row1, #row2! 
		$(new_row).addClass("history_row"); 
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
});

