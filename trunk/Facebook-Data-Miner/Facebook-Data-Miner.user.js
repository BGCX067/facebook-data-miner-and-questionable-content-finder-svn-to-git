// ==UserScript==
// @name           Facebook Data Miner and Questionable Content Finder
// @authors        Matthew Everts
// @addl.authors   Sebastian Park
// @description    Mine post data from wallposts and your newsfeed!
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/*sk=messages*
// @exclude        http://*.facebook.com/*sk=events*
// @exclude        http://*.facebook.com/*sk=media*
// ==/UserScript==
//Thanks to http://snipplr.com/view/1696/get-elements-by-class-name/ for getElementsByClassName(), to http://jehiah.cz/a/firing-javascript-events-properly for fireEvent(), and to http://www.technocator.com/2010/10/how-to-view-old-facebook-posts-using.html for loading older Facebook posts
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function fireEvent(element,event) {
   if (document.createEvent) {
       // dispatch for firefox + others
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ); // event type,bubbling,cancelable
       return !element.dispatchEvent(evt);
   } else {
       // dispatch for IE
       var evt = document.createEventObject();
       return element.fireEvent('on'+event,evt)
   }
}
data=[]
profiledata=[]
naughty=0;
naughtyArray=["fuck ","penis ","vagina ","anal ","pussy ","cum ","dick ","ass ","intercourse ","oral ","fucking ","cock ","shit ","orgasm ","porn ","blowjob ","slut ","sexual ","whore ","butt ","horny ","bitch ","cunt ","rape ","balls ","jizz ","boobs ","bang ","masturbation ","blow job ","anus ","oral ","booty ","tits ","drugs ","anal ","sex ","weed ","sex ","cocaine ","marijuana ","crack ","alcohol ","coke ","heroin ","dope ","pills ","party ","meth ","drug ","smoke ","lsd ","ecstasy ","acid ","stoned ","smoking ","cannabis ","speed ","shrooms ","illegal ","bong ","beer ","joint ","blow ","stoner ","ecstacy ","shit ","booze ","drunk ","beer ","drink ","drinking ","booze ","party ","vodka ","drugs ","liquor ","sex ","wasted ","drinks ","hangover ","alcoholic ","whiskey ","shot ","shots ","rum ","cocktail ","intoxicated ","hammered ","crunk ","marijuana ","vomit ","tequila ","pissed ","shit ","smashed ","fucked ","gin "," pot ","puke ","tipsy ","drank ","mixed drink ","mixed drinks ","drunk ","wasted ","smashed ","intoxicated ","shitfaced ","plastered ","pissed ","trashed ","sloshed ","fucked ","alcohol ","crunk ","tanked ","drinking ","shit-faced ","inebriated ","blitzed ","shitfaced ","fucked ","beers ","tipsy ","stoned ","sober ","wrecked ","booze ","buzzed ","drink ","party ","slammed ","hangover ","destroyed ","blackout ","blasted ","sex ","liquor ","obliterated ","alcoholic ","crunked ","blazed ","hungover ","weed ","shitty ","shmammered ","slizzard ","grey goose ","pissed ","blitzed "," ass "]
pos=[];
feedposts=[];
profileposts=[];
newprofileposts=[];
x=0;
function crawl() {
	var secondstext = prompt("Load older posts for how many seconds?", "15");
	if(!isNaN(secondstext)){
		seconds = parseInt(secondstext);
		milliseconds=seconds*1000
		}
	else{
	milliseconds=15000
	}
if (document.body.className.indexOf("ego_page home")>-1)
{
	location.href = "javascript:function clrt(){alert('Stopped Post Load');if(f_sM){clearTimeout(f_sM);}};function showMore(){UIIntentionalStream.instance.loadOlderPosts();f_sM = setTimeout(showMore, 3000); xsm=document.getElementById('profile_pager_container');xsm.addEventListener('click',clrt,false)}; showMore(); void(0)"
	data=[]
	function feedMine() {
		data=getElementsByClassName("pvm uiUnifiedStory");
for (x in data)
{
	c=data[x].getAttribute("data-ft").indexOf("fbid")
	d=data[x].getAttribute("data-ft").indexOf("qid")
	if (c==-1) {
	c=data[x].getAttribute("data-ft").indexOf("object_id")+4
}
if(d==-1) {
		d=data[x].getAttribute("data-ft").indexOf("s_obj")
		}
try {
feedposts[x]=[data[x].getAttribute("data-ft").slice(c+7,d-3), data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[1].lastChild.innerHTML];
profileURL=data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href
}
catch(err)
		{
		}
}
facebookData=feedposts
document.write("<table border='0'>")
for (x in facebookData) {
for (y in naughtyArray){
if(facebookData[x][3] && facebookData[x][3].indexOf(naughtyArray[y])>-1)
{
	pos[x]=[facebookData[x][3].indexOf(naughtyArray[y]), naughtyArray[y].length]
	naughty++
break
}
else{
pos[x]=[-1,0]
}
}
if (pos[x][0]>-1) {
	f=pos[x][0]
	g=pos[x][0]+pos[x][1]
text1=facebookData[x][3].slice(0,f)
text2=facebookData[x][3].slice(f,g)
text3=facebookData[x][3].slice(g)
document.write("<tr><td style='background-color: #FFFF00'>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+text1+"<span style='background-color: #FFFF00'>"+text2+"</span>"+text3+"</td></tr>")
}
else{
document.write("<tr><td>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+facebookData[x][3]+"</td></tr>")
}
}
document.write("</table>")
location.href = "javascript:clearTimeout(f_sM); void(0);"
alert(naughty+" questionable posts found.")
}
setTimeout(feedMine, milliseconds)
}
y=0

if (document.body.className.indexOf("profile nile_profile")>-1)
{
	location.href = "javascript:function clrt(){alert('Stopped Post Load');if(f_sM){clearTimeout(f_sM);}};function showMore(){ProfileStream.getInstance().showMore();f_sM = setTimeout(showMore, 3000); xsm=document.getElementById('profile_pager_container');xsm.addEventListener('click',clrt,false)}; showMore(); void(0)"
	profiledata=[];
	birthdayData=document.getElementsByTagName("dl")
	birthdayDataT=birthdayData[0].getElementsByTagName("dt")
	birthdayDataD=birthdayData[0].getElementsByTagName("dd")
	for (x in birthdayDataT) {
		if (birthdayDataT[x].innerHTML=="Birthday:"){
		birthDate=birthdayDataD[x].innerHTML
		break
		}
	}
	function mine() {
	profiledata=getElementsByClassName("UIIntentionalStory");
	for (y in profiledata)
	{
		c=profiledata[y].getAttribute("data-ft").indexOf("fbid")
		d=profiledata[y].getAttribute("data-ft").indexOf("s_obj")
		
		//gets postID, actor name, actor's profile URL, and post text content
		try {
		profileposts[y]=[profiledata[y].getAttribute("data-ft").slice(c+7, d-3), profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, profiledata[y].childNodes[1].childNodes[1].lastChild.innerHTML];
		}
		catch(err)
		{
		}
	}
	facebookData=profileposts
document.write("<table border='0'>")
if(birthDate){
	document.write("<tr><td><b>The user's birth date is: "+birthDate+"</b></td></tr>")
}
for (x in facebookData) {
for (y in naughtyArray){
if(facebookData[x][3] && facebookData[x][3].indexOf(naughtyArray[y])>-1)
{
	pos[x]=[facebookData[x][3].indexOf(naughtyArray[y]), naughtyArray[y].length]
	naughty++
break
}
else{
pos[x]=[-1,0]
}
}
if (pos[x][0]>-1) {
	f=pos[x][0]
	g=pos[x][0]+pos[x][1]
text1=facebookData[x][3].slice(0,f)
text2=facebookData[x][3].slice(f,g)
text3=facebookData[x][3].slice(g)
document.write("<tr><td style='background-color: #FFFF00'>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+text1+"<span style='background-color: #FFFF00'>"+text2+"</span>"+text3+"</td></tr>")
}
else {
document.write("<tr><td>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+facebookData[x][3]+"</td></tr>")
}
}
document.write("</table>")
location.href = "javascript:clearTimeout(f_sM); void(0);"
alert(naughty+" questionable posts found.")
}
window.setTimeout(mine,milliseconds)
}
if (document.body.className.indexOf("nile_profile")==-1 && document.body.className.indexOf("profile")>-1)
{
location.href="javascript: function fireEvent(element,event) {if(document.createEvent){var evt = document.createEvent('HTMLEvents');evt.initEvent(event, true, true ); return !element.dispatchEvent(evt);} else {var evt = document.createEventObject(); return element.fireEvent('on'+event,evt)}}; function loadOlderPosts() {button=document.getElementById('profile_pager').childNodes[0].childNodes[0].childNodes[0].childNodes[0]; fireEvent(button, 'click'); timer=setTimeout(loadOlderPosts,3000);};loadOlderPosts();"
	data=[]
	function mine2() {
	data=getElementsByClassName("pvm uiUnifiedStory");
	birthdayData=getElementsByClassName("fbProfileBylineFragment")
	for (a in birthdayData) {
	if (birthdayData[a].childNodes[0].src=="http://static.ak.fbcdn.net/rsrc.php/zK/r/sPLTEENyYCr.png" || birthdayData[a].childNodes[0].className=="mrs fbProfileBylineIcon img sp_26olor sx_e6ba0b") {
		birthDate=birthdayData[a].innerHTML.slice(71)
	}
	}
	for (x in data)
	{
		c=data[x].getAttribute("data-ft").indexOf("fbid")
		d=data[x].getAttribute("data-ft").indexOf("qid")
		//gets postID, actor name, actor's profile URL, and post text content
		if(data[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML!=="Remove Post"){
		try {	
		newprofileposts[x]=[data[x].getAttribute("data-ft").slice(c+7, d-3), data[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[0].lastChild.innerHTML];	
		}
		catch(err)
		{
		}
		}
	else {
		newprofileposts[x]=[data[x].getAttribute("data-ft").slice(c+7, d-3), data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[1].lastChild.innerHTML];	
	}
	}
	facebookData=newprofileposts
	document.write("<table border='0'>")
	if(birthDate){
	document.write("<tr><td><b>The user's birth date is: "+birthDate+"</b></td></tr>")
}
for (x in facebookData) {
	for (y in naughtyArray){
if(facebookData[x][3] && facebookData[x][3].indexOf(naughtyArray[y])>-1)
{
	pos[x]=[facebookData[x][3].indexOf(naughtyArray[y]), naughtyArray[y].length]
	naughty++
break
}
else{
pos[x]=[-1,0]
}
}
if (pos[x][0]>-1) {
	f=pos[x][0]
	g=pos[x][0]+pos[x][1]
text1=facebookData[x][3].slice(0,f)
text2=facebookData[x][3].slice(f,g)
text3=facebookData[x][3].slice(g)
document.write("<tr><td style='background-color: #FFFF00'>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+text1+"<span style='background-color: #FFFF00'>"+text2+"</span>"+text3+"</td></tr>")
}
else{
document.write("<tr><td>"+facebookData[x][0]+"</td><td>"+facebookData[x][1]+"</td><td>"+facebookData[x][2]+"</td><td>"+facebookData[x][3]+"</td></tr>")
}
}
document.write("</table>")
location.href="javascript:clearTimeout(timer); void(0);"
alert(naughty+" questionable posts found.")
}
	window.setTimeout(mine2,milliseconds)
}	
}
if (document.body.className.indexOf("nile_profile")==-1 || document.body.className.indexOf("profile")>-1 || document.body.className.indexOf("ego_page home")>-1) {
try {
minerbutton=document.getElementById('pageNav').childNodes[2]
minerbutton.innerHTML="<a id=\'minerbutton\'>Mine!</a>"}
catch(err2){
}
try{
minerbutton.addEventListener("click", crawl, true);
}
catch(err3){
}
}