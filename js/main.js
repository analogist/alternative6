function getLabelforForId(inputname) {
	// https://stackoverflow.com/a/54594598
	var label = document.querySelector('label[for="' + inputname + '"]')
	if (!label) {
		return null;
	}
    return label.innerHTML.trim();
}

function getCheckedRadioLabel(groupname) {
	// see which radio is selected
	var selectedradio = document.querySelector('input[name="' + groupname + '"]:checked')
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

function generateSection1() {
	fill = getCheckedRadioLabel("personalID");
	if (!fill) {
		return '';
	}
	fixed = document.getElementById("fixedtext1").innerHTML.trim();
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
		return '';
	}
	fixedbefore = document.getElementById("fixedtext6a").innerHTML.trim();
	fixedafter = document.getElementById("fixedtext6b").innerHTML.trim();
	fixedafter2 = document.getElementById("fixedtext6c").innerHTML.trim();
	return '\n\n' + fixedbefore + ' ' + fill + ' ' + fixedafter + ' ' + fixedafter2;
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

document.getElementById("copybutton").addEventListener("click", copyTextFunc)