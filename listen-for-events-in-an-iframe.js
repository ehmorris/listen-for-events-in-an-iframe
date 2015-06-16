var transmitable_event_object_properties = [
  'altKey',
  'bubbles',
  'button',
  'buttons',
  'cancelBubble',
  'cancelable',
  'charCode',
  'clientX',
  'clientY',
  'ctrlKey',
  'dataTransfer',
  'defaultPrevented',
  'detail',
  'eventPhase',
  'keyCode',
  'layerX',
  'layerY',
  'loaded',
  'metaKey',
  'movementX',
  'movementY',
  'offsetX',
  'offsetY',
  'pageX',
  'pageY',
  'returnValue',
  'screenX',
  'screenY',
  'shiftKey',
  'timeStamp',
  'type',
  'webkitMovementX',
  'webkitMovementY',
  'which',
  'x',
  'y'
];

var get_transmitable_event_object = function(event_object) {
  var new_object = {};

  transmitable_event_object_properties.forEach(function(property, _, __) {
    new_object[property] = event_object[property];
  });

  return new_object;
};

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

    this.channel.bind("react_to_event_"+event+"_"+selector, function(_, params) {
      func(params);
    });
  };
}

function TransmitEventsToParent() {
  var channel = Channel.build({
    window: window.parent,
    origin: "*",
    scope: "scope"
  });

  channel.bind("listen_for_event", function(_, params) {
    document.querySelector(params.selector).addEventListener(params.event, function(event_object) {
      var transmitable_event_object = get_transmitable_event_object(event_object);
      channel.notify({
        method: "react_to_event_"+params.event+"_"+params.selector,
        params: transmitable_event_object
      });
    });
  });
}
