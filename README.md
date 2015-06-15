# Trigger functions based on events happening inside an iFrame
(As long as you can run JavaScript inside that iFrame)

### From inside the iFrame

* Include the listen-for-events-in-an-iframe script and the [jschannel](https://github.com/mozilla/jschannel) script

``` html
<script src="jschannel.js"></script>
<script src="listen-for-events-in-an-iframe.js"></script>
```

* Create a new `TransmitEventsToParent` instance

``` js
new TransmitEventsToParent();
```

### From the page containing the iFrame

* Include the listen-for-events-in-an-iframe script and the [jschannel](https://github.com/mozilla/jschannel) script

``` html
<script src="jschannel.js"></script>
<script src="listen-for-events-in-an-iframe.js"></script>
```

* Create a new `ListenForIFrameEventsFrom` instance and pass it the iFrame element

``` js
var iframe_element = document.querySelector(".listen_for_events_in_this_iframe");
var frame = new ListenForIFrameEventsFrom(iframe_element);
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
