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
			var current_key = Object.keys(dictionary)[key_index]; 
			var current_value = dictionary[current_key];
			if (current_value == value){ 
				return current_key; 
			}
		}return ""; 
	}

	function getValueByKey(dictionary,key){
		alert("key I received: "+key);
		alert("what I get from dictionary: "+dictionary[key]); 
		alert(dictionary[key]!=undefined); 
		if (dictionary[key]!=undefined){
			return dictionary[key];
		}
		return ""; 
	}

	function checkGuess(dictionary,test_word,guess){
		var correct_answer = getKeyByValue(dictionary,test_word); // switched GetKeyByValue 
		if (correct_answer != ""){
			if (correct_answer == guess){
				return true; 
			}
		}
	return false; 
	}

	function updateTestWord(test_word){
		var text_box = $(".test_word"); 
		$(text_box).html(test_word); 
	}

	function addEntry(test_word,guess,real_answer,correct){
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
		var col3 = document.createElement("td"); // real_answer 

		if (!correct){//if answer is wrong 
			
			$(col1).addClass("red");
			col1.textContent = test_word; 
			
			$(col2).addClass("red"); 
			$(col2).addClass("strikethrough"); 
			col2.textContent = guess;
			
			$(col3).addClass("red"); 
			col3.textContent = real_answer;

		}
		else{//answered correctly! 
			$(col1).addClass("blue");
			col1.textContent = test_word; 

			$(col2).addClass("blue");
			$(col2).textContent = real_answer; 

			//image 


		}
		$(new_row).append(col1); 
		$(new_row).append(col2); 
		$(new_row).append(col3); 

	}
//add entry 

	document.getElementById("user_guess").focus();
	var lang_to	= "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_dict_length = Object.values(current_dict).length;
	var test_words = Object.values(current_dict); 

	//First generated word 
	var current_test_word = generateRandomWord(test_words);
	updateTestWord(current_test_word); 

	//Code for when user wants to see answer 
	var button = $("#see_answer_button"); 
	$(button).click(function(){

		var guess = document.getElementById("user_guess"); 
		var correct = checkGuess(current_dict,current_test_word,guess.value); 
		var real_answer = getKeyByValue(current_dict,current_test_word);
		alert(correct);
		addEntry(current_test_word,guess.value,real_answer,correct); 

		//Reset the text field and re-focus on the text box 
		current_test_word = generateRandomWord();
		updateTestWord(current_test_word); 
		guess.value=""; 
		guess.focus(); 
	}); 


});

