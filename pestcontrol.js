
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
	var EQUALS_KEY = 187;
	var UPARROW_KEY = 38;  //keydown
	var DOWNARROW_KEY = 40; //keydown
	var ESCAPE_KEY = 27;
	var BACKSPACE_KEY = 8;

	var notesBlock = document.getElementById('notesBlock');

	function noteByIndex(i) {
		return notesBlock.children[i];
	}
	//length = notes.children.length
	var index = 2;
	var editing = false;


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
		if (ta.value != "") {
			notesBlock.insertBefore(toInsert, noteByIndex(index + 1));
			scrollDown();
		}
		else {
			index--;
			scrollDown();
		}
		editing = false;
	}

	function deleteNote() {
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
		noteByIndex(index).firstChild.className = "";
		index++;
		if (index >= notesBlock.children.length) { index = 0}
		noteByIndex(index).firstChild.className = "highlight";
	}


	document.body.onkeypress = function(e) {
		//console.log(e.keyCode);
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
				case UPARROW_KEY:
					scrollUp();
					break;
				case DOWNARROW_KEY:
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
		notesBlock: notesBlock.children
	}

})();

