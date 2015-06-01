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
