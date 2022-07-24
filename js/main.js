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

function generateSection1() {
	fill = getCheckedRadioLabel("personalID");
	if (!fill) {
		return '';
	}
	fixed = document.getElementById("fixedtext1").innerHTML.trim();

	// add additional textboxes
	switch(getCheckedRadio("personalID").id) {
		case "personalID1":
		fill = fill + ' ' + capitalizeFirstLetter(document.getElementById("rentarea").value);
		break;
		case "personalID2":
		fill = fill + ' ' + capitalizeFirstLetter(document.getElementById("ownarea").value);
		break;
		case "personalID8":
		fill = fill + ' ' + document.getElementById("profession").value;
		break;
		default:
		break;
	}
	return fill + ', ' + fixed;
}

function generateSection2() {
	fixedbefore = document.getElementById("fixedtext2a").innerHTML.trim();
	fixedafter = document.getElementById("fixedtext2b").innerHTML.trim();

	fill = getAllCheckboxLabels("cityAdj");
	if (!fill) {
		return '';
	}
	fill = fill.join(", ");

	return ' ' + fixedbefore + ' ' + fill + ' ' + fixedafter;
}

function generateSection3() {
	fixed = document.getElementById("fixedtext3").innerHTML.trim();
	fill = getAllCheckboxLabels("betterOpt");
	if (!fill) {
		return '';
	}
	fill = fill.join("\n");
	return '\n\n' + fixed + '\n' + fill;
}

function generateSection4() {
	fixed = document.getElementById("fixedtext4").innerHTML.trim();
	fill = getAllCheckboxLabels("altPossible");
	if (!fill) {
		return '';
	}
	fill = fill.join("\n");
	return '\n\n' + fixed + '\n' + fill;
}

function generateSection5() {
	fixed = document.getElementById("fixedtext5").innerHTML.trim();
	fill = getAllCheckboxLabels("shortFalls");
	if (!fill) {
		return '';
	}
	fill = fill.join("\n");
	return '\n\n' + fixed + '\n' + fill;
}

function generateSection6() {
	fill = getCheckedRadioLabel("greatCity");
	if (!fill) {
		// check for custom city box
		ccb = getCheckedRadio("greatCity");
		if (ccb && ccb.id == "greatCity4") {
			fill = capitalizeFirstLetter(document.getElementById("modelcity").value);
		}
		else {
			return '';
		}
	}
	fixedbefore = document.getElementById("fixedtext6a").innerHTML.trim();
	fixedafter = document.getElementById("fixedtext6b").innerHTML.trim();
	fixedafter2 = document.getElementById("fixedtext6c").innerHTML.trim();

	// check to see if photo link
	modelphoto = document.getElementById("modelcityphoto").value;
	if (modelphoto.length > 0) {
		fixedafter = fixedafter + ' ' + fixedafter2 + ' ' + modelphoto.trim();
	}

	return '\n\n' + fixedbefore + ' ' + fill + ' ' + fixedafter;
}

function copyTextFunc() {
	outputbox = document.getElementById("outputtextbox");
	navigator.clipboard.writeText(outputbox.value);
}

function generateMain() {
	// element to dump text into
	outputbox = document.getElementById("outputtextbox");

	fulltext = generateSection1() +
				generateSection2() +
				generateSection3() + 
				generateSection4() + 
				generateSection5() + 
				generateSection6() + 
				'\n\n' + 
				document.getElementById("fixedtext7").innerHTML.trim();;


	// fill in the output box
	outputbox.value = fulltext;
}

document.getElementById("genbuttonmain").addEventListener("click", generateMain);

document.getElementById("copybutton").addEventListener("click", copyTextFunc);