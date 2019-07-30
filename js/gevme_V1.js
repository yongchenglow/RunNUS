/***
 * Description: NUS Students' Sports Club Fix to Gevme's widget code
 * Problem: Gevme Helping Chatbot Blocks Registration Button
 * Solution: Increase the height of iframe by 85px based on device as chat bot only appears on Web and not mobile
 * Creator: Gevme
 * Modifier: Low Yong Cheng
 */
(function() {
	var DIV_CLS = 'gevme-registration-block',
		APP_BASE = 'https://www.gevme.com/',
		EVENT_URL = APP_BASE+'/{{event_id}}/embed/full',
		ORIGIN = (APP_BASE).replace( /([^:]+:\/\/[^\/]+).*/, '$1');

//	function injectScript(src, callback) {
//		callback = callback || function(){};
//		var sc = document.createElement('script'); sc.type = 'text/javascript';
//		sc.onload = function() {
//			callback();
//		};
//		sc.src = PROTOCOL+HOST+src;
//		document.getElementsByTagName('script')[0].parentNode.appendChild(sc);
//	}

	//http://stackoverflow.com/a/9569020/534862
	//Get elements by class names
	function GEBCN(cn){
		if(document.getElementsByClassName) // Returns NodeList here
			return document.getElementsByClassName(cn);

		cn = cn.replace(/ *$/, '');

		if(document.querySelectorAll) // Returns NodeList here
			return document.querySelectorAll((' ' + cn).replace(/ +/g, '.'));

		cn = cn.replace(/^ */, '');

		var classes = cn.split(/ +/), clength = classes.length;
		var els = document.getElementsByTagName('*'), elength = els.length;
		var results = [];
		var i, j, match;

		for(i = 0; i < elength; i++){
			match = true;
			for(j = clength; j--;)
				if(!RegExp(' ' + classes[j] + ' ').test(' ' + els[i].className + ' '))
					match = false;
			if(match)
				results.push(els[i]);
		}

		// Returns Array here
		return results;
	}

	function onMessage(e) {
		if (e.origin === ORIGIN) {
			var data = e.data,
				sp = data.split(':');

			var iframe = document.getElementById(sp[0]);
			if (iframe) {

        // Modification Starts Here
        var heightOfWidget = parseInt(sp[1]);
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          // Do nothing because the widget will not be displayed
        } else {
          // Done to make space of the widget Widget Height is 60px
          heightOfWidget += 85;
        }
        // End of Modification

				iframe.parentNode.style.height = heightOfWidget+'px';
			}
		}
	}

	if (window.addEventListener) {
		window.addEventListener('message', onMessage, false);
	}else{
		window.attachEvent('onmessage', onMessage);
	}

	var iframe_counter = 1;

	function renderTickets(div) {
		var event_id = div.getAttribute('data-event');

		if (event_id && /^\d+$/.test(event_id)) {
			var iframe = document.createElement('iframe'),
				frame_id = 'gevme-regframe-'+(iframe_counter++),
				contentWindow,
				src = EVENT_URL.replace('{{event_id}}', event_id);
			iframe.setAttribute('frameBorder', 0); //capital B for freaking IE http://stackoverflow.com/a/65052/534862
//			iframe.setAttribute('onload', 'iframeOnLoad(this)');
			iframe.setAttribute('scrolling', 'no');
			iframe.width = '100%';
			iframe.height = '100%';
			iframe.id = frame_id;

			div.innerHTML = '';
			div.appendChild(iframe);

			contentWindow = iframe.contentWindow;
			var iframeOnLoad = function() {
				contentWindow.postMessage(frame_id+':height', ORIGIN);
			}
			if (iframe.attachEvent) iframe.attachEvent('onload', iframeOnLoad);
			else iframe.addEventListener('load', iframeOnLoad, false)

			iframe.src = src;

		}else{
			div.innerHTML = '<span style="font-family:arial">Failed to load ticket listing - Invalid event id</span>';
		}
	}

	function renderDivs() {
		var divs = GEBCN(DIV_CLS);

		for (var i = 0 ; i < divs.length ; ++i) {
			renderTickets(divs[i]);
		}
	}

	renderDivs();

})();
