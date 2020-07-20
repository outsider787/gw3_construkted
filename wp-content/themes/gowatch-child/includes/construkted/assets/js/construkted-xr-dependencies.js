(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // Copyright 2016 Google Inc.
  // DOM element
  //

  const _LOGO_SCALE = 0.8;
  let _WEBXR_UI_CSS_INJECTED = {};
  /**
   * Generate the innerHTML for the button
   *
   * @return {string} html of the button as string
   * @param {string} cssPrefix
   * @param {Number} height
   * @private
   */

  const generateInnerHTML = (cssPrefix, height) => {
    const logoHeight = height * _LOGO_SCALE;
    const svgString = generateXRIconString(cssPrefix, logoHeight) + generateNoXRIconString(cssPrefix, logoHeight);
    return `<button class="${cssPrefix}-button">
          <div class="${cssPrefix}-title"></div>
          <div class="${cssPrefix}-logo" >${svgString}</div>
        </button>`;
  };
  /**
   * Inject the CSS string to the head of the document
   *
   * @param {string} cssText the css to inject
   */


  const injectCSS = cssText => {
    // Create the css
    const style = document.createElement('style');
    style.innerHTML = cssText;
    let head = document.getElementsByTagName('head')[0];
    head.insertBefore(style, head.firstChild);
  };
  /**
   * Generate DOM element view for button
   *
   * @return {HTMLElement}
   * @param {Object} options
   */


  const createDefaultView = options => {
    const fontSize = options.height / 3;

    if (options.injectCSS) {
      // Check that css isnt already injected
      if (!_WEBXR_UI_CSS_INJECTED[options.cssprefix]) {
        injectCSS(generateCSS(options, fontSize));
        _WEBXR_UI_CSS_INJECTED[options.cssprefix] = true;
      }
    }

    const el = document.createElement('div');
    el.innerHTML = generateInnerHTML(options.cssprefix, fontSize);
    return el.firstChild;
  };

  const generateXRIconString = (cssPrefix, height) => {
    let aspect = 28 / 18;
    return `<svg class="${cssPrefix}-svg" version="1.1" x="0px" y="0px"
        width="${aspect * height}px" height="${height}px" viewBox="0 0 28 18" xml:space="preserve">
        <path d="M26.8,1.1C26.1,0.4,25.1,0,24.2,0H3.4c-1,0-1.7,0.4-2.4,1.1C0.3,1.7,0,2.7,0,3.6v10.7
        c0,1,0.3,1.9,0.9,2.6C1.6,17.6,2.4,18,3.4,18h5c0.7,0,1.3-0.2,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l
        1.5-2.6C13.2,13.1,13,13,14,13v0h-0.2 h0c0.3,0,0.7,0.1,0.8,0.5l1.4,2.6c0.3,0.6,0.8,1.1,1.3,
        1.4c0.6,0.3,1.2,0.5,1.8,0.5h5c1,0,2-0.4,2.7-1.1c0.7-0.7,1.2-1.6,1.2-2.6 V3.6C28,2.7,27.5,
        1.7,26.8,1.1z M7.4,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8c1.6,0,2.8,1.3,2.8,2.8
        C10.2,10.5,8.9,11.8,7.4,11.8z M20.1,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8C21.7
        ,6.2,23,7.4,23,9 C23,10.5,21.7,11.8,20.1,11.8z"/>
    </svg>`;
  };

  const generateNoXRIconString = (cssPrefix, height) => {
    let aspect = 28 / 18;
    return `<svg class="${cssPrefix}-svg-error" x="0px" y="0px"
        width="${aspect * height}px" height="${aspect * height}px" viewBox="0 0 28 28" xml:space="preserve">
        <path d="M17.6,13.4c0-0.2-0.1-0.4-0.1-0.6c0-1.6,1.3-2.8,2.8-2.8s2.8,1.3,2.8,2.8s-1.3,2.8-2.8,2.8
        c-0.2,0-0.4,0-0.6-0.1l5.9,5.9c0.5-0.2,0.9-0.4,1.3-0.8
        c0.7-0.7,1.1-1.6,1.1-2.5V7.4c0-1-0.4-1.9-1.1-2.5c-0.7-0.7-1.6-1-2.5-1
        H8.1 L17.6,13.4z"/>
        <path d="M10.1,14.2c-0.5,0.9-1.4,1.4-2.4,1.4c-1.6,0-2.8-1.3-2.8-2.8c0-1.1,0.6-2,1.4-2.5
        L0.9,5.1 C0.3,5.7,0,6.6,0,7.5v10.7c0,1,0.4,1.8,1.1,2.5c0.7,0.7,1.6,1,2.5,1
        h5c0.7,0,1.3-0.1,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l1.3-2.6 L10.1,14.2z"/>
        <path d="M25.5,27.5l-25-25C-0.1,2-0.1,1,0.5,0.4l0,0C1-0.1,2-0.1,2.6,0.4l25,25c0.6,0.6,0.6,1.5
        ,0,2.1l0,0 C27,28.1,26,28.1,25.5,27.5z"/>
    </svg>`;
  };
  /**
   * Generate the CSS string to inject
   *
   * @param {Object} options
   * @param {Number} [fontSize=18]
   * @return {string}
   */


  const generateCSS = (options, fontSize = 18) => {
    const height = options.height;
    const borderWidth = 2;
    const borderColor = options.background ? options.background : options.color;
    const cssPrefix = options.cssprefix;
    let borderRadius;

    if (options.corners == 'round') {
      borderRadius = options.height / 2;
    } else if (options.corners == 'square') {
      borderRadius = 2;
    } else {
      borderRadius = options.corners;
    }

    return `
    @font-face {
        font-family: 'Karla';
        font-style: normal;
        font-weight: 400;
        src: local('Karla'), local('Karla-Regular'),
             url(https://fonts.gstatic.com/s/karla/v5/31P4mP32i98D9CEnGyeX9Q.woff2) format('woff2');
        unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
        font-family: 'Karla';
        font-style: normal;
        font-weight: 400;
        src: local('Karla'), local('Karla-Regular'),
             url(https://fonts.gstatic.com/s/karla/v5/Zi_e6rBgGqv33BWF8WTq8g.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
                       U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
    }

    button.${cssPrefix}-button {
        font-family: 'Karla', sans-serif;

        border: ${borderColor} ${borderWidth}px solid;
        border-radius: ${borderRadius}px;
        box-sizing: border-box;
        background: ${options.background ? options.background : 'none'};

        height: ${height}px;
        min-width: ${fontSize * 9.6}px;
        display: inline-block;
        position: relative;

        cursor: pointer;
        transition: border 0.5s;
    }

    button.${cssPrefix}-button:focus {
      outline: none;
    }

    /*
    * Logo
    */

    .${cssPrefix}-logo {
        width: ${height}px;
        height: ${height}px;
        position: absolute;
        top:0px;
        left:0px;
        width: ${height - 4}px;
        height: ${height - 4}px;
    }
    .${cssPrefix}-svg {
        fill: ${options.color};
        margin-top: ${(height - fontSize * _LOGO_SCALE) / 2 - 2}px;
        margin-left: ${height / 3}px;
    }
    .${cssPrefix}-svg-error {
        fill: ${options.color};
        display:none;
        margin-top: ${(height - 28 / 18 * fontSize * _LOGO_SCALE) / 2 - 2}px;
        margin-left: ${height / 3}px;
    }


    /*
    * Title
    */

    .${cssPrefix}-title {
        color: ${options.color};
        position: relative;
        font-size: ${fontSize}px;
        padding-left: ${height * 1.05}px;
        padding-right: ${borderRadius - 10 < 5 ? height / 3 : borderRadius - 10}px;
        transition: color 0.5s;
    }

    /*
    * disabled
    */

    button.${cssPrefix}-button[disabled=true] {
        opacity: ${options.disabledOpacity};
    }

    button.${cssPrefix}-button[disabled=true] > .${cssPrefix}-logo > .${cssPrefix}-svg {
        display:none;
    }

    button.${cssPrefix}-button[disabled=true] > .${cssPrefix}-logo > .${cssPrefix}-svg-error {
        display:initial;
    }

    /*
    * error
    */

    button.${cssPrefix}-button[error=true] {
        animation: errorShake 0.4s;
    }

    @keyframes errorShake {
      0% { transform: translate(1px, 0) }
      10% { transform: translate(-2px, 0) }
      20% { transform: translate(2px, 0) }
      30% { transform: translate(-2px, 0) }
      40% { transform: translate(2px, 0) }
      50% { transform: translate(-2px, 0) }
      60% { transform: translate(2px, 0) }
      70% { transform: translate(-2px, 0) }
      80% { transform: translate(2px, 0) }
      90% { transform: translate(-1px, 0) }
      100% { transform: translate(0px, 0) }
    }
  `;
  }; //
  // Button class
  //


  class WebXRButton {
    /**
     * Construct a new Enter XR Button
     * @constructor
     * @param {HTMLCanvasElement} sourceCanvas the canvas that you want to present with WebXR
     * @param {Object} [options] optional parameters
     * @param {HTMLElement} [options.domElement] provide your own domElement to bind to
     * @param {Boolean} [options.injectCSS=true] set to false if you want to write your own styles
     * @param {Function} [options.beforeEnter] should return a promise, opportunity to intercept request to enter
     * @param {Function} [options.beforeExit] should return a promise, opportunity to intercept request to exit
     * @param {Function} [options.onRequestStateChange] set to a function returning false to prevent default state changes
     * @param {string} [options.textEnterXRTitle] set the text for Enter XR
     * @param {string} [options.textXRNotFoundTitle] set the text for when a XR display is not found
     * @param {string} [options.textExitXRTitle] set the text for exiting XR
     * @param {string} [options.color] text and icon color
     * @param {string} [options.background] set to false for no brackground or a color
     * @param {string} [options.corners] set to 'round', 'square' or pixel value representing the corner radius
     * @param {string} [options.disabledOpacity] set opacity of button dom when disabled
     * @param {string} [options.cssprefix] set to change the css prefix from default 'webvr-ui'
     */
    constructor(options) {
      options = options || {};
      options.color = options.color || 'rgb(80,168,252)';
      options.background = options.background || false;
      options.disabledOpacity = options.disabledOpacity || 0.5;
      options.height = options.height || 55;
      options.corners = options.corners || 'square';
      options.cssprefix = options.cssprefix || 'webvr-ui'; // This reads VR as none of the samples are designed for other formats as of yet.

      options.textEnterXRTitle = options.textEnterXRTitle || 'ENTER VR';
      options.textXRNotFoundTitle = options.textXRNotFoundTitle || 'VR NOT FOUND';
      options.textExitXRTitle = options.textExitXRTitle || 'EXIT VR';

      options.onRequestSession = options.onRequestSession || function () {};

      options.onEndSession = options.onEndSession || function () {};

      options.injectCSS = options.injectCSS !== false;
      this.options = options;
      this._enabled = false;
      this.session = null; // Pass in your own domElement if you really dont want to use ours

      this.domElement = options.domElement || createDefaultView(options);
      this.__defaultDisplayStyle = this.domElement.style.display || 'initial'; // Bind button click events to __onClick

      this.domElement.addEventListener('click', () => this.__onXRButtonClick());
      this.__forceDisabled = false;

      this.__setDisabledAttribute(true);

      this.setTitle(this.options.textXRNotFoundTitle);
    }
    /**
     * Sets the enabled state of this button.
     * @param {boolean} enabled
     */


    set enabled(enabled) {
      this._enabled = enabled;

      this.__updateButtonState();

      return this;
    }
    /**
     * Gets the enabled state of this button.
     * @return {boolean}
     */


    get enabled() {
      return this._enabled;
    }
    /**
     * Indicate that there's an active XRSession. Switches the button to "Exit XR"
     * state if not null, or "Enter XR" state if null.
     * @param {XRSession} session
     * @return {EnterXRButton}
     */


    setSession(session) {
      this.session = session;

      this.__updateButtonState();

      return this;
    }
    /**
     * Set the title of the button
     * @param {string} text
     * @return {EnterXRButton}
     */


    setTitle(text) {
      this.domElement.title = text;
      ifChild(this.domElement, this.options.cssprefix, 'title', title => {
        if (!text) {
          title.style.display = 'none';
        } else {
          title.innerText = text;
          title.style.display = 'initial';
        }
      });
      return this;
    }
    /**
     * Set the tooltip of the button
     * @param {string} tooltip
     * @return {EnterXRButton}
     */


    setTooltip(tooltip) {
      this.domElement.title = tooltip;
      return this;
    }
    /**
     * Show the button
     * @return {EnterXRButton}
     */


    show() {
      this.domElement.style.display = this.__defaultDisplayStyle;
      return this;
    }
    /**
     * Hide the button
     * @return {EnterXRButton}
     */


    hide() {
      this.domElement.style.display = 'none';
      return this;
    }
    /**
     * Enable the button
     * @return {EnterXRButton}
     */


    enable() {
      this.__setDisabledAttribute(false);

      this.__forceDisabled = false;
      return this;
    }
    /**
     * Disable the button from being clicked
     * @return {EnterXRButton}
     */


    disable() {
      this.__setDisabledAttribute(true);

      this.__forceDisabled = true;
      return this;
    }
    /**
     * clean up object for garbage collection
     */


    remove() {
      if (this.domElement.parentElement) {
        this.domElement.parentElement.removeChild(this.domElement);
      }
    }
    /**
     * Set the disabled attribute
     * @param {boolean} disabled
     * @private
     */


    __setDisabledAttribute(disabled) {
      if (disabled || this.__forceDisabled) {
        this.domElement.setAttribute('disabled', 'true');
      } else {
        this.domElement.removeAttribute('disabled');
      }
    }
    /**
     * Handling click event from button
     * @private
     */


    __onXRButtonClick() {
      if (this.session) {
        this.options.onEndSession(this.session);
      } else if (this._enabled) {
        let requestPromise = this.options.onRequestSession();

        if (requestPromise) {
          requestPromise.catch(err => {
            // Reaching this point indicates that the session request has failed
            // and we should communicate that to the user somehow.
            let errorMsg = `XRSession creation failed: ${err.message}`;
            this.setTooltip(errorMsg);
            console.error(errorMsg); // Disable the button momentarily to indicate there was an issue.

            this.__setDisabledAttribute(true);

            this.domElement.setAttribute('error', 'true');
            setTimeout(() => {
              this.__setDisabledAttribute(false);

              this.domElement.setAttribute('error', 'false');
            }, 1000);
          });
        }
      }
    }
    /**
     * Updates the display of the button based on it's current state
     * @private
     */


    __updateButtonState() {
      if (this.session) {
        this.setTitle(this.options.textExitXRTitle);
        this.setTooltip('Exit XR presentation');

        this.__setDisabledAttribute(false);
      } else if (this._enabled) {
        this.setTitle(this.options.textEnterXRTitle);
        this.setTooltip('Enter XR');

        this.__setDisabledAttribute(false);
      } else {
        this.setTitle(this.options.textXRNotFoundTitle);
        this.setTooltip('No XR headset found.');

        this.__setDisabledAttribute(true);
      }
    }

  }
  /**
   * Function checking if a specific css class exists as child of element.
   *
   * @param {HTMLElement} el element to find child in
   * @param {string} cssPrefix css prefix of button
   * @param {string} suffix class name
   * @param {function} fn function to call if child is found
   * @private
   */

  const ifChild = (el, cssPrefix, suffix, fn) => {
    const c = el.querySelector('.' + cssPrefix + '-' + suffix);
    c && fn(c);
  };

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  const EPSILON = 0.000001;
  let ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create() {
    let out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$1() {
    let out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues(x, y, z) {
    let out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */

  function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }

    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function cross(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2];
    let bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  const len = length;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  const forEach = function () {
    let vec = create$1();
    return function (a, stride, offset, count, fn, arg) {
      let i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$2() {
    let out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */

  function normalize$1(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }

    return out;
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  const forEach$1 = function () {
    let vec = create$2();
    return function (a, stride, offset, count, fn, arg) {
      let i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$3() {
    let out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/

  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */

  function rotateX(out, a, rad) {
    rad *= 0.5;
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */

  function rotateY(out, a, rad) {
    rad *= 0.5;
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let by = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    let omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */

  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  const normalize$2 = normalize$1;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */

  const rotationTo = function () {
    let tmpvec3 = create$1();
    let xUnitVec3 = fromValues(1, 0, 0);
    let yUnitVec3 = fromValues(0, 1, 0);
    return function (out, a, b) {
      let dot$1 = dot(a, b);

      if (dot$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$1;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  const sqlerp = function () {
    let temp1 = create$3();
    let temp2 = create$3();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */

  const setAxes = function () {
    let matr = create();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create$4() {
    let out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  const forEach$2 = function () {
    let vec = create$4();
    return function (a, stride, offset, count, fn, arg) {
      let i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  // Copyright 2019 The Immersive Web Community Group
  const LOOK_SPEED = 0.0025;
  class InlineViewerHelper {
    constructor(canvas, referenceSpace) {
      this.lookYaw = 0;
      this.lookPitch = 0;
      this.viewerHeight = 0;
      this.canvas = canvas;
      this.baseRefSpace = referenceSpace;
      this.refSpace = referenceSpace;
      this.dirty = false;
      canvas.style.cursor = 'grab';
      canvas.addEventListener('mousemove', event => {
        // Only rotate when the left button is pressed
        if (event.buttons & 1) {
          this.rotateView(event.movementX, event.movementY);
        }
      }); // Keep track of touch-related state so that users can touch and drag on
      // the canvas to adjust the viewer pose in an inline session.

      let primaryTouch = undefined;
      let prevTouchX = undefined;
      let prevTouchY = undefined;
      canvas.addEventListener("touchstart", event => {
        if (primaryTouch == undefined) {
          let touch = event.changedTouches[0];
          primaryTouch = touch.identifier;
          prevTouchX = touch.pageX;
          prevTouchY = touch.pageY;
        }
      });
      canvas.addEventListener("touchend", event => {
        for (let touch of event.changedTouches) {
          if (primaryTouch == touch.identifier) {
            primaryTouch = undefined;
            this.rotateView(touch.pageX - prevTouchX, touch.pageY - prevTouchY);
          }
        }
      });
      canvas.addEventListener("touchcancel", event => {
        for (let touch of event.changedTouches) {
          if (primaryTouch == touch.identifier) {
            primaryTouch = undefined;
          }
        }
      });
      canvas.addEventListener("touchmove", event => {
        for (let touch of event.changedTouches) {
          if (primaryTouch == touch.identifier) {
            this.rotateView(touch.pageX - prevTouchX, touch.pageY - prevTouchY);
            prevTouchX = touch.pageX;
            prevTouchY = touch.pageY;
          }
        }
      });
    }

    setHeight(value) {
      if (this.viewerHeight != value) {
        this.viewerHeight = value;
      }

      this.dirty = true;
    }

    rotateView(dx, dy) {
      this.lookYaw += dx * LOOK_SPEED;
      this.lookPitch += dy * LOOK_SPEED;

      if (this.lookPitch < -Math.PI * 0.5) {
        this.lookPitch = -Math.PI * 0.5;
      }

      if (this.lookPitch > Math.PI * 0.5) {
        this.lookPitch = Math.PI * 0.5;
      }

      this.dirty = true;
    }

    reset() {
      this.lookYaw = 0;
      this.lookPitch = 0;
      this.refSpace = this.baseRefSpace;
      this.dirty = false;
    } // XRReferenceSpace offset is immutable, so return a new reference space
    // that has an updated orientation.


    get referenceSpace() {
      if (this.dirty) {
        // Represent the rotational component of the reference space as a
        // quaternion.
        let invOrient = create$3();
        rotateX(invOrient, invOrient, -this.lookPitch);
        rotateY(invOrient, invOrient, -this.lookYaw);
        let xform = new XRRigidTransform({}, {
          x: invOrient[0],
          y: invOrient[1],
          z: invOrient[2],
          w: invOrient[3]
        });
        this.refSpace = this.baseRefSpace.getOffsetReferenceSpace(xform);
        xform = new XRRigidTransform({
          y: -this.viewerHeight
        });
        this.refSpace = this.refSpace.getOffsetReferenceSpace(xform);
        this.dirty = false;
      }

      return this.refSpace;
    }

  }

  const EPSILON$1 = 0.000001;
  let ARRAY_TYPE$1 = typeof Float32Array !== "undefined" ? Float32Array : Array;

  function create$1$1() {
    let out = new ARRAY_TYPE$1(3);

    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }

  function length$1(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }

  function fromValues$1(x, y, z) {
    let out = new ARRAY_TYPE$1(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  function normalize$3(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }

    return out;
  }

  function dot$1(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function cross$1(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2];
    let bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }

  const len$1 = length$1;

  const forEach$3 = function () {
    let vec = create$1$1();
    return function (a, stride, offset, count, fn, arg) {
      let i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  function create$2$1() {
    let out = new ARRAY_TYPE$1(9);

    if (ARRAY_TYPE$1 != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }

  function create$3$1() {
    let out = new ARRAY_TYPE$1(4);

    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }

  function normalize$1$1(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }

    return out;
  }

  const forEach$1$1 = function () {
    let vec = create$3$1();
    return function (a, stride, offset, count, fn, arg) {
      let i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  function create$4$1() {
    let out = new ARRAY_TYPE$1(4);

    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }

  function setAxisAngle$1(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }

  function slerp$1(out, a, b, t) {
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    let omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }

    if (1.0 - cosom > EPSILON$1) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }

    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }

  function fromMat3$1(out, m) {
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
      fRoot = Math.sqrt(fTrace + 1.0);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      let i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  const normalize$2$1 = normalize$1$1;

  const rotationTo$1 = function () {
    let tmpvec3 = create$1$1();
    let xUnitVec3 = fromValues$1(1, 0, 0);
    let yUnitVec3 = fromValues$1(0, 1, 0);
    return function (out, a, b) {
      let dot$$1 = dot$1(a, b);

      if (dot$$1 < -0.999999) {
        cross$1(tmpvec3, xUnitVec3, a);
        if (len$1(tmpvec3) < 0.000001) cross$1(tmpvec3, yUnitVec3, a);
        normalize$3(tmpvec3, tmpvec3);
        setAxisAngle$1(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross$1(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2$1(out, out);
      }
    };
  }();

  const sqlerp$1 = function () {
    let temp1 = create$4$1();
    let temp2 = create$4$1();
    return function (out, a, b, c, d, t) {
      slerp$1(temp1, a, d, t);
      slerp$1(temp2, b, c, t);
      slerp$1(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();

  const setAxes$1 = function () {
    let matr = create$2$1();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2$1(out, fromMat3$1(out, matr));
    };
  }();

  const HEAD_ELBOW_OFFSET_RIGHTHANDED = fromValues$1(0.155, -0.465, -0.15);
  const HEAD_ELBOW_OFFSET_LEFTHANDED = fromValues$1(-0.155, -0.465, -0.15);
  const ELBOW_WRIST_OFFSET = fromValues$1(0, 0, -0.25);
  const WRIST_CONTROLLER_OFFSET = fromValues$1(0, 0, 0.05);
  const ARM_EXTENSION_OFFSET = fromValues$1(-0.08, 0.14, 0.08);
  const RAD_TO_DEG = 180 / Math.PI;
  function eulerFromQuaternion(out, q, order) {
    function clamp(value, min$$1, max$$1) {
      return value < min$$1 ? min$$1 : value > max$$1 ? max$$1 : value;
    }

    var sqx = q[0] * q[0];
    var sqy = q[1] * q[1];
    var sqz = q[2] * q[2];
    var sqw = q[3] * q[3];

    if (order === "XYZ") {
      out[0] = Math.atan2(2 * (q[0] * q[3] - q[1] * q[2]), sqw - sqx - sqy + sqz);
      out[1] = Math.asin(clamp(2 * (q[0] * q[2] + q[1] * q[3]), -1, 1));
      out[2] = Math.atan2(2 * (q[2] * q[3] - q[0] * q[1]), sqw + sqx - sqy - sqz);
    } else if (order === "YXZ") {
      out[0] = Math.asin(clamp(2 * (q[0] * q[3] - q[1] * q[2]), -1, 1));
      out[1] = Math.atan2(2 * (q[0] * q[2] + q[1] * q[3]), sqw - sqx - sqy + sqz);
      out[2] = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), sqw - sqx + sqy - sqz);
    } else if (order === "ZXY") {
      out[0] = Math.asin(clamp(2 * (q[0] * q[3] + q[1] * q[2]), -1, 1));
      out[1] = Math.atan2(2 * (q[1] * q[3] - q[2] * q[0]), sqw - sqx - sqy + sqz);
      out[2] = Math.atan2(2 * (q[2] * q[3] - q[0] * q[1]), sqw - sqx + sqy - sqz);
    } else if (order === "ZYX") {
      out[0] = Math.atan2(2 * (q[0] * q[3] + q[2] * q[1]), sqw - sqx - sqy + sqz);
      out[1] = Math.asin(clamp(2 * (q[1] * q[3] - q[0] * q[2]), -1, 1));
      out[2] = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), sqw + sqx - sqy - sqz);
    } else if (order === "YZX") {
      out[0] = Math.atan2(2 * (q[0] * q[3] - q[2] * q[1]), sqw - sqx + sqy - sqz);
      out[1] = Math.atan2(2 * (q[1] * q[3] - q[0] * q[2]), sqw + sqx - sqy - sqz);
      out[2] = Math.asin(clamp(2 * (q[0] * q[1] + q[2] * q[3]), -1, 1));
    } else if (order === "XZY") {
      out[0] = Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), sqw - sqx + sqy - sqz);
      out[1] = Math.atan2(2 * (q[0] * q[2] + q[1] * q[3]), sqw + sqx - sqy - sqz);
      out[2] = Math.asin(clamp(2 * (q[2] * q[3] - q[0] * q[1]), -1, 1));
    } else {
      console.log("No order given for quaternion to euler conversion.");
      return;
    }
  }
  function eulerFromQuaternionDegree(out, q, order) {
    eulerFromQuaternion(out, q, order);
    out[0] *= RAD_TO_DEG;
    out[1] *= RAD_TO_DEG;
    out[2] *= RAD_TO_DEG;
  }

  window.CONSTRUKTEDXR = {};
  CONSTRUKTEDXR.WebXRButton = WebXRButton;
  CONSTRUKTEDXR.InlineViewerHelper = InlineViewerHelper;
  CONSTRUKTEDXR.eulerFromQuaternionDegree = eulerFromQuaternionDegree;
  CONSTRUKTEDXR.create$1 = create$1$1;

})));
