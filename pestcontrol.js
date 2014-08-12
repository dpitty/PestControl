
/*	pestcontrol.js
 *  Pest Control core functionality
 *	===============================
 *		CHANGES: <hr> is now outside of note div
 */


"use strict";

var PestControl = (function() {
	/* Keycodes */
	var RETURN_KEY = 13; //keypresss v
	var E_KEY = 69;
	var A_KEY = 65;
	var I_KEY = 73;
	var UPARROW_KEY = 38;  //keydown
	var DOWNARROW_KEY = 40; //keydown
	var ESCAPE_KEY = 27;
	var BACKSPACE_KEY = 8;

	var notesBlock = document.getElementById('notesBlock');
	var instructionsBox = document.getElementById('instructionsBox');

	function noteByIndex(i) {
		return notesBlock.children[i];
	}


	function highlight(index) {
		noteByIndex(index).children[0].className = "highlight";
	}

	function unhilight(index) {
		noteByIndex(index).children[0].className = "";
	}

	//length = notes.children.length
	var index = 0;
	var editing = false;
	highlight(index);

	function tag(text) {
		return "<div><p>"+text+"</p></div><hr/>" //to be placed inside "DIV" node
	}

	function textField(text) {
		return "<textarea id='textField'>'"+text+"</textarea>";
	}

	function newNote(text) {
		//parentElement.insertBefore(newElement, referenceElement);
		noteByIndex(index).firstChild.className = "";		
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

	//Whatever is in the textarea will become a note
	function finishNote() {
		var toInsert = document.createElement("div");
		var ta = document.getElementById("textarea");
		toInsert.innerHTML = tag(ta.value);
		ta.parentNode.removeChild(ta);
		if (ta.value == "") {
			noteByIndex(index).firstChild.className = "highlight";
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
		noteByIndex(index).firstChild.className = "";
		index--;
		if (index < 0) { index = notesBlock.children.length - 1}
		noteByIndex(index).firstChild.className = "highlight";
	}

	function scrollDown() {
		unhilight(index);
		index++;
		if (index >= notesBlock.children.length) { index = 0}
		highlight(index);	
	}

	function toggleInstructions() {
		if (instructionsBox.className) {
			instructionsBox.className = "";
		}
		else {
			instructionsBox.className = "hidden";
		}
	}

	document.body.onclick = function(e) {
		//alert("YOUR MOUSE IS USELESS! To see instructions, press 'I' (letter i) >:-O");
		if (!editing) {
			toggleInstructions();
		}
	}

	document.body.onkeydown = function(e) {


		if (!editing) {
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
				case I_KEY:
					e.preventDefault();
					toggleInstructions();
					break;
				case UPARROW_KEY:
					e.preventDefault();
					scrollUp();
					break;
				case DOWNARROW_KEY:
					e.preventDefault();
					scrollDown();
					break;
				}	
			}

		else {
			switch(e.keyCode) {
				case RETURN_KEY:
					e.preventDefault();
					finishNote();
					break;
				}
			}
		}

	return {
		notesBlock: notesBlock.children,
		index: function() { return index; }
	}

})();

