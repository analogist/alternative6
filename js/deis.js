function generateSection1() {
	fillpid = getCheckedRadioLabel("personalID");
	fillbetteropt = getCheckedRadioLabel("betterOpt");

	if (!fillpid || !fillbetteropt) {
		return '';
	}

	fixed1a = document.getElementById("fixedtext1a").innerHTML.trim();
	fixed1b = document.getElementById("fixedtext1b").innerHTML.trim();

	// add additional textboxes
	switch(getCheckedRadio("personalID").id) {
		case "personalID1":
		fillpid = fillpid + ' ' + capitalizeFirstLetter(document.getElementById("rentarea").value);
		break;
		case "personalID2":
		fillpid = fillpid + ' ' + capitalizeFirstLetter(document.getElementById("ownarea").value);
		break;
		case "personalID9":
		fillpid = fillpid + ' ' + capitalizeFirstLetter(document.getElementById("unstablearea").value);
		break;
		case "personalID8":
		fillpid = fillpid + ' ' + document.getElementById("profession").value;
		break;
		default:
		break;
	}
	return fillpid + ', ' + fixed1a + ' ' + fixed1b + ' ' + fillbetteropt;
}

function generateSection2() {
	fixed = document.getElementById("fixedtext2").innerHTML.trim();
	fill = getAllCheckboxLabels("harmsOpt");
	if (!fill) {
		return '';
	}
	return ' ' + fixed + ' ' + fill;
}

function generateSection3() {
	fixedbefore = document.getElementById("fixedtext3a").innerHTML.trim();
	fixedmiddle = document.getElementById("fixedtext3b").innerHTML.trim();

	fillcityadj = getAllCheckboxLabels("cityAdj");
	fillimprove = getCheckedRadioLabel("betterImpr");

	if (!fillcityadj || !fillimprove) {
		return '';
	}

	fillcityadj = fillcityadj.join(", ");

	return ' ' + fixedbefore + ' ' + fillcityadj + ' ' + fixedmiddle + ' ' + fillimprove;
}

function generateSection4() {
	fillneigh = capitalizeFirstLetter(document.getElementById("specneighborhood").value);
	fillpropos = document.getElementById("proposaltextbox").value;

	if (!fillneigh || !fillpropos) {
		return '';
	}

	fixedbefore = document.getElementById("fixedtext4a").innerHTML.trim();
	fixedmiddle = document.getElementById("fixedtext4b").innerHTML.trim();

	fillpropos = addPeriodIfNoPunc(fillpropos);

	return '\n\n' + fixedbefore + ' ' + fillneigh + ' ' + fixedmiddle + ' ' + fillpropos;
}

function generateSection5() {
	fixed = document.getElementById("fixedtext5").innerHTML.trim();
	fill = getCheckedRadioLabel("altPossible");
	if (!fill) {
		return '';
	}
	return '\n\n' + fixed + ' ' + fill;
}

function generateMain() {
	// element to dump text into
	outputbox = document.getElementById("outputtextbox");

	fulltext = generateSection1() +
				generateSection2() +
				generateSection3() +
				generateSection4() + 
				generateSection5();

	// fill in the output box
	outputbox.value = fulltext;
	updateCharCountBar();
}

function enableAutoGenerate() {
	genbutton = document.getElementById("genbuttonmain");
	setAllInputEventListeners("input", generateMain, true);
	genbutton.classList.replace('btn-warning', 'btn-primary');
	genbutton.innerHTML = "↻ Generate comment from selections"
}

function disableAutoGenerate() {
	genbutton = document.getElementById("genbuttonmain");
	setAllInputEventListeners("input", generateMain, false);
	genbutton.classList.replace('btn-primary', 'btn-warning');
	genbutton.innerHTML = "⚠ Regenerate edited comment"
}

function updateCharCountBar() {
	countval = document.getElementById("outputtextbox").value.length;
	charcount = document.getElementById("charcount");
	charcountbar = charcount.children[0];

	charcount.ariaValueNow = countval;
	charcountbar.innerHTML = countval.toString() + "/1000";
	charcountbar.style.width = (countval/charcount.ariaValueMax*100).toString() + '%';

	if (countval < 150) {
		charcountbar.classList.add("overflow-visible", "text-dark");
	} else {
		charcountbar.classList.remove("overflow-visible", "text-dark");
	}

	if (countval > 1000) {
		charcountbar.classList.replace('bg-success', 'bg-danger');
	} else {
		charcountbar.classList.replace('bg-danger', 'bg-success');
	}
}

// add extendOptionsHandler to every extend-opt-btn button
for (let extendBtn of document.getElementsByClassName('extend-opt-btn')) {
	extendBtn.addEventListener("click", extendOptionsHandler);
}

// Listener for copy text button
document.getElementById("copybutton").addEventListener("click", () => {
	outputbox = document.getElementById("outputtextbox");
	navigator.clipboard.writeText(outputbox.value);
});

// If generate button clicked, generate text and add back all listeners
document.getElementById("genbuttonmain").addEventListener("click", () => {
	generateMain();
	enableAutoGenerate();
});

// If text is edited,, disable auto listeners until gen button clicked again
document.getElementById("outputtextbox").addEventListener("input", () => {
	disableAutoGenerate();
	updateCharCountBar();
})

// Start off with all listeners initialized
enableAutoGenerate();
updateCharCountBar();