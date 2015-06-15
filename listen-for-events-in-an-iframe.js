function ListenForIFrameEventsFrom(iframe_element) {
  this.channel = Channel.build({
    window: iframe_element.contentWindow,
    origin: "*",
    scope: "scope"
  });

  this.on = function(event, selector, func) {
    this.channel.notify({
      method: "listen_for_event",
      params: {
        event: event,
        selector: selector
      }
    });

    this.channel.bind("react_to_event_"+event+selector, func);
  };
}

function TransmitEventsToParent() {
  var channel = Channel.build({
    window: window.parent,
    origin: "*",
    scope: "scope"
  });

  channel.bind("listen_for_event", function(_, params) {
    document.querySelector(params.selector).addEventListener(params.event, function() {
      channel.notify({ method: "react_to_event_"+params.event+params.selector });
    });
  });
}
