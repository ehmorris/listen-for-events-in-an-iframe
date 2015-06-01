# Trigger functions based on events happening inside an iFrame
(As long as you can run JavaScript inside that iFrame)

### From inside the iFrame

* Inlcude the listen-for-events-in-an-iframe script, and the [jschannel](https://github.com/mozilla/jschannel) script

``` html
<script src="jschannel.js"></script>
<script src="listen-for-events-in-an-iframe.js"></script>
```

* Create a channel to the parent window (the page containing the iframe) and then pass that channel to a new `TransmitEventsTo`

``` js
var parent_channel = Channel.build({
  window: window.parent,
  origin: "*",
  scope: "scope"
});
  
new TransmitEventsTo(parent_channel);
```

### From the page containing the iFrame

* Inlcude the listen-for-events-in-an-iframe script, and the [jschannel](https://github.com/mozilla/jschannel) script

``` html
<script src="jschannel.js"></script>
<script src="listen-for-events-in-an-iframe.js"></script>
```

* Create a channel to the iFrame and then pass that channel to a new `ListenForIFrameEventsFrom`

``` js
var iframe_channel = Channel.build({
  window: document.querySelector(".listen_for_events_in_this_iframe").contentWindow,
  origin: "*",
  scope: "scope"
});

var frame = new ListenForIFrameEventsFrom(iframe_channel);
```

* Now you can execute functions *outside* the iframe, based on events happening *inside* the iframe

``` js
frame.on("mouseover", ".content_inside_the_iframe", function(e) {
  document.querySelector(".listen_for_events_in_this_iframe").style.margin = '20%';
});

frame.on("mouseout", ".content_inside_the_iframe", function(e) {
  document.querySelector(".listen_for_events_in_this_iframe").style.margin = '0';
});
```
