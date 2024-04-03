function getLabelforForId(inputname) {
	// https://stackoverflow.com/a/54594598
	var label = document.querySelector('label[for="' + inputname + '"]')
	if (!label) {
		return null;
	}
    return label.innerHTML.trim();
}

function getCheckedRadio(groupname) {
	var selectedradio = document.querySelector('input[name="' + groupname + '"]:checked');
	return selectedradio;
}

function getCheckedRadioLabel(groupname) {
	// see which radio is selected
	selectedradio = getCheckedRadio(groupname);
	if (!selectedradio) {
		return null;
	}
	// grab its id
	selectedid = selectedradio.id;

	// get the id's label based on the "for" field
	return getLabelforForId(selectedid);
}

function getAllCheckboxLabels(groupname) {
	// see which checkboxes are selected
	var selecteds = document.querySelectorAll('input[name="' + groupname + '"]:checked');
	if (selecteds.length == 0) {
		return null;
	}

	concatarray = [];
	for (let sel of selecteds) {
	  concatarray.push(getLabelforForId(sel.id));
	}
	return concatarray;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkEndPunctuation(string) {
	const punctuations = ['.', '?', '!', ';'];
	const lastChar = string.trim().charAt(string.length - 1);
	return (punctuations.indexOf(lastChar) != -1);
}

function addPeriodIfNoPunc(string) {
	if(checkEndPunctuation(string)) {
		return string;
	}
	return string + '.';
}

function extendOptionsHandler(event) {
	btnId = event.target.id;
	btnDivId = event.target.id + 'div';
	extendDivId = event.target.id.replace(/-btn$/i, '-div');

	btnDiv = document.getElementById(btnDivId);
	extendDiv = document.getElementById(extendDivId);

	extendDiv.style.display = "block";
	btnDiv.style.display = "none";
}

// Add or remove "generate" listener to every single tagtype
function setAllInputEventListeners(tagname, funcname, toggle) {
	for (let inputElem of document.getElementsByTagName(tagname)) {
		if (toggle) {
			switch(inputElem.type) {
			case "radio":
			case "checkbox":
				inputElem.addEventListener("change", funcname);
				break;
			case "text":
				inputElem.addEventListener("input", funcname);
				break;
			}
		} else {
			switch(inputElem.type) {
			case "radio":
			case "checkbox":
				inputElem.removeEventListener("change", funcname);
				break;
			case "text":
				inputElem.removeEventListener("input", funcname);
				break;
			}
		}
	}
}
