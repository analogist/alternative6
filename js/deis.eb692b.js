function generateSection1() {
	fillpid = getCheckedRadioLabel("personalID");
	fillbetteropt = getCheckedRadioLabel("betterOpt");

	if (!fillpid && !fillbetteropt) {
		return '';
	}

	fixed1a = document.getElementById("fixedtext1a").innerHTML.trim();
	fixed1b = document.getElementById("fixedtext1b").innerHTML.trim();

	// add additional textboxes
	if (fillpid) {
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
	} else {
		fillpid = "___";
	}

	if (!fillbetteropt) {
		fillbetteropt = "____.";
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

	if (!fillcityadj && !fillimprove) {
		return '';
	}

	if (fillcityadj) {
		fillcityadj = fillcityadj.join(", ");
	} else {
		fillcityadj = "___";
	}

	if (!fillimprove) {
		fillimprove = "___";
	}

	return ' ' + fixedbefore + ' ' + fillcityadj + ' ' + fixedmiddle + ' ' + fillimprove;
}

function generateSection4() {
	fillneigh = capitalizeFirstLetter(document.getElementById("specneighborhood").value);
	fillpropos = document.getElementById("proposaltextbox").value;

	if (!fillneigh && !fillpropos) {
		return '';
	}

	if (!fillneigh) {
		fillneigh = "___";
	}

	if (!fillpropos) {
		fillpropos = "___";
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
	updateEmailBox();
}

function enableAutoGenerate() {
	genbutton = document.getElementById("genbuttonmain");
	setAllInputEventListeners("input", generateMain, true);
	genbutton.classList.replace('btn-warning', 'btn-primary');
	genbutton.innerHTML = "↻ Autogenerating comment from selections"
}

function disableAutoGenerate() {
	genbutton = document.getElementById("genbuttonmain");
	setAllInputEventListeners("input", generateMain, false);
	genbutton.classList.replace('btn-primary', 'btn-warning');
	genbutton.innerHTML = "⚠ Regenerate comment<br />(overwrites custom edits)"
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

function updateEmailBox() {
	outputbox = document.getElementById("outputtextbox");
	emailbox = document.getElementById("emailtextbox");

	fulltext = "Dear Mayor Harrell,\n\nI am writing to you because adding more \
housing in all neighborhoods, planning for much more growth, and developing \
the city in a more sustainable and equitable way via this Seattle Comprehensive \
Plan Update is a major political priority for me. I am looking to you and the \
Council for leadership on this and will certainly be considering your decisions \
and work on the Comp Plan in the next election.\n\n" +
outputbox.value +
"\n\n<OPTIONAL PERSONAL STORY OR EXPERIENCE>\n\nSincerely,\n<YOUR NAME>";
	emailbox.value = fulltext;
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

// Listener for copy text button
document.getElementById("copyemailbtn").addEventListener("click", () => {
	outputbox = document.getElementById("emailtextbox");
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
	updateEmailBox();
})
document.getElementById("emailtextbox").addEventListener("input", () => {
	disableAutoGenerate();
	updateCharCountBar();
	updateEmailBox();
})

// Start off with all listeners initialized
enableAutoGenerate();
updateCharCountBar();