//@name Facebook Crawler
//Version 0.1
function crawl()
{
var homefeed=document.getElementById("home_stream");
document.write(homefeed.innerHTML);
alert("wassup?");
}

var domain=document.domain
if(domain=="www.facebook.com" || domain=="facebook.com")
{
	x=0
	
	setTimeout(crawl(),5000)
}
	/*while(x<4)
	{
		
		document.open("http://facebook.com/#")
		
		x++
}*/

/*function UIIntentionalStream(j,d,g,i,b,l,m,c,h,k,f,a,e)
{
	if(!j)throw new Error('UIIntentionalStream instantiated with no root.');
	copy_properties(this,{id:j.id,root:j,instanceName:d,newest:g,oldest:i,firstLoadIDs:c,notYetSeenIDs:h,seenOldStory:k,shouldShowHidden:false,					defaultFilter:b,currentFilterKey:a,sourceType:l,streamStoryCount:m,maxUnseenStoryCount:f,lastSeenTime:e,hasPendingRefresh:false,pauseAutoInsert:false,unseenStoryCount:0,streamHeader:DOM.scry(document.body,'div.UIIntentionalStream_Top')[0],error:DOM.scry(j,'div.UIIntentionalStream_Error')[0],pager:DOM.scry(j,'div.uiMorePager')[0],streamContent:DOM.find(j,'.UIIntentionalStream_Content'),requestNum:0,scrollLoadCount:1,maxScrollLoadCount:1});
this.setUpStreamHeader();
if(this.streamStoryCount>0)this.updateLiveFeedCount(this.streamStoryCount);
onleaveRegister(this.unload.bind(this));
if(!UIIntentionalStream.instances)UIIntentionalStream.instances={};
UIIntentionalStream.instances[d]=this;
UIIntentionalStream.instance=this;
this.setupAutoInsert();
this.setupSubscriptions();
}UIIntentionalStream.prototype.setupSubscriptions=function(){this.subscriptions=[];
this.subscriptions.push(Arbiter.subscribe('composer/publish',function(event,a){this.addContent(a,500);
}.bind(this)));
this.subscriptions.push(Arbiter.subscribe(UIIntentionalStreamMessage.UPDATE_STREAM,this.updateStream.bind(this)));
this.subscriptions.push(Arbiter.subscribe(UIIntentionalStreamMessage.REFRESH_STREAM,this.refreshStream.bind(this)));
this.subscriptions.push(Arbiter.subscribe(UIIntentionalStreamMessage.SAVE_PENDING_HIGHLIGHTS,this.clearPendingHighlights.bind(this)));
};
UIIntentionalStream.prototype.tearDownSubscriptions=function(){if(!this.subscriptions)return;
this.subscriptions.forEach(Arbiter.unsubscribe);
};
UIIntentionalStream.prototype.unload=function(){this.tearDownSubscriptions();
UIIntentionalStream.instance=null;
UIIntentionalStream.instances[this.instanceName]=null;
this.clearScrollLoader(true);
window.disableScrollLoad=null;
};
UIIntentionalStream.getInstance=function(a){return UIIntentionalStream.instances[a];
};
UIIntentionalStream.prototype._getUpdateInsertType=function(){if(this.isOnNewHighlights())return UIIntentionalStream.REFRESH_COUNT;
return UIIntentionalStream.REFRESH_PREPEND;
};
UIIntentionalStream.prototype.clearPendingHighlights=function(a){if(a!=UIIntentionalStreamMessage.SAVE_PENDING_HIGHLIGHTS)return;
if(this.isOnNewHighlights())new AsyncSignal('/ajax/feed/save_view_state.php').send();
};
UIIntentionalStream.prototype.updateStream=function(a){if(a!=UIIntentionalStreamMessage.UPDATE_STREAM||this.hasPendingRefresh||this.isAutoRefreshPaused())return;
this.loadNewer({showLoader:false,ignoreSelf:true,insertType:this._getUpdateInsertType()});
};
UIIntentionalStream.prototype.clearScrollLoader=function(a){if(this.currentScrollListener){this.currentScrollListener.remove();
this.currentScrollListener=null;
}if(a||this.scrollLoadCount>=this.maxScrollLoadCount)window.disableScrollLoad=true;
};
UIIntentionalStream.prototype.loadOlderPosts=function(b){var c=DOM.scry(this.root,'a.fbOlderPosts')[0];
if(c){if(CSS.hasClass(c,'async_saving'))return;
CSS.addClass(c,'async_saving');
}var a={filter:this.getCurrentFilterKey(),oldest:this.oldest,last_seen_time:this.lastSeenTime};
a=merge(a,b);
UIPagelet.loadFromEndpoint('/pagelet/home/morestories.php','home_stream',a,{usePipe:true,replayable:true,append:true});
};
UIIntentionalStream.prototype.setScrollLoadCount=function(a){this.maxScrollLoadCount=a;
};
UIIntentionalStream.prototype.loadMoreOnScroll=function(b,a,c){if(window.disableScrollLoad)return;
var e=function(){if(window.disableScrollLoad)return;
var g={delay_load_count:a};
if(this.scrollLoadCount==1)g=merge(g,{first_load_ids:this.firstLoadIDs,not_yet_seen_ids:this.notYetSeenIDs,seen_old_story:this.seenOldStory,show_hidden:this.shouldShowHidden,query_time:c,scrollCount:this.scrollLoadCount});
this.loadOlderPosts(g);
}.bind(this);
var f=DOM.scry(this.root,'ul.uiStream li.uiStreamStory');
if(!f.length)return;
var d=f[f.length-b-1];
if(d){this.currentScrollListener=new OnVisible(d,e,null,0,{detect_speed:this.scrollLoadCount>1});
}else e();
};
UIIntentionalStream.prototype.updateTimeRange=function(a,b){if(!this.newest||this.newest<a)this.newest=a;
if(!this.oldest||(b&&(b<this.oldest)))this.oldest=b;
};
UIIntentionalStream.prototype.updatePageCache=function(){if(this.getCurrentFilterKey()==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS)return;
this.loadNewer({bundleAsync:true,showLoader:false,ignoreReqNum:true});
};
UIIntentionalStream.prototype.getID=function(){return this.id;
};
UIIntentionalStream.prototype.showPositioned=function(a,c,b){if(c==UIIntentionalStream.REFRESH_APPEND){DOM.appendContent(this.root,a);
}else if(c==UIIntentionalStream.REFRESH_PREPEND){DOM.prependContent(this.root,a);
}else if(c==UIIntentionalStream.REFRESH_EXPAND)DOM.insertAfter($(b.expandStoryID),a);
CSS.setStyle(a,'display','block');
if(a.src)a.src=a.src;
};
UIIntentionalStream.prototype.getCurrentFilterKey=function(){if(this.currentFilterKey)return this.currentFilterKey;
var a=this.getCurrentParams();
if(a&&a.filter){this.currentFilterKey=a.filter;
}else if(this.defaultFilter)this.currentFilterKey=this.defaultFilter;
return this.currentFilterKey;
};
UIIntentionalStream.prototype.loadOlder=function(a){a=a||{};
if(!this.oldest)return;
var b=this.getCurrentParams();
b.oldest=this.oldest;
this.refresh(UIIntentionalStream.REFRESH_APPEND,b,a);
return this;
};
UIIntentionalStream.prototype.loadNewer=function(b){if(!this.newest)return;
b=b||{};
var a=this.getCurrentParams();
a.newest=this.newest;
if(b.ignoreSelf)a.ignore_self=true;
a.load_newer=true;
var c=coalesce(b.insertType,UIIntentionalStream.REFRESH_PREPEND);
this.refresh(c,a,b);
return this;
};
UIIntentionalStream.prototype.getCurrentParams=function(){var a={};
var b=URI.getMostRecentURI().getQueryData();
if(b.sk)b.filter=b.sk;
var c=this.getValidParams();
if(c){c.forEach(function(d){a[d]=b[d];
});
}else a=b;
return a;
};
UIIntentionalStream.prototype.setHomeFilter=function(a){this._homeFilter=a;
};
UIIntentionalStream.prototype.setHomeFilterLoading=function(a){if(this._homeFilter)this._homeFilter.setLoading(a);
};
UIIntentionalStream.prototype.refresh=function(l,b,h){Arbiter.inform(UIIntentionalStreamMessage.UPDATE_LAST_REFRESH_TIME);
this.currentFilterKey=b.filter;
if(b.filter==UIIntentionalStream.FEED_FILTER_KEY_DUAL_NEWS_FEED){this.currentFilterKey=this.defaultFilter;
}else if(b.filter==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS||b.filter===UIIntentionalStream.FEED_FILTER_KEY_NEWS_FEED)this.defaultFilter=this.currentFilterKey;
h=h||{};
var j=++this.requestNum;
var a=coalesce(h.bundleAsync,false);
var k=coalesce(h.showLoader,true);
var f=this.instanceName;
var e=function(m){UIIntentionalStream.getInstance(f).handleResponse(j,l,m,h);
};
var c=function(m){UIIntentionalStream.getInstance(f).handleError(j,l,m,h);
};
var d=function(m){UIIntentionalStream.getInstance(f).handleFinally(l,b.filter,m);
};
if(!(b.request_type=l))b.request_type='none';
if(b.filter){h.show_hidden=b.show_hidden?b.show_hidden:false;
}else h.show_hidden=this.shouldShowHidden;
var g=true;
if(b.newest)g=false;
b=copy_properties(this.getCurrentParams(),b);
this.hasPendingRefresh=true;
var i;
if(l==UIIntentionalStream.REFRESH_APPEND&&k)i=this.pager;
new AsyncRequest().setURI(this.getEndpoint()).setReadOnly(true).setOption('retries',0).setMethod(this.getRefreshMethod()).setData(b).setOption('bundle',a).setReplayable(g).setHandler(e).setStatusElement(i).setErrorHandler(c).setFinallyHandler(d).send();
if(l==UIIntentionalStream.REFRESH_TRANSITION){hide(this.pager);
this.clearScrollLoader(true);
this.oldest=this.newest=null;
}if(k)this.setHomeFilterLoading(true);
};
UIIntentionalStream.prototype.addContent=function(a,b){this.addContentPrepend(a,b);
};
UIIntentionalStream.prototype.addContentPrepend=function(a,b){if(a.length){$A(a).reverse().forEach(function(h){this.addContentPrepend(h,b);
}.bind(this));
return;
}var d;
var f=Vector2.getScrollPosition().y;
var c=Vector2.getElementPosition(this.streamContent).y;
var g=this.scrollOnPrepend&&f>=c;
if(g){var e=function(h){var i=DOM.find(h,'^li.uiStreamStory');
if(!i)return;
DataStore.set(i,'origHeight',i.offsetHeight);
Event.listen(h,'load',function(){var j=DataStore.get(i,'origHeight');
if(i.offsetHeight!=j){window.scrollBy(0,i.offsetHeight-j);
DataStore.set(i,'origHeight',i.offsetHeight);
}});
};
d=animation.insert.curry(this.streamContent,a,function(i,h){DOM.prependContent(i,h);
window.scrollBy(0,h.offsetHeight);
DOM.scry(h,'img').forEach(e);
});
}else d=animation.prependInsert.curry(this.streamContent,a);
if(b){setTimeout(d,b);
}else d();
};
UIIntentionalStream.prototype.addContentAppend=function(a){DOM.appendContent(this.streamContent,a);
};
UIIntentionalStream.getStoriesByAssoc=function(a){return DOM.scry(UIIntentionalStream.instance.root,'div.aid_'+a);
};
UIIntentionalStream.prototype.handleResponse=function(c,e,d,b){var a=d.isReplay()||b.ignoreReqNum;
return this.handleResponsePayload(c,e,d.getPayload(),a,b);
};
UIIntentionalStream.prototype.handleResponsePayload=function(e,g,d,b,c){c=c||{};
if(is_empty(d))return;
if(d.streamHeader){DOM.setContent(this.streamHeader,HTML(d.streamHeader));
if(this.isOnNewsFeedFilter())this.setUpStreamHeader();
NewHigh.reset();
}if(d.autoRefreshConfig)Arbiter.inform(UIIntentionalStreamMessage.UPDATE_AUTOREFRESH_CONFIG,d.autoRefreshConfig);
this.setHomeFilterLoading(false);
if(g==UIIntentionalStream.REFRESH_EXPAND){var f=DOM.find($(c.expandStoryID),'div.UIIntentionalStory_CollapsedStories');
CSS.hide(f);
CSS.removeClass(f,'UIIntentionalStory_CollapsedStoriesLoading');
}if(this.error)hide(this.error);
if(!b&&e!=this.requestNum)return;
if('show_hidden' in c)this.shouldShowHidden=c.show_hidden;
if('newestStoryTime' in d&&d.newestStoryTime>this.newest)this.newest=d.newestStoryTime;
if('oldestStoryTime' in d&&(!this.oldest||d.oldestStoryTime<this.oldest))this.oldest=d.oldestStoryTime;
if('streamStoryCount' in d)this.updateLiveFeedCount(d.streamStoryCount);
if(d.html){var a=HTML(d.html).getNodes();
switch(g){case UIIntentionalStream.REFRESH_COUNT:if(d.storyCount)this.updateLiveFeedCount(d.storyCount,true);
break;
case UIIntentionalStream.REFRESH_PREPEND:this.addContentPrepend(a);
break;
case UIIntentionalStream.REFRESH_APPEND:this.addContentAppend(a);
this.clearScrollLoader(true);
break;
case UIIntentionalStream.REFRESH_TRANSITION:DOM.setContent(this.streamContent,a);
DOMScroll.scrollTo(new Vector2(0,0,"document"),false);
break;
case UIIntentionalStream.REFRESH_EXPAND:DOM.insertAfter($(c.expandStoryID),a);
break;
case UIIntentionalStream.DELAYED_STREAM:if(!Quickling.isCacheHit())this.addContentAppend(a);
break;
}Arbiter.inform(UIIntentionalStreamMessage.UPDATE_HTML_CONTENT);
}};
UIIntentionalStream.prototype.updateLiveFeedCount=function(c,b){var d=(this.unseenStoryCount==0||!b);
if(b){this.unseenStoryCount+=c;
}else this.unseenStoryCount=c;
if(this.unseenStoryCount>0&&this.liveFeedCount){var a='';
if(this.unseenStoryCount>this.maxUnseenStoryCount){a=_tx("{count}+",{count:this.maxUnseenStoryCount});
}else a=this.unseenStoryCount.toString();
DOM.setContent(this.liveFeedCount,HTML(a));
if(d)CSS.show(this.liveFeedBubble);
}};
UIIntentionalStream.prototype.handleError=function(c,f,d,b){if(!d.isReplay()&&c!=this.requestNum)return;
this.setHomeFilterLoading(false);
var a=d.getError();
if(a==1357001)AsyncResponse.defaultErrorHandler(d);
if(f==UIIntentionalStream.REFRESH_EXPAND){var e=DOM.find($(b.expandStoryID),'div.UIIntentionalStory_CollapsedStories');
CSS.removeClass(e,'UIIntentionalStory_CollapsedStoriesLoading');
}if(!b.delayLoadCount&&f!=UIIntentionalStream.REFRESH_PREPEND&&this.error)CSS.setStyle(this.error,'display','block');
};
UIIntentionalStream.prototype.handleFinally=function(b,a){if(b==UIIntentionalStream.REFRESH_TRANSITION){PageTransitions.transitionComplete();
Arbiter.inform(NavigationMessage.NAVIGATION_COMPLETED);
}this.hasPendingRefresh=false;
};
UIIntentionalStream.prototype.getValidParams=function(){return UIIntentionalStream.VALID_PARAMS;
};
UIIntentionalStream.prototype.getEndpoint=function(){return UIIntentionalStream.ENDPOINT;
};
UIIntentionalStream.prototype.getRefreshMethod=function(){return UIIntentionalStream.REFRESH_METHOD;
};
UIIntentionalStream.prototype.isOnNewHighlights=function(){var a=this.getCurrentFilterKey();
return (a==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS||(a==UIIntentionalStream.FEED_FILTER_KEY_DUAL_NEWS_FEED&&this.defaultFilter==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS));
};
UIIntentionalStream.prototype.isLiveStreamBox=function(){var a=this.getCurrentFilterKey();
return a&&a.indexOf(UIIntentionalStream.FEED_FILTER_KEY_LIVE_STREAM_BOX)==0;
};
UIIntentionalStream.prototype.isOnNewsFeedFilter=function(){var a=this.getCurrentFilterKey();
return (a==UIIntentionalStream.FEED_FILTER_KEY_NEWS_FEED||a==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS||a==UIIntentionalStream.FEED_FILTER_KEY_DUAL_NEWS_FEED);
};
UIIntentionalStream.prototype.setupAutoInsert=function(){Arbiter.subscribe(UIIntentionalStreamMessage.SET_AUTO_INSERT,UIIntentionalStream.setAutoInsert);
};
UIIntentionalStream.setAutoInsert=function(b,a){if(b!=UIIntentionalStreamMessage.SET_AUTO_INSERT)return;
var c=UIIntentionalStream.instance;
if(c)c.pauseAutoInsert=a.pause;
};
UIIntentionalStream.prototype.isAutoRefreshPaused=function(){if(this.isOnNewHighlights()||this.isLiveStreamBox())return false;
return this.pauseAutoInsert;
};
UIIntentionalStream.prototype.setUpStreamHeader=function(){if(!this.streamHeader)return;
this.liveFeedBubble=DOM.scry(this.streamHeader,'span.uiBubbleCount')[0];
if(!this.liveFeedBubble)return;
this.liveFeedCount=DOM.scry(this.liveFeedBubble,'span.number')[0];
if(!this.maxUnseenStoryCount)this.maxUnseenStoryCount=UIIntentionalStream.MAX_UNSEEN_STORY_COUNT;
};
UIIntentionalStream.prototype.refreshStream=function(e,a){if(e!=UIIntentionalStreamMessage.REFRESH_STREAM)return;
var c=this.getCurrentFilterKey();
if(this.isOnNewsFeedFilter()&&a.shouldOverride)c=UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS;
var f=(c==UIIntentionalStream.FEED_FILTER_KEY_NEW_HIGHLIGHTS);
var b={filter:c};
if(f)b.pending=f;
var d={filter:c};
this.refresh(UIIntentionalStream.REFRESH_TRANSITION,b,d);
};
copy_properties(UIIntentionalStream,{ANIMATION_DURATION:300,REFRESH_METHOD:'GET',REFRESH_TRANSITION:1,REFRESH_PREPEND:2,REFRESH_APPEND:3,REFRESH_COUNT:4,REFRESH_EXPAND:5,DELAYED_STREAM:6,FEED_FILTER_KEY_NEW_HIGHLIGHTS:'h',FEED_FILTER_KEY_NEWS_FEED:'lf',FEED_FILTER_KEY_DUAL_NEWS_FEED:'nf',FEED_FILTER_KEY_LIVE_STREAM_BOX:'pub',VALID_PARAMS:['filter','show_hidden'],ENDPOINT:'/ajax/intent.php',MAX_UNSEEN_STORY_COUNT:300});
*/

