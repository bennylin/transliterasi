/*!
* transliterator.js (Toba-Latin / Toba Script to Latin)
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
"ᯀ":"a",
"ᯂ":"h_",
"ᯅ":"b_",
"ᯇ":"p_",
"ᯉ":"b_",
"ᯋ":"w_",
"ᯎ":"g_",
"ᯐ":"j_",
"ᯑ":"d_",
"ᯒ":"r_",
"ᯔ":"m_",
"ᯖ":"t_",
"ᯗ":"t_",
"ᯘ":"s_",
"ᯛ":"y_",
"ᯞ":"l_",
"ᯡ":"c_",
"ᯠ":"ny_",
"ᯤ":"i",
"ᯥ":"u",
"ᯩ":"é",
"ᯪ":"i",
"ᯬ":"o",
"ᯮ":"u",
"ᯰ":"ng",
"᯲":"",
"​":'#',//zero-width joiner
"​":' '//zero-width space
}
var latn2toba = {

"#":'​',//zero-width joiner
" ":'​'//zero-width space
}
String.prototype.ganti=function(index, character) {
return this.substr(0, index) + character;// + this.substr(index+character.length);
}
String.prototype.ganti2=function(index, character) {
return this.substr(0, index-1) + character;// + this.substr(index+character.length);
}
String.prototype.ganti3=function(index, character) {
return this.substr(0, index-2) + character;// + this.substr(index+character.length);
}
String.prototype.capitalize = function() {
return this.charAt(0).toUpperCase() + this.slice(1);
}
function transliterate(regexp_file) {
var agt = navigator.userAgent.toLowerCase();
if (agt.indexOf("msie")!=-1) { //IE
var range = document.selection.createRange()
txt = range.text;
if (txt == '') {
var str = window.document.formText.editSrc.value;
}else{
var str = range.text;
}
}
else {
str = window.document.formText.editSrc.value;
}
var trans = str;
for (var i = 0, j = 0; i < str.length; i++) {
if (regexp_file[str[i]] && regexp_file["ᯀ"] == "a") { //toba->latin
trans = trans.ganti(j, regexp_file[str[i]]);j++;
} else if (regexp_file[str[i]] && regexp_file["a"] == "ᯀ") { //latin->toba
if (str[i] == "a" && i > 0) {
trans = trans.ganti(j, " ");j++;
} else {
trans = trans.ganti(j, regexp_file[str[i]]);j++;
}
} else {
trans = trans.ganti(j, str[i]);j++;
}
}
if (agt.indexOf("msie")!=-1) { //IE
if (txt == ''){
window.document.formText.editSrc.value = trans;
} else {
range.text = trans;
//if (!window.opera) txt = txt.replace(/\r/g,'')
if (range.moveStart) range.moveStart('character', - txt.length)
range.select()
}
}
else {
window.document.formText.editSrc.value = trans;
}
return true;
}
