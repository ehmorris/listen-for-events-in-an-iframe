function ListenForIFrameEventsFrom(channel) {
  this.channel = channel;

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
};

function TransmitEventsTo(channel) {
  channel.bind("listen_for_event", function(_, params) {
    document.querySelector(params.selector).addEventListener(params.event, function() {
      channel.notify({ method: "react_to_event_"+params.event+params.selector });
    });
  });
};