//UIIntentionalStream.instance && UIIntentionalStream.instance.loadOlderPosts();

//UIIntentionalStream.instance && UIIntentionalStream.instance.loadOlderPosts();

//document.write(document.getElementById("c4cfc11dc3e7088785959587"))
//big_pipe.onPageletArrive({phase: 1,id: 'pagelet_home_stream',page_cache: true,css: ['omvrb','Pawg1'],js: ['j6KLh','S78Sf','qVawz','k8b+m'],provides: ['pagelet_controller::home_intentional_stream'],onload: ['window.__UIControllerRegistry["c4cfc0f7332e955b61323114"] = new UIPagelet("c4cfc0f7332e955b61323114", "\\/pagelet\\/home\\/home_stream.php", {"segments":{"sizes":[7,8],"phases":[0,1]},"is_prefetch":false}, {});; ;','window.__UIControllerRegistry["c4cfc0f73333141431796048"] = new UIIntentionalStream($("c4cfc0f73333141431796048"), "nile", 0, 0, "h", 10, 2227, [158925330819424,166121873425925,107572595931951,1315530368357,175468535804360,117144971685254,430716034124,108610175878379,159609054083862,170470119653385,116147371783809,461475005862,95361292333,164603956914033,169487909752202], [], true, 300, "h", 1291587352);; window.__UIControllerRegistry["home_intentional_stream"]=window.__UIControllerRegistry["c4cfc0f73333141431796048"];;','DocumentTitle.set("Facebook");'],onafterload: ['UIIntentionalStream.instance.loadMoreOnScroll(4, 30, 1291587443);'],onpagecache: ['__UIControllerRegistry["c4cfc0f73333141431796048"].updatePageCache();'],onafterpagecache: ['pagecache_log_feed_tracking(false);'],content: {pagelet_home_stream: '<div id="c4cfc0f7332e955b61323114"><div class="UIIntentionalStream UIStream"  id="c4cfc0f73333141431796048"><ul class="uiList uiStream UIIntentionalStream_Content" id="home_stream"></ul><div ><div class="UIIntentionalStream_Error"><div id="error" class="UIMessageBox error"><h2 class="main_message" id="standard_error">This stream is unavailable at this time. Please try again soon.</h2><p class="sub_message" id="standard_explanation"></p></div></div></div><div ><div id="pagelet_stream_pager" /></div></div></div>'}});

//onclick="UIIntentionalStream.instance amp;amp; UIIntentionalStream.instance.loadOlderPosts();"