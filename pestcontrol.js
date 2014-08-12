
/*	pestcontrol.js
 *  Pest Control core functionality
 *	===============================
 *	
 */


"use strict";

var PestControl = (function() {
	/* Keycodes */
	var RETURN_KEY = 13;
	var E_KEY = 69;
	var A_KEY = 65;
	var I_KEY = 73;
	var UPARROW_KEY = 38;
	var DOWNARROW_KEY = 40;
	var ESCAPE_KEY = 27;
	var BACKSPACE_KEY = 8;

	/* Initializers and Helpers */
	var notesBlock = document.getElementById('notesBlock');
	var instructionsBox = document.getElementById('instructionsBox');
	var index = 0;
	var editing = false;
	var clicked = false;
	var instructionsUp = false;
	
	(function initTop() {
		var toInsert = document.createElement("div");
		toInsert.innerHTML = "<div id='insertTop'><p>&gt;&gt;New top note</p></div><hr/>"
			//Hate to hard code but this makes most sense for now.
		notesBlock.insertBefore(toInsert, noteByIndex(0));
		console.log("did it.")
		highlight(index);
	})();

	function tag(text) {
		return "<div><p>"+text+"</p></div><hr/>" //to be placed inside "DIV" node
	}

	function textField(text) {
		return "<textarea id='textField'>'"+text+"</textarea>";
	}


	function noteByIndex(i) {
		return notesBlock.children[i];
	}

	function highlight(index) {
		noteByIndex(index).children[0].className = "highlight";
	}

	function unhilight(index) {
		noteByIndex(index).children[0].className = "";
	}

	/* Core functions */
	function newNote(text) {
		unhilight(index);	
		var ta = document.createElement("textarea");
		ta.id = "textarea";
		notesBlock.insertBefore(ta, noteByIndex(index + 1));
		ta.focus();
		ta.value = text;
		editing = true;
	}

	function editNote() {
		if (index == 0) { return; }
		var toDelete = noteByIndex(index);
		var text = toDelete.firstChild.firstChild.innerHTML;
		toDelete.parentNode.removeChild(toDelete);
		index--;	
		newNote(text);
	}

	function finishNote() { //Whatever is in the textarea will become a note
		var toInsert = document.createElement("div");
		var ta = document.getElementById("textarea");
		toInsert.innerHTML = tag(ta.value);
		ta.parentNode.removeChild(ta);
		if (ta.value == "") { //Empty textarea? Same effect as deleteNote()
			highlight(index);
			editing = false;
		}
		else {
			notesBlock.insertBefore(toInsert, noteByIndex(index + 1));
			editing = false;
			scrollDown();
		}
	}

	function deleteNote() {
		if (index == 0) { return; }
		var toDelete = noteByIndex(index);
		toDelete.parentNode.removeChild(toDelete);
		index--;
		scrollDown();
	}

	function scrollUp() {
		unhilight(index);
		index--;
		if (index < 0) { index = notesBlock.children.length - 1}
		highlight(index);
	}

	function scrollDown() {
		unhilight(index);
		index++;
		if (index >= notesBlock.children.length) { index = 0}
		highlight(index);	
	}

	function toggleInstructions() {
		if (!instructionsUp) {
			instructionsBox.className = "";
			instructionsUp = true;
		}
		else {
			instructionsBox.className = "hidden";
			instructionsUp = false;
		}
	}


	/* Event Listeners */
	document.body.onclick = function(e) {
		if (!editing && !clicked) {
			toggleInstructions();
			clicked = true;
		}
	}

	document.body.onkeydown = function(e) {

		if (!editing && !instructionsUp) {
			switch(e.keyCode) {
				
				case BACKSPACE_KEY:
					e.preventDefault();
					deleteNote();
					break;
				
				case RETURN_KEY:
					e.preventDefault();
					newNote("");
					break;
				
				case E_KEY:
					e.preventDefault();
					editNote();
					break;
				
				case UPARROW_KEY:
					e.preventDefault();
					scrollUp();
					break;
				
				case DOWNARROW_KEY:
					e.preventDefault();
					scrollDown();
					break;
					
				case I_KEY:
					e.preventDefault();
					toggleInstructions();
					break;
				}
			}

		else if (editing) { //Edit mode on...
			switch(e.keyCode) {
				
				case RETURN_KEY:
					e.preventDefault();
					finishNote();
					break;
				}
			}

		else if (instructionsUp) {
			switch(e.keyCode) {
				case I_KEY:
					e.preventDefault();
					toggleInstructions();
					break;
				}
			}
		}

	/* For debugging purposes... */
	return {
		notesBlock: notesBlock.children,
		index: function() { return index; }
	}

})();

