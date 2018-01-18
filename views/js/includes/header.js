var script = document.getElementById("headerScript");
var pageName = script.innerHTML;

document.write('<div class="topnav" id="myTopnav">');
document.write('<a ');
if (pageName=='index') {
    document.write(' class="active" ');
}
document.write(' href="index.html">Home</a>');

document.write('<a ');
if (pageName=='viewer') {
    document.write(' class="active" ');
}
document.write(' href="viewer.ejs">View Kitties</a>');

document.write('<a ');
if (pageName=='family') {
    document.write(' class="active" ');
}
document.write(' href="family.ejs">Family Tree</a>');

document.write('<a ');
if (pageName=='arena') {
    document.write(' class="active" ');
}
document.write(' href="arena.ejs">Battle</a>');

document.write('<a ');
if (pageName=='feedback') {
    document.write(' class="active" ');
}
document.write(' href="feedback.ejs">Feedback</a>');

document.write('</div>');
