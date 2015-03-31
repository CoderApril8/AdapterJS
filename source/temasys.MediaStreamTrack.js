// Polyfill all MediaStream objects
var polyfillMediaStreamTrack = null;


if (navigator.mozGetUserMedia) {

  /**
   * The polyfilled MediaStreamTrack class.
   * @class MediaStreamTrack
   * @since 0.10.5
   */
	polyfillMediaStreamTrack = function (track) {

    /**
     * The MediaStreamTrack object id.
     * @attribute id
     * @type String
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.id = track.id || (new Date()).getTime().toString();

    /**
     * The MediaStreamTrack object label.
     * @attribute label
     * @type String
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.label = track.label || track.kind + '-' + track.id;

    /**
     * The flag that indicates if a MediaStreamTrack object has ended.
     * @attribute ended
     * @type Boolean
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.ended = typeof stream.ended === 'boolean' ? stream.ended : false;

    /**
     * The flag that indicates if a MediaStreamTrack object is enabled.
     * - Set it to <code>true</code> for enabled track stream or set it to
     *   <code>false</code> for disable track stream.
     * @attribute enabled
     * @type Boolean
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.enabled = true;

    /**
     * The flag that indicates if a MediaStreamTrack object is muted.
     * @attribute muted
     * @type Boolean
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.muted = typeof track.muted === 'boolean' ? track.muted : false;

    /**
     * The ready state status of a MediaStreamTrack object.
     * @attribute readyState
     * @type String
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.readyState = typeof track.readyState === 'string' ? track.readyState : 'live';

    /**
     * The MediaStreamTrack object type.
     * - <code>"audio"</code>: The MediaStreamTrack object type is an audio track.
     * - <code>"video"</code>: The MediaStreamTrack object type is an video track.
     * @attribute kind
     * @type String
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.kind = track.kind;

    /**
     * The status if a MediaStreamTrack object is read only and cannot to be overwritten.
     * @attribute readOnly
     * @type Boolean
     * @readOnly
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.readOnly = typeof track.readOnly === 'boolean' ? track.readOnly : false;

    /**
     * Event triggered when MediaStreamTrack has ended streaming.
     * @event onended
     * @param {String} type The type of event: <code>"ended"</code>.
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.onended = null;

    /**
     * Event triggered when MediaStreamTrack has started streaming.
     * @event onstarted
     * @param {String} type The type of event: <code>"started"</code>.
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.onstarted = null;

    /**
     * Event triggered when MediaStreamTrack has been muted.
     * @event onmute
     * @param {String} type The type of event: <code>"mute"</code>.
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.onmute = null;

    /**
     * Event triggered when MediaStreamTrack has been unmuted.
     * @event onunmute
     * @param {String} type The type of event: <code>"unmute"</code>.
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.onunmute = null;

    /**
     * Event triggered when MediaStreamTrack is over constrained.
     * @event onoverconstrained
     * @param {String} type The type of event: <code>"overconstrained"</code>.
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.onoverconstrained = null;


    var polyTrackEndedEmitter = function () {
      // set the ended as true
      track.ended = true;
      // set the readyState to 'ended'
      track.readyState = 'ended';

      // trigger that it has ended
      if (typeof track.onended === 'function') {
        track.onended({
          type: 'ended',
          bubbles: false,
          cancelBubble: false,
          cancelable: false,
          currentTarget: track,
          defaultPrevented: false,
          eventPhase: 0,
          returnValue: true,
          srcElement: track,
          target: track,
          timeStamp: (new Date()).getTime()
        });
      }
    };

    /**
     * Stops a MediaStreamTrack streaming.
     * @method polystop
     * @for MediaStreamTrack
     * @since 0.10.6
     */
    track.polystop = function () {
      track.stop();

      polyTrackEndedEmitter();
    };
  };


} else if (navigator.webkitGetUserMedia) {

  polyfillMediaStreamTrack = function (track) {

    //track.id = track.id || (new Date()).getTime().toString();

    track.label = track.label || track.kind + '-' + track.id;

    track.ended = false;

    track.enabled = true;

    track.muted = typeof track.muted === 'boolean' ? track.muted : false;

    track.readyState = typeof track.readyState === 'string' ? track.readyState : 'live';

    //track.kind = track.kind;

    track.readOnly = typeof track.readOnly === 'boolean' ? track.readOnly : false;

    track.onended = null;

    track.onstarted = null;

    track.onmute = null;

    track.onunmute = null;

    track.onoverconstrained = null;


    var polyTrackEndedEmitter = function () {
      // set the ended as true
      track.ended = true;
      // set the readyState to 'ended'
      track.readyState = 'ended';

      // trigger that it has ended
      if (typeof track.onended === 'function') {
        track.onended({
          type: 'ended',
          bubbles: false,
          cancelBubble: false,
          cancelable: false,
          currentTarget: track,
          defaultPrevented: false,
          eventPhase: 0,
          returnValue: true,
          srcElement: track,
          target: track,
          timeStamp: (new Date()).getTime()
        });
      }
    };

    track.polystop = function () {
      track.stop();

      polyTrackEndedEmitter();
    };
  };

} else {

  polyfillMediaStreamTrack = function (track) {

    track.id = track.id || (new Date()).getTime().toString();

    track.label = typeof track.label === 'undefined' ? track.kind + '-' + track.id : track.label;

    track.ended = false;

    track.enabled = true;

    track.muted = typeof track.muted === 'boolean' ? track.muted : false;

    track.readyState = typeof track.readyState === 'string' ? track.readyState : 'live';

    track.kind = track.kind;

    track.readOnly = typeof track.readOnly === 'boolean' ? track.readOnly : false;

    track.onended = null;

    track.onstarted = null;

    track.onmute = null;

    track.onunmute = null;

    track.onoverconstrained = null;


    var polyTrackEndedEmitter = function () {
      // set the ended as true
      track.ended = true;
      // set the readyState to 'ended'
      track.readyState = 'ended';

      // trigger that it has ended
      if (typeof track.onended === 'function') {
        track.onended({
          type: 'ended',
          bubbles: false,
          cancelBubble: false,
          cancelable: false,
          currentTarget: track,
          defaultPrevented: false,
          eventPhase: 0,
          returnValue: true,
          srcElement: track,
          target: track,
          timeStamp: (new Date()).getTime()
        });
      }
    };

    track.polystop = function () {
      try {
        track.stop();

        polyTrackEndedEmitter();

      } catch (error) {
        throw error;
      }
    };

    return track;
  };
}