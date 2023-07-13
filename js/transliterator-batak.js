/*!
 * transliterator-batak.js (Toba-Latin / Toba Script to Latin)
 * https://bennylin.github.com/transliterasi/batak.html
 *
 * Copyright 2021, Bennylin @bennylin
 * Released under the CC-BY-SA.
 *
 * 1 April 2021 - v 0.1
 * 14 Juli 2023 - v 0.2
 *
 *
 */

var batak2latn = {
    "᯦": '​',
    "ᯀ": "a",
    "ᯁ": "a",
    "ᯃ": "ha",
    "ᯄ": "ha",
    "ᯂ": "ha",
    "ᯅ": "ba",
    "ᯆ": "ba",
    "ᯇ": "pa",
    "ᯈ": "pa",
    "ᯉ": "na",
    "ᯊ": "na",
    "ᯋ": "wa",
    "ᯌ": "wa",
    "ᯍ": "wa",
    "ᯎ": "ga",
    "ᯏ": "ga",
    "ᯐ": "ja",
    "ᯑ": "da",
    "ᯒ": "ra",
    "ᯓ": "ra",
    "ᯔ": "ma",
    "ᯕ": "ma",
    "ᯖ": "ta",
    "ᯗ": "ta",
    "ᯘ": "sa",
    "ᯙ": "sa",
    "ᯚ": "sa",
    "ᯛ": "ya",
    "ᯜ": "ya",
    "ᯞ": "la",
    "ᯟ": "la",
    "ᯡ": "ca",
    "ᯠ": "nya",
    "ᯝ": "nga",
    "ᯢ": "nda",
    "ᯣ": "mba",
    "ᯤ": "i",
    "ᯥ": "u",
    "ᯧ": "e",
    "ᯩ": "é",
    "ᯪ": "i",
    "ᯫ": "i",
    "ᯬ": "o",
    "ᯭ": "o",
    "ᯨ": "o",
    "ᯮ": "u",
    "ᯱ": "h",
    "ᯰ": "ng",
    "᯳": '​',
    "᯲": '​',
    "​": '#', //zero-width joiner
    "​": ' ' //zero-width space
}
String.prototype.ganti = function(index, characterr) {
    return this.substr(0, index) + characterr; // + this.substr(index+character.length);
}
String.prototype.ganti2 = function(index, characterr) {
    return this.substr(0, index-1) + characterr; // + this.substr(index+character.length);
}
String.prototype.ganti3 = function(index, characterr) {
    return this.substr(0, index-2) + characterr; // + this.substr(index+character.length);
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function transliterate(regexp_file) {
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("msie") != -1) { //IE
        var range = document.selection.createRange()
        txt = range.text;
        if (txt == '') {
            var str = window.document.formText.editSrc.value;
        } else {
            var str = range.text;
        }
    } else {
        str = window.document.formText.editSrc.value;
    }
    var trans = str;
    for (var i = 0, j = 0; i < str.length; i++) {
    	if (!regexp_file[str[i]]) { //not Batak
        trans = trans.ganti(j, str[i]);j++;
      } else {
        if (i > 0 && (str[i] == "ᯩ" || str[i] == "ᯪ" || str[i] == "ᯬ" || str[i] == "ᯮ")) {
          if (i > 0 && str[i-1] == "ᯀ") { 
            if (str[i] == "ᯩ") trans = trans.ganti2(j,"e"); 
            else if (str[i] == "ᯪ") trans = trans.ganti2(j,"i");
            else if (str[i] == "ᯬ") trans = trans.ganti2(j,"o"); 
            else if (str[i] == "ᯮ") trans = trans.ganti2(j,"u"); 
          }
          else 
            { trans = trans.ganti2(j, regexp_file[str[i]]); }
        } else if (i > 0 && (str[i] == "᯦")) { // tompi
          if (str[i-1] == "ᯄ") { 
            trans = trans.ganti3(j,"ka"); 
          } else if (str[i-1] == "ᯚ") { 
            trans = trans.ganti3(j,"ca"); 
          } else 
            { trans = trans.ganti2(j, regexp_file[str[i]]); }
        } else if (str[i] == "᯲" || str[i] == "᯳") {
          trans = trans.ganti2(j, regexp_file[str[i]]);
        } else if (str[i] == "ᯠ" || str[i] == "ᯝ" || str[i] == "ᯢ" || str[i] == "ᯣ") {
            trans = trans.ganti(j, regexp_file[str[i]]);j+=3;//nya, nga, nda, mba
        } else if (str[i] == "ᯀ" || str[i] == "ᯥ" || str[i] == "ᯤ" || str[i] == "ᯱ") {
            trans = trans.ganti(j, regexp_file[str[i]]);j++;//a, -h
        } else {
            trans = trans.ganti(j, regexp_file[str[i]]);j+=2;//ba, ca, da, dll.
        }

      }
    }

    if (agt.indexOf("msie") != -1) { //IE
        if (txt == '') {
            window.document.formText.editSrc.value = trans;
        } else {
            range.text = trans;
            //if (!window.opera) txt = txt.replace(/\r/g,'')
            if (range.moveStart) range.moveStart('character', -txt.length)
            range.select()
        }
    } else {
        window.document.formText.editSrc.value = trans;
    }
    return true;
}
