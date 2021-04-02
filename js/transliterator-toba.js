/*!
 * transliterator-toba.js (Toba-Latin / Toba Script to Latin)
 * https://bennylin.github.com/transliterasi/toba.html
 *
 * Copyright 2021, Bennylin @bennylin
 * Released under the CC-BY-SA.
 *
 * Date: 1 April 2021 - v 0.1
 *
 *
 *
 */

var toba2latn = {
    "ᯀ": "a",
    "ᯂ": "ka",
    "ᯅ": "ba",
    "ᯇ": "pa",
    "ᯉ": "na",
    "ᯋ": "wa",
    "ᯎ": "ga",
    "ᯐ": "ja",
    "ᯑ": "da",
    "ᯒ": "ra",
    "ᯔ": "ma",
    "ᯖ": "ta",
    "ᯗ": "ta",
    "ᯘ": "sa",
    "ᯛ": "ya",
    "ᯞ": "la",
    "ᯡ": "ca",
    "ᯠ": "nya",
    "ᯤ": "i",
    "ᯥ": "u",
    "ᯩ": "é",
    "ᯪ": "i",
    "ᯬ": "o",
    "ᯮ": "u",
    "ᯰ": "ng",
    "᯲": '​',
    "​": '#', //zero-width joiner
    "​": ' ' //zero-width space
}
var latn2toba = {

    "#": '​', //zero-width joiner
    " ": '​' //zero-width space
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
    	if (!regexp_file[str[i]]) { //not Toba
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
        } else if (str[i] == "᯲") {
          trans = trans.ganti2(j, regexp_file[str[i]]);
        } else if (str[i] == "ᯠ") {
            trans = trans.ganti(j, regexp_file[str[i]]);j+=3;//nya
        } else if (str[i] == "ᯀ") {
            trans = trans.ganti(j, regexp_file[str[i]]);j++;//a
        } else {
            trans = trans.ganti(j, regexp_file[str[i]]);j+=2;//ba, ca, da, dll.
        } /*
        } else {
          trans = trans.ganti(j, regexp_file[str[i]]);j++;
          //trans = trans.ganti(j, "@");j++;
        }*/

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