var frame_on = function(channel, event, selector, func) {
  channel.notify({
    method: "listen_for_event",
    params: {
      event: event,
      selector: selector
    }
  })

  channel.bind("react_to_event_"+event+selector, func)
}

var transmit_events_to = function(channel) {
  channel.bind("listen_for_event", function(_, params) {
    document.querySelector(params.selector).addEventListener(params.event, function() {
      channel.notify({ method: "react_to_event_"+params.event+params.selector })
    })
  })
}
