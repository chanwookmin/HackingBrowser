// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below

//console.log("Hello, world! (from a content script) (version: 1)");

var x=document.getElementsByTagName("*");
var b_color = 0;
var t_color = 360;

var myVar = setInterval(myTimer, 50);
function myTimer(){
for(i=0;i<x.length;i++){
x[i].style.backgroundColor = "hsl("+b_color+",50%,50%)";
x[i].style.color = "hsl("+t_color+",50%,50%)";
//x[i].src = " ";
}
b_color++;
f_color--;
}


// change all paragraphs to red:
// $('p').css({'color': 'red'});
