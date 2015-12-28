// ==UserScript==
// @name           Facebook Data Miner
// @author         Matthew Everts
// @description    Mine post data from wallposts and your newsfeed!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/*sk=messages*
// @exclude        http://*.facebook.com/*sk=events*
// @exclude        http://*.facebook.com/*sk=media*
// ==/UserScript==
function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
};
function pausecomp(millis) 
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); } 
while(curDate-date < millis);
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
if(document.URL.indexOf("http://www.facebook.com")>-1 || document.URL.indexOf( "http://facebook.com")>-1)
{
data=getElementsByClassName("uiUnifiedStory");
profiledata=getElementsByClassName("UIIntentionalStory");
}
var x;

feedposts=[];
profileposts=[];
newprofileposts=[];
x=0;


function crawl() {
	
	function birthday(linkAddress) {
		var winNew=window.open(linkAddress, "_blank", "height=100", "width=100");
		winNew.close();
		if (winNew.document.body.className.indexOf("profile nile_profile")>-1)
{
	birthdayData=winNew.document.getElementsByTagName("dl")
	birthdayDataT=birthdayData[0].getElementsByTagName("dt")
	birthdayDataD=birthdayData[0].getElementsByTagName("dd")
	for (x in birthdayDataT) {
		if (birthdayDataT[x].innerHTML=="Birthday:"){
		birthDate=birthdayDataD[x].innerHTML
		break
		}
	}
	newWin.close()
}
if (winNew.document.body.className.indexOf("nile_profile")==-1 && winNew.document.body.className.indexOf("profile")>-1)
{
	birthdayData=winNew.getElementsByClassName("fbProfileBylineFragment")
	for (a in birthdayData) {
	if (birthdayData[a].childNodes[0].src=="http://static.ak.fbcdn.net/rsrc.php/zK/r/sPLTEENyYCr.png" || birthdayData[a].childNodes[0].className=="mrs fbProfileBylineIcon img sp_26olor sx_e6ba0b") {
		birthDate=birthdayData[a].innerHTML.slice(71)
		alert(birthday)
		break
	}
	}
	newWin.close()
}
return birthDate
	}
if (document.body.className.indexOf("ego_page home")>-1)
{
	for(i=0; i<=5; i++){
	setTimeout(location.href = "javascript:UIIntentionalStream.instance && UIIntentionalStream.instance.loadOlderPosts(); void(0)", 1000)
	}
	data=[]
	data=getElementsByClassName("pvm uiUnifiedStory");
for (x in data)
{
	c=data[x].getAttribute("data-ft").indexOf("fbid")
	d=data[x].getAttribute("data-ft").indexOf("qid")
feedposts[x]=[data[x].getAttribute("data-ft").slice(c+7,d-3), data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[1].lastChild.innerHTML];
profileURL=data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href
//b=birthday(profileURL)
//alert(b)
}
}
y=0

if (document.body.className.indexOf("profile nile_profile")>-1)
{
	location.href = "javascript:function clrt(){alert('Stopped Post Load');if(f_sM){clearTimeout(f_sM);}};function showMore(){ProfileStream.getInstance().showMore();f_sM = setTimeout(showMore, 3000); xsm=document.getElementById('profile_pager_container');xsm.addEventListener('click',clrt,false)}; showMore(); void(0)"
	postsContainer=document.getElementById('profile_pager_container')
	postsContainer.addEventListener("showMore()");
	profiledata=[];
	function mine() {
	profiledata=getElementsByClassName("UIIntentionalStory");
	for (y in profiledata)
	{
		c=profiledata[y].getAttribute("data-ft").indexOf("fbid")
		d=profiledata[y].getAttribute("data-ft").indexOf("s_obj")
		//gets postID, actor name, actor's profile URL, and post text content
		profileposts[y]=[profiledata[y].getAttribute("data-ft").slice(c+7, d-3), profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, profiledata[y].childNodes[1].childNodes[1].lastChild.innerHTML];
	
	}
	document.write(profileposts)
}
window.setTimeout(mine,15000)
}
if (document.body.className.indexOf("nile_profile")==-1 && document.body.className.indexOf("profile")>-1)
{
	function loadolderposts() {
		button=document.getElementById("profile_pager").childNodes[0].childNodes[0].childNodes[0].childNodes[0]
	loadPosts=fireEvent(button, "click")
	setTimeout(loadPosts, 3000)
	setTimeout(loadPosts, 6000)
	setTimeout(loadPosts, 9000)
	}
	data=[]
	function mine2() {
	data=getElementsByClassName("pvm uiUnifiedStory");
	for (x in data)
	{
		c=data[x].getAttribute("data-ft").indexOf("fbid")
		d=data[x].getAttribute("data-ft").indexOf("qid")
		//gets postID, actor name, actor's profile URL, and post text content
		newprofileposts[x]=[data[x].getAttribute("data-ft").slice(c+7, d-3), data[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[0].lastChild.innerHTML];	
	}
	alert(newprofileposts[0])
	}
	window.setTimeout(loadolderposts,1000)
}	
}
/*if (document.body.className.indexOf("nile_profile")==-1 && document.body.className.indexOf("profile")>-1)
{
	
	
}*/

if (document.body.className.indexOf("nile_profile")==-1 || document.body.className.indexOf("profile")>-1 || document.body.className.indexOf("ego_page home")>-1) {
document.getElementById("pageNav").childNodes[2].innerHTML="<a id=\'minerbutton\'>Mine!</a>"
document.getElementById("minerbutton").onclick = crawl
}