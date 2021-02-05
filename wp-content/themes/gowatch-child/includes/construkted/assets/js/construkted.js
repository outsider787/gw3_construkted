(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('cesium')) :
  typeof define === 'function' && define.amd ? define(['cesium'], factory) :
  (global = global || self, factory(global.Cesium));
}(this, (function (cesium) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".cesium-measure-toolbar {\r\n    width: 40px;\r\n    height: 32px;\r\n    overflow: hidden;\r\n    transition: width 0.8s;\r\n    white-space: nowrap;\r\n    background: #303336;\r\n    border: 1px solid #444;\r\n    color: #edffff;\r\n    stroke: #edffff;\r\n    stroke-width: 2;\r\n    fill: transparent;\r\n}\r\n.cesium-measure-toolbar.expanded {\r\n    width: 423px;\r\n}\r\n.cesium-measure-button {\r\n    vertical-align: top;\r\n    display: inline-block;\r\n    border-right: 1px solid #444;\r\n    cursor: pointer;\r\n    padding: 4px 8px;\r\n    height: 25px;\r\n    width: 25px;\r\n    margin-left: -4px /*removes space between buttons*/\r\n}\r\n.cesium-measure-button:first-child {\r\n    margin-left: 0;\r\n}\r\n.cesium-measure-button:hover {\r\n    background-color: #48b;\r\n}\r\n.cesium-measure-button:last-child {\r\n    border-right: none;\r\n}\r\n\r\n.cesium-measure-button.active {\r\n    background-color: #1a71cc;\r\n    cursor: default;\r\n}\r\n.cesium-measure-button-main {\r\n    stroke-width: 1.3;\r\n}\r\n.cesium-measure-help {\r\n    stroke-width: 0;\r\n    padding: 6px 8px;\r\n    fill: #edffff;\r\n}\r\n.cesium-measure-instructions {\r\n    position: absolute;\r\n    max-height: 500px;\r\n    width: 403px;\r\n    border: 1px solid #444;\r\n    overflow-y: auto;\r\n    border-radius: 0;\r\n    background-color: rgba(48,51,54,0.8);\r\n    color: #edffff;\r\n    padding: 10px;\r\n    stroke: #edffff;\r\n    stroke-width: 2;\r\n}\r\n.cesium-measure-icon {\r\n    margin-right: 10px;\r\n}\r\n.cesium-measure-instructions .bold {\r\n    margin-bottom: 3px;\r\n}\r\n.cesium-measure-instructions > ul {\r\n    padding-left: 20px;\r\n}\r\n";
  const stylesheet=".cesium-measure-toolbar {\r\n    width: 40px;\r\n    height: 32px;\r\n    overflow: hidden;\r\n    transition: width 0.8s;\r\n    white-space: nowrap;\r\n    background: #303336;\r\n    border: 1px solid #444;\r\n    color: #edffff;\r\n    stroke: #edffff;\r\n    stroke-width: 2;\r\n    fill: transparent;\r\n}\r\n.cesium-measure-toolbar.expanded {\r\n    width: 423px;\r\n}\r\n.cesium-measure-button {\r\n    vertical-align: top;\r\n    display: inline-block;\r\n    border-right: 1px solid #444;\r\n    cursor: pointer;\r\n    padding: 4px 8px;\r\n    height: 25px;\r\n    width: 25px;\r\n    margin-left: -4px /*removes space between buttons*/\r\n}\r\n.cesium-measure-button:first-child {\r\n    margin-left: 0;\r\n}\r\n.cesium-measure-button:hover {\r\n    background-color: #48b;\r\n}\r\n.cesium-measure-button:last-child {\r\n    border-right: none;\r\n}\r\n\r\n.cesium-measure-button.active {\r\n    background-color: #1a71cc;\r\n    cursor: default;\r\n}\r\n.cesium-measure-button-main {\r\n    stroke-width: 1.3;\r\n}\r\n.cesium-measure-help {\r\n    stroke-width: 0;\r\n    padding: 6px 8px;\r\n    fill: #edffff;\r\n}\r\n.cesium-measure-instructions {\r\n    position: absolute;\r\n    max-height: 500px;\r\n    width: 403px;\r\n    border: 1px solid #444;\r\n    overflow-y: auto;\r\n    border-radius: 0;\r\n    background-color: rgba(48,51,54,0.8);\r\n    color: #edffff;\r\n    padding: 10px;\r\n    stroke: #edffff;\r\n    stroke-width: 2;\r\n}\r\n.cesium-measure-icon {\r\n    margin-right: 10px;\r\n}\r\n.cesium-measure-instructions .bold {\r\n    margin-bottom: 3px;\r\n}\r\n.cesium-measure-instructions > ul {\r\n    padding-left: 20px;\r\n}\r\n";
  styleInject(css_248z);

  var css_248z$1 = ".transform-editor-menu {\r\n    position: absolute;\r\n    stroke: none;\r\n    fill: #edffff;\r\n}\r\n\r\n.transform-editor-button {\r\n    padding: 0;\r\n    width: 25px;\r\n    height: 25px;\r\n    border-radius: 13px;\r\n}\r\n\r\n.transform-editor-button > svg {\r\n    margin-top: 2px;\r\n    margin-left: 2px;\r\n}\r\n\r\n.transform-editor-options {\r\n    position: relative;\r\n    left: -16px;\r\n    background-color: #303336;\r\n    color: #edffff;\r\n}\r\n\r\n.transform-editor-button-row > div {\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    padding-top: 4px;\r\n    padding-left: 4px;\r\n    width: 30px;\r\n    height: 30px;\r\n    border: 1px solid #444;\r\n}\r\n\r\n.transform-editor-button-row > div.selected {\r\n    background-color: #1E90FF;\r\n}\r\n\r\n.transform-editor-button-row > div:hover {\r\n    background-color: #48b;\r\n}\r\n";
  const stylesheet$1=".transform-editor-menu {\r\n    position: absolute;\r\n    stroke: none;\r\n    fill: #edffff;\r\n}\r\n\r\n.transform-editor-button {\r\n    padding: 0;\r\n    width: 25px;\r\n    height: 25px;\r\n    border-radius: 13px;\r\n}\r\n\r\n.transform-editor-button > svg {\r\n    margin-top: 2px;\r\n    margin-left: 2px;\r\n}\r\n\r\n.transform-editor-options {\r\n    position: relative;\r\n    left: -16px;\r\n    background-color: #303336;\r\n    color: #edffff;\r\n}\r\n\r\n.transform-editor-button-row > div {\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    padding-top: 4px;\r\n    padding-left: 4px;\r\n    width: 30px;\r\n    height: 30px;\r\n    border: 1px solid #444;\r\n}\r\n\r\n.transform-editor-button-row > div.selected {\r\n    background-color: #1E90FF;\r\n}\r\n\r\n.transform-editor-button-row > div:hover {\r\n    background-color: #48b;\r\n}\r\n";
  styleInject(css_248z$1);

  var css_248z$2 = ".cesium-viewer-measureContainer {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin: 0 3px;\r\n    vertical-align: middle;\r\n}";
  const stylesheet$2=".cesium-viewer-measureContainer {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin: 0 3px;\r\n    vertical-align: middle;\r\n}";
  styleInject(css_248z$2);

  /**
       * Distance units used for the measure widget.
       *
       * @exports DistanceUnits
       * @ionsdk
       */
      var DistanceUnits = {
          /**
           * @type {String}
           * @constant
           */
          METERS: 'METERS',

          /**
           * @type {String}
           * @constant
           */
          CENTIMETERS: 'CENTIMETERS',

          /**
           * @type {String}
           * @constant
           */
          KILOMETERS: 'KILOMETERS',

          /**
           * @type {String}
           * @constant
           */
          FEET: 'FEET',

          /**
           * @type {String}
           * @constant
           */
          US_SURVEY_FEET: 'US_SURVEY_FEET',

          /**
           * @type {String}
           * @constant
           */
          INCHES: 'INCHES',

          /**
           * @type {String}
           * @constant
           */
          YARDS: 'YARDS',

          /**
           * @type {String}
           * @constant
           */
          MILES: 'MILES'
      };
  var DistanceUnits$1 = cesium.freezeObject(DistanceUnits);

  /**
       * Area units used for the measure widget.
       *
       * @exports AreaUnits
       * @ionsdk
       */
      var AreaUnits = {
          /**
           * @type {String}
           * @constant
           */
          SQUARE_METERS: 'SQUARE_METERS',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_CENTIMETERS: 'SQUARE_CENTIMETERS',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_KILOMETERS: 'SQUARE_KILOMETERS',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_FEET: 'SQUARE_FEET',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_INCHES: 'SQUARE_INCHES',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_YARDS: 'SQUARE_YARDS',

          /**
           * @type {String}
           * @constant
           */
          SQUARE_MILES: 'SQUARE_MILES',

          /**
           * @type {String}
           * @constant
           */
          ACRES: 'ACRES',

          /**
           * @type {String}
           * @constant
           */
          HECTARES: 'HECTARES'
      };
  var VolumeUnits = cesium.freezeObject(AreaUnits);

  /**
       * Volume units used for the measure widget.
       *
       * @exports VolumeUnits
       * @ionsdk
       */
      var VolumeUnits$1 = {
          /**
           * @type {String}
           * @constant
           */
          CUBIC_METERS: 'CUBIC_METERS',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_CENTIMETERS: 'CUBIC_CENTIMETERS',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_KILOMETERS: 'CUBIC_KILOMETERS',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_FEET: 'CUBIC_FEET',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_INCHES: 'CUBIC_INCHES',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_YARDS: 'CUBIC_YARDS',

          /**
           * @type {String}
           * @constant
           */
          CUBIC_MILES: 'CUBIC_MILES'
      };
  var VolumeUnits$2 = cesium.freezeObject(VolumeUnits$1);

  /**
       * Angle units used for the measure widget.
       *
       * @exports AngleUnits
       * @ionsdk
       */
      var AngleUnits = {
          /**
           * @type {String}
           * @constant
           */
          DEGREES: 'DEGREES',

          /**
           * @type {String}
           * @constant
           */
          RADIANS: 'RADIANS',

          /**
           * @type {String}
           * @constant
           */
          DEGREES_MINUTES_SECONDS: 'DEGREES_MINUTES_SECONDS',

          /**
           * @type {String}
           * @constant
           */
          GRADE: 'GRADE',

          /**
           * @type {String}
           * @constant
           */
          RATIO: 'RATIO'
      };
  var AngleUnits$1 = cesium.freezeObject(AngleUnits);

  /**
       * Units of measure used for the measure widget.
       *
       * @param {Object} options Object with the following properties:
       * @param {DistanceUnits} [options.distanceUnits=DistanceUnits.METERS] Distance units.
       * @param {AreaUnits} [options.areaUnits=AreaUnits.SQUARE_METERS] The base unit for area.
       * @param {VolumeUnits} [options.volumeUnits=VolumeUnits.CUBIC_METERS] The base unit for volume.
       * @param {AngleUnits} [options.angleUnits=AngleUnits.DEGREES] Angle units.
       * @param {AngleUnits} [options.slopeUnits=AngleUnits.DEGREES] Slope units.
       *
       * @alias MeasureUnits
       * @constructor
       * @ionsdk
       */
      function MeasureUnits(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          this.distanceUnits = cesium.defaultValue(options.distanceUnits, DistanceUnits$1.METERS);
          this.areaUnits = cesium.defaultValue(options.areaUnits, VolumeUnits.SQUARE_METERS);
          this.volumeUnits = cesium.defaultValue(options.volumeUnits, VolumeUnits$2.CUBIC_METERS);
          this.angleUnits = cesium.defaultValue(options.angleUnits, AngleUnits$1.DEGREES);
          this.slopeUnits = cesium.defaultValue(options.slopeUnits, AngleUnits$1.DEGREES);
      }

      /**
       * @private
       */
      MeasureUnits.convertDistance = function(distance, from, to) {
          if (from === to) {
              return distance;
          }
          var toMeters = getDistanceUnitConversion(from);
          var fromMeters = 1.0 / getDistanceUnitConversion(to);
          return distance * toMeters * fromMeters;
      };

      /**
       * @private
       */
      MeasureUnits.convertArea = function(area, from, to) {
          if (from === to) {
              return area;
          }
          var toMeters = getAreaUnitConversion(from);
          var fromMeters = 1.0 / getAreaUnitConversion(to);
          return area * toMeters * fromMeters;
      };

      /**
       * @private
       */
      MeasureUnits.convertVolume = function(volume, from, to) {
          if (from === to) {
              return volume;
          }
          var toMeters = getVolumeUnitConversion(from);
          var fromMeters = 1.0 / getVolumeUnitConversion(to);
          return volume * toMeters * fromMeters;
      };

      /**
       * @private
       */
      MeasureUnits.convertAngle = function(angle, from, to) {
          if (from === to) {
              return angle;
          }
          var radians = convertAngleToRadians(angle, from);
          return convertAngleFromRadians(radians, to);
      };

      /**
       * @private
       */
      MeasureUnits.numberToString = function(number, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          return numberToFormattedString(number, selectedLocale, maximumFractionDigits, minimumFractionDigits);
      };

      /**
       * @private
       */
      MeasureUnits.distanceToString = function(meters, distanceUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          var distance = MeasureUnits.convertDistance(meters, DistanceUnits$1.METERS, distanceUnits);
          return numberToFormattedString(distance, selectedLocale, maximumFractionDigits, minimumFractionDigits) +
              MeasureUnits.getDistanceUnitSpacing(distanceUnits) + MeasureUnits.getDistanceUnitSymbol(distanceUnits);
      };

      /**
       * @private
       */
      MeasureUnits.areaToString = function(metersSquared, areaUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          var area = MeasureUnits.convertArea(metersSquared, VolumeUnits.SQUARE_METERS, areaUnits);
          return numberToFormattedString(area, selectedLocale, maximumFractionDigits, minimumFractionDigits) +
              MeasureUnits.getAreaUnitSpacing(areaUnits) + MeasureUnits.getAreaUnitSymbol(areaUnits);
      };

      /**
       * @private
       */
      MeasureUnits.volumeToString = function(metersCubed, volumeUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          var volume = MeasureUnits.convertVolume(metersCubed, VolumeUnits$2.CUBIC_METERS, volumeUnits);
          return numberToFormattedString(volume, selectedLocale, maximumFractionDigits, minimumFractionDigits) +
              MeasureUnits.getVolumeUnitSpacing(volumeUnits) + MeasureUnits.getVolumeUnitSymbol(volumeUnits);
      };

      /**
       * @private
       */
      MeasureUnits.angleToString = function(angleRadians, angleUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          if ((angleUnits === AngleUnits$1.DEGREES) || (angleUnits === AngleUnits$1.RADIANS) || (angleUnits === AngleUnits$1.GRADE)) {
              var angle = convertAngleFromRadians(angleRadians, angleUnits);
              return numberToFormattedString(angle, selectedLocale, maximumFractionDigits, minimumFractionDigits) +
                  MeasureUnits.getAngleUnitSpacing(angleUnits) + MeasureUnits.getAngleUnitSymbol(angleUnits);
          } else if (angleUnits === AngleUnits$1.DEGREES_MINUTES_SECONDS) {
              var deg = cesium.Math.toDegrees(angleRadians);
              var sign = deg < 0 ? '-' : '';
              deg = Math.abs(deg);
              var d = Math.floor(deg);
              var minfloat = (deg - d) * 60;
              var m = Math.floor(minfloat);
              var s = (minfloat - m) * 60;
              s = numberToFormattedString(s, undefined, maximumFractionDigits, minimumFractionDigits); // The locale is undefined so that a period is used instead of a comma for the decimal
              return sign + d + '° ' + m + '\' ' + s + '"';
          } else if (angleUnits === AngleUnits$1.RATIO) {
              var riseOverRun = convertAngleFromRadians(angleRadians, angleUnits);
              var run = 1.0 / riseOverRun;
              return '1:' + numberToFormattedString(run, selectedLocale, maximumFractionDigits, 0);
          }
      };

      /**
       * @private
       */
      MeasureUnits.longitudeToString = function(longitude, angleUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          return MeasureUnits.angleToString(Math.abs(longitude), angleUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) + ' ' + (longitude < 0.0 ? 'W' : 'E');
      };

      /**
       * @private
       */
      MeasureUnits.latitudeToString = function(latitude, angleUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          return MeasureUnits.angleToString(Math.abs(latitude), angleUnits, selectedLocale, maximumFractionDigits, minimumFractionDigits) + ' ' + (latitude < 0.0 ? 'S' : 'N');
      };

      /**
       * @private
       */
      MeasureUnits.getDistanceUnitSymbol = function(distanceUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('distanceUnits', distanceUnits);
          //>>includeEnd('debug');

          if (distanceUnits === DistanceUnits$1.METERS) {
              return 'm';
          } else if (distanceUnits === DistanceUnits$1.CENTIMETERS) {
              return 'cm';
          } else if (distanceUnits === DistanceUnits$1.KILOMETERS) {
              return 'km';
          } else if ((distanceUnits === DistanceUnits$1.FEET) || (distanceUnits === DistanceUnits$1.US_SURVEY_FEET)) {
              return 'ft';
          } else if (distanceUnits === DistanceUnits$1.INCHES) {
              return 'in';
          } else if (distanceUnits === DistanceUnits$1.YARDS) {
              return 'yd';
          } else if (distanceUnits === DistanceUnits$1.MILES) {
              return 'mi';
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid distance units: ' + distanceUnits);
          //>>includeEnd('debug');
      };

      MeasureUnits.getDistanceUnitSpacing = function(distanceUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('distanceUnits', distanceUnits);
          //>>includeEnd('debug');

          return ' ';
      };

      /**
       * @private
       */
      MeasureUnits.getAreaUnitSymbol = function(areaUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('areaUnits', areaUnits);
          //>>includeEnd('debug');

          if (areaUnits === VolumeUnits.SQUARE_METERS) {
              return 'm²';
          } else if (areaUnits === VolumeUnits.SQUARE_CENTIMETERS) {
              return 'cm²';
          } else if (areaUnits === VolumeUnits.SQUARE_KILOMETERS) {
              return 'km²';
          } else if (areaUnits === VolumeUnits.SQUARE_FEET) {
              return 'sq ft';
          } else if (areaUnits === VolumeUnits.SQUARE_INCHES) {
              return 'sq in';
          } else if (areaUnits === VolumeUnits.SQUARE_YARDS) {
              return 'sq yd';
          } else if (areaUnits === VolumeUnits.SQUARE_MILES) {
              return 'sq mi';
          } else if (areaUnits === VolumeUnits.ACRES) {
              return 'ac';
          } else if (areaUnits === VolumeUnits.HECTARES) {
              return 'ha';
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid area units: ' + areaUnits);
          //>>includeEnd('debug');
      };

      /**
       * @private
       */
      MeasureUnits.getAreaUnitSpacing = function(areaUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('areaUnits', areaUnits);
          //>>includeEnd('debug');

          return ' ';
      };

      /**
       * @private
       */
      MeasureUnits.getVolumeUnitSymbol = function(volumeUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('volumeUnits', volumeUnits);
          //>>includeEnd('debug');

          if (volumeUnits === VolumeUnits$2.CUBIC_METERS) {
              return 'm³';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_CENTIMETERS) {
              return 'cm³';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_KILOMETERS) {
              return 'km³';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_FEET) {
              return 'cu ft';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_INCHES) {
              return 'cu in';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_YARDS) {
              return 'cu yd';
          } else if (volumeUnits === VolumeUnits$2.CUBIC_MILES) {
              return 'cu mi';
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid volume units: ' + volumeUnits);
          //>>includeEnd('debug');
      };

      /**
       * @private
       */
      MeasureUnits.getVolumeUnitSpacing = function(volumeUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('volumeUnits', volumeUnits);
          //>>includeEnd('debug');

          return ' ';
      };

      /**
       * @private
       */
      MeasureUnits.getAngleUnitSymbol = function(angleUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('angleUnits', angleUnits);
          //>>includeEnd('debug');

          if (angleUnits === AngleUnits$1.DEGREES) {
              return '°';
          } else if (angleUnits === AngleUnits$1.RADIANS) {
              return 'rad';
          } else if (angleUnits === AngleUnits$1.GRADE) {
              return '%';
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid angle units: ' + angleUnits);
          //>>includeEnd('debug');
      };

      /**
       * @private
       */
      MeasureUnits.getAngleUnitSpacing = function(angleUnits) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('angleUnits', angleUnits);
          //>>includeEnd('debug');

          if (angleUnits === AngleUnits$1.RADIANS) {
              return ' ';
          }
          return '';
      };

      var negativeZero = -0.0;
      var positiveZero = 0.0;
      function numberToFormattedString(number, selectedLocale, maximumFractionDigits, minimumFractionDigits) {
          maximumFractionDigits = cesium.defaultValue(maximumFractionDigits, 2);
          minimumFractionDigits = cesium.defaultValue(minimumFractionDigits, maximumFractionDigits);
          var localeStringOptions = {
              minimumFractionDigits: minimumFractionDigits,
              maximumFractionDigits: maximumFractionDigits
          };
          // If locale is undefined, the runtime's default locale is used.
          var numberString = number.toLocaleString(selectedLocale, localeStringOptions);
          var negativeZeroString = negativeZero.toLocaleString(selectedLocale, localeStringOptions);
          if (numberString === negativeZeroString) {
              return positiveZero.toLocaleString(selectedLocale, localeStringOptions);
          }
          return numberString;
      }

      function getDistanceUnitConversion(distanceUnits) {
          if (distanceUnits === DistanceUnits$1.METERS) {
              return 1.0;
          } else if (distanceUnits === DistanceUnits$1.CENTIMETERS) {
              return 0.01;
          } else if (distanceUnits === DistanceUnits$1.KILOMETERS) {
              return 1000.0;
          } else if (distanceUnits === DistanceUnits$1.FEET) {
              return 0.3048;
          } else if (distanceUnits === DistanceUnits$1.US_SURVEY_FEET) {
              return 1200.0 / 3937.0;
          } else if (distanceUnits === DistanceUnits$1.INCHES) {
              return 0.0254;
          } else if (distanceUnits === DistanceUnits$1.YARDS) {
              return 0.9144;
          } else if (distanceUnits === DistanceUnits$1.MILES) {
              return 1609.344;
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid distance units:' + distanceUnits);
          //>>includeEnd('debug');
      }

      function getAreaUnitConversion(areaUnits) {
          if (areaUnits === VolumeUnits.SQUARE_METERS) {
              return 1.0;
          } else if (areaUnits === VolumeUnits.SQUARE_CENTIMETERS) {
              return 0.0001;
          } else if (areaUnits === VolumeUnits.SQUARE_KILOMETERS) {
              return 1000000.0;
          } else if (areaUnits === VolumeUnits.SQUARE_FEET) {
              return 0.3048 * 0.3048;
          } else if (areaUnits === VolumeUnits.SQUARE_INCHES) {
              return 0.0254 * 0.0254;
          } else if (areaUnits === VolumeUnits.SQUARE_YARDS) {
              return 0.9144 * 0.9144;
          } else if (areaUnits === VolumeUnits.SQUARE_MILES) {
              return 1609.344 * 1609.344;
          } else if (areaUnits === VolumeUnits.ACRES) {
              return 4046.85642232;
          } else if (areaUnits === VolumeUnits.HECTARES) {
              return 10000.0;
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid area units:' + areaUnits);
          //>>includeEnd('debug');
      }

      function getVolumeUnitConversion(volumeUnits) {
          if (volumeUnits === VolumeUnits$2.CUBIC_METERS) {
              return 1.0;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_CENTIMETERS) {
              return 0.000001;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_KILOMETERS) {
              return 1000000000.0;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_FEET) {
              return 0.3048 * 0.3048 * 0.3048;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_INCHES) {
              return 0.0254 * 0.0254 * 0.0254;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_YARDS) {
              return 0.9144 * 0.9144 * 0.9144;
          } else if (volumeUnits === VolumeUnits$2.CUBIC_MILES) {
              return 1609.344 * 1609.344 * 1609.344;
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid volume units:' + volumeUnits);
          //>>includeEnd('debug');
      }

      var degreesMinutesSecondsRegex = /(-?)(\d+)\s*°\s*(\d+)\s*'\s*([\d.,]+)"\s*([WENS]?)/i;

      function convertAngleToRadians(value, angleUnits) {
          if (angleUnits === AngleUnits$1.RADIANS) {
              return value;
          } else if (angleUnits === AngleUnits$1.DEGREES) {
              return cesium.Math.toRadians(value);
          } else if (angleUnits === AngleUnits$1.GRADE) {
              if (value === Number.POSITIVE_INFINITY) {
                  return cesium.Math.PI_OVER_TWO;
              }
              return Math.atan(value / 100.0);
          } else if (angleUnits === AngleUnits$1.RATIO) {
              // Converts to radians where value is rise/run
              return Math.atan(value);
          } else if (angleUnits === AngleUnits$1.DEGREES_MINUTES_SECONDS) {
              var matches = degreesMinutesSecondsRegex.exec(value);
              if (!cesium.defined(matches)) {
                  throw new cesium.RuntimeError('Could not convert angle to radians: ' + value);
              }
              var sign = matches[1].length > 0 ? -1.0 : 1.0;
              var degrees = parseInt(matches[2]);
              var minutes = parseInt(matches[3]);
              var seconds = parseFloat(matches[4]);
              var cardinal = matches[5];

              if (cardinal.length === 1) {
                  cardinal = cardinal.toUpperCase();
                  if (cardinal === 'W' || cardinal === 'S') {
                      sign *= -1.0;
                  }
              }

              var degreesDecimal = sign * (degrees + minutes / 60.0 + seconds / 3600.0);
              return cesium.Math.toRadians(degreesDecimal);
          }

          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid angle units: ' + angleUnits);
          //>>includeEnd('debug');
      }

      function convertAngleFromRadians(value, angleUnits) {
          if (angleUnits === AngleUnits$1.RADIANS) {
              return value;
          } else if (angleUnits === AngleUnits$1.DEGREES) {
              return cesium.Math.toDegrees(value);
          } else if (angleUnits === AngleUnits$1.GRADE) {
              value = cesium.Math.clamp(value, 0.0, cesium.Math.PI_OVER_TWO);
              if (value === cesium.Math.PI_OVER_TWO) {
                  return Number.POSITIVE_INFINITY;
              }
              return 100.0 * Math.tan(value);
          } else if (angleUnits === AngleUnits$1.RATIO) {
              var rise = Math.sin(value);
              var run = Math.cos(value);
              return rise / run;
          }
          //>>includeStart('debug', pragmas.debug);
          throw new cesium.DeveloperError('Invalid angle units: ' + angleUnits);
          //>>includeEnd('debug');
      }

  var noScale = new cesium.Cartesian3(1.0, 1.0, 1.0);
      var matrixScratch = new cesium.Matrix4();
      var scaleScratch = new cesium.Cartesian3();

      /**
       * Computes the transform editor widget origin from the transform and the origin offset
       * @param {Matrix4} transform The transform
       * @ionsdk
       * @param {Cartesian3} originOffset The offset from the transform origin
       * @param {Cartesian3} result
       * @return {Cartesian3}
       *
       * @private
       */
      function getWidgetOrigin(transform, originOffset, result) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('transform', transform);
          cesium.Check.defined('originOffset', originOffset);
          cesium.Check.defined('result', result);
          //>>includeEnd('debug');

          var startScale = cesium.Matrix4.getScale(transform, scaleScratch);
          var modelMatrix = cesium.Matrix4.setScale(transform, noScale, matrixScratch);

          return cesium.Matrix4.multiplyByPoint(modelMatrix, cesium.Cartesian3.multiplyComponents(originOffset, startScale, result), result);
      }

  /**
       * @private
       * @ionsdk
       *
       * @param {Cartesian3[]} options.positions The positions of the polyline
       * @param {Color} options.color The color of the line
       * @param {Boolean} [options.show=true] Whether the primitive is visible
       * @param {Object} [options.id] An id for the primitive
       * @param {Boolean} [options.loop=false] True if the polyline should loop
       * @param {Boolean} [options.arrow=false] True if the arrow material should be used
       * @param {Boolean} [options.width] The width of the polyline
       * @param {Boolean} [options.depthFail=true] True if a depthfail material should be used
       */
      function AxisLinePrimitive(options) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options', options);
          cesium.Check.defined('options.positions', options.positions);
          cesium.Check.defined('options.color', options.color);
          //>>includeEnd('debug');

          this.show = cesium.defaultValue(options.show, true);
          this.id = options.id;

          var positions = options.positions;
          if (options.loop) {
              positions = positions.slice();
              positions.push(positions[0]);
          }
          var isArrow = cesium.defaultValue(options.arrow, false);
          this._width = cesium.defined(options.width) ? options.width : (isArrow ? 25 : 8);
          this._color = options.color;
          this._depthFailColor = options.color.withAlpha(0.3);
          this._positions = positions;
          this._arrow = isArrow;
          this._depthFail = cesium.defaultValue(options.depthFail, true);

          this._primitive = undefined;
          this._boundingSphere = cesium.BoundingSphere.fromPoints(positions);
          this._transformedBoundingSphere = cesium.BoundingSphere.clone(this._boundingSphere);
          this._modelMatrix = cesium.Matrix4.clone(cesium.Matrix4.IDENTITY);

          this._update = true;
      }

      cesium.defineProperties(AxisLinePrimitive.prototype, {
          modelMatrix : {
              get : function() {
                  return this._modelMatrix;
              },
              set : function(value) {
                  if (cesium.Matrix4.equalsEpsilon(value, this._modelMatrix, cesium.Math.EPSILON10)) {
                      return;
                  }
                  this._modelMatrix = cesium.Matrix4.clone(value, this._modelMatrix);
                  this._update = true;
              }
          },
          positions : {
              get : function() {
                  return this._positions;
              },
              set : function(positions) {
                  this._positions = positions;
                  this._update = true;
              }
          },
          color : {
              get : function() {
                  return this._color;
              }
          },
          width : {
              get : function() {
                  return this._width;
              }
          },
          boundingVolume : {
              get : function() {
                  return this._transformedBoundingSphere;
              }
          }
      });

      AxisLinePrimitive.prototype.update = function(frameState) {
          if (!this.show) {
              return;
          }

          if (this._update) {
              this._update = false;
              this._primitive = this._primitive && this._primitive.destroy();

              var geometry = new cesium.PolylineGeometry({
                  positions : this._positions,
                  width : this._width,
                  vertexFormat : cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
                  arcType: cesium.ArcType.NONE
              });

              var appearance1;
              var appearance2;
              if (this._arrow) {
                  appearance1 = new cesium.PolylineMaterialAppearance({
                      material : cesium.Material.fromType(cesium.Material.PolylineArrowType, {
                          color : this._color
                      })
                  });
                  if (this._depthFail) {
                      appearance2 = new cesium.PolylineMaterialAppearance({
                          material : cesium.Material.fromType(cesium.Material.PolylineArrowType, {
                              color : this._depthFailColor
                          })
                      });
                  }
              } else {
                  appearance1 = new cesium.PolylineColorAppearance({
                      translucent: this._color.alpha !== 1.0
                  });
                  if (this._depthFail) {
                      appearance2 = new cesium.PolylineColorAppearance({
                          translucent: this._depthFailColor.alpha !== 1.0
                      });
                  }
              }

              var modelMatrix = this._modelMatrix;
              this._primitive = new cesium.Primitive({
                  geometryInstances : new cesium.GeometryInstance({
                      geometry : geometry,
                      attributes : {
                          color : cesium.ColorGeometryInstanceAttribute.fromColor(this._color),
                          depthFailColor : cesium.ColorGeometryInstanceAttribute.fromColor(this._depthFailColor)
                      },
                      id : this.id,
                      modelMatrix : modelMatrix
                  }),
                  appearance : appearance1,
                  depthFailAppearance : appearance2,
                  asynchronous : false
              });
              this._transformedBoundingSphere = cesium.BoundingSphere.transform(this._boundingSphere, modelMatrix, this._transformedBoundingSphere);
          }

          this._primitive.update(frameState);
      };

      AxisLinePrimitive.prototype.isDestroyed = function() {
          return false;
      };

      AxisLinePrimitive.prototype.destroy = function() {
          this._primitive = this._primitive && this._primitive.destroy();
          return cesium.destroyObject(this);
      };

  /**
       * @private
       * @ionsdk
       */
      var TransformAxis = {
          X : 'X',
          Y : 'Y',
          Z : 'Z'
      };

      TransformAxis.getValue = function(axis) {
          if (axis === TransformAxis.X) {
              return cesium.Cartesian3.UNIT_X;
          } else if (axis === TransformAxis.Y) {
              return cesium.Cartesian3.UNIT_Y;
          }
          return cesium.Cartesian3.UNIT_Z;
      };

      TransformAxis.getColor = function(axis) {
          if (axis === TransformAxis.X) {
              return cesium.Color.RED;
          } else if (axis === TransformAxis.Y) {
              return cesium.Color.GREEN;
          }
          return cesium.Color.BLUE;
      };
  var TransformAxis$1 = cesium.freezeObject(TransformAxis);

  var scratchPlaneCenter = new cesium.Cartesian3();
  var scratchPixelSize = new cesium.Cartesian2();
  var scratchOldScale = new cesium.Cartesian3();
  var scratchNetScale = new cesium.Cartesian3();

  function getPixelSize(frameState, position, pixelSize) {
      var context = frameState.context;
      var cameraPositionWC = frameState.camera.positionWC;

      var distance = cesium.Cartesian3.distance(position, cameraPositionWC);
      var drawingBufferWidth = context.drawingBufferWidth;
      var drawingBufferHeight = context.drawingBufferHeight;

      return frameState.camera.frustum.getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, frameState.pixelRatio, pixelSize)
  }

  function getNetScaleFactor(pixelSizeTermsOf2D, maximumSizeInMeter, pixelSizeTermsOf3D, oldScale, result) {
      var x = 1, y = 1, z , tmp;

      if (pixelSizeTermsOf2D.x > 0) {
          tmp = pixelSizeTermsOf2D.x * pixelSizeTermsOf3D.x;
          x = Math.min(tmp, maximumSizeInMeter.x) / oldScale.x;
      }

      if (pixelSizeTermsOf2D.y > 0) {
          tmp = pixelSizeTermsOf2D.y * pixelSizeTermsOf3D.y;
          y = Math.min(tmp, maximumSizeInMeter.y) / oldScale.y;
      }

      z = (x + y) / 2;

      return cesium.Cartesian3.fromElements(x, y, z, result)
  }

  function getScreenSpaceScalingMatrix(pixelSize, maximumSizeInMeter, frameState, modelMatrix, modelMatrix1) {
      var netScaleFactor = getNetScaleFactor(pixelSize, maximumSizeInMeter, getPixelSize(frameState, cesium.Matrix4.getTranslation(modelMatrix, scratchPlaneCenter), scratchPixelSize), cesium.Matrix4.getScale(modelMatrix, scratchOldScale), scratchNetScale);

      return cesium.Matrix4.multiplyByScale(modelMatrix, netScaleFactor, modelMatrix1)
  }

  var noScale$1 = new cesium.Cartesian3(1.0, 1.0, 1.0);
  var offsetScratch = new cesium.Cartesian3();
  var widgetOriginScratch = new cesium.Cartesian3();
  var rotationWorldScratch = new cesium.Cartesian3();
  var rotatedTransformScratch = new cesium.Matrix4();
  var inverseTransformScratch = new cesium.Matrix4();
  var localStartScratch = new cesium.Cartesian3();
  var localEndScratch = new cesium.Cartesian3();
  var vector1Scratch = new cesium.Cartesian2();
  var vector2Scratch = new cesium.Cartesian2();
  var hprScratch = new cesium.HeadingPitchRoll();
  var rayScratch = new cesium.Ray();
  var intersectionScratch = new cesium.Cartesian3();
  var quaternionScratch = new cesium.Quaternion();
  var matrix3Scratch = new cesium.Matrix3();
  var defaultPixelSize = 100;
  var defaultMaximumMeterSize = 1 / 0;

  function getUnitCirclePositions() {
      var xAxis = [];
      var yAxis = [];
      var zAxis = [];

      for (var i = 0; i < 360; i++) {
          var rad = cesium.Math.toRadians(i);
          var x = Math.cos(rad);
          var y = Math.sin(rad);

          xAxis.push(new cesium.Cartesian3(0.0, x, y));
          yAxis.push(new cesium.Cartesian3(y, 0.0, x));
          zAxis.push(new cesium.Cartesian3(x, y, 0.0));
      }
      return {
          x : xAxis,
          y : yAxis,
          z : zAxis
      };
  }

  function getRotationAngle(transform, originOffset, axis, start, end) {
      var inverseTransform = cesium.Matrix4.inverse(transform, inverseTransformScratch);
      var localStart = cesium.Matrix4.multiplyByPoint(inverseTransform, start, localStartScratch); //project points to local coordinates so we can project to 2D
      var localEnd = cesium.Matrix4.multiplyByPoint(inverseTransform, end, localEndScratch);

      localStart = cesium.Cartesian3.subtract(localStart, originOffset, localStart);
      localEnd = cesium.Cartesian3.subtract(localEnd, originOffset, localEnd);

      var v1 = vector1Scratch;
      var v2 = vector2Scratch;
      if (axis.x) {
          v1.x = localStart.y;
          v1.y = localStart.z;
          v2.x = localEnd.y;
          v2.y = localEnd.z;
      } else if (axis.y) {
          v1.x = -localStart.x;
          v1.y = localStart.z;
          v2.x = -localEnd.x;
          v2.y = localEnd.z;
      } else {
          v1.x = localStart.x;
          v1.y = localStart.y;
          v2.x = localEnd.x;
          v2.y = localEnd.y;
      }
      var ccw = ((v1.x * v2.y) - (v1.y * v2.x)) >= 0.0; //true when minimal angle between start and end is a counter clockwise rotation
      var angle = cesium.Cartesian2.angleBetween(v1, v2);
      if (!ccw) {
          angle = -angle;
      }
      return angle;
  }

  function getLinePrimitive(positions, axis) {
      return new AxisLinePrimitive({
          positions : positions,
          color : TransformAxis$1.getColor(axis),
          loop : true,
          show : false,
          id : axis
      });
  }

  /**
   * @private
   * @ionsdk
   *
   * @param {Object} options
   * @param {Scene} options.scene
   * @param {Cartesian3} options.originOffset
   * @param {Function} options.setHeadingPitchRoll
   * @param {Function} options.setPosition
   * @param {Matrix4} options.transform
   * @param {Number} options.radius
   * @param {Number} options.pixelSize
   * @param {Number} options.maximumSizeInMeters
   */
  function RotationEditor(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      var scene = options.scene;

      this._vectorLine1 = scene.primitives.add(new AxisLinePrimitive({
          width : 5,
          positions : [new cesium.Cartesian3(), new cesium.Cartesian3()],
          color : cesium.Color.YELLOW,
          show: false
      }));
      this._vectorLine2 = scene.primitives.add(new AxisLinePrimitive({
          width : 5,
          positions : [new cesium.Cartesian3(), new cesium.Cartesian3()],
          color : cesium.Color.YELLOW,
          show: false
      }));

      var circles = getUnitCirclePositions();

      this._polylineX = scene.primitives.add(getLinePrimitive(circles.x, TransformAxis$1.X));
      this._polylineY = scene.primitives.add(getLinePrimitive(circles.y, TransformAxis$1.Y));
      this._polylineZ = scene.primitives.add(getLinePrimitive(circles.z, TransformAxis$1.Z));
      this._modelMatrix = cesium.Matrix4.clone(cesium.Matrix4.IDENTITY);

      this.originOffset = options.originOffset;
      this._scene = scene;
      this._setHPRCallback = options.setHeadingPitchRoll;
      this._setPositionCallback = options.setPosition;
      this._transform = options.transform;
      this._radius = options.radius;

      this._active = false;
      this._dragging = false;
      this._startTransform = new cesium.Matrix4();
      this._startRotation = new cesium.Matrix3();
      this._widgetOrigin = new cesium.Cartesian3();
      this._modelOrigin = new cesium.Cartesian3();
      this._rotationAxis = undefined;
      this._rotationPlane = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0.0);
      this._rotationStartPoint = new cesium.Cartesian3();
      this._pixelSize = cesium.defined(options.pixelSize) ? new cesium.Cartesian2(options.pixelSize, options.pixelSize) : new cesium.Cartesian2(defaultPixelSize, defaultPixelSize);
      this._maximumSizeInMeters = cesium.defined(options.maximumSizeInMeters) ? new cesium.Cartesian2(options.maximumSizeInMeters, options.maximumSizeInMeters) : new cesium.Cartesian2(defaultMaximumMeterSize, defaultMaximumMeterSize);
      this.update();
  }

  cesium.defineProperties(RotationEditor.prototype, {
      active : {
          get : function() {
              return this._active;
          },
          set : function(active) {
              this._active = active;
              if (active) {
                  this._polylineX.show = true;
                  this._polylineY.show = true;
                  this._polylineZ.show = true;
              } else {
                  this._polylineX.show = false;
                  this._polylineY.show = false;
                  this._polylineZ.show = false;
                  this._dragging = false;
              }
          }
      },
      pixelSize: {
          get: function() {
              return this._pixelSize.x
          }
      },
      maximumSizeInMeters: {
          get: function() {
              return this._maximumSizeInMeters.x
          }
      }
  });

  RotationEditor.prototype.update = function() {
      var transform = this._transform;
      var modelMatrix = this._modelMatrix;
      modelMatrix = cesium.Matrix4.setScale(transform, noScale$1, modelMatrix);

      var widgetOrigin = getWidgetOrigin(transform, this.originOffset, widgetOriginScratch);
      modelMatrix = cesium.Matrix4.setTranslation(modelMatrix, widgetOrigin, modelMatrix);

      var radius = this._radius * cesium.Matrix4.getMaximumScale(this._transform) * 1.25;
      modelMatrix = cesium.Matrix4.multiplyByUniformScale(modelMatrix, radius, modelMatrix);

      if (this._pixelSize.x > 0)
          modelMatrix = getScreenSpaceScalingMatrix(this._pixelSize, this._maximumSizeInMeters, this._scene.frameState, modelMatrix, modelMatrix);

      this._polylineX.modelMatrix = modelMatrix;
      this._polylineY.modelMatrix = modelMatrix;
      this._polylineZ.modelMatrix = modelMatrix;
  };

  RotationEditor.prototype.handleLeftDown = function(position) {
      var scene = this._scene;
      var pickedObjects = scene.drillPick(position);
      var pickedAxis;
      for (var i = 0; i < pickedObjects.length; i++) {
          var object = pickedObjects[i];
          if (cesium.defined(object.id) && cesium.defined(TransformAxis$1[object.id])) {
              pickedAxis = object.id;
              break;
          }
      }
      if (!cesium.defined(pickedAxis)) {
          return;
      }

      var rotationAxis = TransformAxis$1.getValue(pickedAxis);
      var startTransform = cesium.Matrix4.setScale(this._transform, noScale$1, this._startTransform);
      this._startRotation = cesium.Matrix4.getMatrix3(startTransform, this._startRotation);
      var modelOrigin = cesium.Matrix4.getTranslation(startTransform, this._modelOrigin);

      var widgetOrigin = getWidgetOrigin(this._transform, this.originOffset, this._widgetOrigin);

      var rotationAxisEndWorld = cesium.Matrix4.multiplyByPoint(startTransform, rotationAxis, rotationWorldScratch);
      var rotationAxisVectorWorld = cesium.Cartesian3.subtract(rotationAxisEndWorld, modelOrigin, rotationAxisEndWorld);
      rotationAxisVectorWorld = cesium.Cartesian3.normalize(rotationAxisVectorWorld, rotationAxisVectorWorld);

      var rotationPlane = cesium.Plane.fromPointNormal(widgetOrigin, rotationAxisVectorWorld, this._rotationPlane);
      var rotationStartPoint = cesium.IntersectionTests.rayPlane(scene.camera.getPickRay(position, rayScratch), rotationPlane, this._rotationStartPoint);
      this._dragging = cesium.defined(rotationStartPoint);
      this._rotationAxis = rotationAxis;
      scene.screenSpaceCameraController.enableInputs = false;
  };

  RotationEditor.prototype.handleMouseMove = function(position) {
      if (!this._dragging) {
          return;
      }
      var scene = this._scene;
      var ray = scene.camera.getPickRay(position, rayScratch);
      var intersection = cesium.IntersectionTests.rayPlane(ray, this._rotationPlane, intersectionScratch);

      if (!cesium.defined(intersection)) {
          return;
      }

      var widgetOrigin = this._widgetOrigin;
      var modelOrigin = this._modelOrigin;
      var rotationStartPoint = this._rotationStartPoint;
      var vector1 = this._vectorLine1;
      var v1Pos = vector1.positions;
      var vector2 = this._vectorLine2;
      var v2Pos = vector2.positions;

      var v1 = cesium.Cartesian3.subtract(rotationStartPoint, widgetOrigin, vector1Scratch);
      var v2 = cesium.Cartesian3.subtract(intersection, widgetOrigin, vector2Scratch);
      v2 = cesium.Cartesian3.normalize(v2, v2);
      v2 = cesium.Cartesian3.multiplyByScalar(v2, cesium.Cartesian3.magnitude(v1), v2);
      intersection = cesium.Cartesian3.add(widgetOrigin, v2, intersection);

      v1Pos[0] = widgetOrigin;
      v1Pos[1] = rotationStartPoint;
      v2Pos[0] = widgetOrigin;
      v2Pos[1] = intersection;
      vector1.positions = v1Pos;
      vector2.positions = v2Pos;
      vector1.show = true;
      vector2.show = true;

      var offset = cesium.Cartesian3.multiplyComponents(this.originOffset, cesium.Matrix4.getScale(this._transform, offsetScratch), offsetScratch);
      var rotationAxis = this._rotationAxis;
      var angle = getRotationAngle(this._startTransform, offset, rotationAxis, rotationStartPoint, intersection);
      var rotation = cesium.Matrix3.fromQuaternion(cesium.Quaternion.fromAxisAngle(rotationAxis, angle, quaternionScratch), matrix3Scratch);

      rotation = cesium.Matrix3.multiply(this._startRotation, rotation, rotation);
      var rotationTransform = cesium.Matrix4.fromRotationTranslation(rotation, modelOrigin, rotatedTransformScratch);
      this._setHPRCallback(cesium.Transforms.fixedFrameToHeadingPitchRoll(rotationTransform, scene.mapProjection.ellipsoid, undefined, hprScratch));

      var newOffset = cesium.Cartesian3.negate(offset, vector1Scratch);
      newOffset = cesium.Matrix3.multiplyByVector(rotation, newOffset, newOffset);

      modelOrigin = cesium.Cartesian3.add(newOffset, widgetOrigin, modelOrigin);
      this._setPositionCallback(modelOrigin);
  };

  RotationEditor.prototype.handleLeftUp = function() {
      this._dragging = false;
      this._vectorLine1.show = false;
      this._vectorLine2.show = false;
      this._scene.screenSpaceCameraController.enableInputs = true;
  };

  RotationEditor.prototype.isDestroyed = function() {
      return false;
  };

  RotationEditor.prototype.destroy = function() {
      this.active = false;
      var scene = this._scene;

      scene.primitives.remove(this._vectorLine1);
      scene.primitives.remove(this._vectorLine2);
      scene.primitives.remove(this._polylineX);
      scene.primitives.remove(this._polylineY);
      scene.primitives.remove(this._polylineZ);

      cesium.destroyObject(this);
  };

  // exposed for testing
  RotationEditor._getRotationAngle = getRotationAngle;

  var widgetOriginScratch$1 = new cesium.Cartesian3();
  var originScratch = new cesium.Cartesian3();
  var directionScratch = new cesium.Cartesian3();
  var planeNormalScratch = new cesium.Cartesian3();
  var pickedPointScratch = new cesium.Cartesian3();
  var moveScratch = new cesium.Cartesian3();
  var offsetScratch$1 = new cesium.Cartesian3();
  var rayScratch$1 = new cesium.Ray();
  var noScale$2 = new cesium.Cartesian3(1.0, 1.0, 1.0);
  var nonUniformScalingScratch = new cesium.Cartesian3();
  var defaultPixelSize$1 = 100;
  var defaultMaximumMeterSize$1 = 1 / 0;

  function getPoint(axis) {
      return {
          position : TransformAxis$1.getValue(axis),
          show : false,
          color : TransformAxis$1.getColor(axis),
          pixelSize : 20,
          disableDepthTestDistance : Number.POSITIVE_INFINITY,
          id : axis
      };
  }

  function getLinePrimitive$1(axis) {
      return new AxisLinePrimitive({
          positions : [cesium.Cartesian3.ZERO, TransformAxis$1.getValue(axis)],
          color : TransformAxis$1.getColor(axis),
          id : axis,
          show : false
      });
  }

  /**
   * @private
   * @ionsdk
   *
   * @param {Object} options
   * @param {Scene} options.scene;
   * @param {Matrix4} options.transform
   * @param {Cartesian3} options.originOffset
   * @param {KnockoutObservable<Boolean>} options.enableNonUniformScaling
   * @param {Function} options.setPosition
   * @param {Function} options.setScale
   * @param {Number} options.radius
   * @param {Number} options.pixelSize
   * @param {Number} options.maximumSizeInMeters
   */
  function ScaleEditor(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      var scene = options.scene;
      var transform = options.transform;

      var points = scene.primitives.add(new cesium.PointPrimitiveCollection());

      this.originOffset = options.originOffset;

      this._points = points;
      this._pointX = points.add(getPoint(TransformAxis$1.X));
      this._pointY = points.add(getPoint(TransformAxis$1.Y));
      this._pointZ = points.add(getPoint(TransformAxis$1.Z));

      this._polylineX = scene.primitives.add(getLinePrimitive$1(TransformAxis$1.X));
      this._polylineY = scene.primitives.add(getLinePrimitive$1(TransformAxis$1.Y));
      this._polylineZ = scene.primitives.add(getLinePrimitive$1(TransformAxis$1.Z));

      this._scene = scene;
      this._canvas = scene.canvas;
      this._enableNonUniformScaling = options.enableNonUniformScaling;
      this._setPositionCallback = options.setPosition;
      this._setScaleCallback = options.setScale;
      this._modelMatrix = new cesium.Matrix4();

      this._pickedAxis = undefined;
      this._dragAlongVector = undefined;
      this._offsetVector = new cesium.Cartesian3();
      this._pickingPlane = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0.0);
      this._dragging = false;
      this._startPosition = new cesium.Cartesian3();
      this._startScale = new cesium.Cartesian3();
      this._startOffset = new cesium.Cartesian3();
      this._startTransform = new cesium.Matrix4();
      this._active = false;

      this._transform = transform;
      this._lineLength = options.radius * 1.5;
      this._pixelSize = cesium.defined(options.pixelSize) ? new cesium.Cartesian2(options.pixelSize, options.pixelSize) : new cesium.Cartesian2(defaultPixelSize$1, defaultPixelSize$1);
      this._maximumSizeInMeters = cesium.defined(options.maximumSizeInMeters) ? new cesium.Cartesian2(options.maximumSizeInMeters, options.maximumSizeInMeters) : new cesium.Cartesian2(defaultMaximumMeterSize$1, defaultMaximumMeterSize$1);

      this.update();
  }

  cesium.defineProperties(ScaleEditor.prototype, {
      active : {
          get : function() {
              return this._active;
          },
          set : function(active) {
              this._active = active;
              if (active) {
                  this._pointX.show = true;
                  this._pointY.show = true;
                  this._pointZ.show = true;
                  this._polylineX.show = true;
                  this._polylineY.show = true;
                  this._polylineZ.show = true;
              } else {
                  this._pointX.show = false;
                  this._pointY.show = false;
                  this._pointZ.show = false;
                  this._polylineX.show = false;
                  this._polylineY.show = false;
                  this._polylineZ.show = false;
                  this._dragging = false;
              }
          }
      },
      pixelSize: {
          get: function() {
              return this._pixelSize.x
          }
      },
      maximumSizeInMeters: {
          get: function() {
              return this._maximumSizeInMeters.x
          }
      }
  });

  ScaleEditor.prototype.handleLeftDown = function(position) {
      var scene = this._scene;
      var transform = this._transform;
      var camera = scene.camera;

      var pickedObjects = scene.drillPick(position);
      var origin = cesium.Matrix4.getTranslation(transform, originScratch);

      var pickedAxis;
      for (var i = 0; i < pickedObjects.length; i++) {
          var object = pickedObjects[i];
          if (cesium.defined(object.id) && cesium.defined(TransformAxis$1[object.id])) {
              pickedAxis = object.id;
              break;
          }
      }
      if (!cesium.defined(pickedAxis)) {
          return;
      }
      var dragAlongVector = TransformAxis$1.getValue(pickedAxis);
      var directionVector = cesium.Matrix4.multiplyByPointAsVector(this._modelMatrix, dragAlongVector, directionScratch);

      var planeNormal = planeNormalScratch;
      if (Math.abs(cesium.Cartesian3.dot(camera.upWC, directionVector)) > 0.7) { // if up and the direction are close to parallel, the dot product will be close to 1
          planeNormal = cesium.Cartesian3.cross(camera.rightWC, directionVector, planeNormal);
      } else {
          planeNormal = cesium.Cartesian3.cross(camera.upWC, directionVector, planeNormal);
      }
      cesium.Cartesian3.normalize(planeNormal, planeNormal);
      var pickingPlane = cesium.Plane.fromPointNormal(origin, planeNormal, this._pickingPlane);
      var startPosition = cesium.IntersectionTests.rayPlane(camera.getPickRay(position, rayScratch$1), pickingPlane, this._startPosition);
      if (!cesium.defined(startPosition)) {
          return;
      }
      this._offsetVector = cesium.Cartesian3.subtract(startPosition, origin, this._offsetVector);
      this._dragging = true;

      var startScale = cesium.Matrix4.getScale(transform, this._startScale);
      var startValue;
      if (pickedAxis === TransformAxis$1.X) {
          startValue = startScale.x;
      } else if (pickedAxis === TransformAxis$1.Y) {
          startValue = startScale.y;
      } else {
          startValue = startScale.z;
      }
      this._startValue = startValue;
      this._startOffset = cesium.Cartesian3.multiplyComponents(this.originOffset, startScale, this._startOffset);
      this._dragAlongVector = dragAlongVector;
      this._pickedAxis = pickedAxis;
      this._startTransform = cesium.Matrix4.setScale(transform, noScale$2, this._startTransform);
      scene.screenSpaceCameraController.enableInputs = false;
  };

  ScaleEditor.prototype.handleMouseMove = function(position) {
      if (!this._dragging) {
          return;
      }
      var scene = this._scene;
      var camera = scene.camera;

      var pickedPoint = cesium.IntersectionTests.rayPlane(camera.getPickRay(position, rayScratch$1), this._pickingPlane, pickedPointScratch);
      if (!cesium.defined(pickedPoint)) {
          return;
      }

      var dragAlongVector = this._dragAlongVector;
      var directionVector = cesium.Matrix4.multiplyByPointAsVector(this._modelMatrix, dragAlongVector, directionScratch);
      var scaleVector = cesium.Cartesian3.subtract(pickedPoint, this._startPosition, moveScratch);
      scaleVector = cesium.Cartesian3.projectVector(scaleVector, directionVector, scaleVector);
      var scale = cesium.Cartesian3.magnitude(scaleVector);
      if (cesium.Cartesian3.dot(scaleVector, this._offsetVector) < 0) {
          // mouse drag is backwards, so we want to scale down
          scale = -scale;
      }

      scale /= this._lineLength;

      scale += this._startValue;
      if (scale <= 0) {
          return;
      }

      var pickedAxis = this._pickedAxis;
      var startScale = this._startScale;
      if (!this._enableNonUniformScaling()) {
          startScale.x = scale;
          startScale.y = scale;
          startScale.z = scale;
      } else if (pickedAxis === TransformAxis$1.X) {
          startScale.x = scale;
      } else if (pickedAxis === TransformAxis$1.Y) {
          startScale.y = scale;
      } else {
          startScale.z = scale;
      }

      var newOffset = cesium.Cartesian3.multiplyComponents(this.originOffset, startScale, offsetScratch$1);
      newOffset = cesium.Cartesian3.subtract(this._startOffset, newOffset, newOffset);
      newOffset = cesium.Matrix4.multiplyByPoint(this._startTransform, newOffset, newOffset);

      this._setScaleCallback(startScale);
      this._setPositionCallback(newOffset);
  };

  ScaleEditor.prototype.handleLeftUp = function() {
      this._dragging = false;
      this._scene.screenSpaceCameraController.enableInputs = true;
  };

  ScaleEditor.prototype.update = function() {
      var modelMatrix = this._modelMatrix;

      var transform = this._transform;
      var widgetOrigin = getWidgetOrigin(transform, this.originOffset, widgetOriginScratch$1);


      modelMatrix = cesium.Matrix4.multiplyByUniformScale(transform, this._lineLength, modelMatrix);
      modelMatrix = cesium.Matrix4.setTranslation(this._modelMatrix, widgetOrigin, modelMatrix);

      var flag = 0 < this._pixelSize.x;

      flag && (modelMatrix = getScreenSpaceScalingMatrix(this._pixelSize, this._maximumSizeInMeters, this._scene.frameState, modelMatrix, modelMatrix)),
      flag && this._enableNonUniformScaling && ((nonUniformScalingScratch = cesium.Matrix4.getScale(modelMatrix, nonUniformScalingScratch)).x >= nonUniformScalingScratch.y ? (nonUniformScalingScratch.y = nonUniformScalingScratch.x,
          nonUniformScalingScratch.z = nonUniformScalingScratch.x) : nonUniformScalingScratch.y >= nonUniformScalingScratch.x && (nonUniformScalingScratch.x = nonUniformScalingScratch.y,
          nonUniformScalingScratch.z = nonUniformScalingScratch.y),
          modelMatrix = cesium.Matrix4.setScale(modelMatrix, nonUniformScalingScratch, modelMatrix));

      this._polylineX.modelMatrix = modelMatrix;
      this._polylineY.modelMatrix = modelMatrix;
      this._polylineZ.modelMatrix = modelMatrix;
      this._points.modelMatrix = modelMatrix;
  };

  ScaleEditor.prototype.isDestroyed = function() {
      return false;
  };

  ScaleEditor.prototype.destroy = function() {
      this.active = false;
      var scene = this._scene;
      this._points.removeAll();
      scene.primitives.remove(this._polylineX);
      scene.primitives.remove(this._polylineY);
      scene.primitives.remove(this._polylineZ);
      scene.primitives.remove(this._points);
      cesium.destroyObject(this);
  };

  var widgetOriginScratch$2 = new cesium.Cartesian3();
  var originScratch$1 = new cesium.Cartesian3();
  var directionScratch$1 = new cesium.Cartesian3();
  var planeNormalScratch$1 = new cesium.Cartesian3();
  var pickedPointScratch$1 = new cesium.Cartesian3();
  var moveScratch$1 = new cesium.Cartesian3();
  var offsetProjectedScratch = new cesium.Cartesian3();
  var rayScratch$2 = new cesium.Ray();
  var defaultPixelSize$2 = 100;
  var defaultMaximumMeterSize$2 = 1 / 0;

  function getLinePrimitive$2(axis) {
      return new AxisLinePrimitive({
          positions : [cesium.Cartesian3.ZERO, TransformAxis$1.getValue(axis)],
          arrow : true,
          color : TransformAxis$1.getColor(axis),
          id : axis,
          show : false
      });
  }

  /**
   * @private
   * @ionsdk
   *
   * @param {Object} options
   * @param {Scene} options.scene
   * @param {Cartesian3} options.originOffset
   * @param {Function} options.setPosition
   * @param {Matrix4} options.transform
   * @param {Number} options.radius
   * @param {Number} options.pixelSize
   * @param {Number} options.maximumSizeInMeters
   */
  function TranslationEditor(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      var scene = options.scene;

      this.originOffset = options.originOffset;

      this._polylineX = scene.primitives.add(getLinePrimitive$2(TransformAxis$1.X));
      this._polylineY = scene.primitives.add(getLinePrimitive$2(TransformAxis$1.Y));
      this._polylineZ = scene.primitives.add(getLinePrimitive$2(TransformAxis$1.Z));

      this._scene = scene;
      this._canvas = scene.canvas;
      this._setPositionCallback = options.setPosition;
      this._modelMatrix = new cesium.Matrix4();
      this._fixedFrame = new cesium.Matrix4();
      this._hpr = new cesium.HeadingPitchRoll();

      this._dragAlongVector = undefined;
      this._offsetVector = new cesium.Cartesian3();
      this._pickingPlane = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0.0);
      this._dragging = false;
      this._active = false;

      this._transform = options.transform;
      this._radius = options.radius;
      this._pixelSize = cesium.defined(options.pixelSize) ? new cesium.Cartesian2(options.pixelSize, options.pixelSize) : new cesium.Cartesian2(defaultPixelSize$2, defaultPixelSize$2);
      this._maximumSizeInMeters = cesium.defined(options.maximumSizeInMeters) ? new cesium.Cartesian2(options.maximumSizeInMeters, options.maximumSizeInMeters) : new cesium.Cartesian2(defaultMaximumMeterSize$2, defaultMaximumMeterSize$2);
      this.update();
  }

  cesium.defineProperties(TranslationEditor.prototype, {
      active : {
          get : function() {
              return this._active;
          },
          set : function(active) {
              this._active = active;
              if (active) {
                  this._polylineX.show = true;
                  this._polylineY.show = true;
                  this._polylineZ.show = true;
              } else {
                  this._polylineX.show = false;
                  this._polylineY.show = false;
                  this._polylineZ.show = false;
                  this._dragging = false;
              }
          },
          pixelSize: {
              get: function() {
                  return this._pixelSize.x
              }
          },
          maximumSizeInMeters: {
              get: function() {
                  return this._maximumSizeInMeters.x
              }
          }
      }
  });

  TranslationEditor.prototype.update = function() {
      var transform = this._transform;
      var ellipsoid = this._scene.mapProjection.ellipsoid;

      var modelOrigin = cesium.Matrix4.getTranslation(transform, originScratch$1);
      var widgetOrigin = getWidgetOrigin(transform, this.originOffset, widgetOriginScratch$2);

      var length = this._radius * cesium.Matrix4.getMaximumScale(this._transform) * 1.5;
      var hpr = cesium.Transforms.fixedFrameToHeadingPitchRoll(this._transform, ellipsoid, undefined, this._hpr);
      hpr.pitch = 0;
      hpr.roll = 0;

      var hprToFF = cesium.Transforms.headingPitchRollToFixedFrame(modelOrigin, hpr, ellipsoid, undefined, this._fixedFrame);
      hprToFF = cesium.Matrix4.setTranslation(hprToFF, widgetOrigin, hprToFF);
      var modelMatrix = cesium.Matrix4.multiplyByUniformScale(hprToFF, length, this._modelMatrix);

      if (this._pixelSize.x > 0)
          modelMatrix = getScreenSpaceScalingMatrix(this._pixelSize, this._maximumSizeInMeters, this._scene.frameState, modelMatrix, modelMatrix);

      this._polylineX.modelMatrix = modelMatrix;
      this._polylineY.modelMatrix = modelMatrix;
      this._polylineZ.modelMatrix = modelMatrix;
  };

  TranslationEditor.prototype.handleLeftDown = function(position) {
      var scene = this._scene;
      var camera = scene.camera;

      var pickedObjects = scene.drillPick(position);

      var pickedAxis;
      for (var i = 0; i < pickedObjects.length; i++) {
          var object = pickedObjects[i];
          if (cesium.defined(object.id) && cesium.defined(TransformAxis$1[object.id])) {
              pickedAxis = object.id;
              break;
          }
      }
      if (!cesium.defined(pickedAxis)) {
          return;
      }

      var origin = cesium.Matrix4.getTranslation(this._transform, originScratch$1);
      var dragAlongVector = TransformAxis$1.getValue(pickedAxis);
      var directionVector = cesium.Matrix4.multiplyByPointAsVector(this._fixedFrame, dragAlongVector, directionScratch$1);

      //Finds a picking plane that includes the dragged axis and is somewhat perpendicular to the camera
      var planeNormal = planeNormalScratch$1;
      if (Math.abs(cesium.Cartesian3.dot(camera.upWC, directionVector)) > 0.7) { // if up and the direction are close to parellel, the dot product will be close to 1
          planeNormal = cesium.Cartesian3.cross(camera.rightWC, directionVector, planeNormal);
      } else {
          planeNormal = cesium.Cartesian3.cross(camera.upWC, directionVector, planeNormal);
      }
      cesium.Cartesian3.normalize(planeNormal, planeNormal);

      var pickingPlane = cesium.Plane.fromPointNormal(origin, planeNormal, this._pickingPlane);
      var offsetVector = cesium.IntersectionTests.rayPlane(camera.getPickRay(position, rayScratch$2), pickingPlane, this._offsetVector);
      if (!cesium.defined(offsetVector)) {
          return;
      }
      cesium.Cartesian3.subtract(offsetVector, origin, offsetVector);
      this._dragging = true;
      this._dragAlongVector = dragAlongVector;
      scene.screenSpaceCameraController.enableInputs = false;
  };

  TranslationEditor.prototype.handleMouseMove = function(position) {
      if (!this._dragging) {
          return;
      }
      var scene = this._scene;
      var camera = scene.camera;

      var pickedPoint = cesium.IntersectionTests.rayPlane(camera.getPickRay(position, rayScratch$2), this._pickingPlane, pickedPointScratch$1);
      if (!cesium.defined(pickedPoint)) {
          return;
      }

      var dragAlongVector = this._dragAlongVector;
      var origin = cesium.Matrix4.getTranslation(this._transform, originScratch$1);
      var directionVector = cesium.Matrix4.multiplyByPointAsVector(this._fixedFrame, dragAlongVector, directionScratch$1);
      var moveVector = cesium.Cartesian3.subtract(pickedPoint, origin, moveScratch$1);
      moveVector = cesium.Cartesian3.projectVector(moveVector, directionVector, moveVector);
      var offset = cesium.Cartesian3.projectVector(this._offsetVector, directionVector, offsetProjectedScratch);
      moveVector = cesium.Cartesian3.subtract(moveVector, offset, moveVector);

      origin = cesium.Cartesian3.add(origin, moveVector, origin);
      this._setPositionCallback(origin);
  };

  TranslationEditor.prototype.handleLeftUp = function() {
      this._dragging = false;
      this._scene.screenSpaceCameraController.enableInputs = true;
  };

  TranslationEditor.prototype.isDestroyed = function() {
      return false;
  };

  TranslationEditor.prototype.destroy = function() {
      this.active = false;
      var scene = this._scene;
      scene.primitives.remove(this._polylineX);
      scene.primitives.remove(this._polylineY);
      scene.primitives.remove(this._polylineZ);
      cesium.destroyObject(this);
  };

  var widgetPosition = new cesium.Cartesian3();
      var screenPosition = new cesium.Cartesian2();

      var noScale$3 = new cesium.Cartesian3(1.0, 1.0, 1.0);
      var transformScratch = new cesium.Matrix4();
      var vectorScratch = new cesium.Cartesian3();
      var scaleScratch$1 = new cesium.Cartesian3();

      var EditorMode = {
          TRANSLATION : 'translation',
          ROTATION : 'rotation',
          SCALE : 'scale'
      };

      var setHprQuaternion = new cesium.Quaternion();
      var setHprQuaternion2 = new cesium.Quaternion();
      var setHprTranslation = new cesium.Cartesian3();
      var setHprScale = new cesium.Cartesian3();
      var setHprCenter = new cesium.Cartesian3();
      var setHprTransform = new cesium.Matrix4();
      var setHprRotation = new cesium.Matrix3();

      function setHeadingPitchRoll(transform, headingPitchRoll) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('transform', transform);
          cesium.Check.defined('headingPitchRoll', headingPitchRoll);
          //>>includeEnd('debug');

          var rotationQuaternion = cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, setHprQuaternion);
          var translation = cesium.Matrix4.getTranslation(transform, setHprTranslation);
          var scale = cesium.Matrix4.getScale(transform, setHprScale);
          var center = cesium.Matrix4.multiplyByPoint(transform, cesium.Cartesian3.ZERO, setHprCenter);
          var backTransform = cesium.Transforms.eastNorthUpToFixedFrame(center, undefined, setHprTransform);

          var rotationFixed = cesium.Matrix4.getMatrix3(backTransform, setHprRotation);
          var quaternionFixed = cesium.Quaternion.fromRotationMatrix(rotationFixed, setHprQuaternion2);
          var rotation = cesium.Quaternion.multiply(quaternionFixed, rotationQuaternion, rotationFixed);

          return cesium.Matrix4.fromTranslationQuaternionRotationScale(translation, rotation, scale, transform);
      }

      /**
       * Creates an interactive transform editor
       * @alias TransformEditorViewModel
       * @ionsdk
       * @constructor
       *
       * @param {Object} options An object with the following properties
       * @param {Scene} options.scene The scene
       * @param {Matrix4} options.transform The transform of the primitive that needs positioning
       * @param {BoundingSphere} options.boundingSphere The bounding sphere of the primitive that needs positioning
       * @param {Cartesian3} [options.originOffset] A offset vector (in local coordinates) from the origin as defined by the transform translation.
       */
      function TransformEditorViewModel(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.scene', options.scene);
          cesium.Check.defined('options.transform', options.transform);
          cesium.Check.defined('options.boundingSphere', options.boundingSphere);
          //>>includeEnd('debug');

          var scene = options.scene;
          var transform = options.transform;
          var boundingSphere = options.boundingSphere.clone();

          var originOffset = cesium.defaultValue(options.originOffset, cesium.Cartesian3.ZERO);

          var position = cesium.Matrix4.getTranslation(transform, new cesium.Cartesian3());
          var headingPitchRoll = cesium.Transforms.fixedFrameToHeadingPitchRoll(transform, scene.mapProjection.ellipsoid, undefined, new cesium.HeadingPitchRoll());
          var scale = cesium.Matrix4.getScale(transform, new cesium.Cartesian3());

          if (cesium.Cartesian3.equalsEpsilon(position, cesium.Cartesian3.ZERO, cesium.Math.EPSILON10)){
              position = cesium.Cartesian3.fromDegrees(0, 0, 0, scene.mapProjection.ellipsoid, position);
              transform = cesium.Matrix4.setTranslation(transform, position, transform);
              setHeadingPitchRoll(transform, headingPitchRoll);
          }

          var nonUniformScaling = true;
          if (cesium.Math.equalsEpsilon(scale.x, scale.y, cesium.Math.EPSILON10) && cesium.Math.equalsEpsilon(scale.x, scale.z, cesium.Math.EPSILON10)) {
              nonUniformScaling = false;
              scale.y = scale.x;
              scale.z = scale.x;
          }

          var initialRadius = boundingSphere.radius / cesium.Cartesian3.maximumComponent(scale);

          /**
           * Gets and sets the selected interactive mode.
           * @type {EditorMode}
           */
          this.editorMode = undefined;
          var editorMode = cesium.knockout.observable();
          cesium.knockout.defineProperty(this, 'editorMode', {
              get : function() {
                  return editorMode();
              },
              set : function(value) {
                  editorMode(value);
                  if (cesium.defined(this._activeEditor)) {
                      this._activeEditor.active = false;
                  }
                  var activeEditor;
                  if (value === EditorMode.ROTATION) {
                      activeEditor = this._rotationEditor;
                  } else if (value === EditorMode.TRANSLATION) {
                      activeEditor = this._translationEditor;
                  } else if (value === EditorMode.SCALE) {
                      activeEditor = this._scaleEditor;
                  }
                  activeEditor.update();
                  activeEditor.active = true;
                  this._activeEditor = activeEditor;
              }
          });

          /**
           * Gets and sets whether non-uniform scaling is enabled
           * @type {Boolean}
           */
          this.enableNonUniformScaling = nonUniformScaling;
          var enableNonUniformScaling = cesium.knockout.observable(this.enableNonUniformScaling);
          cesium.knockout.defineProperty(this, 'enableNonUniformScaling', {
              get : function() {
                  return enableNonUniformScaling();
              },
              set : function(value) {
                  if (value === enableNonUniformScaling()) {
                      return;
                  }
                  enableNonUniformScaling(value);
                  if (!value) {
                      this.scale = new cesium.Cartesian3(scale.x, scale.x, scale.x);
                      if (scene.requestRenderMode) {
                          scene.requestRender();
                      }
                  }
              }
          });

          /**
           * Gets and sets the position
           * @type {Cartesian3}
           */
          this.position = position;
          var positionObservable = cesium.knockout.observable(this.position);
          cesium.knockout.defineProperty(this, 'position', {
              get : function() {
                  return positionObservable();
              },
              set : function(value) {
                  if (cesium.Cartesian3.equals(value, this.position)) {
                      return;
                  }
                  var position = cesium.Cartesian3.clone(value, this.position);
                  positionObservable(position);
                  var transform = this._transform;
                  transform = cesium.Matrix4.setTranslation(transform, position, transform);
                  setHeadingPitchRoll(transform, this.headingPitchRoll);
                  if (scene.requestRenderMode) {
                      scene.requestRender();
                  }

                  // custom gw code

                  var carto = Cesium.Cartographic.fromCartesian(value);

                  var longitude = Cesium.Math.toDegrees(carto.longitude);
                  var latitude = Cesium.Math.toDegrees(carto.latitude);

                  $('#tileset_longitude').val(longitude);
                  $('#tileset_latitude').val(latitude);
                  $('#tileset_altitude').val(carto.height);
              }
          });

          /**
           * Gets and sets the heading pitch roll
           * @type {HeadingPitchRoll}
           */
          this.headingPitchRoll = headingPitchRoll;
          var headingPitchRollObservable = cesium.knockout.observable(this.headingPitchRoll);
          cesium.knockout.defineProperty(this, 'headingPitchRoll', {
              get : function() {
                  return headingPitchRollObservable();
              },
              set : function(value) {
                  if (cesium.HeadingPitchRoll.equals(value, this.headingPitchRoll)) {
                      return;
                  }
                  var hpr = cesium.HeadingPitchRoll.clone(value, this.headingPitchRoll);
                  headingPitchRollObservable(hpr);
                  setHeadingPitchRoll(this._transform, hpr);
                  if (scene.requestRenderMode) {
                      scene.requestRender();
                  }
              }
          });

          /**
           * Gets and sets the scale
           * @type {Cartesian3}
           */
          this.scale = scale;
          var scaleObservable = cesium.knockout.observable(this.scale);
          cesium.knockout.defineProperty(this, 'scale', {
              get : function() {
                  return scaleObservable();
              },
              set : function(value) {
                  if (cesium.Cartesian3.equals(value, this.scale)) {
                      return;
                  }
                  var scale = cesium.Cartesian3.clone(value, this.scale);
                  scaleObservable(scale);
                  cesium.Matrix4.setScale(this._transform, scale, this._transform);
                  this._translationEditor.update(); //applies the scale to the editing primitives
                  this._rotationEditor.update();
                  if (scene.requestRenderMode) {
                      scene.requestRender();
                  }
              }
          });

          /**
           * Gets and sets whether the menu is expanded
           * @type {Boolean}
           */
          this.menuExpanded = false;

          /**
           * Gets the x screen coordinate of the widget menu
           * @type {String}
           * @readonly
           */
          this.left = '0';

          /**
           * Gets the y screen coordinate of the widget menu
           * @type {String}
           * @readonly
           */
          this.top = '0';

          /**
           * Gets whether the widget is active.  Use the activate and deactivate functions to set this value.
           * @type {Boolean}
           * @readonly
           */
          this.active = false;

          cesium.knockout.track(this, ['menuExpanded', 'left', 'top', 'active']);

          var that = this;
          this._rotationEditor = new RotationEditor({
              scene : scene,
              transform : transform,
              radius : initialRadius,
              originOffset : originOffset,
              setPosition : function(value) {
                  that.position = value;
              },
              setHeadingPitchRoll : function(value) {
                  that.headingPitchRoll = value;
              }
          });
          this._translationEditor = new TranslationEditor({
              scene : scene,
              transform : transform,
              radius : initialRadius,
              originOffset : originOffset,
              setPosition : function(value) {
                  that.position = value;
              }
          });
          this._scaleEditor = new ScaleEditor({
              scene : scene,
              transform : transform,
              enableNonUniformScaling : enableNonUniformScaling,
              radius : initialRadius,
              originOffset : originOffset,
              setScale : function(value) {
                  that.scale = value;
              },
              setPosition : function(value) {
                  that.position = value;
              }
          });

          this._sseh = new cesium.ScreenSpaceEventHandler(scene.canvas);
          this._scene = scene;
          this._transform = transform;
          this._boundingSphere = boundingSphere;
          this._active = false;
          this._activeEditor = undefined;
          this._originOffset = originOffset;

          this.position = position;
          this.headingPitchRoll = headingPitchRoll;
          this.scale = scale;

          this._removePostUpdateEvent = this._scene.preUpdate.addEventListener(TransformEditorViewModel.prototype._update, this);
      }

      cesium.defineProperties(TransformEditorViewModel.prototype, {
          /**
           * Gets and sets the offset of the transform editor UI components from the origin as defined by the transform
           * @type {Cartesian3}
           * @memberof TransformEditorViewModel
           */
          originOffset : {
              get : function() {
                  return this._originOffset;
              },
              set : function(value) {
                  //>>includeStart('debug', pragmas.debug);
                  cesium.Check.defined('value', value);
                  //>>includeEnd('debug');
                  this._originOffset = value;

                  this._translationEditor.originOffset = value;
                  this._rotationEditor.originOffset = value;
                  this._scaleEditor.originOffset = value;
              }
          }
      });

      /**
       * Sets the originOffset based on the Cartesian3 position in world coordinates
       * @param {Cartesian3} position
       */
      TransformEditorViewModel.prototype.setOriginPosition = function(position) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('position', position);
          //>>includeEnd('debug');
          var transform = cesium.Matrix4.setScale(this._transform, noScale$3, transformScratch);
          var worldToLocalCoordinates = cesium.Matrix4.inverseTransformation(transform, transform);
          var point = cesium.Matrix4.multiplyByPoint(worldToLocalCoordinates, position, vectorScratch);
          var offset = cesium.Cartesian3.divideComponents(point, cesium.Matrix4.getScale(this._transform, scaleScratch$1), point);

          this.originOffset = offset;
      };

      /**
       * Activates the widget by showing the primitives and enabling mouse handlers
       */
      TransformEditorViewModel.prototype.activate = function() {
          var sseh = this._sseh;
          var scene = this._scene;

          sseh.setInputAction(this._leftDown.bind(this), cesium.ScreenSpaceEventType.LEFT_DOWN);
          sseh.setInputAction(this._leftUp.bind(this), cesium.ScreenSpaceEventType.LEFT_UP);
          sseh.setInputAction(this._mouseMove.bind(this), cesium.ScreenSpaceEventType.MOUSE_MOVE);
          this.active = true;
          if (cesium.defined(this._activeEditor)) {
              this._activeEditor.active = true;
          } else {
              this.setModeTranslation();
          }
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * Deactivates the widget by disabling mouse handlers and hiding the primitives
       */
      TransformEditorViewModel.prototype.deactivate = function() {
          var sseh = this._sseh;
          var scene = this._scene;

          sseh.removeInputAction(this._leftDown.bind(this), cesium.ScreenSpaceEventType.LEFT_DOWN);
          sseh.removeInputAction(this._leftUp.bind(this), cesium.ScreenSpaceEventType.LEFT_UP);
          sseh.removeInputAction(this._mouseMove.bind(this), cesium.ScreenSpaceEventType.MOUSE_MOVE);
          this.active = false;
          if (cesium.defined(this._activeEditor)) {
              this._activeEditor.active = false;
          }
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * Expands the widget menu
       */
      TransformEditorViewModel.prototype.expandMenu = function() {
          this.menuExpanded = true;
      };

      /**
       * Activates the translation interactive mode
       */
      TransformEditorViewModel.prototype.setModeTranslation = function() {
          this.editorMode = EditorMode.TRANSLATION;
          this.menuExpanded = false;
      };

      /**
       * Activates the rotation interactive mode
       */
      TransformEditorViewModel.prototype.setModeRotation = function() {
          this.editorMode = EditorMode.ROTATION;
          this.menuExpanded = false;
      };

      /**
       * Activates the scale interactive mode
       */
      TransformEditorViewModel.prototype.setModeScale = function() {
          this.editorMode = EditorMode.SCALE;
          this.menuExpanded = false;
      };

      /**
       * Toggles whether non-uniform scaling is enabled
       */
      TransformEditorViewModel.prototype.toggleNonUniformScaling = function() {
          this.enableNonUniformScaling = !this.enableNonUniformScaling;
      };

      /**
       * @private
       */
      TransformEditorViewModel.prototype._leftDown = function(click) {
          this._activeEditor.handleLeftDown(click.position);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @private
       */
      TransformEditorViewModel.prototype._mouseMove = function(movement) {
          this._activeEditor.handleMouseMove(movement.endPosition);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }

      };

      /**
       * @private
       */
      TransformEditorViewModel.prototype._leftUp = function(click) {
          this.menuExpanded = false;
          this._activeEditor.handleLeftUp(click.position);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }

      };

      /**
       * Updates the active editor
       * @private
       */
      TransformEditorViewModel.prototype._update = function() {
          if (!this.active) {
              return;
          }
          this._activeEditor.update();
          var scene = this._scene;
          var position = getWidgetOrigin(this._transform, this._originOffset, widgetPosition);
          var newPos = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position, screenPosition);
          if (cesium.defined(newPos)) {
              this.left = Math.floor(newPos.x - 13) + 'px';
              this.top = Math.floor(newPos.y) + 'px';
          }
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      TransformEditorViewModel.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the view model.
       */
      TransformEditorViewModel.prototype.destroy = function() {
          this.deactivate();
          this._sseh.destroy();
          this._rotationEditor.destroy();
          this._translationEditor.destroy();
          this._scaleEditor.destroy();
          this._removePostUpdateEvent();
          cesium.destroyObject(this);
      };

      TransformEditorViewModel.EditorMode = EditorMode;

  /**
       * Creates a DOM Node from a String containing HTML
       *
       * @param {String} html The html string
       * @ionsdk
       *
       * @private
       */
      function createDomNode(html) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.typeOf.string('html', html);
          //>>includeEnd('debug');

          var div = document.createElement('div');
          div.innerHTML = html;

          if (div.children.length === 1) {
              return div.removeChild(div.firstChild);
          }

          return div;
      }

  /**
       * If element is a string, look up the element in the DOM by ID.  Otherwise return element.
       *
       * @private
       *
       * @exception {DeveloperError} Element with id "id" does not exist in the document.
       */
      function getElement(element) {
          if (typeof element === 'string') {
              var foundElement = document.getElementById(element);

              //>>includeStart('debug', pragmas.debug);
              if (foundElement === null) {
                  throw new cesium.DeveloperError('Element with id "' + element + '" does not exist in the document.');
              }
              //>>includeEnd('debug');

              element = foundElement;
          }
          return element;
      }

  var html = '<div class="transform-editor-menu" data-bind="style: {left: left, top: top}, visible: active">\
        <div class="cesium-button transform-editor-button" data-bind="click: expandMenu, visible: !menuExpanded">\
            <svg width="20" height="20" viewBox="0 0 20 20">\
                <g>\
                    <circle cx="2" cy="10" r="2" />\
                    <circle cx="10" cy="10" r="2" />\
                    <circle cx="18" cy="10" r="2" />\
                </g>\
            </svg>\
        </div>\
        <div class="transform-editor-options" data-bind="visible: menuExpanded">\
            <div class="transform-editor-button-row">\
                <div title="Translation" data-bind="click: setModeTranslation, css: {selected: editorMode === \'translation\'}">\
                    <svg viewBox="0 0 25 25" height="25" width="25">\
                        <g>\
                            <circle r="3" cy="22" cx="3" />\
                            <path d="M 19.543379,4.59439 3.9750205,19.96158 5.3793174,21.3854 20.947676,6.01822 Z"/>\
                            <path d="m 14.699824,3.80366 10.231411,-3.34922 -3.215586,10.03096 z"/>\
                        </g>\
                    </svg>\
                </div\
                ><div title="Rotation" data-bind="click: setModeRotation, css: {selected: editorMode === \'rotation\'}">\
                    <svg viewBox="0 0 25 25" height="25" width="25">\
                        <g>\
                            <path d="M 13.033371,10.08295 2.6713568,7.16272 10.931013,0.62527 Z"/>\
                            <path d="m 13.741358,3.87055 c -0.747592,-0.006 -1.506137,0.0593 -2.263621,0.20287 l 0.484334,2.29127 c 4.712769,-0.89305 9.471467,2.11386 10.414021,6.57912 0.942553,4.46525 -2.229345,8.97402 -6.942115,9.86707 -4.71277,0.89305 -9.4731664,-2.11226 -10.4157205,-6.57752 l -2.4165696,0.45729 c 1.2119755,5.74161 7.2550484,9.55981 13.3149241,8.41149 6.059877,-1.14833 10.089725,-6.87562 8.87775,-12.61723 -1.060479,-5.02391 -5.819851,-8.57436 -11.053003,-8.61436 z"/>\
                        </g>\
                    </svg>\
               </div>\
            </div>\
            <div class="transform-editor-button-row">\
                <div title="Scale" data-bind="click: setModeScale, css: {selected: editorMode === \'scale\'}">\
                    <svg width="25" height="25" viewBox="0 0 25 25">\
                        <g>\
                            <path d="M 19.543379,4.59439 3.9750205,19.96158 5.3793174,21.3854 20.947676,6.01822 Z"/>\
                            <path d="m 14.699824,3.80366 10.231411,-3.34922 -3.215586,10.03096 z" />\
                            <path d="M 10.333866,21.9809 0.10245523,25.33012 3.3180412,15.29916 Z" />\
                        </g>\
                    </svg>\
                </div\
                ><div data-bind="click: toggleNonUniformScaling">\
                    <div title="Switch to non-uniform scaling" data-bind="visible: !enableNonUniformScaling">\
                        <svg width="25" height="25" viewBox="0 0 25 25">\
                            <g>\
                                <path d="m 0.5,1.38477 h 1.9960938 v -1 H 0.5 c 0,0.33333 0,0.66667 0,1 z m 2.9941406,0 h 1.9980469 v -1 H 3.4941406 Z m 2.9960938,0 h 1.9960937 v -1 H 6.4902344 Z m 2.9960937,0 h 1.9960939 v -1 H 9.4863281 Z m 2.9941409,0 h 1.998047 v -1 h -1.998047 z m 2.996093,0 h 1.996094 v -1 h -1.996094 z m 2.994141,0 h 1.998047 v -1 h -1.998047 z m 2.996094,0 h 1.998047 v -1 h -1.998047 z m 2.535156,-0.5 v 1.95898 H 25 v -1.95898 z M 0,4.0332 h 0.99804688 v -1.99609 H 0 Z m 24.001953,1.80469 H 25 V 3.8418 H 24.001953 Z M 0,7.0293 h 0.99804688 v -1.99805 H 0 Z m 24.001953,1.80468 H 25 v -1.99609 H 24.001953 Z M 0,10.02344 h 0.99804688 v -1.9961 H 0 Z m 24.001953,1.80664 H 25 v -1.99805 H 24.001953 Z M 0,13.01953 h 0.99804688 v -1.99609 H 0 Z m 24.001953,1.80469 H 25 v -1.9961 H 24.001953 Z M 0,16.01562 h 0.99804688 v -1.99804 H 0 Z m 24.001953,1.80469 H 25 v -1.99804 H 24.001953 Z M 0,19.00977 h 0.99804688 v -1.9961 H 0 Z m 24.001953,1.80664 H 25 v -1.99805 H 24.001953 Z M 0,22.00586 h 0.99804688 v -1.99609 H 0 Z m 24.001953,1.80469 H 25 v -1.9961 H 24.001953 Z M 0,24.88672 v 0.49805 h 0.5 0.11523438 v -0.49805 h 0.3828125 v -1.88281 H 0 Z m 1.6132812,0.49805 H 3.609375 v -0.99805 H 1.6132812 Z m 2.9941407,0 h 1.9980469 v -0.99805 H 4.6074219 Z m 2.9960937,0 h 1.9980469 v -0.99805 H 7.6035156 Z m 2.9960934,0 h 1.996094 v -0.99805 h -1.996094 z m 2.994141,0 h 1.998047 v -0.99805 H 13.59375 Z m 2.996094,0 h 1.996094 v -0.99805 h -1.996094 z m 2.996094,0 h 1.996093 v -0.99805 h -1.996093 z m 2.99414,0 H 24.5 25 v -0.49805 -0.0781 h -0.5 v -0.42187 h -1.919922 z" />\
                                <path d="m 0,10.38477 v 1.02343 13.97657 h 15 v -15 z m 2.0449219,2.04492 H 12.955078 V 23.3418 H 2.0449219 Z"/>\
                                <g>\
                                    <path d="m 21.158203,3.81836 0.355469,0.35156 0.351562,-0.35547 -0.353515,-0.35156 z m -0.703125,0.70898 0.355469,0.35157 0.351562,-0.35352 -0.355468,-0.35351 z m -0.705078,0.71094 0.355469,0.35156 0.351562,-0.35546 -0.353515,-0.35157 z m -0.703125,0.70899 0.355469,0.35351 0.351562,-0.35547 -0.355468,-0.35156 z m -0.705078,0.71093 0.355469,0.35157 0.353515,-0.35547 -0.355469,-0.35157 z m -0.703125,0.71094 0.355469,0.35156 0.351562,-0.35547 -0.355469,-0.35156 z m -0.703125,0.70898 0.353515,0.35157 0.353516,-0.35352 -0.355469,-0.35351 z m -0.705078,0.71094 0.355469,0.35156 0.351562,-0.35546 -0.355469,-0.35157 z m -0.703125,0.70899 0.353515,0.35351 0.353516,-0.35547 -0.355469,-0.35351 z m -0.705078,0.71093 0.355468,0.35157 0.351563,-0.35547 -0.355469,-0.35156 z"/>\
                                    <path d="m 23.382049,1.93037 -1.015775,3.8652 -2.840556,-2.81624 z"/>\
                                </g>\
                            </g>\
                        </svg>\
                    </div>\
                    <div title="Switch to uniform scaling" data-bind="visible: enableNonUniformScaling">\
                        <svg width="25" height="25" viewBox="0 0 25 25">\
                            <g>\
                                <path d="M 0.49414062,10.87891 H 0 v 1.95117 h 0.98828125 v -1.45703 H 2.4707031 v -0.98828 H 0.49414062 Z m 2.96289058,0.49414 h 1.9765626 v -0.98828 H 3.4570312 Z m 2.9648438,0 h 1.9765625 v -0.98828 H 6.421875 Z m 2.9628906,0 h 1.9765624 v -0.98828 H 9.3847656 Z m 2.9648434,0 h 1.976563 v -0.98828 h -1.976563 z m 2.964844,0 h 1.974609 v -0.98828 h -1.974609 z m 2.962891,0 h 1.976562 v -0.98828 h -1.976562 z m 2.964844,0 h 1.974609 v -0.98828 h -1.974609 z m 2.96289,-0.49414 h -0.193359 v 1.67578 H 25 v -1.67578 -0.49414 h -0.494141 -0.300781 z m -0.193359,4.63867 H 25 v -1.97461 H 24.011719 Z M 0,15.79297 h 0.98828125 v -1.97461 H 0 Z m 24.011719,2.68945 H 25 v -1.97656 H 24.011719 Z M 0,18.75781 h 0.98828125 v -1.97656 H 0 Z m 24.011719,2.6875 H 25 V 19.4707 H 24.011719 Z M 0,21.7207 h 0.98828125 v -1.97461 H 0 Z m 24.011719,2.68946 H 25 v -1.97657 H 24.011719 Z M 0,24.68555 h 0.98828125 v -1.97657 H 0 Z m 1.2753906,0.69922 h 1.9765625 v -0.98829 H 1.2753906 Z m 2.9648438,0 h 1.9765625 v -0.98829 H 4.2402344 Z m 2.9628906,0 h 1.9765625 v -0.98829 H 7.203125 Z m 2.964844,0 h 1.976562 v -0.98829 h -1.976562 z m 2.96289,0 h 1.976563 v -0.98829 h -1.976563 z m 2.964844,0 h 1.976563 v -0.98829 h -1.976563 z m 2.962891,0 h 1.976562 v -0.98829 h -1.976562 z m 2.964844,0 H 24 v -0.98829 h -1.976562 z"/>\
                                <path d="m 0,10.38477 v 1.02343 13.97657 h 15 v -15 z m 2.0449219,2.04492 H 12.955078 V 23.3418 H 2.0449219 Z"/>\
                                <g>\
                                    <path d="m 22.251953,18.26172 h 0.179688 l -0.0039,-0.5 h -0.179687 z m -1.003906,-0.49024 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z m -1,0.008 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z m -1,0.01 0.0039,0.5 0.5,-0.006 -0.0039,-0.5 z m -1,0.008 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z m -1,0.008 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z m -1,0.01 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z m -1,0.008 0.0039,0.5 0.5,-0.004 -0.0039,-0.5 z"/>\
                                    <path d="m 23.885095,18.00809 -2.030696,1.17348 -0.02037,-2.31243 z"/>\
                                </g>\
                            </g>\
                        </svg>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';

      /**
       * A tool for editing the transform of an object
       * @alias TransformEditor
       * @ionsdk
       * @constructor
       *
       * @param {Object} options An object with the following properties
       * @param {Element} options.container
       * @param {Scene} options.scene The scene
       * @param {Matrix4} options.transform The initial transform of the primitive that needs positioning
       * @param {BoundingSphere} options.boundingSphere The bounding sphere of the primitive that needs positioning
       */
      function TransformEditor(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.container', options.container);
          cesium.Check.defined('options.scene', options.scene);
          cesium.Check.defined('options.transform', options.transform);
          cesium.Check.defined('options.boundingSphere', options.boundingSphere);
          //>>includeEnd('debug');

          var container = getElement(options.container);

          var element = createDomNode(html);
          container.appendChild(element);

          var viewModel = new TransformEditorViewModel(options);

          cesium.knockout.applyBindings(viewModel, element);

          this._viewModel = viewModel;
          this._element = element;
          this._container =  container;
      }

      cesium.defineProperties(TransformEditor.prototype, {
          /**
           * Gets the parent container.
           * @memberof TransformEditor.prototype
           * @type {Element}
           * @readonly
           */
          container : {
              get : function() {
                  return this._container;
              }
          },

          /**
           * Gets the view model.
           * @memberof TransformEditor.prototype
           * @type {TransformEditorViewModel}
           * @readonly
           */
          viewModel : {
              get : function() {
                  return this._viewModel;
              }
          }
      });

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      TransformEditor.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the widget.  Should be called if permanently
       * removing the widget from layout.
       */
      TransformEditor.prototype.destroy = function() {
          cesium.knockout.cleanNode(this._element);
          this._container.removeChild(this._element);
          this._viewModel.destroy();

          return cesium.destroyObject(this);
      };

  /**
       * An abstract class defining a measurement.
       * @alias Measurement
       * @ionsdk
       *
       * @param {Object} options An object with the following properties:
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} options.units The selected units of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PrimitiveCollection} options.primitives A collection in which to store the measurement primitives
       * @param {LabelCollection} options.labels A collection in which to add the labels
       * @param {PointPrimitiveCollection} options.points A collection in which to add points
       *
       * @constructor
       */
      function Measurement(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.scene', options.scene);
          cesium.Check.defined('options.units', options.units);
          cesium.Check.defined('options.points', options.points);
          cesium.Check.defined('options.labels', options.labels);
          cesium.Check.defined('options.primitives', options.primitives);
          //>>includeEnd('debug');

          this._labelCollection = options.labels;
          this._pointCollection = options.points;
          this._primitives = options.primitives;
          this._selectedUnits = options.units;
          this._selectedLocale = options.locale;
          this._scene = options.scene;
      }

      cesium.defineProperties(Measurement.prototype, {
          /**
           * Gets the icon.
           * @type {String}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          icon : {
              value : ''
          },
          /**
           * Gets the thumbnail.
           * @type {String}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          thumbnail : {
              value : ''
          },
          /**
           * Gets the type.
           * @type {String}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          type : {
              value : ''
          },
          /**
           * Gets the instruction text.
           * @type {String[]}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          instructions : {
              value : []
          },
          /**
           * Gets the id.
           * @type {String}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          id : {
              value : ''
          }
      });

      /**
       * Handles double click events while performing a measurement.
       */
      Measurement.prototype.handleDoubleClick = function() {};

      /**
       * Handles click events while performing a measurement.
       * @param {Cartesian2} clickPosition The click position
       */
      Measurement.prototype.handleClick = function(clickPosition) {};

      /**
       * Handles mouse move events while performing a measurement.
       * @param {Cartesian2} mousePosition The mouse position
       */
      Measurement.prototype.handleMouseMove = function(mousePosition) {};

      /**
       * Handles left down mouse events while performing a measurement.
       * @param {Cartesian2} mousePosition The mouse position
       */
      Measurement.prototype.handleLeftDown = function(mousePosition) {};

      /**
       * Handles left up mouse events while performing a measurement.
       * @param {Cartesian2} mousePosition The mouse position
       */
      Measurement.prototype.handleLeftUp = function(mousePosition) {};

      /**
       * Resets the widget.
       */
      Measurement.prototype.reset = cesium.DeveloperError.throwInstantiationError;

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      Measurement.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the widget.
       */
      Measurement.prototype.destroy = cesium.DeveloperError.throwInstantiationError;

  /**
       * @private
       * @ionsdk
       */
      var DrawingMode = {
          BeforeDraw : 0,
          Drawing : 1,
          AfterDraw : 2
      };
  var DrawingMode$1 = cesium.freezeObject(DrawingMode);

  /**
       * @private
       * @ionsdk
       */
      function PolygonPrimitive(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          this.show = cesium.defaultValue(options.show, true);
          var color = cesium.Color.clone(cesium.defaultValue(options.color, cesium.Color.WHITE));
          this._id = cesium.createGuid();
          this._color = color;
          this._depthFailColor = color;
          this._positions = [];

          this._boundingSphere = new cesium.BoundingSphere();
          this._primitive = undefined;
          this._update = true;
      }

      cesium.defineProperties(PolygonPrimitive.prototype, {
          positions : {
              get : function() {
                  return this._positions;
              },
              set : function(positions) {
                  this._positions = positions;
                  this._update = true;
              }
          },
          color : {
              get : function() {
                  return this._color;
              }
          },
          boundingVolume : {
              get : function() {
                  return this._boundingSphere;
              }
          }
      });

      PolygonPrimitive.prototype.update = function(frameState) {
          if (!this.show) {
              return;
          }

          var positions = this._positions;
          if (positions.length < 3) {
              this._primitive = this._primitive && this._primitive.destroy();
              return;
          }

          if (this._update) {
              this._update = false;

              this._primitive = this._primitive && this._primitive.destroy();
              var geometry = cesium.CoplanarPolygonGeometry.fromPositions({
                  positions : positions,
                  vertexFormat : cesium.PerInstanceColorAppearance.FLAT_VERTEX_FORMAT
              });
              this._primitive = new cesium.Primitive({
                  geometryInstances : new cesium.GeometryInstance({
                      geometry : geometry,
                      attributes : {
                          color : cesium.ColorGeometryInstanceAttribute.fromColor(this._color),
                          depthFailColor : cesium.ColorGeometryInstanceAttribute.fromColor(this._depthFailColor)
                      },
                      id : this._id
                  }),
                  appearance : new cesium.PerInstanceColorAppearance({
                      flat : true,
                      closed : false,
                      translucent : this._color.alpha < 1.0
                  }),
                  depthFailAppearance : new cesium.PerInstanceColorAppearance({
                      flat : true,
                      closed : false,
                      translucent : this._depthFailColor.alpha < 1.0
                  }),
                  allowPicking : false,
                  asynchronous : false
              });
              this._boundingSphere = cesium.BoundingSphere.fromPoints(positions, this._boundingSphere);
          }

          this._primitive.update(frameState);
      };

      PolygonPrimitive.prototype.isDestroyed = function() {
          return false;
      };

      PolygonPrimitive.prototype.destroy = function() {
          this._primitive = this._primitive && this._primitive.destroy();
          return cesium.destroyObject(this);
      };

  /**
       * @private
       * @ionsdk
       */
      function PolylinePrimitive(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          this.show = cesium.defaultValue(options.show, true);

          this._ellipsoid = cesium.defaultValue(options.ellipsoid, cesium.Ellipsoid.WGS84);
          this._width = cesium.defaultValue(options.width, 3);
          this._color = cesium.Color.clone(cesium.defaultValue(options.color, cesium.Color.WHITE));
          this._id = cesium.createGuid();
          this._positions = cesium.defaultValue(options.positions, []);
          this._primitive = undefined;
          this._boundingSphere = new cesium.BoundingSphere();
          this._dashed = cesium.defaultValue(options.dashed, false);
          this._loop = cesium.defaultValue(options.loop, false);

          this._update = true;
      }

      cesium.defineProperties(PolylinePrimitive.prototype, {
          positions : {
              get : function() {
                  return this._positions;
              },
              set : function(positions) {
                  this._positions = positions;
                  this._update = true;
              }
          },
          color : {
              get : function() {
                  return this._color;
              }
          },
          boundingVolume : {
              get : function() {
                  return this._boundingSphere;
              }
          },
          width : {
              get : function() {
                  return this._width;
              }
          },
          ellipsoid : {
              get : function() {
                  return this._ellipsoid;
              }
          },
          dashed : {
              get : function() {
                  return this._dashed;
              }
          },
          loop : {
              get : function() {
                  return this._loop;
              }
          }
      });

      PolylinePrimitive.prototype.update = function(frameState) {
          if (!this.show) {
              return;
          }

          var positions = this._positions;
          if (!cesium.defined(positions) || positions.length < 2) {
              this._primitive = this._primitive && this._primitive.destroy();
              return;
          }

          if (this._update) {
              this._update = false;
              this._id = this.id;

              this._primitive = this._primitive && this._primitive.destroy();
              if (this._loop) {
                  positions = positions.slice();
                  positions.push(positions[0]);
              }
              var geometry = new cesium.PolylineGeometry({
                  positions : positions,
                  width : this.width,
                  vertexFormat : cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
                  ellipsoid : this._ellipsoid,
                  arcType : cesium.ArcType.NONE
              });

              var appearance1;
              if (this._dashed) {
                  appearance1 = new cesium.PolylineMaterialAppearance({
                      material : cesium.Material.fromType(cesium.Material.PolylineDashType, {
                          color : this._color
                      })
                  });
              } else {
                  appearance1 = new cesium.PolylineColorAppearance();
              }

              this._primitive = new cesium.Primitive({
                  geometryInstances : new cesium.GeometryInstance({
                      geometry : geometry,
                      attributes : {
                          color : cesium.ColorGeometryInstanceAttribute.fromColor(this._color),
                          depthFailColor : cesium.ColorGeometryInstanceAttribute.fromColor(this._color)
                      },
                      id : this.id
                  }),
                  appearance : appearance1,
                  depthFailAppearance : appearance1,
                  asynchronous : false,
                  allowPicking : false
              });
              this._boundingSphere = cesium.BoundingSphere.fromPoints(positions, this._boundingSphere);
          }

          this._primitive.update(frameState);
      };

      PolylinePrimitive.prototype.isDestroyed = function() {
          return false;
      };

      PolylinePrimitive.prototype.destroy = function() {
          this._primitive = this._primitive && this._primitive.destroy();
          return cesium.destroyObject(this);
      };

  function VisibilityState() {
          this.states = new cesium.ManagedArray();
          this.count = 0;
      }

      VisibilityState.prototype.hidePrimitiveCollection = function(primitiveCollection) {
          var primitivesLength = primitiveCollection.length;
          for (var i = 0; i < primitivesLength; ++i) {
              var primitive = primitiveCollection.get(i);
              if (primitive instanceof cesium.PrimitiveCollection) {
                  this.hidePrimitiveCollection(primitive);
                  continue;
              }

              this.states.push(primitive.show);

              if ((primitive instanceof cesium.Cesium3DTileset) || (primitive instanceof cesium.Model)) {
                  continue;
              }
              primitive.show = false;
          }
      };

      VisibilityState.prototype.restorePrimitiveCollection = function(primitiveCollection) {
          var primitivesLength = primitiveCollection.length;
          for (var i = 0; i < primitivesLength; ++i) {
              var primitive = primitiveCollection.get(i);
              if (primitive instanceof cesium.PrimitiveCollection) {
                  this.restorePrimitiveCollection(primitive);
                  continue;
              }

              primitive.show = this.states.get(this.count++);
          }
      };

      VisibilityState.prototype.hide = function(scene) {
          this.states.length = 0;

          this.hidePrimitiveCollection(scene.primitives);
          this.hidePrimitiveCollection(scene.groundPrimitives);
      };

      VisibilityState.prototype.restore = function(scene) {
          this.count = 0;

          this.restorePrimitiveCollection(scene.primitives);
          this.restorePrimitiveCollection(scene.groundPrimitives);
      };

  var cartesianScratch = new cesium.Cartesian3();
      var rayScratch$3 = new cesium.Ray();
      var visibilityState = new VisibilityState();

      /**
       * Computes the world position on either the terrain or tileset from a mouse position.
       *
       * @param {Scene} scene The scene
       * @ionsdk
       * @param {Cartesian2} mousePosition The mouse position
       * @param {Cartesian3} result The result position
       * @returns {Cartesian3} The position in world space
       */
      function getWorldPosition(scene, mousePosition, result) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('scene', scene);
          cesium.Check.defined('mousePosition', mousePosition);
          cesium.Check.defined('result', result);
          //>>includeEnd('debug');
          var position;
          if (scene.pickPositionSupported) {
              // Hide every primitive that isn't a tileset
              visibilityState.hide(scene);

              // Don't pick default 3x3, or scene.pick may allow a mousePosition that isn't on the tileset to pickPosition.
              var pickedObject = scene.pick(mousePosition, 1, 1);

              visibilityState.restore(scene);

              if (cesium.defined(pickedObject) && (pickedObject instanceof cesium.Cesium3DTileFeature || pickedObject.primitive instanceof cesium.Cesium3DTileset || pickedObject.primitive instanceof cesium.Model)) { // check to let us know if we should pick against the globe instead
                  position = scene.pickPosition(mousePosition, cartesianScratch);

                  if (cesium.defined(position)) {
                      return cesium.Cartesian3.clone(position, result);
                  }
              }
          }

          if (!cesium.defined(scene.globe)) {
              return;
          }

          var ray = scene.camera.getPickRay(mousePosition, rayScratch$3);
          position = scene.globe.pick(ray, scene, cartesianScratch);

          if (cesium.defined(position)) {
              return cesium.Cartesian3.clone(position, result);
          }
      }

  var clickDistanceScratch = new cesium.Cartesian2();
  var cart3Scratch = new cesium.Cartesian3();

  var mouseDelta = 10;

  /**
   * @private
   * @ionsdk
   */
  function PolygonDrawing(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('options.scene', options.scene);
      //>>includeEnd('debug');

      var scene = options.scene;
      var primitives = cesium.defaultValue(options.primitives, scene.primitives);
      var removePoints = false;
      var points = options.points;
      if (!cesium.defined(points)) {
          points = primitives.add(new cesium.PointPrimitiveCollection());
          removePoints = true;
      }

      this._polygon = primitives.add(new PolygonPrimitive(options.polygonOptions));
      this._polyline = primitives.add(new PolylinePrimitive(cesium.combine({
          loop : true
      }, options.polylineOptions)));
      this._pointOptions = options.pointOptions;
      this._pointCollection = points;
      this._removePoints = removePoints;
      this._scene = scene;
      this._primitives = primitives;
      this._positions = [];
      this._points = [];
      this._tempNextPos = new cesium.Cartesian3();
      this._mode = DrawingMode$1.BeforeDraw;
      this._lastClickPosition = new cesium.Cartesian2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      this._polygonOptions = options.polygonOptions;
      this._polylineOptions = options.polylineOptions;

  }

  /**
   * Adds a point to the polygon.
   * @param {Cartesian3} position The position to add
   * @private
   */
  PolygonDrawing.prototype.addPoint = function(position) {
      var positions = this._positions;
      positions.push(position);
      this._polyline.positions = positions;
      this._polygon.positions = positions;
      var point = this._pointCollection.add(this._pointOptions);
      point.position = position;
      point.show = true;
      this._points.push(point);
  };

  /**
   * Ends drawing on double click.
   */
  PolygonDrawing.prototype.handleDoubleClick = function() {
      // expect point to be added by handleClick
      this._mode = DrawingMode$1.AfterDraw;

      // Sometimes a move event is fired between the ending
      // click and doubleClick events, so make sure the polyline
      // and polygon have the correct positions.
      var positions = this._positions;
      this._polyline.positions = positions;
      this._polygon.positions = positions;
  };

  /**
   * Handles click events while drawing a polygon.
   * @param {Cartesian2} clickPosition The click position
   */
  PolygonDrawing.prototype.handleClick = function(clickPosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('clickPosition', clickPosition);
      //>>includeEnd('debug');

      if (this._mode === DrawingMode$1.AfterDraw) {
          return;
      }

      // Don't handle if clickPos is too close to previous click.
      // This typically indicates a double click handler will be fired next,
      // we don't expect the user to wait and click this point again.
      var lastClickPos = this._lastClickPosition;
      var distance = cesium.Cartesian2.magnitude(cesium.Cartesian2.subtract(lastClickPos, clickPosition, clickDistanceScratch));
      if (distance < mouseDelta) {
          return;
      }

      var position = PolygonDrawing._getWorldPosition(this._scene, clickPosition, cart3Scratch);
      if (!cesium.defined(position)) {
          return;
      }

      this.addPoint(cesium.Cartesian3.clone(position, new cesium.Cartesian3()));
      this._mode = DrawingMode$1.Drawing;

      cesium.Cartesian2.clone(clickPosition, lastClickPos);

      return position;
  };

  /**
   * Handles mouse move events while drawing a polygon.
   * @param {Cartesian2} mousePosition The mouse position
   */
  PolygonDrawing.prototype.handleMouseMove = function(mousePosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('mousePosition', mousePosition);
      //>>includeEnd('debug');

      if (this._mode !== DrawingMode$1.Drawing) {
          return;
      }
      var scene = this._scene;
      var nextPos = PolygonDrawing._getWorldPosition(scene, mousePosition, cart3Scratch);
      if (!cesium.defined(nextPos)) {
          return;
      }
      var positions = this._positions.slice();
      positions.push(cesium.Cartesian3.clone(nextPos, this._tempNextPos));
      this._polyline.positions = positions;
      this._polygon.positions = positions;

      return nextPos;
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  PolygonDrawing.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the widget.
   */
  PolygonDrawing.prototype.destroy = function() {
      var primitives = this._primitives;
      if (this._removePoints) {
          primitives.remove(this._points);
      } else {
          var points = this._points;
          var pointCollection = this._pointCollection;
          for (var i = 0; i < points.length; i++) {
              pointCollection.remove(points[i]);
          }
      }

      primitives.remove(this._polygon);
      primitives.remove(this._polyline);

      return cesium.destroyObject(this);
  };

  PolygonDrawing.prototype.newPolygon = function () {
      return this._primitives.add(new PolygonPrimitive(this._polygonOptions));
  };

  PolygonDrawing.prototype.newPolyline = function () {
      return this._primitives.add(new PolylinePrimitive(cesium.combine({
          loop : true
      }, this._polylineOptions)));
  };

  // Exposed for specs
  PolygonDrawing._getWorldPosition = getWorldPosition;

  var defaultLabelPixelOffset = new cesium.Cartesian2(0, -9);

      /**
       * Contains options for configuring the style of the measurement widget primitives.
       *
       * @exports MeasurementSettings
       * @ionsdk
       */
      var MeasurementSettings = {};

      /**
       * Gets and sets the color used for the measurement primitives.
       * @type {Color}
       * @default Color.YELLOW
       */
      MeasurementSettings.color = cesium.Color.YELLOW;

      /**
       * Gets and sets the font used for the measurement labels.
       * @type {string}
       * @default '24px sans-serif'
       */
      MeasurementSettings.labelFont = '16px Lucida Console';

      /**
       * Gets and sets the color used for the measurement labels.
       * @type {Color}
       * @default Color.WHITE
       */
      MeasurementSettings.textColor = cesium.Color.WHITE;

      /**
       * Gets and sets the background color used for the measurement labels.
       * @type {Color}
       * @default Cesium.Color(0.165, 0.165, 0.165, 0.8);
       */
      MeasurementSettings.backgroundColor = new cesium.Color(0.165, 0.165, 0.165, 0.8);

      /**
       * Gets and sets the background the horizontal and vertical background padding in pixels.
       * @type {Cartesian2}
       * @default Cesium.Cartesian2(7, 5);
       */
      MeasurementSettings.backgroundPadding = new cesium.Cartesian2(7, 5);

      /**
       * @private
       */
      MeasurementSettings.getPolylineOptions = function(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          return {
              show : options.show,
              ellipsoid : options.ellipsoid,
              width : cesium.defaultValue(options.width, 3),
              color : cesium.defaultValue(options.color, MeasurementSettings.color),
              depthFailColor : cesium.defaultValue(cesium.defaultValue(options.depthFailColor, options.color), MeasurementSettings.color),
              id : options.id,
              positions : options.positions,
              materialType : options.materialType,
              depthFailMaterialType : options.depthFailMaterialType,
              loop : options.loop,
              clampToGround : options.clampToGround,
              classificationType : options.classificationType,
              allowPicking : cesium.defaultValue(options.allowPicking, false)
          };
      };

      /**
       * @private
       */
      MeasurementSettings.getPolygonOptions = function(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          return {
              show : options.show,
              ellipsoid : options.ellipsoid,
              color : cesium.defaultValue(options.color, MeasurementSettings.color),
              depthFailColor : cesium.defaultValue(cesium.defaultValue(options.depthFailColor, options.color), MeasurementSettings.color),
              id : options.id,
              positions : options.positions,
              clampToGround : options.clampToGround,
              classificationType : options.classificationType,
              allowPicking : cesium.defaultValue(options.allowPicking, false)
          };
      };

      /**
       * @private
       */
      MeasurementSettings.getPointOptions = function() {
          return {
              pixelSize : 10,
              color : MeasurementSettings.color,
              position : new cesium.Cartesian3(),
              disableDepthTestDistance : Number.POSITIVE_INFINITY, // for draw-over
              show : false
          };
      };

      /**
       * @private
       */
      MeasurementSettings.getLabelOptions = function(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          return {
              show : false,
              font : MeasurementSettings.labelFont,
              scale : cesium.defaultValue(options.scale, 1.0),
              fillColor : cesium.defaultValue(options.fillColor, MeasurementSettings.textColor),
              showBackground : true,
              backgroundColor : cesium.defaultValue(options.backgroundColor, MeasurementSettings.backgroundColor),
              backgroundPadding : cesium.defaultValue(options.backgroundPadding, MeasurementSettings.backgroundPadding),
              horizontalOrigin : cesium.defaultValue(options.horizontalOrigin, cesium.HorizontalOrigin.CENTER),
              verticalOrigin : cesium.defaultValue(options.verticalOrigin, cesium.VerticalOrigin.BOTTOM),
              pixelOffset : cesium.defined(options.pixelOffset) ? options.pixelOffset : cesium.Cartesian2.clone(defaultLabelPixelOffset),
              disableDepthTestDistance : Number.POSITIVE_INFINITY, // for draw-over
              position : new cesium.Cartesian3()
          };
      };

  var cart2Scratch1 = new cesium.Cartesian2();
  var cart2Scratch2 = new cesium.Cartesian2();

  var p0Scratch = new cesium.Cartesian3();
  var p1Scratch = new cesium.Cartesian3();
  var p2Scratch = new cesium.Cartesian3();
  var v0Scratch = new cesium.Cartesian3();
  var v1Scratch = new cesium.Cartesian3();

  function triangleArea(p0, p1, p2) {
      var v0 = cesium.Cartesian3.subtract(p0, p1, v0Scratch);
      var v1 = cesium.Cartesian3.subtract(p2, p1, v1Scratch);
      var cross = cesium.Cartesian3.cross(v0, v1, v0);
      return cesium.Cartesian3.magnitude(cross) * 0.5;
  }

  /**
   * @private
   * @ionsdk
   */
  function AreaMeasurementDrawing(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('options.scene', options.scene);
      cesium.Check.defined('options.primitives', options.primitives);
      cesium.Check.defined('options.units', options.units);
      cesium.Check.defined('options.points', options.points);
      cesium.Check.defined('options.labels', options.labels);
      //>>includeEnd('debug');

      options.polylineOptions = MeasurementSettings.getPolylineOptions({
          ellipsoid : options.ellipsoid
      });
      options.pointOptions = MeasurementSettings.getPointOptions();
      options.polygonOptions = {
          color: MeasurementSettings.color.withAlpha(0.8)
      };
      PolygonDrawing.call(this, options);

      var labels = options.labels;
      this._labelCollection = labels;
      this._label = labels.add(MeasurementSettings.getLabelOptions());
      this._selectedUnits = options.units;
      this._selectedLocale = options.locale;
      this._area = 0;

      var that = this;
      this._removeEvent = this._scene.preRender.addEventListener(function() {
          that.updateLabel();
      });

      this._measurementResult = [];
  }

  AreaMeasurementDrawing.prototype = Object.create(PolygonDrawing.prototype);
  AreaMeasurementDrawing.prototype.constructor = AreaMeasurementDrawing;

  cesium.defineProperties(AreaMeasurementDrawing.prototype, {
      /**
       * Gets the area value in meters squared
       * @type {Number}
       * @memberof AreaMeasurementDrawing.prototype
       * @readonly
       */
      area : {
          get : function() {
              return this._area;
          }
      }
  });

  /**
   * Computes the area of the polygon.
   * @param {Cartesian3[]} positions An array of positions
   * @private
   */
  AreaMeasurementDrawing.prototype.updateArea = function(positions) {
      var geometry = cesium.CoplanarPolygonGeometry.createGeometry(cesium.CoplanarPolygonGeometry.fromPositions({
          positions: positions,
          vertexFormat: cesium.VertexFormat.POSITION_ONLY
      }));
      if (!cesium.defined(geometry)) {
          this._label.text = '';
          return;
      }

      var flatPositions = geometry.attributes.position.values;
      var indices = geometry.indices;

      var area = 0;
      for (var i = 0; i < indices.length; i+=3) {
          var i0 = indices[i];
          var i1 = indices[i+1];
          var i2 = indices[i+2];

          var p0 = cesium.Cartesian3.unpack(flatPositions, i0*3, p0Scratch);
          var p1 = cesium.Cartesian3.unpack(flatPositions, i1*3, p1Scratch);
          var p2 = cesium.Cartesian3.unpack(flatPositions, i2*3, p2Scratch);
          area += triangleArea(p0, p1, p2);
      }

      this._area = area;
      this._label.text = MeasureUnits.areaToString(area, this._selectedUnits.areaUnits, this._selectedLocale);
  };

  /**
   * Updates the label position.
   * @private
   */
  AreaMeasurementDrawing.prototype.updateLabel = function() {
      var positions = this._positions;
      if (positions.length < 2) {
          return;
      }
      var scene = this._scene;
      var top = positions[0];
      var pos2d = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, top, cart2Scratch1);
      var lastY = cesium.defined(pos2d) ? pos2d.y : Number.POSITIVE_INFINITY;
      for (var i = 1; i < positions.length; i++) {
          var nextScreenPos = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, positions[i], cart2Scratch2);
          if (!cesium.defined(nextScreenPos)) {
              continue;
          }
          if (nextScreenPos.y < lastY) {
              lastY = nextScreenPos.y;
              top = positions[i];
          }
      }
      this._label.position = top;
  };

  /**
   * Adds a point to the polygon.
   * @param {Cartesian3} position The position to add
   * @private
   */
  AreaMeasurementDrawing.prototype.addPoint = function(position) {
      PolygonDrawing.prototype.addPoint.call(this, position);
      this.updateArea(this._positions);
  };

  /**
   * Handles click events while drawing a polygon.
   * @param {Cartesian2} clickPosition The click position
   */
  AreaMeasurementDrawing.prototype.handleClick = function(clickPosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('clickPosition', clickPosition);
      //>>includeEnd('debug');

      if (this._mode === DrawingMode$1.AfterDraw) {
          this.reset();
      }

      var position = PolygonDrawing.prototype.handleClick.call(this, clickPosition);
      if (cesium.defined(position)) {
          this._label.show = true;
          this._polygon.show = true;
          this._polyline.show = true;
      }
  };

  /**
   * Handles mouse move events while drawing a polygon.
   * @param {Cartesian2} mousePosition The mouse position
   */
  AreaMeasurementDrawing.prototype.handleMouseMove = function(mousePosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('mousePosition', mousePosition);
      //>>includeEnd('debug');

      var nextPos = PolygonDrawing.prototype.handleMouseMove.call(this, mousePosition);
      if (!cesium.defined(nextPos)) {
          return;
      }
      var positions = this._positions.slice();
      positions.push(nextPos);
      this.updateArea(positions);
  };

  /**
   * Resets the widget.
   */
  AreaMeasurementDrawing.prototype.reset = function() {
      this._label.show = false;
      this._label.text = '';
      this._positions = [];
      this._polyline.positions = [];
      this._polygon.positions = [];
      this._polyline.show = false;
      this._polygon.show = false;
      this._area = 0;
      var points = this._points;
      var pointCollection = this._pointCollection;
      for (var i = 0; i < points.length; i++) {
          pointCollection.remove(points[i]);
      }
      points.length = 0;

      this._mode = DrawingMode$1.BeforeDraw;
      this._lastClickPosition.x = Number.POSITIVE_INFINITY;
      this._lastClickPosition.y = Number.POSITIVE_INFINITY;
  };

  /**
   * Destroys the widget.
   */
  AreaMeasurementDrawing.prototype.destroy = function() {
      this._removeEvent();
      this._labelCollection.remove(this._label);

      for(var i = 0; i < this._measurementResult.length; i++) {
          this._labelCollection.remove(this._measurementResult[i].label);
          this._primitives.remove(this._measurementResult[i].polygon);
          this._primitives.remove(this._measurementResult[i].polyline);
      }

      PolygonDrawing.prototype.destroy.call(this);
  };

  AreaMeasurementDrawing.prototype._saveCurrentMeasurementAndPrepareNew = function () {
      //we save current measurement and prepare new fresh

      this._measurementResult.push({
          label: this._label,
          polygon: this._polygon,
          polyline: this._polyline,
          points: this._points
      });

      this._label =  this._labelCollection.add(MeasurementSettings.getLabelOptions());
      this._polygon = PolygonDrawing.prototype.newPolygon.call(this);
      this._polyline = PolygonDrawing.prototype.newPolyline.call(this);
      this._points = [];
  };

  AreaMeasurementDrawing.prototype.handleDoubleClick = function () {
      PolygonDrawing.prototype.handleDoubleClick.call(this);

      this._saveCurrentMeasurementAndPrepareNew();
  };

  function getIcon(size) {
      return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                   <circle r="2.0788691" cy="293.99896" cx="3.8532958"/>\n\
                   <circle r="2.0788691" cy="282.76791" cx="26.927404"/>\n\
                   <circle r="2.0788691" cy="270.20621" cx="4.0090437"/>\n\
                   <path d="m 26.326048,283.77014 -9.394396,5.02295 -9.3943948,5.02295 0.3471933,-10.64726 0.3471933,-10.64726 9.0472022,5.62431 z" transform="matrix(1.1625734,0,0,0.99297729,-4.6787891,1.2180486)"/>\n\
                 </g>\n\
               </svg>';
  }

  /**
   * Creates a polygonal area measurement.
   * @alias AreaMeasurement
   * @ionsdk
   *
   * @param {Object} options An object with the following properties:
   * @param {Scene} options.scene The scene
   * @param {MeasureUnits} options.units The selected units of measurement
   * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
   * @param {PrimitiveCollection} options.primitives A collection in which to store the measurement primitives
   * @param {LabelCollection} options.labels A collection in which to add the labels
   * @param {PointPrimitiveCollection} options.points A collection in which to add points
   *
   * @constructor
   */
  function AreaMeasurement(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      Measurement.call(this, options);

      this._drawing = new AreaMeasurementDrawing(options);
      this._newMeasurement = new cesium.Event();
  }

  AreaMeasurement.prototype = Object.create(Measurement.prototype);
  AreaMeasurement.prototype.constructor = AreaMeasurement;

  cesium.defineProperties(AreaMeasurement.prototype, {
      /**
       * Gets the area value in meters squared
       * @type {Number}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      area : {
          get : function() {
              return this._drawing.area;
          }
      },
      /**
       * Gets the icon.
       * @type {String}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      icon : {
          value : getIcon(15)
      },
      /**
       * Gets the thumbnail.
       * @type {String}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      thumbnail : {
          value : getIcon(25)
      },
      /**
       * Gets the type.
       * @type {String}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      type : {
          value : 'Area'
      },
      /**
       * Gets the instruction text.
       * @type {String[]}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      instructions : {
          value : [
              'Click to start drawing a polygon',
              'Keep clicking to add more points',
              'Double click to finish drawing'
          ]
      },
      /**
       * Gets the id.
       * @type {String}
       * @memberof AreaMeasurement.prototype
       * @readonly
       */
      id : {
          value : 'areaMeasurement'
      },
      measurementResult : {
          get : function () {
              return this._drawing._measurementResult;
          }
      },
      newMeasurement : {
          get : function () {
              return this._newMeasurement;
          }
      }
  });

  /**
   * Ends drawing on double click.
   */
  AreaMeasurement.prototype.handleDoubleClick = function() {
      this._drawing.handleDoubleClick();

      this._newMeasurement.raiseEvent(this._drawing._measurementResult.length - 1);
  };

  /**
   * Handles click events while drawing a polygon.
   * @param {Cartesian2} clickPosition The click position
   */
  AreaMeasurement.prototype.handleClick = function(clickPosition) {
      this._drawing.handleClick(clickPosition);
  };

  /**
   * Handles mouse move events while drawing a polygon.
   * @param {Cartesian2} mousePosition The mouse position
   */
  AreaMeasurement.prototype.handleMouseMove = function(mousePosition) {
      this._drawing.handleMouseMove(mousePosition);
  };

  /**
   * Resets the widget.
   */
  AreaMeasurement.prototype.reset = function() {
      this._drawing.reset();
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  AreaMeasurement.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the widget.
   */
  AreaMeasurement.prototype.destroy = function() {
      this._drawing.destroy();

      return cesium.destroyObject(this);
  };

  var Mode = {
      BeforeDraw : 0,
      Drawing : 1,
      AfterDraw : 2
  };

  var cart2Scratch1$1 = new cesium.Cartesian2();
  var cart2Scratch2$1 = new cesium.Cartesian2();
  var scratchCarto = new cesium.Cartographic();

  var cart3Scratch1 = new cesium.Cartesian3();
  var cart3Scratch2 = new cesium.Cartesian3();
  var cart3Scratch3 = new cesium.Cartesian3();

  function getIcon$1(size) {
      return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                  <path d="m 4.934989,292.6549 20.67981,-20.80395"/>\n\
                   <circle r="2.0788691" cy="270.1637" cx="27.025297"/>\n\
                   <circle r="2.0788691" cy="294.07068" cx="3.1183045"/>\n\
                 </g>\n\
               </svg>\n';
  }

  function getComponentIcon(size) {
      return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                   <path d="m 4.934989,292.6549 20.67981,-20.80395" />\n\
                   <circle r="2.0788691" cy="270.1637" cx="27.025297" />\n\
                   <circle r="2.0788691" cy="294.07068" cx="3.1183045" />\n\
                   <path style="stroke-dasharray:2.00314951, 1.00157475;stroke-dashoffset:0;" d="m 3.3194019,292.73274 -0.046996,-22.53109 21.6420984,-0.0266" />\n\
                 </g>\n\
               </svg>\n';
  }

  /**
   * Draws a measurement between two points.
   *
   * @param {Object} options An object with the following properties:
   * @ionsdk
   * @param {Scene} options.scene The scene
   * @param {MeasureUnits} options.units The selected units of measurement
   * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
   * @param {PointPrimitiveCollection} options.points A collection for adding the point primitives
   * @param {LabelCollection} options.labels A collection for adding the labels
   * @param {PrimitiveCollection} options.primitives A collection for adding primitives
   * @param {Boolean} [options.showComponentLines=false] Whether or not to show the x and y component lines
   *
   * @constructor
   * @alias DistanceMeasurement
   */
  function DistanceMeasurement(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      Measurement.call(this, options);

      var that = this;
      var pointCollection = this._pointCollection;
      var labelCollection = this._labelCollection;
      var primitives = this._primitives;
      var scene = this._scene;

      var positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];
      var xyPolylinePositions = [new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3()];
      var xyBoxPositions = [new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3()];

      var yPixelOffset = new cesium.Cartesian2(-9, 0);
      var xPixelOffset = new cesium.Cartesian2(9, 0);

      var ellipsoid = scene.frameState.mapProjection.ellipsoid;

      this._startPoint = pointCollection.add(MeasurementSettings.getPointOptions());
      this._endPoint = pointCollection.add(MeasurementSettings.getPointOptions());

      this._positions = positions;
      this._polyline = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 3,
          show : false,
          positions : positions
      })));

      this._xyPolylinePositions = xyPolylinePositions;
      this._xyPolyline = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 2,
          positions : xyPolylinePositions,
          materialType: cesium.Material.PolylineDashType
      })));

      this._xyBoxPositions = xyBoxPositions;
      this._xyBox = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 1,
          positions : xyBoxPositions
      })));

      this._label = labelCollection.add(MeasurementSettings.getLabelOptions({
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.TOP,
          pixelOffset : new cesium.Cartesian2(10, 10)
      }));

      this._xPixelOffset = xPixelOffset;
      this._xLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6
      }));
      this._xAngleLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.MIDDLE,
          pixelOffset : xPixelOffset
      }));

      this._yPixelOffset = yPixelOffset;
      this._yLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          horizontalOrigin : cesium.HorizontalOrigin.RIGHT,
          pixelOffset : yPixelOffset
      }));
      this._yAngleLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          verticalOrigin : cesium.VerticalOrigin.TOP,
          pixelOffset : new cesium.Cartesian2(0, 9)
      }));

      this._distance = 0;
      this._xDistance = 0;
      this._yDistance = 0;
      this._xAngle = 0;
      this._yAngle = 0;

      this._mode = Mode.BeforeDraw;
      this._showComponentLines = cesium.defaultValue(options.showComponentLines, false);

      this._removeEvent = scene.preRender.addEventListener(function() {
          that._updateLabelPosition();
      });

      this._measurementResult = [];
      this._newMeasurement = new cesium.Event();
  }

  DistanceMeasurement.prototype = Object.create(Measurement.prototype);
  DistanceMeasurement.prototype.constructor = DistanceMeasurement;

  cesium.defineProperties(DistanceMeasurement.prototype, {
      /**
       * Gets the distance of the measurement in meters
       * @type {Number}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      distance : {
          get : function() {
              return this._distance;
          }
      },
      /**
       * Gets the horizontal component of distance of the measurement in meters
       * @type {Number}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      horizontalDistance : {
          get : function() {
              return this._xDistance;
          }
      },
      /**
       * Gets the vertical component of the distance of the measurement in meters
       * @type {Number}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      verticalDistance : {
          get : function() {
              return this._yDistance;
          }
      },
      /**
       * Gets the angle between horizontal and the distance line in radians
       * @type {Number}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      angleFromHorizontal : {
          get : function() {
              return this._xAngle;
          }
      },
      /**
       * Gets the angle between vertical and the distance line in radians
       * @type {Number}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      angleFromVertical : {
          get : function() {
              return this._yAngle;
          }
      },
      /**
       * Gets the icon.
       * @type {String}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      icon : {
          get : function() {
              if (this._showComponentLines) {
                  return getComponentIcon(15);
              }
              return getIcon$1(15);
          }
      },
      /**
       * Gets the thumbnail.
       * @type {String}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      thumbnail : {
          get : function() {
              if (this._showComponentLines) {
                  return getComponentIcon(25);
              }
              return getIcon$1(25);
          }
      },
      /**
       * Gets the type.
       * @type {String}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      type : {
          get : function() {
              if (this._showComponentLines) {
                  return 'Component Distance';
              }
              return 'Distance';
          }
      },
      /**
       * Gets the instruction text.
       * @type {String[]}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      instructions : {
          value : [
              'Click on the point cloud or the globe to set the start point and end points',
              'To make a new measurement, click to clear the previous measurement'
          ]
      },
      /**
       * Gets the id.
       * @type {String}
       * @memberof DistanceMeasurement.prototype
       * @readonly
       */
      id : {
          get : function() {
              if (this._showComponentLines) {
                  return 'componentDistanceMeasurement';
              }
              return 'distanceMeasurement';
          }
      },
      /**
       * Gets and sets whether or not to show the x and y component lines of the measurement.
       * @type {Boolean}
       * @memberof DistanceMeasurement.prototype
       * @default false
       */
      showComponentLines : {
          get : function() {
              return this._showComponentLines;
          },
          set : function(value) {
              this._showComponentLines = value;
              if (this._mode !== Mode.BeforeDraw) {
                  this._updateComponents();
              }
          }
      },
      measurementResult : {
          get : function () {
              return this._measurementResult;
          }
      },
      newMeasurement : {
          get : function () {
              return this._newMeasurement;
          }
      }
  });

  /**
   * Updates the label positions.
   * @private
   */
  DistanceMeasurement.prototype._updateComponents = function() {
      var show = this._showComponentLines;
      var xLabel = this._xLabel;
      var yLabel = this._yLabel;
      var xAngleLabel = this._xAngleLabel;
      var yAngleLabel = this._yAngleLabel;
      var xyPolyline = this._xyPolyline;
      var xyBox = this._xyBox;

      // always set to false first in case we can't compute the values.
      xLabel.show = false;
      yLabel.show = false;
      xAngleLabel.show = false;
      yAngleLabel.show = false;
      xyPolyline.show = false;
      xyBox.show = false;

      if (!show) {
          return;
      }

      var ellipsoid = this._scene.frameState.mapProjection.ellipsoid;

      var positions = this._positions;
      var p0 = positions[0];
      var p1 = positions[1];
      var height0 = ellipsoid.cartesianToCartographic(p0, scratchCarto).height;
      var height1 = ellipsoid.cartesianToCartographic(p1, scratchCarto).height;
      var bottomPoint;
      var topPoint;
      var topHeight;
      var bottomHeight;
      if (height0 < height1) {
          bottomPoint = p0;
          topPoint = p1;
          topHeight = height1;
          bottomHeight = height0;
      } else {
          bottomPoint = p1;
          topPoint = p0;
          topHeight = height0;
          bottomHeight = height1;
      }

      var xyPositions = this._xyPolylinePositions;
      xyPositions[0] = cesium.Cartesian3.clone(bottomPoint, xyPositions[0]);
      xyPositions[2] = cesium.Cartesian3.clone(topPoint, xyPositions[2]);
      var normal = ellipsoid.geodeticSurfaceNormal(bottomPoint, cart3Scratch1);
      normal = cesium.Cartesian3.multiplyByScalar(normal, topHeight - bottomHeight, normal);
      var corner = cesium.Cartesian3.add(bottomPoint, normal, xyPositions[1]);

      xyPolyline.positions = xyPositions;

      if (cesium.Cartesian3.equalsEpsilon(corner, topPoint, cesium.Math.EPSILON10) || cesium.Cartesian3.equalsEpsilon(corner, bottomPoint, cesium.Math.EPSILON10)) {
          return;
      }

      yLabel.show = true;
      xLabel.show = true;
      yAngleLabel.show = true;
      xAngleLabel.show = true;
      xyPolyline.show = true;
      xyBox.show = true;

      var v1 = cesium.Cartesian3.subtract(topPoint, corner, cart3Scratch1);
      var v2 = cesium.Cartesian3.subtract(bottomPoint, corner, cart3Scratch2);
      var mag = Math.min(cesium.Cartesian3.magnitude(v1), cesium.Cartesian3.magnitude(v2));
      var scale = mag > 15.0 ? mag * 0.15 : mag * 0.25;
      v1 = cesium.Cartesian3.normalize(v1, v1);
      v2 = cesium.Cartesian3.normalize(v2, v2);
      v1 = cesium.Cartesian3.multiplyByScalar(v1, scale, v1);
      v2 = cesium.Cartesian3.multiplyByScalar(v2, scale, v2);

      var boxPos = this._xyBoxPositions;
      boxPos[0] = cesium.Cartesian3.add(corner, v1, boxPos[0]);
      boxPos[1] = cesium.Cartesian3.add(boxPos[0], v2, boxPos[1]);
      boxPos[2] = cesium.Cartesian3.add(corner, v2, boxPos[2]);
      xyBox.positions = boxPos;

      xLabel.position = cesium.Cartesian3.midpoint(corner, topPoint, cart3Scratch1);
      yLabel.position = cesium.Cartesian3.midpoint(bottomPoint, corner, cart3Scratch1);
      xAngleLabel.position = cesium.Cartesian3.clone(topPoint, cart3Scratch1);
      yAngleLabel.position = cesium.Cartesian3.clone(bottomPoint, cart3Scratch1);

      var vx = cesium.Cartesian3.subtract(corner, topPoint, cart3Scratch2);
      var vy = cesium.Cartesian3.subtract(corner, bottomPoint, cart3Scratch1);
      var v = cesium.Cartesian3.subtract(topPoint, bottomPoint, cart3Scratch3);

      var yAngle = cesium.Cartesian3.angleBetween(vy, v);
      v = cesium.Cartesian3.negate(v, v);
      var xAngle = cesium.Cartesian3.angleBetween(vx, v);

      var xDistance = cesium.Cartesian3.magnitude(vx);
      var yDistance = cesium.Cartesian3.magnitude(vy);

      var selectedUnits = this._selectedUnits;
      var selectedLocale = this._selectedLocale;
      xLabel.text = MeasureUnits.distanceToString(xDistance, selectedUnits.distanceUnits, selectedLocale);
      yLabel.text = MeasureUnits.distanceToString(yDistance, selectedUnits.distanceUnits, selectedLocale);

      xAngleLabel.text = MeasureUnits.angleToString(xAngle, selectedUnits.slopeUnits, selectedLocale);
      yAngleLabel.text = MeasureUnits.angleToString(yAngle, selectedUnits.slopeUnits, selectedLocale);

      this._xDistance = xDistance;
      this._yDistance = yDistance;
      this._xAngle = xAngle;
      this._yAngle = yAngle;
  };

  /**
   * Updates the label positions.
   * @private
   */
  DistanceMeasurement.prototype._updateLabelPosition = function() {
      var positions = this._positions;
      if (this._mode === Mode.BeforeDraw) {
          return;
      }
      var scene = this._scene;
      var p0 = positions[0];
      var p1 = positions[1];

      var pos0 = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, p0, cart2Scratch1$1);
      var pos1 = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, p1, cart2Scratch2$1);

      if (!cesium.defined(pos0) || !cesium.defined(pos1)) {
          return;
      }

      var label = this._label;
      var yLabel = this._yLabel;
      var xAngleLabel = this._xAngleLabel;
      var m = (pos0.y - pos1.y) / (pos1.x - pos0.x);
      if (m > 0) {
          this._yPixelOffset.x = -9;
          this._xPixelOffset.x = 12;
          yLabel.pixelOffset = this._yPixelOffset;
          yLabel.horizontalOrigin = cesium.HorizontalOrigin.RIGHT;
          xAngleLabel.pixelOffset = this._xPixelOffset;
          xAngleLabel.horizontalOrigin = cesium.HorizontalOrigin.LEFT;
          label.horizontalOrigin = cesium.HorizontalOrigin.LEFT;
      } else {
          this._yPixelOffset.x = 9;
          this._xPixelOffset.x = -12;
          yLabel.pixelOffset = this._yPixelOffset;
          yLabel.horizontalOrigin = cesium.HorizontalOrigin.LEFT;
          xAngleLabel.pixelOffset = this._xPixelOffset;
          xAngleLabel.horizontalOrigin = cesium.HorizontalOrigin.RIGHT;
          label.horizontalOrigin = cesium.HorizontalOrigin.RIGHT;
      }
  };

  /**
   * Handles click events while drawing a distance measurement.
   * @param {Cartesian2} clickPosition The click position
   */
  DistanceMeasurement.prototype.handleClick = function(clickPosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('clickPosition', clickPosition);
      //>>includeEnd('debug');

      var scene = this._scene;
      if (this._mode === Mode.AfterDraw) {
          this.reset();
      }
      var mode = this._mode;

      var positions = this._positions;
      if (mode === Mode.BeforeDraw) {
          var pos = DistanceMeasurement._getWorldPosition(scene, clickPosition, positions[0]);
          if (!cesium.defined(pos)) {
              return;
          }
          this._polyline.show = true;
          positions[0] = pos.clone(positions[0]);
          positions[1] = pos.clone(positions[1]);
          this._startPoint.position = pos;
          this._startPoint.show = true;
          this._mode = Mode.Drawing;
          this._polyline.positions = positions;
      } else if (mode === Mode.Drawing) {
          this._endPoint.position = positions[1];
          this._endPoint.show = true;
          this._polyline.positions = positions;
          this._mode = Mode.AfterDraw;

          this._saveCurrentMeasurementAndPrepareNew();
      }
  };

  /**
   * Handles mouse move events while drawing a distance measurement.
   * @param {Cartesian2} mousePosition The mouse position
   */
  DistanceMeasurement.prototype.handleMouseMove = function(mousePosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('mousePosition', mousePosition);
      //>>includeEnd('debug');

      if (this._mode !== Mode.Drawing) {
          return;
      }

      var scene = this._scene;
      var positions = this._positions;
      var pos = DistanceMeasurement._getWorldPosition(scene, mousePosition, cart3Scratch1);

      if (!cesium.defined(pos)) {
          return;
      }

      var pos0 = positions[0];
      var pos1 = cesium.Cartesian3.clone(pos, positions[1]);

      var vec = cesium.Cartesian3.subtract(pos1, pos0, cart3Scratch1);
      var distance = cesium.Cartesian3.magnitude(vec);

      var label = this._label;
      label.position = cesium.Cartesian3.midpoint(pos0, pos1, cart3Scratch1);
      label.text = MeasureUnits.distanceToString(distance, this._selectedUnits.distanceUnits, this._selectedLocale);
      label.show = true;

      this._distance = distance;
      this._polyline.positions = positions;

      this._updateComponents();
  };

  /**
   * Resets the measurement.
   */
  DistanceMeasurement.prototype.reset = function() {
      this._polyline.show = false;
      this._xyPolyline.show = false;
      this._xyBox.show = false;
      this._label.show = false;
      this._xLabel.show = false;
      this._yLabel.show = false;
      this._xAngleLabel.show = false;
      this._yAngleLabel.show = false;
      this._startPoint.show = false;
      this._endPoint.show = false;
      this._mode = Mode.BeforeDraw;
      this._distance = 0;
      this._xDistance = 0;
      this._yDistance = 0;
      this._xAngle = 0;
      this._yAngle = 0;
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  DistanceMeasurement.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the measurement.
   */
  DistanceMeasurement.prototype.destroy = function() {
      this._removeEvent();

      var primitives = this._primitives;
      primitives.remove(this._polyline);
      primitives.remove(this._xyPolyline);
      primitives.remove(this._xyBox);

      var points = this._pointCollection;
      points.remove(this._startPoint);
      points.remove(this._endPoint);

      var labels = this._labelCollection;
      labels.remove(this._label);
      labels.remove(this._xLabel);
      labels.remove(this._yLabel);
      labels.remove(this._xAngleLabel);
      labels.remove(this._yAngleLabel);

      return cesium.destroyObject(this);
  };

  DistanceMeasurement.prototype._saveCurrentMeasurementAndPrepareNew = function () {
      //we save current measurement and prepare new fresh

      this._measurementResult.push({
          startPoint: this._startPoint,
          endPoint: this._endPoint,
          polyline: this._polyline,
          xyPolyline: this._xyPolyline,
          xyBox: this._xyBox,
          label: this._label,
          xLabel: this._xLabel,
          xAngleLabel: this._xAngleLabel,
          yLabel: this._yLabel,
          yAngleLabel: this._yAngleLabel
      });

      this._newMeasurement.raiseEvent(this._measurementResult.length - 1);

      var pointCollection = this._pointCollection;
      var labelCollection = this._labelCollection;
      var primitives = this._primitives;
      var xyPolylinePositions = [new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3()];
      var xyBoxPositions = [new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3()];
      var xPixelOffset = new cesium.Cartesian2(9, 0);
      var yPixelOffset = new cesium.Cartesian2(-9, 0);
      var positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];

      var scene = this._scene;
      var ellipsoid = scene.frameState.mapProjection.ellipsoid;

      this._startPoint = pointCollection.add(MeasurementSettings.getPointOptions());
      this._endPoint = pointCollection.add(MeasurementSettings.getPointOptions());

      this._positions = positions;
      this._polyline = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 3,
          show : false,
          positions : positions
      })));

      this._xyPolylinePositions = xyPolylinePositions;
      this._xyPolyline = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 2,
          positions : xyPolylinePositions,
          materialType: cesium.Material.PolylineDashType
      })));

      this._xyBoxPositions = xyBoxPositions;
      this._xyBox = primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
          ellipsoid : ellipsoid,
          width : 1,
          positions : xyBoxPositions
      })));

      this._label = labelCollection.add(MeasurementSettings.getLabelOptions({
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.TOP,
          pixelOffset : new cesium.Cartesian2(10, 10)
      }));

      this._xPixelOffset = xPixelOffset;
      this._xLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6
      }));
      this._xAngleLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.MIDDLE,
          pixelOffset : xPixelOffset
      }));

      this._yPixelOffset = yPixelOffset;
      this._yLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          horizontalOrigin : cesium.HorizontalOrigin.RIGHT,
          pixelOffset : yPixelOffset
      }));
      this._yAngleLabel = labelCollection.add(MeasurementSettings.getLabelOptions({
          scale : 0.6,
          verticalOrigin : cesium.VerticalOrigin.TOP,
          pixelOffset : new cesium.Cartesian2(0, 9)
      }));

  };

  // Exposed for specs
  DistanceMeasurement._getWorldPosition = getWorldPosition;

  var scratch = new cesium.Cartesian3();
      var scratchCarto$1 = new cesium.Cartographic();

      function getIcon$2(size) {
          return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
             <g transform="translate(0,-267)">\n\
               <path d="m 15.042838,272.34414 0.01712,19.60575"/>\n\
               <circle r="2.0788691" cy="270.01154" cx="15.078616"/>\n\
               <path d="m 0.64901081,296.20687 8.80039389,-6.01044 7.9375003,3.1183 12.347278,-3.34365"/>\n\
             </g>\n\
           </svg>';
      }

      /**
       * Draws a measurement between a selected point and the ground beneath that point.
       *
       * @param {Object} options An object with the following properties:
       * @ionsdk
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} options.units The selected units of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PointPrimitiveCollection} options.points A collection for adding the point primitives
       * @param {LabelCollection} options.labels A collection for adding the labels
       * @param {PrimitiveCollection} options.primitives A collection for adding primitives
       *
       * @constructor
       * @alias HeightMeasurement
       */
      function HeightMeasurement(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          Measurement.call(this, options);

          var positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];
          var pointCollection = this._pointCollection;

          this._startPoint = pointCollection.add(MeasurementSettings.getPointOptions());
          this._endPoint = pointCollection.add(MeasurementSettings.getPointOptions());

          this._polyline = this._primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
              ellipsoid : this._scene.frameState.mapProjection.ellipsoid,
              positions : positions
          })));

          this._label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
              horizontalOrigin : cesium.HorizontalOrigin.LEFT,
              verticalOrigin : cesium.VerticalOrigin.TOP,
              pixelOffset : new cesium.Cartesian2(10, 10)
          }));

          this._positions = positions;
          this._distance = 0;
      }

      HeightMeasurement.prototype = Object.create(Measurement.prototype);
      HeightMeasurement.prototype.constructor = HeightMeasurement;

      cesium.defineProperties(HeightMeasurement.prototype, {
          /**
           * Gets the distance in meters
           * @type {Number}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          distance : {
              get : function() {
                  return this._distance;
              }
          },
          /**
           * Gets the icon.
           * @type {String}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          icon : {
              value : getIcon$2(15)
          },
          /**
           * Gets the thumbnail.
           * @type {String}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          thumbnail : {
              value : getIcon$2(25)
          },
          /**
           * Gets the type.
           * @type {String}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          type : {
              value : 'Height from terrain'
          },
          /**
           * Gets the instruction text.
           * @type {String[]}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          instructions : {
              value : [
                  'Click on the point cloud to get a distance from that point to terrain'
              ]
          },
          /**
           * Gets the id.
           * @type {String}
           * @memberof HeightMeasurement.prototype
           * @readonly
           */
          id : {
              value : 'heightMeasurement'
          }
      });

      /**
       * Handles click events while drawing a height measurement.
       * @param {Cartesian2} clickPosition The click position
       */
      HeightMeasurement.prototype.handleClick = function(clickPosition) {
          var scene = this._scene;
          this.reset();

          var positions = this._positions;

          var pos0 = HeightMeasurement._getWorldPosition(scene, clickPosition, positions[0]);
          if (!cesium.defined(pos0)) {
              return;
          }

          var globe = scene.globe;
          var ellipsoid = scene.frameState.mapProjection.ellipsoid;

          var carto = ellipsoid.cartesianToCartographic(pos0, scratchCarto$1);
          if (cesium.defined(globe)) {
              carto.height = cesium.defaultValue(globe.getHeight(carto), 0);
          } else {
              carto.height = 0;
          }
          var pos1 = ellipsoid.cartographicToCartesian(carto, positions[1]);

          var vec = cesium.Cartesian3.subtract(pos1, pos0, scratch);
          var distance = cesium.Cartesian3.magnitude(vec);

          var label = this._label;
          label.position = pos0;
          label.show = true;
          label.text = MeasureUnits.distanceToString(distance, this._selectedUnits.distanceUnits, this._selectedLocale);

          this._polyline.positions = positions;
          this._polyline.show = true;
          this._startPoint.position = pos0;
          this._startPoint.show = true;
          this._endPoint.position = pos1;
          this._endPoint.show = true;

          this._distance = distance;
      };

      /**
       * Resets the widget.
       */
      HeightMeasurement.prototype.reset = function() {
          this._polyline.show = false;
          this._label.show = false;
          this._startPoint.show = false;
          this._endPoint.show = false;
          this._distance = 0;
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      HeightMeasurement.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the measurement.
       */
      HeightMeasurement.prototype.destroy = function() {
          this._primitives.remove(this._polyline);

          var points = this._pointCollection;
          points.remove(this._startPoint);
          points.remove(this._endPoint);

          this._labelCollection.remove(this._label);

          return cesium.destroyObject(this);
      };

      // exposed for specs
      HeightMeasurement._getWorldPosition = getWorldPosition;

  var clickDistanceScratch$1 = new cesium.Cartesian2();
  var cart3Scratch$1 = new cesium.Cartesian3();

  var mouseDelta$1 = 10;

  /**
   * @private
   * @ionsdk
   */
  function PolylineDrawing(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('options.scene', options.scene);
      //>>includeEnd('debug');

      var scene = options.scene;
      var primitives = cesium.defaultValue(options.primitives, scene.primitives);
      var points = options.points;
      var removePoints = false;
      if (!cesium.defined(points)) {
          points = primitives.add(new cesium.PointPrimitiveCollection());
          removePoints = true;
      }

      this._scene = scene;
      this._pointCollection = points;
      this._removePoints = removePoints;
      this._polyline = primitives.add(new PolylinePrimitive(options.polylineOptions));
      this._primitives = primitives;
      this._pointOptions = options.pointOptions;
      this._positions = [];
      this._points = [];
      this._tempNextPos = new cesium.Cartesian3();
      this._mode = DrawingMode$1.BeforeDraw;
      this._lastClickPosition = new cesium.Cartesian2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      this._polylineOptions = options.polylineOptions;
  }

  /**
   * Adds a point to the polyline.
   * @param {Cartesian3} position The position to add
   * @private
   */
  PolylineDrawing.prototype.addPoint = function(position) {
      var positions = this._positions;
      positions.push(position);
      this._polyline.positions = positions;
      var point = this._pointCollection.add(this._pointOptions);
      point.position = position;
      point.show = true;
      this._points.push(point);
  };

  /**
   * Ends drawing on double click.
   */
  PolylineDrawing.prototype.handleDoubleClick = function() {
      // expect point to be added by handleClick
      this._mode = DrawingMode$1.AfterDraw;

      // Sometimes a move event is fired between the ending
      // click and doubleClick events, so make sure the polyline
      // has the correct positions.
      this._polyline.positions = this._positions;
  };

  /**
   * Handles click events while drawing a polyline.
   * @param {Cartesian2} clickPosition The click position
   */
  PolylineDrawing.prototype.handleClick = function(clickPosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('clickPosition', clickPosition);
      //>>includeEnd('debug');

      if (this._mode === DrawingMode$1.AfterDraw) {
          return;
      }

      // Don't handle if clickPos is too close to previous click.
      // This typically indicates a double click handler will be fired next,
      // we don't expect the user to wait and click this point again.
      var lastClickPos = this._lastClickPosition;
      var distance = cesium.Cartesian2.magnitude(cesium.Cartesian2.subtract(lastClickPos, clickPosition, clickDistanceScratch$1));
      if (distance < mouseDelta$1) {
          return;
      }

      var position = PolylineDrawing._getWorldPosition(this._scene, clickPosition, cart3Scratch$1);
      if (!cesium.defined(position)) {
          return;
      }

      this.addPoint(cesium.Cartesian3.clone(position, new cesium.Cartesian3()));
      this._mode = DrawingMode$1.Drawing;
      cesium.Cartesian2.clone(clickPosition, lastClickPos);
      return position;
  };

  /**
   * Handles mouse move events while drawing a polyline.
   * @param {Cartesian2} mousePosition The mouse position
   */
  PolylineDrawing.prototype.handleMouseMove = function(mousePosition) {
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('mousePosition', mousePosition);
      //>>includeEnd('debug');

      if (this._mode !== DrawingMode$1.Drawing) {
          return;
      }
      var scene = this._scene;
      var nextPos = PolylineDrawing._getWorldPosition(scene, mousePosition, cart3Scratch$1);
      if (!cesium.defined(nextPos)) {
          return;
      }
      var positions = this._positions.slice();
      positions.push(cesium.Cartesian3.clone(nextPos, this._tempNextPos));
      this._polyline.positions = positions;
      return nextPos;
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  PolylineDrawing.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the widget.
   */
  PolylineDrawing.prototype.destroy = function() {
      if (this._removePoints) {
          this._primitives.remove(this._points);
      } else {
          var points = this._points;
          var pointCollection = this._pointCollection;
          for (var i = 0; i < points.length; i++) {
              pointCollection.remove(points[i]);
          }
      }
      this._primitives.remove(this._polyline);

      return cesium.destroyObject(this);
  };

  PolylineDrawing.prototype.newPolyline = function() {
      return this._primitives.add(new PolylinePrimitive(this._polylineOptions));
  };

  // Exposed for specs
  PolylineDrawing._getWorldPosition = getWorldPosition;

  var clickDistanceScratch$2 = new cesium.Cartesian2();
      var cart3Scratch$2 = new cesium.Cartesian3();
      var cart3Scratch1$1 = new cesium.Cartesian3();
      var normalScratch = new cesium.Cartesian3();
      var rayScratch$4 = new cesium.Ray();
      var v1Scratch$1 = new cesium.Cartesian3();
      var v2Scratch = new cesium.Cartesian3();
      var cartoScratch = new cesium.Cartographic();

      var mouseDelta$2 = 10;

      /**
       * @private
       * @ionsdk
       */
      function HorizontalPolylineDrawing(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.scene', options.scene);
          //>>includeEnd('debug');
          PolylineDrawing.call(this, options);
          var polylineOptions = cesium.defaultValue(options.polylineOptions, cesium.defaultValue.EMPTY_OBJECT);

          var dashLineOptions = {
              color: polylineOptions.color,
              ellipsoid: polylineOptions.ellipsoid,
              width: 2,
              dashed: true
          };
          var moveDashLine = this._primitives.add(new PolylinePrimitive(dashLineOptions));
          moveDashLine.positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];
          moveDashLine.show = false;
          this._dashLineOptions = dashLineOptions;
          this._dashedLines = [];
          this._moveDashLine = moveDashLine;

          this._heightPlane = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0);
          this._heightPlaneCV = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0);
          this._firstMove = false;
          this._height = 0;
      }

      HorizontalPolylineDrawing.prototype = Object.create(PolylineDrawing.prototype);
      HorizontalPolylineDrawing.prototype.constructor = HorizontalPolylineDrawing;

      HorizontalPolylineDrawing.prototype._setDashLinePositions = function(line, position) {
          var globe = this._scene.globe;
          var ellipsoid = this._scene.frameState.mapProjection.ellipsoid;

          var positions = line.positions;
          positions[0] = cesium.Cartesian3.clone(position, positions[0]);

          var carto = ellipsoid.cartesianToCartographic(position, cartoScratch);
          if (cesium.defined(globe)) {
              carto.height = cesium.defaultValue(globe.getHeight(carto), 0);
          } else {
              carto.height = 0;
          }
          positions[1] = ellipsoid.cartographicToCartesian(carto, positions[1]);
          line.positions = positions;
      };

      /**
       * Adds a point to the polyline.
       * @param {Cartesian3} position The position to add
       * @private
       */
      HorizontalPolylineDrawing.prototype.addPoint = function(position) {
          PolylineDrawing.prototype.addPoint.call(this, position);

          var dashLine = this._primitives.add(new PolylinePrimitive(this._dashLineOptions));
          dashLine.positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];
          this._dashedLines.push(dashLine);

          this._setDashLinePositions(dashLine, position);
      };

      /**
       * Ends drawing on double click.
       */
      HorizontalPolylineDrawing.prototype.handleDoubleClick = function() {
          // expect point to be added by handleClick
          this._mode = DrawingMode$1.AfterDraw;

          // Sometimes a move event is fired between the ending
          // click and doubleClick events, so make sure the polyline
          // has the correct positions.
          this._polyline.positions = this._positions;
          this._moveDashLine.show = false;
      };

      /**
       * Handles click events while drawing a polyline.
       * @param {Cartesian2} clickPosition The click position
       */
      HorizontalPolylineDrawing.prototype.handleClick = function(clickPosition) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('clickPosition', clickPosition);
          //>>includeEnd('debug');

          var pos;
          if (this._positions.length === 0) {
              var scene = this._scene;
              var ellipsoid = scene.frameState.mapProjection.ellipsoid;
              pos = PolylineDrawing.prototype.handleClick.call(this, clickPosition);
              if (!cesium.defined(pos)) {
                  return;
              }
              this._heightPlane = cesium.Plane.fromPointNormal(pos, ellipsoid.geodeticSurfaceNormal(pos, normalScratch), this._heightPlane);

              var cartoPos = ellipsoid.cartesianToCartographic(pos, cartoScratch);
              var planePoint = scene.mapProjection.project(cartoPos, cart3Scratch1$1);
              var posCV = cesium.Cartesian3.fromElements(planePoint.z, planePoint.x, planePoint.y, planePoint);

              this._heightPlaneCV = cesium.Plane.fromPointNormal(posCV, cesium.Cartesian3.UNIT_X, this._heightPlaneCV);
              this._height = ellipsoid.cartesianToCartographic(pos, cartoScratch).height;
              this._firstMove = true;
          } else {
              // Don't handle if clickPos is too close to previous click.
              // This typically indicates a double click handler will be fired next,
              // we don't expect the user to wait and click this point again.
              var lastClickPos = this._lastClickPosition;
              var distance = cesium.Cartesian2.magnitude(cesium.Cartesian2.subtract(lastClickPos, clickPosition, clickDistanceScratch$2));
              if (distance < mouseDelta$2) {
                  return;
              }
              cesium.Cartesian2.clone(clickPosition, lastClickPos);
              pos = cesium.Cartesian3.clone(this._tempNextPos);
              this.addPoint(pos);
              this._firstMove = true;
          }
          return pos;
      };

      /**
       * Handles mouse move events while drawing a polyline.
       * @param {Cartesian2} mousePosition The mouse position
       * @param {Boolean} shift True if the shift key was pressed
       */
      HorizontalPolylineDrawing.prototype.handleMouseMove = function(mousePosition, shift) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('mousePosition', mousePosition);
          cesium.Check.defined('shift', shift);
          //>>includeEnd('debug');

          if (this._mode !== DrawingMode$1.Drawing) {
              return;
          }
          var scene = this._scene;
          var ellipsoid = scene.frameState.mapProjection.ellipsoid;
          var positions = this._positions;

          var nextPos;
          var ray = scene.camera.getPickRay(mousePosition, rayScratch$4);
          if (scene.mode === cesium.SceneMode.SCENE3D) {
              nextPos = cesium.IntersectionTests.rayPlane(ray, this._heightPlane, cart3Scratch$2);
          } else if (scene.mode === cesium.SceneMode.COLUMBUS_VIEW) {
              nextPos = cesium.IntersectionTests.rayPlane(ray, this._heightPlaneCV, cart3Scratch$2);
              nextPos = cesium.Cartesian3.fromElements(nextPos.y, nextPos.z, nextPos.x, nextPos);
              var carto = scene.mapProjection.unproject(nextPos, cartoScratch);
              nextPos = ellipsoid.cartographicToCartesian(carto, nextPos);
          } else {
              nextPos = scene.camera.pickEllipsoid(mousePosition, ellipsoid, cart3Scratch$2);
              if (cesium.defined(nextPos)) {
                  var cartoPos = ellipsoid.cartesianToCartographic(nextPos, cartoScratch);
                  cartoPos.height = this._height;
                  nextPos = ellipsoid.cartographicToCartesian(cartoPos, nextPos);
              }
          }

          if (!cesium.defined(nextPos)) {
              return;
          }

          if (!this._firstMove && shift) {
              var anchorPos = positions[positions.length - 1];
              var lastPos = this._tempNextPos;
              var direction = cesium.Cartesian3.subtract(lastPos, anchorPos, v1Scratch$1);
              var newDirection = cesium.Cartesian3.subtract(nextPos, anchorPos, v2Scratch);
              newDirection = cesium.Cartesian3.projectVector(newDirection, direction, newDirection);
              nextPos = cesium.Cartesian3.add(anchorPos, newDirection, nextPos);
          }

          positions = positions.slice();
          positions.push(cesium.Cartesian3.clone(nextPos, this._tempNextPos));
          this._polyline.positions = positions;
          this._firstMove = false;
          this._moveDashLine.show = true;
          this._setDashLinePositions(this._moveDashLine, nextPos);

          return nextPos;
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      HorizontalPolylineDrawing.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the widget.
       */
      HorizontalPolylineDrawing.prototype.destroy = function() {
          var primitives = this._primitives;
          var dashLines = this._dashedLines;
          for (var i = 0; i < dashLines.length; i++) {
              primitives.remove(dashLines[i]);
          }
          primitives.remove(this._moveDashLine);

          PolylineDrawing.prototype.destroy.call(this);
      };

  var cart3Scratch$3 = new cesium.Cartesian3();
      var cart2Scratch1$2 = new cesium.Cartesian2();
      var cart2Scratch2$2 = new cesium.Cartesian2();
      var cart2Scratch3 = new cesium.Cartesian2();
      var v1Scratch$2 = new cesium.Cartesian3();

      /**
       * @private
       * @ionsdk
       */
      function HorizontalMeasurementDrawing(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.scene', options.scene);
          cesium.Check.defined('options.primitives', options.primitives);
          cesium.Check.defined('options.units', options.units);
          cesium.Check.defined('options.points', options.points);
          cesium.Check.defined('options.labels', options.labels);
          //>>includeEnd('debug');
          HorizontalPolylineDrawing.call(this, options);

          var labels = options.labels;
          this._labelCollection = labels;
          this._label = labels.add(MeasurementSettings.getLabelOptions({
              horizontalOrigin : cesium.HorizontalOrigin.LEFT,
              verticalOrigin : cesium.VerticalOrigin.BOTTOM,
              pixelOffset : new cesium.Cartesian2(10, -10)
          }));
          this._segmentLabels = [];
          this._selectedUnits = options.units;
          this._selectedLocale = options.locale;
          this._previousDistance = 0;
          this._distance = 0;

          var that = this;
          this._removeEvent = this._scene.preRender.addEventListener(function() {
              that.updateLabels();
          });
      }

      HorizontalMeasurementDrawing.prototype = Object.create(HorizontalPolylineDrawing.prototype);
      HorizontalMeasurementDrawing.prototype.constructor = HorizontalMeasurementDrawing;

      cesium.defineProperties(HorizontalMeasurementDrawing.prototype, {
          /**
           * Gets the distance in meters
           * @type {Number}
           * @memberof HorizontalMeasurementDrawing.prototype
           * @readonly
           */
          distance : {
              get : function() {
                  return this._distance;
              }
          }
      });

      /**
       * Updates the label position.
       * @private
       */
      HorizontalMeasurementDrawing.prototype.updateLabels = function() {
          var positions = this._positions;
          if (positions.length < 2) {
              return;
          }
          var scene = this._scene;
          var top = positions[0];
          var pos2d = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, top, cart2Scratch1$2);
          var lastScreenPos = cesium.defined(pos2d) ? cesium.Cartesian2.clone(pos2d, cart2Scratch3) : cesium.Cartesian2.fromElements(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, cart2Scratch3);
          var topY = lastScreenPos.y;
          var labels = this._segmentLabels;
          labels[0].show = this._polyline.positions.length > 2;
          for (var i = 1; i < positions.length; i++) {
              var nextScreenPos = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, positions[i], cart2Scratch2$2);
              if (!cesium.defined(nextScreenPos)) {
                  continue;
              }

              var m = (lastScreenPos.y - nextScreenPos.y) / (nextScreenPos.x - lastScreenPos.x);
              var label = labels[i - 1];
              if (m > 0) {
                  label.horizontalOrigin = cesium.HorizontalOrigin.LEFT;
              } else {
                  label.horizontalOrigin = cesium.HorizontalOrigin.RIGHT;
              }

              if (nextScreenPos.y < topY) {
                  topY = nextScreenPos.y;
                  top = positions[i];
              }
              lastScreenPos = cesium.Cartesian2.clone(nextScreenPos, lastScreenPos);
          }
          if (this._mode === DrawingMode$1.AfterDraw) {
              this._label.position = top;
          }
      };

      HorizontalMeasurementDrawing.prototype.addPoint = function(position) {
          var positions = this._positions;
          if (positions.length > 0) {
              // store distance that was calculated on mouse move
              this._previousDistance = this._distance;

              var label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
                  scale : 0.8,
                  horizontalOrigin : cesium.HorizontalOrigin.LEFT,
                  verticalOrigin : cesium.VerticalOrigin.TOP,
                  pixelOffset : new cesium.Cartesian2(5, 5)
              }));
              var p1 = positions[positions.length - 1];
              label.position = cesium.Cartesian3.midpoint(p1, position, new cesium.Cartesian3());
              label.text = MeasureUnits.distanceToString(cesium.Cartesian3.distance(p1, position), this._selectedUnits.distanceUnits, this._selectedLocale);
              label.show = true;
              this._segmentLabels.push(label);
          }
          HorizontalPolylineDrawing.prototype.addPoint.call(this, position);
      };

      /**
       * Handles click events while drawing a polyline.
       * @param {Cartesian2} clickPosition The click position
       */
      HorizontalMeasurementDrawing.prototype.handleClick = function(clickPosition) {
          if (this._mode === DrawingMode$1.AfterDraw) {
              this.reset();
          }
          var position = HorizontalPolylineDrawing.prototype.handleClick.call(this, clickPosition);
          if (cesium.defined(position)) {
              this._label.show = true;
              this._polyline.show = true;
          }
      };

      /**
       * Handles mouse movements while drawing a horizontal measurement.
       * @param {Cartesian2} mousePosition The mouse position
       * @param {Boolean} shift True if the shift key was pressed
       */
      HorizontalMeasurementDrawing.prototype.handleMouseMove = function(mousePosition, shift) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('mousePosition', mousePosition);
          cesium.Check.defined('shift', shift);
          //>>includeEnd('debug');

          var nextPos = HorizontalPolylineDrawing.prototype.handleMouseMove.call(this, mousePosition, shift);
          if (!cesium.defined(nextPos)) {
              return;
          }

          var positions = this._positions;
          var lastPos = positions[positions.length - 1];
          var vec = cesium.Cartesian3.subtract(nextPos, lastPos, v1Scratch$2);
          var distance = this._previousDistance + cesium.Cartesian3.magnitude(vec);

          var label = this._label;
          label.position = cesium.Cartesian3.midpoint(lastPos, nextPos, cart3Scratch$3);
          label.text = MeasureUnits.distanceToString(distance, this._selectedUnits.distanceUnits, this._selectedLocale);
          label.show = true;

          this._distance = distance;
      };

      /**
       * Resets the measurement.
       */
      HorizontalMeasurementDrawing.prototype.reset = function() {
          var i;
          var primitives = this._primitives;
          var dashLines = this._dashedLines;
          for (i = 0; i < dashLines.length; i++) {
              primitives.remove(dashLines[i]);
          }
          this._dashedLines = [];

          this._polyline.positions = [];
          this._polyline.show = false;

          this._label.show = false;
          this._label.text = '';

          this._previousDistance = 0;
          this._distance = 0;

          this._positions = [];

          var points = this._points;
          var pointCollection = this._pointCollection;
          for (i = 0; i < points.length; i++) {
              pointCollection.remove(points[i]);
          }
          points.length = 0;

          var labelCollection = this._labelCollection;
          var labels = this._segmentLabels;
          for (i = 0; i < labels.length; i++) {
              labelCollection.remove(labels[i]);
          }
          labels.length = 0;

          this._moveDashLine.show = false;
          this._mode = DrawingMode$1.BeforeDraw;
          this._lastClickPosition.x = Number.POSITIVE_INFINITY;
          this._lastClickPosition.y = Number.POSITIVE_INFINITY;
      };

      /**
       * Destroys the measurement.
       */
      HorizontalMeasurementDrawing.prototype.destroy = function() {
          this._removeEvent();

          var i;
          var labelCollection = this._labelCollection;
          var labels = this._segmentLabels;
          for (i = 0; i < labels.length; i++) {
              labelCollection.remove(labels[i]);
          }

          var primitives = this._primitives;
          var dashLines = this._dashedLines;
          for (i = 0; i < dashLines.length; i++) {
              primitives.remove(dashLines[i]);
          }

          this._labelCollection.remove(this._label);

          HorizontalPolylineDrawing.prototype.destroy.call(this);
      };

  function getIcon$3(size) {
          return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                   <path d="m 5.5492003,281.78808 18.9375757,0.0497"/>\n\
                   <circle r="2.0788691" cy="281.63776" cx="3.0514872"/>\n\
                   <circle r="2.0788691" cy="281.71384" cx="26.985731"/>\n\
                 </g>\n\
               </svg>';
      }

      /**
       * Draws a measurement between two points with the same height.
       *
       * @param {Object} options An object with the following properties:
       * @ionsdk
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} options.units The selected units of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PointPrimitiveCollection} options.points A collection for adding the point primitives
       * @param {LabelCollection} options.labels A collection for adding the labels
       * @param {PrimitiveCollection} options.primitives A collection for adding primitives
       *
       * @constructor
       * @alias HorizontalMeasurement
       */
      function HorizontalMeasurement(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          Measurement.call(this, options);

          this._drawing = new HorizontalMeasurementDrawing(options);
      }

      HorizontalMeasurement.prototype = Object.create(Measurement.prototype);
      HorizontalMeasurement.prototype.constructor = HorizontalMeasurement;

      cesium.defineProperties(HorizontalMeasurement.prototype, {
          /**
           * Gets the distance in meters
           * @type {Number}
           * @memberof HorizontalMeasurement.prototype
           * @readonly
           */
          distance : {
              get : function() {
                  return this._drawing.distance;
              }
          },
          /**
           * Gets the icon.
           * @type {String}
           * @memberof HorizontalMeasurement.prototype
           * @readonly
           */
          icon : {
              value : getIcon$3(15)
          },
          /**
           * Gets the thumbnail.
           * @type {String}
           * @memberof AreaMeasurement.prototype
           * @readonly
           */
          thumbnail : {
              value : getIcon$3(25)
          },
          /**
           * Gets the type.
           * @type {String}
           * @memberof HorizontalMeasurement.prototype
           * @readonly
           */
          type : {
              value : 'Horizontal distance'
          },
          /**
           * Gets the instruction text.
           * @type {String[]}
           * @memberof HorizontalMeasurement.prototype
           * @readonly
           */
          instructions : {
              value : [
                  'Click on the point cloud or the globe to set the start point',
                  'Move the mouse to drag the line',
                  'Press this shift key to clamp the direction of the line',
                  'Click again to set the end point',
                  'To make a new measurement, click to clear the previous measurement'
              ]
          },
          /**
           * Gets the id.
           * @type {String}
           * @memberof HorizontalMeasurement.prototype
           * @readonly
           */
          id : {
              value : 'horizontalMeasurement'
          }
      });

      /**
       * Ends drawing on double click.
       */
      HorizontalMeasurement.prototype.handleDoubleClick = function() {
          this._drawing.handleDoubleClick();
      };

      /**
       * Handles click events while drawing a horizontal measurement.
       * @param {Cartesian2} clickPosition The click position
       */
      HorizontalMeasurement.prototype.handleClick = function(clickPosition) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('clickPosition', clickPosition);
          //>>includeEnd('debug');

          this._drawing.handleClick(clickPosition);
      };

      /**
       * Handles mouse movements while drawing a horizontal measurement.
       * @param {Cartesian2} mousePosition The mouse position
       * @param {Boolean} shift True if the shift key was pressed
       */
      HorizontalMeasurement.prototype.handleMouseMove = function(mousePosition, shift) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('mousePosition', mousePosition);
          cesium.Check.defined('shift', shift);
          //>>includeEnd('debug');

          this._drawing.handleMouseMove(mousePosition, shift);
      };

      /**
       * Resets the measurement.
       */
      HorizontalMeasurement.prototype.reset = function() {
          this._drawing.reset();
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      HorizontalMeasurement.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the measurement.
       */
      HorizontalMeasurement.prototype.destroy = function() {
          this._drawing.destroy();

          return cesium.destroyObject(this);
      };

  /**
       * A helper class for activating and handling mouse interactions for the measurement widget.
       * @alias MeasurementMouseHandler
       * @ionsdk
       *
       * @param {Scene} scene The scene
       *
       * @constructor
       */
      function MeasurementMouseHandler(scene) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('scene', scene);
          //>>includeEnd('debug');

          this.selectedMeasurement = undefined;
          this._sseh = new cesium.ScreenSpaceEventHandler(scene.canvas);
          this._scene = scene;
      }

      cesium.defineProperties(MeasurementMouseHandler.prototype, {
          /**
           * Gets the scene.
           * @type {Scene}
           * @memberof MeasurementMouseHandler.prototype
           * @readonly
           */
          scene : {
              get : function() {
                  return this._scene;
              }
          }
      });

      /**
       * Activates the mouse handler.
       */
      MeasurementMouseHandler.prototype.activate = function() {
          var sseh = this._sseh;
          sseh.setInputAction(this._click.bind(this), cesium.ScreenSpaceEventType.LEFT_CLICK);
          sseh.setInputAction(this._clickShift.bind(this), cesium.ScreenSpaceEventType.LEFT_CLICK, cesium.KeyboardEventModifier.SHIFT);
          sseh.setInputAction(this._mouseMove.bind(this), cesium.ScreenSpaceEventType.MOUSE_MOVE);
          sseh.setInputAction(this._mouseMoveShift.bind(this), cesium.ScreenSpaceEventType.MOUSE_MOVE, cesium.KeyboardEventModifier.SHIFT);
          sseh.setInputAction(this._handleLeftDown.bind(this), cesium.ScreenSpaceEventType.LEFT_DOWN);
          sseh.setInputAction(this._handleLeftUp.bind(this), cesium.ScreenSpaceEventType.LEFT_UP);
          sseh.setInputAction(this._handleDoubleClick.bind(this), cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      };

      /**
       * Deactivates the mouse handler.
       */
      MeasurementMouseHandler.prototype.deactivate = function() {
          var sseh = this._sseh;
          sseh.removeInputAction(cesium.ScreenSpaceEventType.LEFT_CLICK);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.LEFT_CLICK, cesium.KeyboardEventModifier.SHIFT);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.MOUSE_MOVE);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.MOUSE_MOVE, cesium.KeyboardEventModifier.SHIFT);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.LEFT_DOWN);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.LEFT_UP);
          sseh.removeInputAction(cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._handleDoubleClick = function(click) {
          this.selectedMeasurement.handleDoubleClick(click.position);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._handleClick = function(click, shift) {
          this.selectedMeasurement.handleClick(click.position, shift);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._clickShift = function(click) {
          this._handleClick(click, true);
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._click = function(click) {
          this._handleClick(click, false);
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._handleMouseMove = function(movement, shift) {
          this.selectedMeasurement.handleMouseMove(movement.endPosition, shift);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._mouseMove = function(movement) {
          this._handleMouseMove(movement, false);
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._mouseMoveShift = function(movement) {
          this._handleMouseMove(movement, true);
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._handleLeftDown = function(event) {
          this.selectedMeasurement.handleLeftDown(event.position);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @private
       */
      MeasurementMouseHandler.prototype._handleLeftUp = function(event) {
          this.selectedMeasurement.handleLeftUp(event.position);
          var scene = this._scene;
          if (scene.requestRenderMode) {
              scene.requestRender();
          }
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      MeasurementMouseHandler.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the mouse handler.
       */
      MeasurementMouseHandler.prototype.destroy = function() {
          this.deactivate();
          this._sseh.destroy();
          return cesium.destroyObject(this);
      };

  var positionScratch = new cesium.Cartesian3();
      var normalScratch$1 = new cesium.Cartesian3();
      var surfaceNormalScratch = new cesium.Cartesian3();

      var scratchCartesian2s = [new cesium.Cartesian2(), new cesium.Cartesian2(), new cesium.Cartesian2(), new cesium.Cartesian2()];
      var scratchCartesian3s = [new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3(), new cesium.Cartesian3()];

      /**
       * Computes the slope at a point defined by window coordinates.
       *
       * @param {Scene} scene The scene
       * @ionsdk
       * @param {Cartesian2} windowCoordinates The window coordinates
       * @returns {Number} The slope at the point relative to the ground between [0, PI/2].
       */
      function getSlope(scene, windowCoordinates) {
          cesium.Check.defined('scene', scene);
          cesium.Check.defined('windowCoordinates', windowCoordinates);

          var worldPosition = getSlope._getWorldPosition(scene, windowCoordinates, positionScratch);
          if (!cesium.defined(worldPosition)) {
              return;
          }

          var distanceCameraToPositionThreshold = 10000.0;
          var pixelOffset = 2;
          var offsetDistanceRatioThreshold = 0.05;

          var cameraPosition = scene.camera.position;
          var distanceCameraToPosition = cesium.Cartesian3.distance(worldPosition, cameraPosition);

          if (distanceCameraToPosition > distanceCameraToPositionThreshold) { // don't compute slope if camera is more than 10km away from point
              return;
          }

          var sc0 = scratchCartesian3s[0];
          var sc1 = scratchCartesian3s[1];
          var sc2 = scratchCartesian3s[2];
          var sc3 = scratchCartesian3s[3];

          var normal = scene.frameState.mapProjection.ellipsoid.geodeticSurfaceNormal(worldPosition, normalScratch$1);
          normal = cesium.Cartesian3.negate(normal, normal);

          var sampledWindowCoordinate0 = cesium.Cartesian2.clone(windowCoordinates, scratchCartesian2s[0]);
          sampledWindowCoordinate0.x -= pixelOffset;
          sampledWindowCoordinate0.y -= pixelOffset;

          var sampledWindowCoordinate1 = cesium.Cartesian2.clone(windowCoordinates, scratchCartesian2s[1]);
          sampledWindowCoordinate1.x -= pixelOffset;
          sampledWindowCoordinate1.y += pixelOffset;

          var sampledWindowCoordinate2 = cesium.Cartesian2.clone(windowCoordinates, scratchCartesian2s[2]);
          sampledWindowCoordinate2.x += pixelOffset;
          sampledWindowCoordinate2.y += pixelOffset;

          var sampledWindowCoordinate3 = cesium.Cartesian2.clone(windowCoordinates, scratchCartesian2s[3]);
          sampledWindowCoordinate3.x += pixelOffset;
          sampledWindowCoordinate3.y -= pixelOffset;

          var sPosition0 = getSlope._getWorldPosition(scene, sampledWindowCoordinate0, sc0);
          var sPosition1 = getSlope._getWorldPosition(scene, sampledWindowCoordinate1, sc1);
          var sPosition2 = getSlope._getWorldPosition(scene, sampledWindowCoordinate2, sc2);
          var sPosition3 = getSlope._getWorldPosition(scene, sampledWindowCoordinate3, sc3);

          var v0, v1, v2, v3;
          if (cesium.defined(sPosition0)) {
              var line0 = cesium.Cartesian3.subtract(sPosition0, worldPosition, sc0);
              var d0 = cesium.Cartesian3.magnitude(line0);
              v0 = (d0 / distanceCameraToPosition <= offsetDistanceRatioThreshold) ? cesium.Cartesian3.normalize(line0, sc0) : undefined;
          }

          if (cesium.defined(sPosition1)) {
              var line1 = cesium.Cartesian3.subtract(sPosition1, worldPosition, sc1);
              var d1 = cesium.Cartesian3.magnitude(line1);
              v1 = (d1 / distanceCameraToPosition <= offsetDistanceRatioThreshold) ? cesium.Cartesian3.normalize(line1, sc1) : undefined;
          }

          if (cesium.defined(sPosition2)) {
              var line2 = cesium.Cartesian3.subtract(sPosition2, worldPosition, sc2);
              var d2 = cesium.Cartesian3.magnitude(line2);
              v2 = (d2 / distanceCameraToPosition <= offsetDistanceRatioThreshold) ? cesium.Cartesian3.normalize(line2, sc2) : undefined;
          }

          if (cesium.defined(sPosition3)) {
              var line3 = cesium.Cartesian3.subtract(sPosition3, worldPosition, sc3);
              var d3 = cesium.Cartesian3.magnitude(line3);
              v3 = (d3 / distanceCameraToPosition <= offsetDistanceRatioThreshold) ? cesium.Cartesian3.normalize(line3, sc3) : undefined;
          }

          var surfaceNormal = cesium.Cartesian3.clone(cesium.Cartesian3.ZERO, surfaceNormalScratch);
          var scratchNormal = scratchCartesian3s[4];

          if (cesium.defined(v0) && cesium.defined(v1)) {
              scratchNormal = cesium.Cartesian3.normalize(cesium.Cartesian3.cross(v0, v1, scratchNormal), scratchNormal);
              surfaceNormal = cesium.Cartesian3.add(surfaceNormal, scratchNormal, surfaceNormal);
          }
          if (cesium.defined(v1) && cesium.defined(v2)) {
              scratchNormal = cesium.Cartesian3.normalize(cesium.Cartesian3.cross(v1, v2, scratchNormal), scratchNormal);
              surfaceNormal = cesium.Cartesian3.add(surfaceNormal, scratchNormal, surfaceNormal);
          }
          if (cesium.defined(v2) && cesium.defined(v3)) {
              scratchNormal = cesium.Cartesian3.normalize(cesium.Cartesian3.cross(v2, v3, scratchNormal), scratchNormal);
              surfaceNormal = cesium.Cartesian3.add(surfaceNormal, scratchNormal, surfaceNormal);
          }
          if (cesium.defined(v3) && cesium.defined(v0)) {
              scratchNormal = cesium.Cartesian3.normalize(cesium.Cartesian3.cross(v3, v0, scratchNormal), scratchNormal);
              surfaceNormal = cesium.Cartesian3.add(surfaceNormal, scratchNormal, surfaceNormal);
          }

          if (surfaceNormal.equals(cesium.Cartesian3.ZERO)) {
              return;
          }

          surfaceNormal = cesium.Cartesian3.normalize(surfaceNormal, surfaceNormal);

          return cesium.Math.asinClamped(Math.abs(Math.sin(cesium.Cartesian3.angleBetween(surfaceNormal, normal)))); // Always between 0 and PI/2.
      }

      // exposed for specs
      getSlope._getWorldPosition = getWorldPosition;

  var scratchCartesian = new cesium.Cartesian3();
  var scratchCartographic = new cesium.Cartographic();

  function getIcon$4(size) {
      return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                   <circle r="2.0788691" cy="281.90503" cx="15.212251"/>\n\
                 </g>\n\
               </svg>';
  }

  /**
   * Draws a point and the longitude, latitude, height, and slope of that point.
   *
   * @param {Object} options An object with the following properties:
   * @ionsdk
   * @param {Scene} options.scene The scene
   * @param {MeasureUnits} options.units The selected units of measurement
   * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
   * @param {PointPrimitiveCollection} options.points A collection for adding the point primitives
   * @param {LabelCollection} options.labels A collection for adding the labels
   * @param {PrimitiveCollection} options.primitives A collection for adding primitives
   *
   * @constructor
   * @alias PointMeasurement
   */
  function PointMeasurement(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      Measurement.call(this, options);

      this._point = this._pointCollection.add(MeasurementSettings.getPointOptions());
      this._label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.CENTER,
          pixelOffset : new cesium.Cartesian2(10, 0)
      }));

      this._position = new cesium.Cartesian3();
      this._height = 0.0;
      this._slope = 0.0;

      this._measurementResult = [];
      this._newMeasurement = new cesium.Event();
  }

  PointMeasurement.prototype = Object.create(Measurement.prototype);
  PointMeasurement.prototype.constructor = PointMeasurement;

  cesium.defineProperties(PointMeasurement.prototype, {
      /**
       * Gets the position.
       * @type {Cartesian3}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      position : {
          get : function() {
              return this._position;
          }
      },
      /**
       * Gets the height.
       * @type {Number}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      height : {
          get : function() {
              return this._height;
          }
      },
      /**
       * Gets the slope in radians.
       * @type {Number}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      slope : {
          get : function() {
              return this._slope;
          }
      },
      /**
       * Gets the icon.
       * @type {String}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      icon : {
          value : getIcon$4(15)
      },
      /**
       * Gets the thumbnail.
       * @type {String}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      thumbnail : {
          value : getIcon$4(25)
      },
      /**
       * Gets the type.
       * @type {String}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      type : {
          value : 'Point coordinates'
      },
      /**
       * Gets the instruction text.
       * @type {String[]}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      instructions : {
          value : [
              'Move the mouse to see the longitude, latitude and height of the point'
          ]
      },
      /**
       * Gets the id.
       * @type {String}
       * @memberof PointMeasurement.prototype
       * @readonly
       */
      id : {
          value : 'pointMeasurement'
      },
      measurementResult : {
          get : function () {
              return this._measurementResult;
          }
      },
      newMeasurement : {
          get : function () {
              return this._newMeasurement;
          }
      }
  });

  PointMeasurement.prototype._pickPositionSupported = function () {
      return this._scene.pickPositionSupported;
  };

  PointMeasurement.prototype._saveCurrentMeasurementAndPrepareNew = function () {
      this._measurementResult.push({
          point: this._point,
          label: this._label
      });

      this._newMeasurement.raiseEvent(this._measurementResult.length - 1);

      this._point = this._pointCollection.add(MeasurementSettings.getPointOptions());
      this._label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
          horizontalOrigin : cesium.HorizontalOrigin.LEFT,
          verticalOrigin : cesium.VerticalOrigin.CENTER,
          pixelOffset : new cesium.Cartesian2(10, 0)
      }));
  };

  PointMeasurement.prototype.handleClick = function(clickPosition) {
      var scene = this._scene;

      if (scene.mode === cesium.SceneMode.MORPHING) {
          return;
      }

      var position = PointMeasurement._getWorldPosition(scene, clickPosition, scratchCartesian);

      if (!cesium.defined(position)) {
          return;
      }

      this._label.show = false;
      this._point.show = false;

      this._point.position = position;

      var positionCartographic = scene.frameState.mapProjection.ellipsoid.cartesianToCartographic(position, scratchCartographic);
      var height = 0.0;
      if (cesium.defined(scene.globe)) {
          height = cesium.defaultValue(scene.globe.getHeight(positionCartographic), 0.0);
      }
      height = positionCartographic.height - height;
      if (cesium.Math.equalsEpsilon(height, 0.0, cesium.Math.EPSILON3)) {
          height = 0.0;
      }

      var slope;
      if (scene.mode !== cesium.SceneMode.SCENE2D) {
          slope = PointMeasurement._getSlope(scene, clickPosition, this._primitives);
      }

      this._point.show = true;

      var label = this._label;
      label.position = position;
      label.show = true;
      label.text = 'lon: ' + MeasureUnits.angleToString(positionCartographic.longitude, AngleUnits$1.DEGREES_MINUTES_SECONDS, this._selectedLocale) + '\n' +
          'lat: ' + MeasureUnits.angleToString(positionCartographic.latitude, AngleUnits$1.DEGREES_MINUTES_SECONDS, this._selectedLocale);

      if (scene.mode !== cesium.SceneMode.SCENE2D && this._pickPositionSupported()) {
          label.text += '\nheight: ' + MeasureUnits.distanceToString(height, this._selectedUnits.distanceUnits, this._selectedLocale);
          if (cesium.defined(slope)) {
              label.text += '\nslope: ' + MeasureUnits.angleToString(slope, this._selectedUnits.slopeUnits, this._selectedLocale, 3);
          }
      }

      this._position = cesium.Cartesian3.clone(position, this._position);
      this._height = height;
      this._slope = slope;

      this._saveCurrentMeasurementAndPrepareNew();
  };

  /**
   * Handles drawing on mouse move.
   */
  PointMeasurement.prototype.handleMouseMove = function(movePosition) {
      if(this._point === null)
          return;

      var scene = this._scene;

      this._label.show = false;
      this._point.show = false;

      if (scene.mode === cesium.SceneMode.MORPHING) {
          return;
      }

      this._point.show = false;

      var position = PointMeasurement._getWorldPosition(scene, movePosition, scratchCartesian);
      if (!cesium.defined(position)) {
          return;
      }

      this._point.position = position;

      var positionCartographic = scene.frameState.mapProjection.ellipsoid.cartesianToCartographic(position, scratchCartographic);
      var height = 0.0;
      if (cesium.defined(scene.globe)) {
          height = cesium.defaultValue(scene.globe.getHeight(positionCartographic), 0.0);
      }
      height = positionCartographic.height - height;
      if (cesium.Math.equalsEpsilon(height, 0.0, cesium.Math.EPSILON3)) {
          height = 0.0;
      }

      var slope;
      if (scene.mode !== cesium.SceneMode.SCENE2D) {
          slope = PointMeasurement._getSlope(scene, movePosition, this._primitives);
      }

      this._point.show = true;

      var label = this._label;
      label.position = position;
      label.show = true;
      label.text = 'lon: ' + MeasureUnits.angleToString(positionCartographic.longitude, AngleUnits$1.DEGREES_MINUTES_SECONDS, this._selectedLocale) + '\n' +
          'lat: ' + MeasureUnits.angleToString(positionCartographic.latitude, AngleUnits$1.DEGREES_MINUTES_SECONDS, this._selectedLocale);

      if (scene.mode !== cesium.SceneMode.SCENE2D && this._pickPositionSupported()) {
          label.text += '\nheight: ' + MeasureUnits.distanceToString(height, this._selectedUnits.distanceUnits, this._selectedLocale);
          if (cesium.defined(slope)) {
              label.text += '\nslope: ' + MeasureUnits.angleToString(slope, this._selectedUnits.slopeUnits, this._selectedLocale, 3);
          }
      }

      this._position = cesium.Cartesian3.clone(position, this._position);
      this._height = height;
      this._slope = slope;
  };

  /**
   * Resets the widget.
   */
  PointMeasurement.prototype.reset = function() {
      this._position = cesium.Cartesian3.clone(cesium.Cartesian3.ZERO, this._position);
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  PointMeasurement.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the measurement.
   */
  PointMeasurement.prototype.destroy = function() {
      for (var i = 0; i < this._measurementResult; i++) {
          this._pointCollection.remove(this._measurementResult[i].point);
          this._labelCollection.remove(this._measurementResult[i].label);
      }

      return cesium.destroyObject(this);
  };

  // exposed for specs
  PointMeasurement._getSlope = getSlope;
  PointMeasurement._getWorldPosition = getWorldPosition;

  var cart2Scratch1$3 = new cesium.Cartesian2();
  var cart2Scratch2$3 = new cesium.Cartesian2();
  var cart2Scratch3$1 = new cesium.Cartesian2();

  var scratch$1 = new cesium.Cartesian3();

  /**
   * @private
   * @ionsdk
   */
  function PolylineMeasurementDrawing(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      //>>includeStart('debug', pragmas.debug);
      cesium.Check.defined('options.scene', options.scene);
      cesium.Check.defined('options.primitives', options.primitives);
      cesium.Check.defined('options.units', options.units);
      cesium.Check.defined('options.points', options.points);
      cesium.Check.defined('options.labels', options.labels);
      //>>includeEnd('debug');

      options.polylineOptions = MeasurementSettings.getPolylineOptions({
          ellipsoid : options.ellipsoid
      });
      options.pointOptions = MeasurementSettings.getPointOptions();
      PolylineDrawing.call(this, options);

      var scene = this._scene;
      var labels = options.labels;
      this._labelCollection = labels;
      this._label = labels.add(MeasurementSettings.getLabelOptions());
      this._segmentLabels = [];
      this._selectedUnits = options.units;
      this._selectedLocale = options.locale;
      this._previousDistance = 0;
      this._distance = 0;

      var that = this;
      this._removeEvent = scene.preRender.addEventListener(function() {
          that.updateLabel();
      });

      this._measurementResult = [];
  }

  PolylineMeasurementDrawing.prototype = Object.create(PolylineDrawing.prototype);
  PolylineMeasurementDrawing.prototype.constructor = PolylineMeasurementDrawing;

  cesium.defineProperties(PolylineMeasurementDrawing.prototype, {
      /**
       * Gets the distance in meters.
       * @type {Number}
       * @memberof PolylineMeasurementDrawing.prototype
       * @readonly
       */
      distance : {
          get : function() {
              return this._distance;
          }
      }
  });

  /**
   * Updates the label position.
   * @private
   */
  PolylineMeasurementDrawing.prototype.updateLabel = function() {
      var positions = this._positions;
      if (positions.length < 2) {
          return;
      }
      if (this._segmentLabels.length < 1) {
          return;
      }
      var scene = this._scene;
      var top = positions[0];
      var pos2d = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, top, cart2Scratch1$3);
      var lastScreenPos = cesium.defined(pos2d) ? cesium.Cartesian2.clone(pos2d, cart2Scratch3$1) : cesium.Cartesian2.fromElements(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, cart2Scratch3$1);
      var topY = lastScreenPos.y;
      var labels = this._segmentLabels;
      labels[0].show = this._polyline.positions.length > 2;
      for (var i = 1; i < positions.length; i++) {
          var nextScreenPos = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, positions[i], cart2Scratch2$3);
          if (!cesium.defined(nextScreenPos)) {
              continue;
          }

          var m = (lastScreenPos.y - nextScreenPos.y) / (nextScreenPos.x - lastScreenPos.x);
          var label = labels[i - 1];
          if (m > 0) {
              label.horizontalOrigin = cesium.HorizontalOrigin.LEFT;
          } else {
              label.horizontalOrigin = cesium.HorizontalOrigin.RIGHT;
          }

          if (nextScreenPos.y < topY) {
              topY = nextScreenPos.y;
              top = positions[i];
          }
          lastScreenPos = cesium.Cartesian2.clone(nextScreenPos, lastScreenPos);
      }
      if (this._mode === DrawingMode$1.AfterDraw) {
          this._label.position = top;
      }
  };

  /**
   * Adds a point to the polyline.
   * @param {Cartesian3} position The position to add
   * @private
   */
  PolylineMeasurementDrawing.prototype.addPoint = function(position) {
      var positions = this._positions;
      if (positions.length > 0) {
          // store distance that was calculated on mouse move
          this._previousDistance = this._distance;

          var label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
              scale : 0.8,
              horizontalOrigin : cesium.HorizontalOrigin.LEFT,
              verticalOrigin : cesium.VerticalOrigin.TOP,
              pixelOffset : new cesium.Cartesian2(5, 5)
          }));
          var p1 = positions[positions.length - 1];
          label.position = cesium.Cartesian3.midpoint(p1, position, new cesium.Cartesian3());
          label.text = MeasureUnits.distanceToString(cesium.Cartesian3.distance(p1, position), this._selectedUnits.distanceUnits, this._selectedLocale);
          label.show = true;
          this._segmentLabels.push(label);
      }
      PolylineDrawing.prototype.addPoint.call(this, position);
  };

  /**
   * Handles click events while drawing a polyline.
   * @param {Cartesian2} clickPosition The click position
   */
  PolylineMeasurementDrawing.prototype.handleClick = function(clickPosition) {
      if (this._mode === DrawingMode$1.AfterDraw) {
          this.reset();
      }
      var position = PolylineDrawing.prototype.handleClick.call(this, clickPosition);
      if (cesium.defined(position)) {
          this._label.show = true;
          this._polyline.show = true;
      }
  };

  /**
   * Handles mouse move events while drawing a polyline.
   * @param {Cartesian2} mousePosition The mouse position
   */
  PolylineMeasurementDrawing.prototype.handleMouseMove = function(mousePosition) {
      var nextPos = PolylineDrawing.prototype.handleMouseMove.call(this, mousePosition);
      if (!cesium.defined(nextPos)) {
          return;
      }

      var pos1 = this._positions[this._positions.length - 1];
      var pos2 = nextPos;
      var vec = cesium.Cartesian3.subtract(pos2, pos1, scratch$1);
      var distance = this._previousDistance + cesium.Cartesian3.magnitude(vec);

      var label = this._label;
      label.position = pos2;
      label.text = MeasureUnits.distanceToString(distance, this._selectedUnits.distanceUnits, this._selectedLocale);
      label.show = true;

      this._distance = distance;
  };

  /**
   * Resets the widget.
   */
  PolylineMeasurementDrawing.prototype.reset = function() {
      this._label.show = false;
      this._label.text = '';
      this._positions = [];
      this._polyline.positions = [];
      this._polyline.show = false;
      this._previousDistance = 0;
      this._distance = 0;

      var i;
      var points = this._points;
      var pointCollection = this._pointCollection;
      for (i = 0; i < points.length; i++) {
          pointCollection.remove(points[i]);
      }
      points.length = 0;

      var labelCollection = this._labelCollection;
      var labels = this._segmentLabels;
      for (i = 0; i < labels.length; i++) {
          labelCollection.remove(labels[i]);
      }
      labels.length = 0;

      this._mode = DrawingMode$1.BeforeDraw;
      this._lastClickPosition.x = Number.POSITIVE_INFINITY;
      this._lastClickPosition.y = Number.POSITIVE_INFINITY;
  };

  /**
   * Destroys the widget.
   */
  PolylineMeasurementDrawing.prototype.destroy = function() {
      this._removeEvent();

      var labelCollection = this._labelCollection;
      labelCollection.remove(this._label);
      var labels = this._segmentLabels;
      for (var i = 0; i < labels.length; i++) {
          labelCollection.remove(labels[i]);
      }

      PolylineDrawing.prototype.destroy.call(this);
  };

  PolylineMeasurementDrawing.prototype.handleDoubleClick = function() {
      PolylineDrawing.prototype.handleDoubleClick.call(this);

      this._saveCurrentMeasurementAndPrepareNew();
  };

  PolylineMeasurementDrawing.prototype._saveCurrentMeasurementAndPrepareNew = function () {
      //we save current measurement and prepare new fresh

      this._measurementResult.push({
          label: this._label,
          segmentLabels: this._segmentLabels,
          polyline: this._polyline,
          points: this._points
      });

      this._label =  this._labelCollection.add(MeasurementSettings.getLabelOptions());
      this._segmentLabels = [];
      this._polyline = PolylineDrawing.prototype.newPolyline.call(this);
      this._points = [];
  };

  function getIcon$5(size) {
      return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                  <g transform="translate(0,-267)">\n\
                   <circle cx="3.8532958" cy="293.99896" r="2.0788691" />\n\
                   <circle cx="7.2651663" cy="276.26389" r="2.0788691" />\n\
                   <circle cx="24.571842" cy="285.56577" r="2.0788691" />\n\
                   <circle cx="26.916754" cy="270.38345" r="2.0788691" />\n\
                   <path d="m 3.7523356,294.14823 3.602242,-17.81109 17.3608064,9.35582 2.401494,-15.00934" />\n\
                 </g>\n\
               </svg>';
  }

  /**
   * Creates an multi-line distance measurement.
   * @alias PolylineMeasurement
   * @ionsdk
   *
   * @param {Object} options An object with the following properties:
   * @param {Scene} options.scene The scene
   * @param {MeasureUnits} options.units The selected units of measurement
   * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
   * @param {PrimitiveCollection} options.primitives A collection in which to store the measurement primitives
   * @param {LabelCollection} options.labels A collection in which to add the labels
   * @param {PointPrimitiveCollection} options.points A collection in which to add points
   *
   * @constructor
   */
  function PolylineMeasurement(options) {
      options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
      Measurement.call(this, options);

      this._drawing = new PolylineMeasurementDrawing(options);
      this._newMeasurement = new cesium.Event();
  }

  PolylineMeasurement.prototype = Object.create(Measurement.prototype);
  PolylineMeasurement.prototype.constructor = PolylineMeasurement;

  cesium.defineProperties(PolylineMeasurement.prototype, {
      /**
       * Gets the distance in meters.
       * @type {Number}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      distance : {
          get : function() {
              return this._drawing.distance;
          }
      },
      /**
       * Gets the icon.
       * @type {String}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      icon : {
          value : getIcon$5(15)
      },
      /**
       * Gets the thumbnail.
       * @type {String}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      thumbnail : {
          value : getIcon$5(25)
      },
      /**
       * Gets the type.
       * @type {String}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      type : {
          value : 'Polyline Distance'
      },
      /**
       * Gets the instruction text.
       * @type {String[]}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      instructions : {
          value : [
              'Click to start drawing a polyline',
              'Keep clicking to add more points',
              'Double click to finish drawing'
          ]
      },
      /**
       * Gets the id.
       * @type {String}
       * @memberof PolylineMeasurement.prototype
       * @readonly
       */
      id : {
          value : 'polylineMeasurement'
      },
      measurementResult : {
          get : function () {
              return this._drawing._measurementResult;
          }
      },
      newMeasurement : {
          get : function () {
              return this._newMeasurement;
          }
      }
  });

  /**
   * Ends drawing on double click.
   */
  PolylineMeasurement.prototype.handleDoubleClick = function() {
      this._drawing.handleDoubleClick();

      this._newMeasurement.raiseEvent(this._drawing._measurementResult.length - 1);
  };

  /**
   * Handles click events while drawing a polyline.
   * @param {Cartesian2} clickPosition The click position
   */
  PolylineMeasurement.prototype.handleClick = function(clickPosition) {
      this._drawing.handleClick(clickPosition);
  };

  /**
   * Handles mouse move events while drawing a polyline.
   * @param {Cartesian2} mousePosition The mouse position
   */
  PolylineMeasurement.prototype.handleMouseMove = function(mousePosition) {
      this._drawing.handleMouseMove(mousePosition);
  };

  /**
   * Resets the widget.
   */
  PolylineMeasurement.prototype.reset = function() {
      this._drawing.reset();
  };

  /**
   * @returns {Boolean} true if the object has been destroyed, false otherwise.
   */
  PolylineMeasurement.prototype.isDestroyed = function() {
      return false;
  };

  /**
   * Destroys the widget.
   */
  PolylineMeasurement.prototype.destroy = function() {
      this._drawing.destroy();

      return cesium.destroyObject(this);
  };

  var Mode$1 = {
          BeforeDraw : 0,
          Drawing : 1,
          AfterDraw : 2
      };

      var scratch$2 = new cesium.Cartesian3();
      var cart2 = new cesium.Cartesian2();
      var normalScratch$2 = new cesium.Cartesian3();
      var v1 = new cesium.Cartesian3();
      var rayScratch$5 = new cesium.Ray();
      var positionScratch$1 = new cesium.Cartesian3();
      var scratchCarto$2 = new cesium.Cartographic();

      function getIcon$6(size) {
          return '<svg viewBox="0 0 30 30" height="' + size + 'px" width="' + size + 'px">\n\
                 <g transform="translate(0,-267)">\n\
                   <path d="m 15.042838,272.34414 -0.0497,18.93758"/>\n\
                   <circle r="2.0788691" cy="270.01154" cx="15.078616"/>\n\
                   <circle r="2.0788691" cy="293.97095" cx="15.092237"/>\n\
                 </g>\n\
               </svg>';
      }

      function getHeightPosition(measurement, mousePos) {
          var positions = measurement._positions;
          var pos0 = positions[0];
          var pos1 = positions[1];
          var plane = measurement._draggingPlane;
          var normal = measurement._surfaceNormal;
          var scene = measurement._scene;
          var camera = scene.camera;
          var cameraDirection = camera.direction;
          var ellipsoid = scene.frameState.mapProjection.ellipsoid;

          var planePoint = pos0;
          var surfaceNormal = normal;

          if (scene.mode === cesium.SceneMode.COLUMBUS_VIEW) {
              surfaceNormal = cesium.Cartesian3.UNIT_X;
              var cartoPos = ellipsoid.cartesianToCartographic(pos0, scratchCarto$2);
              planePoint = scene.mapProjection.project(cartoPos, scratch$2);
              cesium.Cartesian3.fromElements(planePoint.z, planePoint.x, planePoint.y, planePoint);
          }

          var planeNormal = cesium.Cartesian3.cross(surfaceNormal, cameraDirection, normalScratch$2);
          planeNormal = cesium.Cartesian3.cross(surfaceNormal, planeNormal, planeNormal);
          planeNormal = cesium.Cartesian3.normalize(planeNormal, planeNormal);
          plane = cesium.Plane.fromPointNormal(planePoint, planeNormal, plane);
          var ray = camera.getPickRay(mousePos, rayScratch$5);

          pos1 = cesium.IntersectionTests.rayPlane(ray, plane, pos1);
          if (!cesium.defined(pos1)) {
              return;
          }

          if (scene.mode === cesium.SceneMode.COLUMBUS_VIEW) {
              pos1 = cesium.Cartesian3.fromElements(pos1.y, pos1.z, pos1.x, pos1);
              var carto = scene.mapProjection.unproject(pos1, scratchCarto$2);
              pos1 = ellipsoid.cartographicToCartesian(carto, pos1);
          }

          var screenPos = cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, positions[0], cart2);
          if (screenPos.y < mousePos.y) {
              normal = cesium.Cartesian3.negate(normal, normalScratch$2);
          }
          v1 = cesium.Cartesian3.subtract(pos1, pos0, v1);
          v1 = cesium.Cartesian3.projectVector(v1, normal, v1);
          pos1 = cesium.Cartesian3.add(pos0, v1, pos1);
          return pos1;
      }

      /**
       * Draws a measurement between two points that only differ in height.
       *
       * @param {Object} options An object with the following properties:
       * @ionsdk
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} options.units The selected units of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PointPrimitiveCollection} options.points A collection for adding the point primitives
       * @param {LabelCollection} options.labels A collection for adding the labels
       * @param {PrimitiveCollection} options.primitives A collection for adding primitives
       *
       * @constructor
       * @alias VerticalMeasurement
       */
      function VerticalMeasurement(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          Measurement.call(this, options);

          var pointCollection = this._pointCollection;
          var positions = [new cesium.Cartesian3(), new cesium.Cartesian3()];

          this._startPoint = pointCollection.add(MeasurementSettings.getPointOptions());
          this._endPoint = pointCollection.add(MeasurementSettings.getPointOptions());

          this._positions = positions;
          this._polyline = this._primitives.add(new PolylinePrimitive(MeasurementSettings.getPolylineOptions({
              ellipsoid : this._scene.frameState.mapProjection.ellipsoid,
              positions : positions
          })));

          this._label = this._labelCollection.add(MeasurementSettings.getLabelOptions({
              horizontalOrigin : cesium.HorizontalOrigin.LEFT,
              verticalOrigin : cesium.VerticalOrigin.TOP,
              pixelOffset : new cesium.Cartesian2(10, 10)
          }));

          this._mode = Mode$1.BeforeDraw;
          this._draggingPlane = new cesium.Plane(cesium.Cartesian3.UNIT_X, 0);
          this._surfaceNormal = new cesium.Cartesian3();
          this._distance = 0;
      }

      VerticalMeasurement.prototype = Object.create(Measurement.prototype);
      VerticalMeasurement.prototype.constructor = VerticalMeasurement;

      cesium.defineProperties(VerticalMeasurement.prototype, {
          /**
           * Gets the distance.
           * @type {Number}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          distance : {
              get : function() {
                  return this._distance;
              }
          },
          /**
           * Gets the type.
           * @type {String}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          type : {
              value : 'Vertical distance'
          },
          /**
           * Gets the icon.
           * @type {String}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          icon : {
              value : getIcon$6(15)
          },
          /**
           * Gets the thumbnail.
           * @type {String}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          thumbnail : {
              value : getIcon$6(25)
          },
          /**
           * Gets the instruction text.
           * @type {String[]}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          instructions : {
              value : [
                  'Click on the point cloud or the globe to set the start point',
                  'Move the mouse to drag the line',
                  'Click again to set the end point',
                  'To make a new measurement, click to clear the previous measurement'
              ]
          },
          /**
           * Gets the id.
           * @type {String}
           * @memberof VerticalMeasurement.prototype
           * @readonly
           */
          id : {
              value : 'verticalMeasurement'
          }
      });

      /**
       * Handles click events while drawing a vertical measurement.
       * @param {Cartesian2} clickPosition The click position
       */
      VerticalMeasurement.prototype.handleClick = function(clickPosition) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('clickPosition', clickPosition);
          //>>includeEnd('debug');

          var scene = this._scene;
          var ellipsoid = scene.frameState.mapProjection.ellipsoid;
          if (this._mode === Mode$1.AfterDraw) {
              this.reset();
          }

          var mode = this._mode;
          var positions = this._positions;
          if (mode === Mode$1.BeforeDraw) {
              var pos = VerticalMeasurement._getWorldPosition(scene, clickPosition, positions[0]);
              if (!cesium.defined(pos)) {
                  return;
              }
              this._polyline.show = true;
              positions[0] = cesium.Cartesian3.clone(pos, positions[0]);
              positions[1] = cesium.Cartesian3.clone(pos, positions[1]);
              this._startPoint.position = pos;
              this._startPoint.show = true;
              this._mode = Mode$1.Drawing;
              this._polyline.positions = positions;
              this._surfaceNormal = ellipsoid.geodeticSurfaceNormal(pos, this._surfaceNormal);
          } else if (mode === Mode$1.Drawing) {
              this._endPoint.position = positions[1];
              this._endPoint.show = true;
              this._mode = Mode$1.AfterDraw;
          }
      };

      /**
       * Handles mouse movement while drawing a vertical measurement.
       * @param {Cartesian2} mousePosition The mouse position
       */
      VerticalMeasurement.prototype.handleMouseMove = function(mousePosition) {
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('mousePosition', mousePosition);
          //>>includeEnd('debug');

          if (this._mode !== Mode$1.Drawing) {
              return;
          }

          var label = this._label;
          if (this._scene.mode === cesium.SceneMode.SCENE2D) {
              label.position = this._positions[0];
              label.text = MeasureUnits.distanceToString(0, this._selectedUnits.distanceUnits, this._selectedLocale);
              label.show = true;
              this._mode = Mode$1.AfterDraw;
              return;
          }
          var pos = VerticalMeasurement._getHeightPosition(this, mousePosition);
          if (!cesium.defined(pos)) {
              return;
          }

          var positions = this._positions;
          var pos1 = positions[0];
          var pos2 = positions[1];

          var vec = cesium.Cartesian3.subtract(pos2, pos1, scratch$2);
          var distance = cesium.Cartesian3.magnitude(vec);

          label.position = cesium.Cartesian3.midpoint(pos1, pos2, positionScratch$1);
          label.text = MeasureUnits.distanceToString(distance, this._selectedUnits.distanceUnits, this._selectedLocale);
          label.show = true;

          this._polyline.positions = positions; //triggers polyline update
          this._distance = distance;
      };

      /**
       * Resets the measurement.
       */
      VerticalMeasurement.prototype.reset = function() {
          this._polyline.show = false;
          this._label.show = false;
          this._startPoint.show = false;
          this._endPoint.show = false;
          this._mode = Mode$1.BeforeDraw;
          this._distance = 0;
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      VerticalMeasurement.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the measurement.
       */
      VerticalMeasurement.prototype.destroy = function() {
          this._primitives.remove(this._polyline);
          var points = this._pointCollection;
          points.remove(this._startPoint);
          points.remove(this._endPoint);
          this._labelCollection.remove(this._label);

          return cesium.destroyObject(this);
      };

      // exposed for specs
      VerticalMeasurement._getWorldPosition = getWorldPosition;
      VerticalMeasurement._getHeightPosition = getHeightPosition;

  /**
       * A widget for making ephemeral measurements.
       * @alias MeasureViewModel
       * @ionsdk
       *
       * @param {Object} options An object with the following properties:
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} [options.units] The units of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PrimitiveCollection} [options.primitives] A collection in which to store the measurement primitives
       *
       * @constructor
       */
      function MeasureViewModel(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);

          var scene = options.scene;
          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.scene', scene);
          //>>includeEnd('debug');

          var units = cesium.defined(options.units) ? options.units : new MeasureUnits();
          var primitives = cesium.defined(options.primitives) ? options.primitives : scene.primitives.add(new cesium.PrimitiveCollection());
          var points = primitives.add(new cesium.PointPrimitiveCollection());
          var labels = primitives.add(new cesium.LabelCollection());

          var mouseHandler = new MeasurementMouseHandler(scene);
          var measurementOptions = {
              scene : scene,
              units : units,
              locale : options.locale,
              points : points,
              labels : labels,
              primitives : primitives
          };
          var componentOptions = cesium.clone(measurementOptions);
          componentOptions.showComponentLines = true;

          var measurements = [
              new DistanceMeasurement(measurementOptions),
              new DistanceMeasurement(componentOptions),
              new PolylineMeasurement(measurementOptions),
              new HorizontalMeasurement(measurementOptions),
              new VerticalMeasurement(measurementOptions),
              new HeightMeasurement(measurementOptions),
              new AreaMeasurement(measurementOptions),
              new PointMeasurement(measurementOptions)
          ];

          /**
           * Gets and sets whether the measurement toolbar is expanded.
           * @type {Boolean}
           * @default false
           */
          this.expanded = false;

          /**
           * Gets and sets whether the instructions are visible.
           * @type {Boolean}
           * @default false
           */
          this.instructionsVisible = false;

          /**
           * Gets or sets the currently selected measurement.  This property is observable.
           * @type {Measurement}
           * @default undefined
           */
          this.selectedMeasurement = undefined;
          var selectedMeasurement = cesium.knockout.observable();
          cesium.knockout.defineProperty(this, 'selectedMeasurement', {
              get : function() {
                  return selectedMeasurement();
              },
              set : function(value) {
                  var old = selectedMeasurement();
                  if (cesium.defined(old)) {
                      old.reset();
                  }
                  selectedMeasurement(value);
                  mouseHandler.selectedMeasurement = value;
                  if (scene.requestRenderMode) {
                      scene.requestRender();
                  }
              }
          });

          cesium.knockout.track(this, ['expanded', 'instructionsVisible']);

          this._measurements = measurements;
          this._units = units;
          this._mouseHandler = mouseHandler;
          this._primitives = primitives;

          this._scene = scene;

          this._removeListener = scene.morphStart.addEventListener(MeasureViewModel.prototype.onMorph, this);
      }

      cesium.defineProperties(MeasureViewModel.prototype, {
          /**
           * Gets the scene.
           * @type {Scene}
           * @memberof MeasureViewModel.prototype
           * @readonly
           */
          scene : {
              get : function() {
                  return this._scene;
              }
          },
          /**
           * Gets the array of available measurement types.
           * @type {Measurement[]}
           * @memberof MeasureViewModel.prototype
           * @readonly
           */
          measurements : {
              get : function() {
                  return this._measurements;
              }
          },
          /**
           * Gets the selected unit of measurement.
           * @type {MeasureUnits}
           * @memberof MeasureViewModel.prototype
           * @readonly
           */
          units : {
              get : function() {
                  return this._units;
              }
          }
      });

      /**
       * Toggles the state of the toolbar.
       */
      MeasureViewModel.prototype.toggleActive = function() {
          var expanded = this.expanded;
          if (!expanded) {
              this._activate();
          } else {
              this._deactivate();
          }
          this.expanded = !expanded;
      };

      /**
       * Toggles the visibility of the instructions panel.
       */
      MeasureViewModel.prototype.toggleInstructions = function() {
          this.instructionsVisible = !this.instructionsVisible;
      };

      /**
       * @private
       */
      MeasureViewModel.prototype._activate = function() {
          this._mouseHandler.activate();
          this.selectedMeasurement = this._measurements[0];
      };

      /**
       * @private
       */
      MeasureViewModel.prototype._deactivate = function() {
          this._mouseHandler.deactivate();
          this.selectedMeasurement = undefined;
          this.reset();
      };

      MeasureViewModel.prototype.onMorph = function(transitioner, oldMode, newMode, isMorphing) {
          this.reset();
      };

      /**
       * Resets the widget.
       */
      MeasureViewModel.prototype.reset = function() {
          this.instructionsVisible = false;
          this._measurements.forEach(function(measurement) {
              measurement.reset();
          });
      };

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      MeasureViewModel.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the widget view model.
       */
      MeasureViewModel.prototype.destroy = function() {
          this._deactivate();
          this._mouseHandler.destroy();
          this._measurements.forEach(function(measurement) {
              measurement.destroy();
          });
          this._scene.primitives.remove(this._primitives);
          return cesium.destroyObject(this);
      };

  var html$1 = '<div class="cesium-measure-toolbar" data-bind="css: {expanded: expanded}">\n\
                   <div class="cesium-measure-button cesium-measure-button-main" data-bind="click: toggleActive, attr: {title: expanded ? \'Collapse\' : \'Expand\'}">\n\
                       <svg width="25px" height="25px" viewBox="0 0 30 30">\
                          <path d="M 14.851122,11.545456 25.578177,0.95157924 29.306163,4.6249483 18.537701,15.246448 M 15.097088,18.640104 4.1531358,29.434698 0.62547531,25.653101 11.515909,14.853004"/>\
                          <path d="M 22.983411,26.662767 0.8350882,3.9632787 4.2110211,0.77972226 26.222602,23.217308 Z"/>\
                          <path d="m 23.126668,26.856584 5.906658,2.311965 -2.630951,-5.79394"/>\
                          <path d="M 3.8120758,6.6472825 7.2277612,3.4338416"/>\
                          <path d="M 5.2416124,27.76234 3.6377555,26.08552"/>\
                          <path d="M 7.0148521,26.015847 5.4109952,24.339027"/>\
                          <path d="M 8.9787697,24.078675 7.3749129,22.401855"/>\
                          <path d="M 10.974467,22.173284 9.3706099,20.496464"/>\
                          <path d="m 12.990856,20.120081 -1.603857,-1.67682"/>\
                          <path d="m 19.676091,13.638423 -1.603857,-1.67682"/>\
                          <path d="M 21.449331,11.89193 19.845474,10.21511"/>\
                          <path d="M 23.413248,9.9547586 21.809392,8.2779376"/>\
                          <path d="M 25.448671,7.9858073 23.805089,6.3725466"/>\
                          <path d="M 27.425335,5.9961636 25.765864,4.3670131"/>\
                    </svg>\
               </div>\n\
                   <!-- ko foreach: measurements -->\n\
                   <div class="cesium-measure-button" data-bind="click: function($data) { $parent.selectedMeasurement = $data; }, attr: {title: type}, css: {active: $data === $parent.selectedMeasurement}, html: thumbnail"></div>\n\
                   <!-- /ko -->\n\
                   <div class="cesium-measure-button cesium-measure-help" title="Settings and Help" data-bind="click: toggleInstructions, css: {active: instructionsVisible}">\n\
                       <svg width="20px" height="20px" viewBox="0 0 30 30">\
                            <g transform="translate(0,-267)">\
                            <g>\
                            <path d="M 16.891904,289.31984 H 11.7387 q -0.02021,-1.11147 -0.02021,-1.35398 0,-2.50587 0.828554,-4.12256 0.828555,-1.61669 3.314218,-3.63756 2.485663,-2.02086 2.970671,-2.64733 0.747719,-0.99022 0.747719,-2.18253 0,-1.65711 -1.33377,-2.82921 -1.313562,-1.19231 -3.556721,-1.19231 -2.162325,0 -3.617348,1.23273 -1.4550219,1.23272 -2.0006553,3.7588 l -5.2138301,-0.64667 q 0.2222951,-3.61735 3.0717138,-6.14343 2.8696274,-2.52608 7.5176156,-2.52608 4.890492,0 7.780328,2.5665 2.889836,2.54629 2.889836,5.94134 0,1.8794 -1.071058,3.55672 -1.05085,1.67732 -4.526737,4.56715 -1.798569,1.49544 -2.243159,2.40483 -0.424381,0.90939 -0.383964,3.25359 z m -5.153204,7.63887 v -5.67863 h 5.678629 v 5.67863 z" />\
                            </g>\
                            </g>\
                        </svg>\
                   </div>\n\
               </div>\n\
               <div class="cesium-measure-instructions" data-bind="visible: instructionsVisible">\n\
                   <!-- ko foreach: measurements -->\n\
                   <div><div class="cesium-measure-icon" data-bind="html: icon" style="display: inline"></div><span data-bind="text: type"></span></div>\n\
                   <ul data-bind="foreach: instructions">\n\
                       <li data-bind="text: $data"></li>\n\
                   </ul>\n\
                   <hr>\n\
                   <!-- /ko -->\n\
               </div>';

      /**
       * <span style="display: block; text-align: center;">
       * <img src="Images/Measure.png" width="348" height="44" alt="" />
       * <br />Measure toolbar expanded.
       * </span>
       * <br /><br />
       * Measure is a widget that allows users to make ephemeral measurements by clicking on the globe surface and on Cesium3DTiles and glTF models.
       *
       * <p>
       * Measurement types include:
       * <ul>
       * <li>
       * Area: Computes the area of an arbitrary polygon.  Note that the polygon area does not take into account the contours of terrain.
       * </li><li>
       * Distance: Computes a linear distance between two points.  Note that measurements on the earth do not conform to terrain.
       * </li><li>
       * Component Distance: Computes a linear distance between two points, with horizontal and vertical components and the angle of the line.  Note that measurements on the earth do not conform to terrain.
       * </li><li>
       * Height: Computes a linear distance between a point in space and the terrain below that point.  This value will always be 0 if activated in 2D mode.
       * </li><li>
       * Horizontal: Computes a linear distance between two points at the same height relative to the the WGS84 Ellipsoid.
       * </li><li>
       * Point: Displays the longitude and latitude coordinates and the height above terrain at a specified point in space.
       * </li><li>
       * Vertical: Computes a linear distance between two points with the same longitude/latitude but different heights.  This value will always be 0 if activated in 2D mode.
       * </li>
       * </ul>
       * </p>
       *
       * Note that drawing measurements on 3D tiles and models may not be supported by all browsers.  Check the tilesetMeasurementSupported to see
       * if it is supported.
       *
       * @ionsdk
       *
       * @see AreaMeasurement
       * @see DistanceMeasurement
       * @see HeightMeasurement
       * @see HorizontalMeasurement
       * @see PointMeasurement
       * @see VerticalMeasurement
       *
       * @alias Measure
       * @constructor
       *
       * @param {Object} options An object with the following properties
       * @param {String|Element} options.container The container for the widget
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} [options.units] The default unit of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       * @param {PrimitiveCollection} [options.primitives] A collection in which to store the measurement primitives
       *
       * @demo <a href="/Apps/Sandcastle/index.html?src=Measure%20Widget.html">Cesium Sandcastle Measure Widget Demo</a>
       *
       * @example
       * // In HTML head, include a link to the Measure.css stylesheet,
       * // and in the body, include: <div id="measureContainer"></div>
       * // Note: This code assumes you already have a Scene instance.
       *
       * var measureWidget = new Cesium.Measure({
       *      container : 'measureContainer',
       *      scene : scene,
       *      units : new Cesium.MeasureUnits({
       *          distanceUnits : Cesium.DistanceUnits.METERS,
       *          areaUnits : Cesium.AreaUnits.SQUARE_METERS,
       *          volumeUnits : Cesium.VolumeUnits.CUBIC_FEET,
       *          angleUnits : Cesium.AngleUnits.DEGREES,
       *          slopeUnits : Cesium.AngleUnits.GRADE
       *      })
       * });
       */
      function Measure(options) {
          options = cesium.defaultValue(options, cesium.defaultValue.EMPTY_OBJECT);
          var container = options.container;

          //>>includeStart('debug', pragmas.debug);
          cesium.Check.defined('options.container', container);
          cesium.Check.defined('options.scene', options.scene);
          //>>includeEnd('debug');

          var element = createDomNode(html$1);

          container = getElement(container);
          element = container.appendChild(element);

          var viewModel = new MeasureViewModel(options);

          cesium.knockout.applyBindings(viewModel, container);

          this._viewModel = viewModel;
          this._container = container;
          this._element = element;
          this._dropdown = element.getElementsByClassName('cesium-measure-instructions')[0];
      }

      cesium.defineProperties(Measure.prototype, {
          /**
           * Gets the parent container.
           * @memberof Measure.prototype
           *
           * @type {Element}
           * @readonly
           */
          container : {
              get : function() {
                  return this._container;
              }
          },

          /**
           * Gets the view model.
           * @memberof Measure.prototype
           *
           * @type {MeasureViewModel}
           * @readonly
           */
          viewModel : {
              get : function() {
                  return this._viewModel;
              }
          },

          /**
           * Gets whether drawing a measurement on a Cesium3DTileset or Model is supported
           * @memberof Measure.prototype
           *
           * @type {Boolean}
           * @readonly
           */
          tilesetMeasurementSupported : {
              get : function() {
                  return this._scene.pickPositionSupported;
              }
          }
      });

      /**
       * @returns {Boolean} true if the object has been destroyed, false otherwise.
       */
      Measure.prototype.isDestroyed = function() {
          return false;
      };

      /**
       * Destroys the widget.  Should be called if permanently
       * removing the widget from layout.
       */
      Measure.prototype.destroy = function() {
          this._viewModel.destroy();
          cesium.knockout.cleanNode(this._container);
          this._container.removeChild(this._element);

          return cesium.destroyObject(this);
      };

  /**
       * A mixin which adds the Measure widget to the Viewer widget.
       * Rather than being called directly, this function is normally passed as
       * a parameter to {@link Viewer#extend}, as shown in the example below.
       * @exports viewerMeasureMixin
       * @ionsdk
       *
       * @param {Viewer} viewer The viewer instance.
       * @param {Object} [options] An object with the following properties:
       * @param {String|Element} options.container The container for the widget
       * @param {Scene} options.scene The scene
       * @param {MeasureUnits} [options.units=MeasureUnits.METERS] The default unit of measurement
       * @param {String} [options.locale] The {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag} string customizing language-sensitive number formatting. If <code>undefined</code>, the runtime's default locale is used. See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl page on MDN}
       *
       * @exception {DeveloperError} viewer is required.
       *
       * @example
       * var viewer = new Cesium.Viewer('cesiumContainer');
       * viewer.extend(Cesium.viewerMeasureMixin);
       */
      function viewerMeasureMixin(viewer, options) {
          //>>includeStart('debug', pragmas.debug);
          if (!cesium.defined(viewer)) {
              throw new cesium.DeveloperError('viewer is required.');
          }
          //>>includeEnd('debug');

          options = cesium.defaultValue(options, {});
          var scene = viewer.scene;
          var cesiumMeasureContainer = document.createElement('div');
          cesiumMeasureContainer.className = 'cesium-viewer-measureContainer';
          viewer._toolbar.insertBefore(cesiumMeasureContainer, viewer._toolbar.firstChild);
          options = cesium.clone(options);
          options.container = cesiumMeasureContainer;
          options.scene = scene;
          var measure = new Measure(options);

          var removeListener = scene.postUpdate.addEventListener(function() {
              var panelMaxHeight = viewer._container.clientHeight - 125;
              measure._dropdown.style.maxHeight = panelMaxHeight + 'px';
          });

          viewer.destroy = cesium.wrapFunction(viewer, viewer.destroy, function() {
              removeListener();
              measure.destroy();
          });

          cesium.defineProperties(viewer, {
              measure : {
                  get : function() {
                      return measure;
                  }
              }
          });
      }

  function enableCesiumIonSDK() {
      window.Cesium.MeasurementMouseHandler = MeasurementMouseHandler;
      window.Cesium.DistanceMeasurement = DistanceMeasurement;
      window.Cesium.PolylineMeasurement = PolylineMeasurement;
      window.Cesium.HorizontalMeasurement = HorizontalMeasurement;
      window.Cesium.VerticalMeasurement = VerticalMeasurement;
      window.Cesium.HeightMeasurement = HeightMeasurement;
      window.Cesium.AreaMeasurement = AreaMeasurement;
      window.Cesium.PointMeasurement = PointMeasurement;

      window.Cesium.MeasureUnits = MeasureUnits;
      window.Cesium.DistanceUnits = DistanceUnits$1;
      window.Cesium.AreaUnits = VolumeUnits;
      window.Cesium.VolumeUnits = VolumeUnits;
      window.Cesium.TransformEditor = TransformEditor;
      window.Cesium.viewerMeasureMixin = viewerMeasureMixin;
  }

  // Copyright 2016 Google Inc.
  //
  //     Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  //     You may obtain a copy of the License at
  //
  // http://www.apache.org/licenses/LICENSE-2.0
  //
  //     Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  //     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  //     See the License for the specific language governing permissions and
  // limitations under the License.

  // This is a stripped down and specialized version of WebVR-UI
  // (https://github.com/googlevr/webvr-ui) that takes out most of the state
  // management in favor of providing a simple way of requesting entry into WebXR
  // for the needs of the sample pages. Functionality like beginning sessions
  // is intentionally left out so that the sample pages can demonstrate them more
  // clearly.

  //
  // State consts
  //

  // Not yet presenting, but ready to present
  const READY_TO_PRESENT = 'ready';

  // In presentation mode
  const PRESENTING = 'presenting';
  const PRESENTING_FULLSCREEN = 'presenting-fullscreen';

  // Checking device availability
  const PREPARING = 'preparing';

  // Errors
  const ERROR_NO_PRESENTABLE_DISPLAYS = 'error-no-presentable-displays';
  const ERROR_BROWSER_NOT_SUPPORTED = 'error-browser-not-supported';
  const ERROR_REQUEST_TO_PRESENT_REJECTED = 'error-request-to-present-rejected';
  const ERROR_EXIT_PRESENT_REJECTED = 'error-exit-present-rejected';
  const ERROR_REQUEST_STATE_CHANGE_REJECTED = 'error-request-state-change-rejected';
  const ERROR_UNKOWN = 'error-unkown';

  //
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
  const generateInnerHTML = (cssPrefix, height)=> {
    const logoHeight = height*_LOGO_SCALE;
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
  const injectCSS = (cssText)=> {
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
  const createDefaultView = (options)=> {
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


  const createXRIcon = (cssPrefix, height)=>{
    const el = document.createElement('div');
    el.innerHTML = generateXRIconString(cssPrefix, height);
    return el.firstChild;
  };

  const createNoXRIcon = (cssPrefix, height)=>{
    const el = document.createElement('div');
    el.innerHTML = generateNoXRIconString(cssPrefix, height);
    return el.firstChild;
  };

  const generateXRIconString = (cssPrefix, height)=> {
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

  const generateNoXRIconString = (cssPrefix, height)=>{
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
  const generateCSS = (options, fontSize=18)=> {
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

    return (`
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
        margin-left: ${height / 3 }px;
    }
    .${cssPrefix}-svg-error {
        fill: ${options.color};
        display:none;
        margin-top: ${(height - 28 / 18 * fontSize * _LOGO_SCALE) / 2 - 2}px;
        margin-left: ${height / 3 }px;
    }


    /*
    * Title
    */

    .${cssPrefix}-title {
        color: ${options.color};
        position: relative;
        font-size: ${fontSize}px;
        padding-left: ${height * 1.05}px;
        padding-right: ${(borderRadius - 10 < 5) ? height / 3 : borderRadius - 10}px;
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
  `);
  };

  //
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
      options.cssprefix = options.cssprefix || 'webvr-ui';

      // This reads VR as none of the samples are designed for other formats as of yet.
      options.textEnterXRTitle = options.textEnterXRTitle || 'ENTER VR';
      options.textXRNotFoundTitle = options.textXRNotFoundTitle || 'VR NOT FOUND';
      options.textExitXRTitle = options.textExitXRTitle || 'EXIT VR';

      options.onRequestSession = options.onRequestSession || (function() {});
      options.onEndSession = options.onEndSession || (function() {});

      options.injectCSS = options.injectCSS !== false;

      this.options = options;

      this._enabled = false;
      this.session = null;

      // Pass in your own domElement if you really dont want to use ours
      this.domElement = options.domElement || createDefaultView(options);
      this.__defaultDisplayStyle = this.domElement.style.display || 'initial';

      // Bind button click events to __onClick
      this.domElement.addEventListener('click', ()=> this.__onXRButtonClick());

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
      ifChild(this.domElement, this.options.cssprefix, 'title', (title)=> {
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
          requestPromise.catch((err) => {
            // Reaching this point indicates that the session request has failed
            // and we should communicate that to the user somehow.
            let errorMsg = `XRSession creation failed: ${err.message}`;
            this.setTooltip(errorMsg);
            console.error(errorMsg);

            // Disable the button momentarily to indicate there was an issue.
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
  const ifChild = (el, cssPrefix, suffix, fn)=> {
    const c = el.querySelector('.' + cssPrefix + '-' + suffix);
    c && fn(c);
  };

  /**
   * Common utilities
   * @module glMatrix
   */

  // Configuration Constants
  const EPSILON = 0.000001;
  let ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
  const RANDOM = Math.random;

  /**
   * Sets the type of array used when creating new vectors and matrices
   *
   * @param {Type} type Array type, such as Float32Array or Array
   */
  function setMatrixArrayType(type) {
    ARRAY_TYPE = type;
  }

  const degree = Math.PI / 180;

  /**
   * Convert Degree To Radian
   *
   * @param {Number} a Angle in Degrees
   */
  function toRadian(a) {
    return a * degree;
  }

  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   *
   * @param {Number} a The first number to test.
   * @param {Number} b The second number to test.
   * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
   */
  function equals(a, b) {
    return Math.abs(a - b) <= EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
  }

  /**
   * 2x2 Matrix
   * @module mat2
   */

  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */
  function create() {
    let out = new ARRAY_TYPE(4);
    if(ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
    }
    out[0] = 1;
    out[3] = 1;
    return out;
  }

  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {mat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */
  function clone(a) {
    let out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }

  /**
   * Copy the values from one mat2 to another
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }

  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} out the receiving matrix
   * @returns {mat2} out
   */
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }

  /**
   * Create a new mat2 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out A new 2x2 matrix
   */
  function fromValues(m00, m01, m10, m11) {
    let out = new ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }

  /**
   * Set the components of a mat2 to the given values
   *
   * @param {mat2} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out
   */
  function set(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }

  /**
   * Transpose the values of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
      let a1 = a[1];
      out[1] = a[2];
      out[2] = a1;
    } else {
      out[0] = a[0];
      out[1] = a[2];
      out[2] = a[1];
      out[3] = a[3];
    }

    return out;
  }

  /**
   * Inverts a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  function invert(out, a) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];

    // Calculate the determinant
    let det = a0 * a3 - a2 * a1;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
  }

  /**
   * Calculates the adjugate of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  function adjoint(out, a) {
    // Caching this value is nessecary if out == a
    let a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
  }

  /**
   * Calculates the determinant of a mat2
   *
   * @param {mat2} a the source matrix
   * @returns {Number} determinant of a
   */
  function determinant(a) {
    return a[0] * a[3] - a[2] * a[1];
  }

  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  function multiply(out, a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
  }

  /**
   * Rotates a mat2 by the given angle
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */
  function rotate(out, a, rad) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
  }

  /**
   * Scales the mat2 by the dimensions in the given vec2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2} out
   **/
  function scale(out, a, v) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
  }

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */
  function fromRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, vec);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2} out
   */
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
  }

  /**
   * Returns a string representation of a mat2
   *
   * @param {mat2} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  function str(a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }

  /**
   * Returns Frobenius norm of a mat2
   *
   * @param {mat2} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  function frob(a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
  }

  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {mat2} L the lower triangular matrix
   * @param {mat2} D the diagonal matrix
   * @param {mat2} U the upper triangular matrix
   * @param {mat2} a the input matrix to factorize
   */

  function LDU(L, D, U, a) {
    L[2] = a[2]/a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
  }

  /**
   * Adds two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function equals$1(a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2} out
   */
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }

  /**
   * Adds two mat2's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2} out the receiving vector
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2} out
   */
  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
  }

  /**
   * Alias for {@link mat2.multiply}
   * @function
   */
  const mul = multiply;

  /**
   * Alias for {@link mat2.subtract}
   * @function
   */
  const sub = subtract;

  /**
   * 2x3 Matrix
   * @module mat2d
   *
   * @description
   * A mat2d contains six elements defined as:
   * <pre>
   * [a, c, tx,
   *  b, d, ty]
   * </pre>
   * This is a short form for the 3x3 matrix:
   * <pre>
   * [a, c, tx,
   *  b, d, ty,
   *  0, 0, 1]
   * </pre>
   * The last row is ignored so the array is shorter and operations are faster.
   */

  /**
   * Creates a new identity mat2d
   *
   * @returns {mat2d} a new 2x3 matrix
   */
  function create$1() {
    let out = new ARRAY_TYPE(6);
    if(ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[4] = 0;
      out[5] = 0;
    }
    out[0] = 1;
    out[3] = 1;
    return out;
  }

  /**
   * Creates a new mat2d initialized with values from an existing matrix
   *
   * @param {mat2d} a matrix to clone
   * @returns {mat2d} a new 2x3 matrix
   */
  function clone$1(a) {
    let out = new ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }

  /**
   * Copy the values from one mat2d to another
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */
  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }

  /**
   * Set a mat2d to the identity matrix
   *
   * @param {mat2d} out the receiving matrix
   * @returns {mat2d} out
   */
  function identity$1(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
  }

  /**
   * Create a new mat2d with the given values
   *
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} A new mat2d
   */
  function fromValues$1(a, b, c, d, tx, ty) {
    let out = new ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }

  /**
   * Set the components of a mat2d to the given values
   *
   * @param {mat2d} out the receiving matrix
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} out
   */
  function set$1(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }

  /**
   * Inverts a mat2d
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */
  function invert$1(out, a) {
    let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
    let atx = a[4], aty = a[5];

    let det = aa * ad - ab * ac;
    if(!det){
      return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
  }

  /**
   * Calculates the determinant of a mat2d
   *
   * @param {mat2d} a the source matrix
   * @returns {Number} determinant of a
   */
  function determinant$1(a) {
    return a[0] * a[3] - a[1] * a[2];
  }

  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  function multiply$1(out, a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }

  /**
   * Rotates a mat2d by the given angle
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */
  function rotate$1(out, a, rad) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
  }

  /**
   * Scales the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2d} out
   **/
  function scale$1(out, a, v) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
  }

  /**
   * Translates the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to translate the matrix by
   * @returns {mat2d} out
   **/
  function translate(out, a, v) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
  }

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.rotate(dest, dest, rad);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */
  function fromRotation$1(out, rad) {
    let s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.scale(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2d} out
   */
  function fromScaling$1(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.translate(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat2d} out
   */
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }

  /**
   * Returns a string representation of a mat2d
   *
   * @param {mat2d} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  function str$1(a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
            a[3] + ', ' + a[4] + ', ' + a[5] + ')';
  }

  /**
   * Returns Frobenius norm of a mat2d
   *
   * @param {mat2d} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  function frob$1(a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
  }

  /**
   * Adds two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  function add$1(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
  }

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  function subtract$1(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2d} out
   */
  function multiplyScalar$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
  }

  /**
   * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2d} out the receiving vector
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2d} out
   */
  function multiplyScalarAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    return out;
  }

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function exactEquals$1(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function equals$2(a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
  }

  /**
   * Alias for {@link mat2d.multiply}
   * @function
   */
  const mul$1 = multiply$1;

  /**
   * Alias for {@link mat2d.subtract}
   * @function
   */
  const sub$1 = subtract$1;

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */
  function create$2() {
    let out = new ARRAY_TYPE(9);
    if(ARRAY_TYPE != Float32Array) {
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
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {mat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }

  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @param {mat3} a matrix to clone
   * @returns {mat3} a new 3x3 matrix
   */
  function clone$2(a) {
    let out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }

  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function copy$2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }

  /**
   * Create a new mat3 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} A new mat3
   */
  function fromValues$2(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    let out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }

  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} out
   */
  function set$2(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }

  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */
  function identity$2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * Transpose the values of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function transpose$1(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      let a01 = a[1], a02 = a[2], a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }

    return out;
  }

  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function invert$2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];

    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }

  /**
   * Calculates the adjugate of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  function adjoint$1(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
  }

  /**
   * Calculates the determinant of a mat3
   *
   * @param {mat3} a the source matrix
   * @returns {Number} determinant of a
   */
  function determinant$2(a) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }

  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  function multiply$2(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];

    let b00 = b[0], b01 = b[1], b02 = b[2];
    let b10 = b[3], b11 = b[4], b12 = b[5];
    let b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }

  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to translate
   * @param {vec2} v vector to translate by
   * @returns {mat3} out
   */
  function translate$1(out, a, v) {
    let a00 = a[0], a01 = a[1], a02 = a[2],
      a10 = a[3], a11 = a[4], a12 = a[5],
      a20 = a[6], a21 = a[7], a22 = a[8],
      x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }

  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */
  function rotate$2(out, a, rad) {
    let a00 = a[0], a01 = a[1], a02 = a[2],
      a10 = a[3], a11 = a[4], a12 = a[5],
      a20 = a[6], a21 = a[7], a22 = a[8],

      s = Math.sin(rad),
      c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  };

  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/
  function scale$2(out, a, v) {
    let x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat3} out
   */
  function fromTranslation$1(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */
  function fromRotation$2(out, rad) {
    let s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat3} out
   */
  function fromScaling$2(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * Copies the values from a mat2d into a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat2d} a the matrix to copy
   * @returns {mat3} out
   **/
  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }

  /**
  * Calculates a 3x3 matrix from the given quaternion
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {quat} q Quaternion to create matrix from
  *
  * @returns {mat3} out
  */
  function fromQuat(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
  }

  /**
  * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {mat4} a Mat4 to derive the normal matrix from
  *
  * @returns {mat3} out
  */
  function normalFromMat4(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
  }

  /**
   * Generates a 2D projection matrix with the given bounds
   *
   * @param {mat3} out mat3 frustum matrix will be written into
   * @param {number} width Width of your gl context
   * @param {number} height Height of gl context
   * @returns {mat3} out
   */
  function projection(out, width, height) {
      out[0] = 2 / width;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = -2 / height;
      out[5] = 0;
      out[6] = -1;
      out[7] = 1;
      out[8] = 1;
      return out;
  }

  /**
   * Returns a string representation of a mat3
   *
   * @param {mat3} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  function str$2(a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
            a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
            a[6] + ', ' + a[7] + ', ' + a[8] + ')';
  }

  /**
   * Returns Frobenius norm of a mat3
   *
   * @param {mat3} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  function frob$2(a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
  }

  /**
   * Adds two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  function add$2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  function subtract$2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }



  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat3} out
   */
  function multiplyScalar$2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }

  /**
   * Adds two mat3's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat3} out the receiving vector
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat3} out
   */
  function multiplyScalarAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
  }

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat3} a The first matrix.
   * @param {mat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function exactEquals$2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] &&
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat3} a The first matrix.
   * @param {mat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function equals$3(a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
  }

  /**
   * Alias for {@link mat3.multiply}
   * @function
   */
  const mul$2 = multiply$2;

  /**
   * Alias for {@link mat3.subtract}
   * @function
   */
  const sub$2 = subtract$2;

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */
  function create$3() {
    let out = new ARRAY_TYPE(16);
    if(ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {mat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */
  function clone$3(a) {
    let out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */
  function fromValues$3(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    let out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }

  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */
  function set$3(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }


  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function transpose$2(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      let a01 = a[1], a02 = a[2], a03 = a[3];
      let a12 = a[6], a13 = a[7];
      let a23 = a[11];

      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }

  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function invert$3(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
  }

  /**
   * Calculates the adjugate of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  function adjoint$2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
  }

  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} a the source matrix
   * @returns {Number} determinant of a
   */
  function determinant$3(a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }

  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  function multiply$3(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
  }

  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */
  function translate$2(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
      a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
      a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

      out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
      out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
      out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }

  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
  function scale$3(out, a, v) {
    let x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  function rotate$3(out, a, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (len < EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }

  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function rotateX(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }

  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function rotateY(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[4]  = a[4];
      out[5]  = a[5];
      out[6]  = a[6];
      out[7]  = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }

  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function rotateZ(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
      out[8]  = a[8];
      out[9]  = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */
  function fromTranslation$2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Scaling vector
   * @returns {mat4} out
   */
  function fromScaling$3(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  function fromRotation$3(out, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;

    if (len < EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function fromXRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function fromYRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  function fromZRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */
  function fromRotationTranslation(out, q, v) {
    // Quaternion math
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
  }

  /**
   * Creates a new mat4 from a dual quat.
   *
   * @param {mat4} out Matrix
   * @param {quat2} a Dual Quaternion
   * @returns {mat4} mat4 receiving operation result
   */
  function fromQuat2(out, a) {
    let translation = new ARRAY_TYPE(3);
    let bx = -a[0], by = -a[1], bz = -a[2], bw = a[3],
    ax = a[4], ay = a[5], az = a[6], aw = a[7];

    let magnitude = bx * bx + by * by + bz * bz + bw * bw;
    //Only scale if it makes sense
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
  }

  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
  }

  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  function getScaling(out, mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];

    out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
    out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
    out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

    return out;
  }

  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {mat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */
  function getRotation(out, mat) {
    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    let trace = mat[0] + mat[5] + mat[10];
    let S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (mat[6] - mat[9]) / S;
      out[1] = (mat[8] - mat[2]) / S;
      out[2] = (mat[1] - mat[4]) / S;
    } else if ((mat[0] > mat[5]) && (mat[0] > mat[10])) {
      S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
      out[3] = (mat[6] - mat[9]) / S;
      out[0] = 0.25 * S;
      out[1] = (mat[1] + mat[4]) / S;
      out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
      S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
      out[3] = (mat[8] - mat[2]) / S;
      out[0] = (mat[1] + mat[4]) / S;
      out[1] = 0.25 * S;
      out[2] = (mat[6] + mat[9]) / S;
    } else {
      S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
      out[3] = (mat[1] - mat[4]) / S;
      out[0] = (mat[8] + mat[2]) / S;
      out[1] = (mat[6] + mat[9]) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @returns {mat4} out
   */
  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
  }

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @param {vec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */
  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    let sx = s[0];
    let sy = s[1];
    let sz = s[2];

    let ox = o[0];
    let oy = o[1];
    let oz = o[2];

    let out0 = (1 - (yy + zz)) * sx;
    let out1 = (xy + wz) * sx;
    let out2 = (xz - wy) * sx;
    let out4 = (xy - wz) * sy;
    let out5 = (1 - (xx + zz)) * sy;
    let out6 = (yz + wx) * sy;
    let out8 = (xz + wy) * sz;
    let out9 = (yz - wx) * sz;
    let out10 = (1 - (xx + yy)) * sz;

    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;

    return out;
  }

  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */
  function fromQuat$1(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
  }

  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function frustum(out, left, right, bottom, top, near, far) {
    let rl = 1 / (right - left);
    let tb = 1 / (top - bottom);
    let nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
  }

  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */
  function perspective(out, fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = (2 * far * near) * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }

  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function perspectiveFromFieldOfView(out, fov, near, far) {
    let upTan = Math.tan(fov.upDegrees * Math.PI/180.0);
    let downTan = Math.tan(fov.downDegrees * Math.PI/180.0);
    let leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0);
    let rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0);
    let xScale = 2.0 / (leftTan + rightTan);
    let yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
  }

  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }

  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */
  function lookAt(out, eye, center, up) {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    let eyex = eye[0];
    let eyey = eye[1];
    let eyez = eye[2];
    let upx = up[0];
    let upy = up[1];
    let upz = up[2];
    let centerx = center[0];
    let centery = center[1];
    let centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON &&
        Math.abs(eyey - centery) < EPSILON &&
        Math.abs(eyez - centerz) < EPSILON) {
      return identity$3(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
  }

  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */
  function targetTo(out, eye, target, up) {
    let eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];

    let z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];

    let len = z0*z0 + z1*z1 + z2*z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    let x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;

    len = x0*x0 + x1*x1 + x2*x2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  };

  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  function str$3(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
            a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
            a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
            a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
  }

  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {mat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  function frob$3(a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
  }

  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  function add$3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  function subtract$3(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */
  function multiplyScalar$3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }

  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */
  function multiplyScalarAndAdd$3(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
  }

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function exactEquals$3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  function equals$4(a, b) {
    let a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3];
    let a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7];
    let a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11];
    let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    let b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3];
    let b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7];
    let b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11];
    let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
  }

  /**
   * Alias for {@link mat4.multiply}
   * @function
   */
  const mul$3 = multiply$3;

  /**
   * Alias for {@link mat4.subtract}
   * @function
   */
  const sub$3 = subtract$3;

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */
  function create$4() {
    let out = new ARRAY_TYPE(3);
    if(ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }

  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {vec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */
  function clone$4(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
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
    return Math.sqrt(x*x + y*y + z*z);
  }

  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */
  function fromValues$4(x, y, z) {
    let out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the source vector
   * @returns {vec3} out
   */
  function copy$4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }

  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */
  function set$4(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function add$4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function subtract$4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function multiply$4(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }

  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }

  /**
   * Math.ceil the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to ceil
   * @returns {vec3} out
   */
  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }

  /**
   * Math.floor the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to floor
   * @returns {vec3} out
   */
  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }

  /**
   * Returns the minimum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }

  /**
   * Returns the maximum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }

  /**
   * Math.round the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to round
   * @returns {vec3} out
   */
  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }

  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */
  function scale$4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }

  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */
  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
  }

  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
  }

  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x*x + y*y + z*z;
  }

  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x*x + y*y + z*z;
  }

  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to negate
   * @returns {vec3} out
   */
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }

  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to invert
   * @returns {vec3} out
   */
  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
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
    let len = x*x + y*y + z*z;
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
    let ax = a[0], ay = a[1], az = a[2];
    let bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }

  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */
  function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }

  /**
   * Performs a hermite interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */
  function hermite(out, a, b, c, d, t) {
    let factorTimes2 = t * t;
    let factor1 = factorTimes2 * (2 * t - 3) + 1;
    let factor2 = factorTimes2 * (t - 2) + t;
    let factor3 = factorTimes2 * (t - 1);
    let factor4 = factorTimes2 * (3 - 2 * t);

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
  }

  /**
   * Performs a bezier interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */
  function bezier(out, a, b, c, d, t) {
    let inverseFactor = 1 - t;
    let inverseFactorTimesTwo = inverseFactor * inverseFactor;
    let factorTimes2 = t * t;
    let factor1 = inverseFactorTimesTwo * inverseFactor;
    let factor2 = 3 * t * inverseFactorTimesTwo;
    let factor3 = 3 * factorTimes2 * inverseFactor;
    let factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
  }

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec3} out
   */
  function random(out, scale) {
    scale = scale || 1.0;

    let r = RANDOM() * 2.0 * Math.PI;
    let z = (RANDOM() * 2.0) - 1.0;
    let zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
  }

  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec3} out
   */
  function transformMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }

  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat3} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */
  function transformMat3(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }

  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */
  function transformQuat(out, a, q) {
      // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
      let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      let x = a[0], y = a[1], z = a[2];
      // var qvec = [qx, qy, qz];
      // var uv = vec3.cross([], qvec, a);
      let uvx = qy * z - qz * y,
          uvy = qz * x - qx * z,
          uvz = qx * y - qy * x;
      // var uuv = vec3.cross([], qvec, uv);
      let uuvx = qy * uvz - qz * uvy,
          uuvy = qz * uvx - qx * uvz,
          uuvz = qx * uvy - qy * uvx;
      // vec3.scale(uv, uv, 2 * w);
      let w2 = qw * 2;
      uvx *= w2;
      uvy *= w2;
      uvz *= w2;
      // vec3.scale(uuv, uuv, 2);
      uuvx *= 2;
      uuvy *= 2;
      uuvz *= 2;
      // return vec3.add(out, a, vec3.add(out, uv, uuv));
      out[0] = x + uvx + uuvx;
      out[1] = y + uvy + uuvy;
      out[2] = z + uvz + uuvz;
      return out;
  }

  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  function rotateX$1(out, a, b, c){
    let p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
    r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
  }

  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  function rotateY$1(out, a, b, c){
    let p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
    r[1] = p[1];
    r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
  }

  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  function rotateZ$1(out, a, b, c){
    let p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
    r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
  }

  /**
   * Get the angle between two 3D vectors
   * @param {vec3} a The first operand
   * @param {vec3} b The second operand
   * @returns {Number} The angle in radians
   */
  function angle(a, b) {
    let tempA = fromValues$4(a[0], a[1], a[2]);
    let tempB = fromValues$4(b[0], b[1], b[2]);

    normalize(tempA, tempA);
    normalize(tempB, tempB);

    let cosine = dot(tempA, tempB);

    if(cosine > 1.0) {
      return 0;
    }
    else if(cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }

  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} a vector to represent as a string
   * @returns {String} string representation of the vector
   */
  function str$4(a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
  }

  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function exactEquals$4(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function equals$5(a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2];
    let b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
  }

  /**
   * Alias for {@link vec3.subtract}
   * @function
   */
  const sub$4 = subtract$4;

  /**
   * Alias for {@link vec3.multiply}
   * @function
   */
  const mul$4 = multiply$4;

  /**
   * Alias for {@link vec3.divide}
   * @function
   */
  const div = divide;

  /**
   * Alias for {@link vec3.distance}
   * @function
   */
  const dist = distance;

  /**
   * Alias for {@link vec3.squaredDistance}
   * @function
   */
  const sqrDist = squaredDistance;

  /**
   * Alias for {@link vec3.length}
   * @function
   */
  const len = length;

  /**
   * Alias for {@link vec3.squaredLength}
   * @function
   */
  const sqrLen = squaredLength;

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
  const forEach = (function() {
    let vec = create$4();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 3;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
      }

      return a;
    };
  })();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  function create$5() {
    let out = new ARRAY_TYPE(4);
    if(ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }

  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */
  function clone$5(a) {
    let out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }

  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */
  function fromValues$5(x, y, z, w) {
    let out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */
  function copy$5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }

  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */
  function set$5(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function add$5(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function subtract$5(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }

  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function multiply$5(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
  }

  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function divide$1(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
  }

  /**
   * Math.ceil the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to ceil
   * @returns {vec4} out
   */
  function ceil$1(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
  }

  /**
   * Math.floor the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to floor
   * @returns {vec4} out
   */
  function floor$1(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
  }

  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function min$1(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
  }

  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function max$1(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
  }

  /**
   * Math.round the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to round
   * @returns {vec4} out
   */
  function round$1(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
  }

  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */
  function scale$5(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }

  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */
  function scaleAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
  }

  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance$1(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    let w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
  }

  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance$1(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    let w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
  }

  /**
   * Calculates the length of a vec4
   *
   * @param {vec4} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length$1(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
  }

  /**
   * Calculates the squared length of a vec4
   *
   * @param {vec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength$1(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    return x*x + y*y + z*z + w*w;
  }

  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to negate
   * @returns {vec4} out
   */
  function negate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
  }

  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to invert
   * @returns {vec4} out
   */
  function inverse$1(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
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
    let len = x*x + y*y + z*z + w*w;
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
   * Calculates the dot product of two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot$1(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */
  function lerp$1(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    let aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec4} out
   */
  function random$1(out, scale) {
    scale = scale || 1.0;

    // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;
    var v1, v2, v3, v4;
    var s1, s2;
    do {
      v1 = RANDOM() * 2 - 1;
      v2 = RANDOM() * 2 - 1;
      s1 = v1 * v1 + v2 * v2;
    } while (s1 >= 1);
    do {
      v3 = RANDOM() * 2 - 1;
      v4 = RANDOM() * 2 - 1;
      s2 = v3 * v3 + v4 * v4;
    } while (s2 >= 1);

    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale * v1;
    out[1] = scale * v2;
    out[2] = scale * v3 * d;
    out[3] = scale * v4 * d;
    return out;
  }

  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec4} out
   */
  function transformMat4$1(out, a, m) {
    let x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }

  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec4} out
   */
  function transformQuat$1(out, a, q) {
    let x = a[0], y = a[1], z = a[2];
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];

    // calculate quat * vec
    let ix = qw * x + qy * z - qz * y;
    let iy = qw * y + qz * x - qx * z;
    let iz = qw * z + qx * y - qy * x;
    let iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
  }

  /**
   * Returns a string representation of a vector
   *
   * @param {vec4} a vector to represent as a string
   * @returns {String} string representation of the vector
   */
  function str$5(a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }

  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function exactEquals$5(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function equals$6(a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
  }

  /**
   * Alias for {@link vec4.subtract}
   * @function
   */
  const sub$5 = subtract$5;

  /**
   * Alias for {@link vec4.multiply}
   * @function
   */
  const mul$5 = multiply$5;

  /**
   * Alias for {@link vec4.divide}
   * @function
   */
  const div$1 = divide$1;

  /**
   * Alias for {@link vec4.distance}
   * @function
   */
  const dist$1 = distance$1;

  /**
   * Alias for {@link vec4.squaredDistance}
   * @function
   */
  const sqrDist$1 = squaredDistance$1;

  /**
   * Alias for {@link vec4.length}
   * @function
   */
  const len$1 = length$1;

  /**
   * Alias for {@link vec4.squaredLength}
   * @function
   */
  const sqrLen$1 = squaredLength$1;

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
  const forEach$1 = (function() {
    let vec = create$5();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 4;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
      }

      return a;
    };
  })();

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */
  function create$6() {
    let out = new ARRAY_TYPE(4);
    if(ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }

  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */
  function identity$4(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
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
   * Gets the rotation axis and angle for a given
   *  quaternion. If a quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @param  {vec3} out_axis  Vector receiving the axis of rotation
   * @param  {quat} q     Quaternion to be decomposed
   * @return {Number}     Angle, in radians, of the rotation
   */
  function getAxisAngle(out_axis, q) {
    let rad = Math.acos(q[3]) * 2.0;
    let s = Math.sin(rad / 2.0);
    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }
    return rad;
  }

  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */
  function multiply$6(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
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
  function rotateX$2(out, a, rad) {
    rad *= 0.5;

    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = Math.sin(rad), bw = Math.cos(rad);

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
  function rotateY$2(out, a, rad) {
    rad *= 0.5;

    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }

  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  function rotateZ$2(out, a, rad) {
    rad *= 0.5;

    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }

  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate W component of
   * @returns {quat} out
   */
  function calculateW(out, a) {
    let x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
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
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
      cosom = -cosom;
      bx = - bx;
      by = - by;
      bz = - bz;
      bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > EPSILON ) {
      // standard case (slerp)
      omega  = Math.acos(cosom);
      sinom  = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  /**
   * Generates a random quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */
  function random$2(out) {
    // Implementation of http://planning.cs.uiuc.edu/node198.html
    // TODO: Calling random 3 times is probably not the fastest solution
    let u1 = RANDOM();
    let u2 = RANDOM();
    let u3 = RANDOM();

    let sqrt1MinusU1 = Math.sqrt(1 - u1);
    let sqrtU1 = Math.sqrt(u1);

    out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
    return out;
  }

  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate inverse of
   * @returns {quat} out
   */
  function invert$4(out, a) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let dot = a0*a0 + a1*a1 + a2*a2 + a3*a3;
    let invDot = dot ? 1.0/dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
  }

  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
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

    if ( fTrace > 0.0 ) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0);  // 2w
      out[3] = 0.5 * fRoot;
      fRoot = 0.5/fRoot;  // 1/(4w)
      out[0] = (m[5]-m[7])*fRoot;
      out[1] = (m[6]-m[2])*fRoot;
      out[2] = (m[1]-m[3])*fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if ( m[4] > m[0] )
        i = 1;
      if ( m[8] > m[i*3+i] )
        i = 2;
      let j = (i+1)%3;
      let k = (i+2)%3;

      fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
      out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
      out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }

    return out;
  }

  /**
   * Creates a quaternion from the given euler angle x, y, z.
   *
   * @param {quat} out the receiving quaternion
   * @param {x} Angle to rotate around X axis in degrees.
   * @param {y} Angle to rotate around Y axis in degrees.
   * @param {z} Angle to rotate around Z axis in degrees.
   * @returns {quat} out
   * @function
   */
  function fromEuler(out, x, y, z) {
      let halfToRad = 0.5 * Math.PI / 180.0;
      x *= halfToRad;
      y *= halfToRad;
      z *= halfToRad;

      let sx = Math.sin(x);
      let cx = Math.cos(x);
      let sy = Math.sin(y);
      let cy = Math.cos(y);
      let sz = Math.sin(z);
      let cz = Math.cos(z);

      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;

      return out;
  }

  /**
   * Returns a string representation of a quatenion
   *
   * @param {quat} a vector to represent as a string
   * @returns {String} string representation of the vector
   */
  function str$6(a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }

  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */
  const clone$6 = clone$5;

  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */
  const fromValues$6 = fromValues$5;

  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */
  const copy$6 = copy$5;

  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */
  const set$6 = set$5;

  /**
   * Adds two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   * @function
   */
  const add$6 = add$5;

  /**
   * Alias for {@link quat.multiply}
   * @function
   */
  const mul$6 = multiply$6;

  /**
   * Scales a quat by a scalar number
   *
   * @param {quat} out the receiving vector
   * @param {quat} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {quat} out
   * @function
   */
  const scale$6 = scale$5;

  /**
   * Calculates the dot product of two quat's
   *
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */
  const dot$2 = dot$1;

  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   * @function
   */
  const lerp$2 = lerp$1;

  /**
   * Calculates the length of a quat
   *
   * @param {quat} a vector to calculate length of
   * @returns {Number} length of a
   */
  const length$2 = length$1;

  /**
   * Alias for {@link quat.length}
   * @function
   */
  const len$2 = length$2;

  /**
   * Calculates the squared length of a quat
   *
   * @param {quat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */
  const squaredLength$2 = squaredLength$1;

  /**
   * Alias for {@link quat.squaredLength}
   * @function
   */
  const sqrLen$2 = squaredLength$2;

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
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  const exactEquals$6 = exactEquals$5;

  /**
   * Returns whether or not the quaternions have approximately the same elements in the same position.
   *
   * @param {quat} a The first vector.
   * @param {quat} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  const equals$7 = equals$6;

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
  const rotationTo = (function() {
    let tmpvec3 = create$4();
    let xUnitVec3 = fromValues$4(1,0,0);
    let yUnitVec3 = fromValues$4(0,1,0);

    return function(out, a, b) {
      let dot$1 = dot(a, b);
      if (dot$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001)
          cross(tmpvec3, yUnitVec3, a);
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
  })();

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
  const sqlerp = (function () {
    let temp1 = create$6();
    let temp2 = create$6();

    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));

      return out;
    };
  }());

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
  const setAxes = (function() {
    let matr = create$2();

    return function(out, view, right, up) {
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
  })();

  /**
   * Dual Quaternion<br>
   * Format: [real, dual]<br>
   * Quaternion format: XYZW<br>
   * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
   * @module quat2
   */


  /**
   * Creates a new identity dual quat
   *
   * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
   */
  function create$7() {
    let dq = new ARRAY_TYPE(8);
    if(ARRAY_TYPE != Float32Array) {
      dq[0] = 0;
      dq[1] = 0;
      dq[2] = 0;
      dq[4] = 0;
      dq[5] = 0;
      dq[6] = 0;
      dq[7] = 0;
    }
    dq[3] = 1;
    return dq;
  }

  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat2} a dual quaternion to clone
   * @returns {quat2} new dual quaternion
   * @function
   */
  function clone$7(a) {
    let dq = new ARRAY_TYPE(8);
    dq[0] = a[0];
    dq[1] = a[1];
    dq[2] = a[2];
    dq[3] = a[3];
    dq[4] = a[4];
    dq[5] = a[5];
    dq[6] = a[6];
    dq[7] = a[7];
    return dq;
  }

  /**
   * Creates a new dual quat initialized with the given values
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} new dual quaternion
   * @function
   */
  function fromValues$7(x1, y1, z1, w1, x2, y2, z2, w2) {
    let dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    dq[4] = x2;
    dq[5] = y2;
    dq[6] = z2;
    dq[7] = w2;
    return dq;
  }

  /**
   * Creates a new dual quat from the given values (quat and translation)
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component (translation)
   * @param {Number} y2 Y component (translation)
   * @param {Number} z2 Z component (translation)
   * @returns {quat2} new dual quaternion
   * @function
   */
  function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
    let dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    let ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
    dq[4] = ax * w1 + ay * z1 - az * y1;
    dq[5] = ay * w1 + az * x1 - ax * z1;
    dq[6] = az * w1 + ax * y1 - ay * x1;
    dq[7] = -ax * x1 - ay * y1 - az * z1;
    return dq;
  }

  /**
   * Creates a dual quat from a quaternion and a translation
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {quat} q quaternion
   * @param {vec3} t tranlation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */
  function fromRotationTranslation$1(out, q, t) {
    let ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
    out[0] = bx;
    out[1] = by;
    out[2] = bz;
    out[3] = bw;
    out[4] = ax * bw + ay * bz - az * by;
    out[5] = ay * bw + az * bx - ax * bz;
    out[6] = az * bw + ax * by - ay * bx;
    out[7] = -ax * bx - ay * by - az * bz;
    return out;
  }

  /**
   * Creates a dual quat from a translation
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {vec3} t translation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */
  function fromTranslation$3(out, t) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = t[0] * 0.5;
    out[5] = t[1] * 0.5;
    out[6] = t[2] * 0.5;
    out[7] = 0;
    return out;
  }

  /**
   * Creates a dual quat from a quaternion
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {quat} q the quaternion
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */
  function fromRotation$4(out, q) {
    out[0] = q[0];
    out[1] = q[1];
    out[2] = q[2];
    out[3] = q[3];
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }

  /**
   * Creates a new dual quat from a matrix (4x4)
   *
   * @param {quat2} out the dual quaternion
   * @param {mat4} a the matrix
   * @returns {quat2} dual quat receiving operation result
   * @function
   */
  function fromMat4$1(out, a) {
    //TODO Optimize this
    let outer = create$6();
    getRotation(outer, a);
    let t = new ARRAY_TYPE(3);
    getTranslation(t, a);
    fromRotationTranslation$1(out, outer, t);
    return out;
  }

  /**
   * Copy the values from one dual quat to another
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the source dual quaternion
   * @returns {quat2} out
   * @function
   */
  function copy$7(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    return out;
  }

  /**
   * Set a dual quat to the identity dual quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @returns {quat2} out
   */
  function identity$5(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }

  /**
   * Set the components of a dual quat to the given values
   *
   * @param {quat2} out the receiving quaternion
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} out
   * @function
   */
  function set$7(out, x1, y1, z1, w1, x2, y2, z2, w2) {
    out[0] = x1;
    out[1] = y1;
    out[2] = z1;
    out[3] = w1;

    out[4] = x2;
    out[5] = y2;
    out[6] = z2;
    out[7] = w2;
    return out;
  }

  /**
   * Gets the real part of a dual quat
   * @param  {quat} out real part
   * @param  {quat2} a Dual Quaternion
   * @return {quat} real part
   */
  const getReal = copy$6;

  /**
   * Gets the dual part of a dual quat
   * @param  {quat} out dual part
   * @param  {quat2} a Dual Quaternion
   * @return {quat} dual part
   */
  function getDual(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    out[2] = a[6];
    out[3] = a[7];
    return out;
  }

  /**
   * Set the real component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat} q a quaternion representing the real part
   * @returns {quat2} out
   * @function
   */
  const setReal = copy$6;

  /**
   * Set the dual component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat} q a quaternion representing the dual part
   * @returns {quat2} out
   * @function
   */
  function setDual(out, q) {
    out[4] = q[0];
    out[5] = q[1];
    out[6] = q[2];
    out[7] = q[3];
    return out;
  }

  /**
   * Gets the translation of a normalized dual quat
   * @param  {vec3} out translation
   * @param  {quat2} a Dual Quaternion to be decomposed
   * @return {vec3} translation
   */
  function getTranslation$1(out, a) {
    let ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
    out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    return out;
  }

  /**
   * Translates a dual quat by the given vector
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to translate
   * @param {vec3} v vector to translate by
   * @returns {quat2} out
   */
  function translate$3(out, a, v) {
    let ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
    out[0] = ax1;
    out[1] = ay1;
    out[2] = az1;
    out[3] = aw1;
    out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
    out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
    out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
    out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
    return out;
  }

  /**
   * Rotates a dual quat around the X axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */
  function rotateX$3(out, a, rad) {
    let bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateX$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }

  /**
   * Rotates a dual quat around the Y axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */
  function rotateY$3(out, a, rad) {
    let bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateY$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }

  /**
   * Rotates a dual quat around the Z axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */
  function rotateZ$3(out, a, rad) {
    let bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateZ$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }

  /**
   * Rotates a dual quat by a given quaternion (a * q)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {quat} q quaternion to rotate by
   * @returns {quat2} out
   */
  function rotateByQuatAppend(out, a, q) {
    let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];

    out[0] = ax * qw + aw * qx + ay * qz - az * qy;
    out[1] = ay * qw + aw * qy + az * qx - ax * qz;
    out[2] = az * qw + aw * qz + ax * qy - ay * qx;
    out[3] = aw * qw - ax * qx - ay * qy - az * qz;
    ax = a[4];
    ay = a[5];
    az = a[6];
    aw = a[7];
    out[4] = ax * qw + aw * qx + ay * qz - az * qy;
    out[5] = ay * qw + aw * qy + az * qx - ax * qz;
    out[6] = az * qw + aw * qz + ax * qy - ay * qx;
    out[7] = aw * qw - ax * qx - ay * qy - az * qz;
    return out;
  }

  /**
   * Rotates a dual quat by a given quaternion (q * a)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat} q quaternion to rotate by
   * @param {quat2} a the dual quaternion to rotate
   * @returns {quat2} out
   */
  function rotateByQuatPrepend(out, q, a) {
    let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];

    out[0] = qx * bw + qw * bx + qy * bz - qz * by;
    out[1] = qy * bw + qw * by + qz * bx - qx * bz;
    out[2] = qz * bw + qw * bz + qx * by - qy * bx;
    out[3] = qw * bw - qx * bx - qy * by - qz * bz;
    bx = a[4];
    by = a[5];
    bz = a[6];
    bw = a[7];
    out[4] = qx * bw + qw * bx + qy * bz - qz * by;
    out[5] = qy * bw + qw * by + qz * bx - qx * bz;
    out[6] = qz * bw + qw * bz + qx * by - qy * bx;
    out[7] = qw * bw - qx * bx - qy * by - qz * bz;
    return out;
  }

  /**
   * Rotates a dual quat around a given axis. Does the normalisation automatically
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {vec3} axis the axis to rotate around
   * @param {Number} rad how far the rotation should be
   * @returns {quat2} out
   */
  function rotateAroundAxis(out, a, axis, rad) {
    //Special case for rad = 0
    if (Math.abs(rad) < EPSILON) {
      return copy$7(out, a);
    }
    let axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);

    rad = rad * 0.5;
    let s = Math.sin(rad);
    let bx = s * axis[0] / axisLength;
    let by = s * axis[1] / axisLength;
    let bz = s * axis[2] / axisLength;
    let bw = Math.cos(rad);

    let ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
    out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;

    let ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
    out[4] = ax * bw + aw * bx + ay * bz - az * by;
    out[5] = ay * bw + aw * by + az * bx - ax * bz;
    out[6] = az * bw + aw * bz + ax * by - ay * bx;
    out[7] = aw * bw - ax * bx - ay * by - az * bz;

    return out;
  }

  /**
   * Adds two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {quat2} out
   * @function
   */
  function add$7(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    return out;
  }

  /**
   * Multiplies two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {quat2} out
   */
  function multiply$7(out, a, b) {
    let ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
    out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
    out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
    out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
    out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
    out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
    out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
    out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
    out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
    return out;
  }

  /**
   * Alias for {@link quat2.multiply}
   * @function
   */
  const mul$7 = multiply$7;

  /**
   * Scales a dual quat by a scalar number
   *
   * @param {quat2} out the receiving dual quat
   * @param {quat2} a the dual quat to scale
   * @param {Number} b amount to scale the dual quat by
   * @returns {quat2} out
   * @function
   */
  function scale$7(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    return out;
  }

  /**
   * Calculates the dot product of two dual quat's (The dot product of the real parts)
   *
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */
  const dot$3 = dot$2;

  /**
   * Performs a linear interpolation between two dual quats's
   * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
   *
   * @param {quat2} out the receiving dual quat
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat2} out
   */
  function lerp$3(out, a, b, t) {
    let mt = 1 - t;
    if (dot$3(a, b) < 0) t = -t;

    out[0] = a[0] * mt + b[0] * t;
    out[1] = a[1] * mt + b[1] * t;
    out[2] = a[2] * mt + b[2] * t;
    out[3] = a[3] * mt + b[3] * t;
    out[4] = a[4] * mt + b[4] * t;
    out[5] = a[5] * mt + b[5] * t;
    out[6] = a[6] * mt + b[6] * t;
    out[7] = a[7] * mt + b[7] * t;

    return out;
  }

  /**
   * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a dual quat to calculate inverse of
   * @returns {quat2} out
   */
  function invert$5(out, a) {
    let sqlen = squaredLength$3(a);
    out[0] = -a[0] / sqlen;
    out[1] = -a[1] / sqlen;
    out[2] = -a[2] / sqlen;
    out[3] = a[3] / sqlen;
    out[4] = -a[4] / sqlen;
    out[5] = -a[5] / sqlen;
    out[6] = -a[6] / sqlen;
    out[7] = a[7] / sqlen;
    return out;
  }

  /**
   * Calculates the conjugate of a dual quat
   * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat2} a quat to calculate conjugate of
   * @returns {quat2} out
   */
  function conjugate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    out[4] = -a[4];
    out[5] = -a[5];
    out[6] = -a[6];
    out[7] = a[7];
    return out;
  }

  /**
   * Calculates the length of a dual quat
   *
   * @param {quat2} a dual quat to calculate length of
   * @returns {Number} length of a
   * @function
   */
  const length$3 = length$2;

  /**
   * Alias for {@link quat2.length}
   * @function
   */
  const len$3 = length$3;

  /**
   * Calculates the squared length of a dual quat
   *
   * @param {quat2} a dual quat to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */
  const squaredLength$3 = squaredLength$2;

  /**
   * Alias for {@link quat2.squaredLength}
   * @function
   */
  const sqrLen$3 = squaredLength$3;

  /**
   * Normalize a dual quat
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a dual quaternion to normalize
   * @returns {quat2} out
   * @function
   */
  function normalize$3(out, a) {
    let magnitude = squaredLength$3(a);
    if (magnitude > 0) {
      magnitude = Math.sqrt(magnitude);

      let a0 = a[0] / magnitude;
      let a1 = a[1] / magnitude;
      let a2 = a[2] / magnitude;
      let a3 = a[3] / magnitude;

      let b0 = a[4];
      let b1 = a[5];
      let b2 = a[6];
      let b3 = a[7];

      let a_dot_b = (a0 * b0) + (a1 * b1) + (a2 * b2) + (a3 * b3);

      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;

      out[4] = (b0 - (a0 * a_dot_b)) / magnitude;
      out[5] = (b1 - (a1 * a_dot_b)) / magnitude;
      out[6] = (b2 - (a2 * a_dot_b)) / magnitude;
      out[7] = (b3 - (a3 * a_dot_b)) / magnitude;
    }
    return out;
  }

  /**
   * Returns a string representation of a dual quatenion
   *
   * @param {quat2} a dual quaternion to represent as a string
   * @returns {String} string representation of the dual quat
   */
  function str$7(a) {
    return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
      a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
  }

  /**
   * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat2} a the first dual quaternion.
   * @param {quat2} b the second dual quaternion.
   * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
   */
  function exactEquals$7(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
      a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
  }

  /**
   * Returns whether or not the dual quaternions have approximately the same elements in the same position.
   *
   * @param {quat2} a the first dual quat.
   * @param {quat2} b the second dual quat.
   * @returns {Boolean} true if the dual quats are equal, false otherwise.
   */
  function equals$8(a, b) {
    let a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
      Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
      Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
      Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
      Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)));
  }

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */
  function create$8() {
    let out = new ARRAY_TYPE(2);
    if(ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }

  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @param {vec2} a vector to clone
   * @returns {vec2} a new 2D vector
   */
  function clone$8(a) {
    let out = new ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }

  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */
  function fromValues$8(x, y) {
    let out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }

  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */
  function copy$8(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }

  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */
  function set$8(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }

  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function add$8(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function subtract$6(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }

  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function multiply$8(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }

  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function divide$2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }

  /**
   * Math.ceil the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to ceil
   * @returns {vec2} out
   */
  function ceil$2(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
  }

  /**
   * Math.floor the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to floor
   * @returns {vec2} out
   */
  function floor$2(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
  }

  /**
   * Returns the minimum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function min$2(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  }

  /**
   * Returns the maximum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  function max$2(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  }

  /**
   * Math.round the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to round
   * @returns {vec2} out
   */
  function round$2 (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
  }

  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */
  function scale$8(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }

  /**
   * Adds two vec2's after scaling the second operand by a scalar value
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec2} out
   */
  function scaleAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
  }

  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance$2(a, b) {
    var x = b[0] - a[0],
      y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
  }

  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance$2(a, b) {
    var x = b[0] - a[0],
      y = b[1] - a[1];
    return x*x + y*y;
  }

  /**
   * Calculates the length of a vec2
   *
   * @param {vec2} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length$4(a) {
    var x = a[0],
      y = a[1];
    return Math.sqrt(x*x + y*y);
  }

  /**
   * Calculates the squared length of a vec2
   *
   * @param {vec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength$4 (a) {
    var x = a[0],
      y = a[1];
    return x*x + y*y;
  }

  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to negate
   * @returns {vec2} out
   */
  function negate$2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }

  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to invert
   * @returns {vec2} out
   */
  function inverse$2(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
  }

  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to normalize
   * @returns {vec2} out
   */
  function normalize$4(out, a) {
    var x = a[0],
      y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
    }
    return out;
  }

  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot$4(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }

  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   *
   * @param {vec3} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec3} out
   */
  function cross$1(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }

  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec2} out
   */
  function lerp$4(out, a, b, t) {
    var ax = a[0],
      ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec2} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec2} out
   */
  function random$3(out, scale) {
    scale = scale || 1.0;
    var r = RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
  }

  /**
   * Transforms the vec2 with a mat2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat2(out, a, m) {
    var x = a[0],
      y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }

  /**
   * Transforms the vec2 with a mat2d
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2d} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat2d(out, a, m) {
    var x = a[0],
      y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }

  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat3} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat3$1(out, a, m) {
    var x = a[0],
      y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }

  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec2} out
   */
  function transformMat4$2(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }

  /**
   * Rotate a 2D vector
   * @param {vec2} out The receiving vec2
   * @param {vec2} a The vec2 point to rotate
   * @param {vec2} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec2} out
   */
  function rotate$4(out, a, b, c) {
    //Translate point to the origin
    let p0 = a[0] - b[0],
    p1 = a[1] - b[1],
    sinC = Math.sin(c),
    cosC = Math.cos(c);
    
    //perform rotation and translate to correct position
    out[0] = p0*cosC - p1*sinC + b[0];
    out[1] = p0*sinC + p1*cosC + b[1];

    return out;
  }

  /**
   * Get the angle between two 2D vectors
   * @param {vec2} a The first operand
   * @param {vec2} b The second operand
   * @returns {Number} The angle in radians
   */
  function angle$1(a, b) {
    let x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];
    
    let len1 = x1*x1 + y1*y1;
    if (len1 > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len1 = 1 / Math.sqrt(len1);
    }
    
    let len2 = x2*x2 + y2*y2;
    if (len2 > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len2 = 1 / Math.sqrt(len2);
    }
    
    let cosine = (x1 * x2 + y1 * y2) * len1 * len2;
    
    
    if(cosine > 1.0) {
      return 0;
    }
    else if(cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }

  /**
   * Returns a string representation of a vector
   *
   * @param {vec2} a vector to represent as a string
   * @returns {String} string representation of the vector
   */
  function str$8(a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
  }

  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function exactEquals$8(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  function equals$9(a, b) {
    let a0 = a[0], a1 = a[1];
    let b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
  }

  /**
   * Alias for {@link vec2.length}
   * @function
   */
  const len$4 = length$4;

  /**
   * Alias for {@link vec2.subtract}
   * @function
   */
  const sub$6 = subtract$6;

  /**
   * Alias for {@link vec2.multiply}
   * @function
   */
  const mul$8 = multiply$8;

  /**
   * Alias for {@link vec2.divide}
   * @function
   */
  const div$2 = divide$2;

  /**
   * Alias for {@link vec2.distance}
   * @function
   */
  const dist$2 = distance$2;

  /**
   * Alias for {@link vec2.squaredDistance}
   * @function
   */
  const sqrDist$2 = squaredDistance$2;

  /**
   * Alias for {@link vec2.squaredLength}
   * @function
   */
  const sqrLen$4 = squaredLength$4;

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
  const forEach$2 = (function() {
    let vec = create$8();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 2;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1];
      }

      return a;
    };
  })();

  // Copyright 2018 The Immersive Web Community Group

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

      canvas.addEventListener('mousemove', (event) => {
        // Only rotate when the left button is pressed
        if (event.buttons & 1) {
          this.rotateView(event.movementX, event.movementY);
        }
      });

      // Keep track of touch-related state so that users can touch and drag on
      // the canvas to adjust the viewer pose in an inline session.
      let primaryTouch = undefined;
      let prevTouchX = undefined;
      let prevTouchY = undefined;

      canvas.addEventListener("touchstart", (event) => {
        if (primaryTouch == undefined) {
          let touch = event.changedTouches[0];
          primaryTouch = touch.identifier;
          prevTouchX = touch.pageX;
          prevTouchY = touch.pageY;
        }
      });

      canvas.addEventListener("touchend", (event) => {
        for (let touch of event.changedTouches) {
          if (primaryTouch == touch.identifier) {
            primaryTouch = undefined;
            this.rotateView(touch.pageX - prevTouchX, touch.pageY - prevTouchY);
          }
        }
      });

      canvas.addEventListener("touchcancel", (event) => {
        for (let touch of event.changedTouches) {
          if (primaryTouch == touch.identifier) {
            primaryTouch = undefined;
          }
        }
      });

      canvas.addEventListener("touchmove", (event) => {
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
      if (this.lookPitch < -Math.PI*0.5) {
        this.lookPitch = -Math.PI*0.5;
      }
      if (this.lookPitch > Math.PI*0.5) {
        this.lookPitch = Math.PI*0.5;
      }
      this.dirty = true;
    }

    reset() {
      this.lookYaw = 0;
      this.lookPitch = 0;
      this.refSpace = this.baseRefSpace;
      this.dirty = false;
    }

    // XRReferenceSpace offset is immutable, so return a new reference space
    // that has an updated orientation.
    get referenceSpace() {
      if (this.dirty) {
        // Represent the rotational component of the reference space as a
        // quaternion.
        let invOrient = create$6();
        rotateX$2(invOrient, invOrient, -this.lookPitch);
        rotateY$2(invOrient, invOrient, -this.lookYaw);
        let xform = new XRRigidTransform(
            {},
            {x: invOrient[0], y: invOrient[1], z: invOrient[2], w: invOrient[3]});
        this.refSpace = this.baseRefSpace.getOffsetReferenceSpace(xform);
        xform = new XRRigidTransform({y: -this.viewerHeight});
        this.refSpace = this.refSpace.getOffsetReferenceSpace(xform);
        this.dirty = false;
      }
      return this.refSpace;
    }
  }

  const EPSILON$1 = 0.000001;
  let ARRAY_TYPE$1 = typeof Float32Array !== "undefined" ? Float32Array : Array;

  const degree$1 = Math.PI / 180;

  function create$9() {
    let out = new ARRAY_TYPE$1(16);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }

  function copy$9(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  function identity$6(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  function invert$6(out, a) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }

  function multiply$9(out, a, b) {
    let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  function fromRotationTranslation$2(out, q, v) {
    let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }

  function getTranslation$2(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }

  function getRotation$1(out, mat) {
    let trace = mat[0] + mat[5] + mat[10];
    let S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (mat[6] - mat[9]) / S;
      out[1] = (mat[8] - mat[2]) / S;
      out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
      S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
      out[3] = (mat[6] - mat[9]) / S;
      out[0] = 0.25 * S;
      out[1] = (mat[1] + mat[4]) / S;
      out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
      S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
      out[3] = (mat[8] - mat[2]) / S;
      out[0] = (mat[1] + mat[4]) / S;
      out[1] = 0.25 * S;
      out[2] = (mat[6] + mat[9]) / S;
    } else {
      S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
      out[3] = (mat[1] - mat[4]) / S;
      out[0] = (mat[8] + mat[2]) / S;
      out[1] = (mat[6] + mat[9]) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }

  function perspective$1(out, fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2),
      nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }

  function create$1$1() {
    let out = new ARRAY_TYPE$1(3);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone$1$1(a) {
    var out = new ARRAY_TYPE$1(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length$5(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function fromValues$1$1(x, y, z) {
    let out = new ARRAY_TYPE$1(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy$1$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }

  function add$1$1(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  function scale$1$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }

  function normalize$5(out, a) {
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
  function dot$5(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross$2(out, a, b) {
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

  function transformQuat$2(out, a, q) {
    let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
    let x = a[0],
      y = a[1],
      z = a[2];
    let uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx;
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }

  function angle$2(a, b) {
    let tempA = fromValues$1$1(a[0], a[1], a[2]);
    let tempB = fromValues$1$1(b[0], b[1], b[2]);
    normalize$5(tempA, tempA);
    normalize$5(tempB, tempB);
    let cosine = dot$5(tempA, tempB);
    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }

  const len$5 = length$5;

  const forEach$3 = (function() {
    let vec = create$1$1();
    return function(a, stride, offset, count, fn, arg) {
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
  })();

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
  function clone$3$1(a) {
    let out = new ARRAY_TYPE$1(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function fromValues$3$1(x, y, z, w) {
    let out = new ARRAY_TYPE$1(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function copy$3$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
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

  const forEach$1$1 = (function() {
    let vec = create$3$1();
    return function(a, stride, offset, count, fn, arg) {
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
  })();

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

  function multiply$4$1(out, a, b) {
    let ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
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

  function invert$2$1(out, a) {
    let a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
    let dot$$1 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot$$1 ? 1.0 / dot$$1 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
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
  function fromEuler$1(out, x, y, z) {
    let halfToRad = (0.5 * Math.PI) / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }

  const clone$4$1 = clone$3$1;
  const fromValues$4$1 = fromValues$3$1;
  const copy$4$1 = copy$3$1;

  const normalize$2$1 = normalize$1$1;

  const rotationTo$1 = (function() {
    let tmpvec3 = create$1$1();
    let xUnitVec3 = fromValues$1$1(1, 0, 0);
    let yUnitVec3 = fromValues$1$1(0, 1, 0);
    return function(out, a, b) {
      let dot$$1 = dot$5(a, b);
      if (dot$$1 < -0.999999) {
        cross$2(tmpvec3, xUnitVec3, a);
        if (len$5(tmpvec3) < 0.000001) cross$2(tmpvec3, yUnitVec3, a);
        normalize$5(tmpvec3, tmpvec3);
        setAxisAngle$1(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross$2(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2$1(out, out);
      }
    };
  })();
  const sqlerp$1 = (function() {
    let temp1 = create$4$1();
    let temp2 = create$4$1();
    return function(out, a, b, c, d, t) {
      slerp$1(temp1, a, d, t);
      slerp$1(temp2, b, c, t);
      slerp$1(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  })();
  const setAxes$1 = (function() {
    let matr = create$2$1();
    return function(out, view, right, up) {
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
  })();

  const HEAD_ELBOW_OFFSET_RIGHTHANDED = fromValues$1$1(0.155, -0.465, -0.15);
  const HEAD_ELBOW_OFFSET_LEFTHANDED = fromValues$1$1(-0.155, -0.465, -0.15);
  const ELBOW_WRIST_OFFSET = fromValues$1$1(0, 0, -0.25);
  const WRIST_CONTROLLER_OFFSET = fromValues$1$1(0, 0, 0.05);
  const ARM_EXTENSION_OFFSET = fromValues$1$1(-0.08, 0.14, 0.08);
  const ELBOW_BEND_RATIO = 0.4;
  const EXTENSION_RATIO_WEIGHT = 0.4;
  const MIN_ANGULAR_SPEED = 0.61;
  const MIN_ANGLE_DELTA = 0.175;
  const MIN_EXTENSION_COS = 0.12;
  const MAX_EXTENSION_COS = 0.87;
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

  function enableXRDependencies() {
      window.CONSTRUKTEDXR = {};

      CONSTRUKTEDXR.WebXRButton = WebXRButton;
      CONSTRUKTEDXR.InlineViewerHelper = InlineViewerHelper;
      CONSTRUKTEDXR.eulerFromQuaternionDegree = eulerFromQuaternionDegree;
      CONSTRUKTEDXR.create$1 = create$1$1;
  }

  /* global Cesium */

  function isMobile() {
      let check = false;

      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

      return check;
  }

  function block_keys(e) {
      switch(e.keyCode){
          case 37: case 39: case 38:  case 40: e.preventDefault(); break; // Space
          default: break; // do not block other keys
      }
  }

  function georeferenced(tileset) {
      if(tileset.asset.extras === undefined) {
          return false;
      }

      if(tileset.asset.extras !== null)
          if (tileset.asset.extras.ion.georeferenced !== true) {
              return false;
          }

      return true;
  }

  function setTilesetModelMatrix(tileset, modelMatrixData) {
      let position = modelMatrixData.position;

      let center = new Cesium.Cartesian3(position.x, position.y, position.z);

      let headingPitchRoll = modelMatrixData.headingPitchRoll;

      let hpr = new Cesium.HeadingPitchRoll(headingPitchRoll.heading ,headingPitchRoll.pitch, headingPitchRoll.roll);

      let scale = modelMatrixData.scale;

      let scaleCartesian3 = new Cesium.Cartesian3(scale.x, scale.y, scale.z);

      let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(center, hpr);

      tileset.modelMatrix = Cesium.Matrix4.setScale(modelMatrix, scaleCartesian3, new Cesium.Matrix4());
  }

  function showHideTilesInspector(visible) {
      let tilesInspectorContainer = document.querySelector('.cesium-viewer-cesium3DTilesInspectorContainer');

      if (visible)
          tilesInspectorContainer.style.display = 'block';
      else
          tilesInspectorContainer.style.display = 'none';
  }

  function getRelativeCurrentCameraPositionOrientationJsonString(viewer, tileset) {
      let camera = viewer.camera;

      let data = {};

      data.offsetX = camera.position.x - tileset.boundingSphere.center.x;
      data.offsetY = camera.position.y - tileset.boundingSphere.center.y;
      data.offsetZ = camera.position.z - tileset.boundingSphere.center.z;

      data.heading = Cesium.Math.toDegrees(camera.heading);
      data.pitch = Cesium.Math.toDegrees(camera.pitch);
      data.roll = Cesium.Math.toDegrees(camera.roll);

      return JSON.stringify(data);
  }

  function customSceneSetting(viewer, georeferenced) {
      viewer.scene.globe.show = georeferenced;
      viewer.scene.skyAtmosphere.show = georeferenced;
      viewer.scene.skyBox.show = georeferenced;
      viewer.scene.moon.show = georeferenced;
      viewer.scene.sun.show = georeferenced;

      if (georeferenced)
          viewer.scene.backgroundColor = Cesium.Color.BLACK.clone();
      else
          viewer.scene.backgroundColor = Cesium.Color.fromCssColorString(CONSTRUKTED_AJAX.bg_color_css_string);
  }

  function disableDefaultScreenSpaceCameraController (scene) {
      // disable the default event handlers

      scene.screenSpaceCameraController.enableRotate = false;
      scene.screenSpaceCameraController.enableTranslate = false;
      scene.screenSpaceCameraController.enableZoom = false;
      scene.screenSpaceCameraController.enableTilt = false;
      scene.screenSpaceCameraController.enableLook = false;
  }

  function enableDefaultScreenSpaceCameraController (scene) {
      // enable the default event handlers

      scene.screenSpaceCameraController.enableRotate = true;
      scene.screenSpaceCameraController.enableTranslate = true;
      scene.screenSpaceCameraController.enableZoom = true;
      scene.screenSpaceCameraController.enableTilt = true;
      scene.screenSpaceCameraController.enableLook = true;
  }

  function setDefaultView(viewer, tileset) {
      const defaultCameraPositionOrientationJson = CONSTRUKTED_AJAX.default_camera_position_direction;

      const camera = viewer.camera;

      if(defaultCameraPositionOrientationJson !== undefined && defaultCameraPositionOrientationJson !== "") {
          let defaultCameraPositionDirection;

          try {
              defaultCameraPositionDirection = JSON.parse(defaultCameraPositionOrientationJson);
          }
          catch (e){
              console.error(e.message);
              camera.flyToBoundingSphere(tileset.boundingSphere);
              return;
          }

          if(!defaultCameraPositionDirection.offsetX ||
              !defaultCameraPositionDirection.offsetY ||
              !defaultCameraPositionDirection.offsetZ ||
              !defaultCameraPositionDirection.heading ||
              !defaultCameraPositionDirection.pitch ||
              !defaultCameraPositionDirection.roll) {
              console.warn('invalid default_camera_position_direction');
              console.warn(CONSTRUKTED_AJAX.default_camera_position_direction);

              camera.flyToBoundingSphere(tileset.boundingSphere);
              return;
          }

          let offset = new Cesium.Cartesian3(defaultCameraPositionDirection.offsetX, defaultCameraPositionDirection.offsetY, defaultCameraPositionDirection.offsetZ);

          let destination = Cesium.Cartesian3.add(tileset.boundingSphere.center, offset, new Cesium.Cartesian3());

          viewer.camera.flyTo({
              destination : destination,
              orientation : {
                  heading : Cesium.Math.toRadians(defaultCameraPositionDirection.heading),
                  pitch :  Cesium.Math.toRadians(defaultCameraPositionDirection.pitch),
                  roll : Cesium.Math.toRadians(defaultCameraPositionDirection.roll)
              }
          });
      }
      else {
          camera.flyToBoundingSphere(tileset.boundingSphere);
      }
  }

  let gl = null;
  let inlineViewerHelper;

  const mobile = isMobile();

  function onXRFrame(t, frame) {
      let session = frame.session;
      let refSpace = session.isImmersive
          ? xrImmersiveRefSpace
          : inlineViewerHelper.referenceSpace;
      let pose = frame.getViewerPose(refSpace);

      if (pose) {
          let headEuler = CONSTRUKTEDXR.create$1();
          let or = pose.transform.orientation;
          CONSTRUKTEDXR.eulerFromQuaternionDegree(headEuler, [or.x, or.y, or.z, or.w], "YXZ");

          const event = new CustomEvent("viewerPoseUpdatedEvent", {
              detail: {
                  posX: pose.transform.position.x,
                  posY: pose.transform.position.y,
                  posZ: pose.transform.position.z,
                  rotX: -headEuler[1],
                  rotY: headEuler[0],
                  rotZ: headEuler[2],
              },
          });

          // customEventTarget.dispatchEvent(event);

          if (mobile)
              changeCesiumCamera(
                  pose.transform.position.x,
                  pose.transform.position.y,
                  pose.transform.position.z,
                  -headEuler[1],
                  headEuler[0],
                  headEuler[2]
              );
      }

      session.requestAnimationFrame(onXRFrame);

      // Assumed to be a XRWebGLLayer for now.
      let layer = session.renderState.baseLayer;

      gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer);
  }

  function onSessionStarted(session) {
      session.addEventListener("end", onSessionEnded);

      if (session.isImmersive) {
          if(!cesiumFPVCameraController.started()) {
              if (cesiumFPVCameraController.startFPVPositionMobile() == null) {
                  alert("Please tap on 3d tile to start FPV!");
                  cesiumFPVCameraController.setAllowStartPositionTap(true);
                  return;
              } else {
                  cesiumFPVCameraController.startFPVMobile();
              }
          }
      }

      initGL();

      session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });

      let refSpaceType = session.isImmersive ? "local" : "viewer";

      session.requestReferenceSpace(refSpaceType).then((refSpace) => {
          if (session.isImmersive) {
              xrImmersiveRefSpace = refSpace;
          } else {
              inlineViewerHelper = new CONSTRUKTEDXR.InlineViewerHelper(gl.canvas, refSpace);
          }
          session.requestAnimationFrame(onXRFrame);
      });
  }

  function onRequestSession() {
      // Requests an 'immersive-ar' session, which ensures that the users
      // environment will be visible either via video passthrough or a
      // transparent display. This may be presented either in a headset or
      // fullscreen on a mobile device.
      let uiElement = document.getElementById("overlay-content"); //ui
      return navigator.xr
          .requestSession("immersive-ar", {
              optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
              domOverlay: { root: uiElement },
          })
          .then((session) => {
              xrButton.setSession(session);
              session.isImmersive = true;
              onSessionStarted(session);
          });
  }

  function onEndSession(session) {
      session.end();

      cesiumFPVCameraController.setAllowStartPositionTap(true);
      cesiumFPVCameraController.exitFPV();
  }

  function onSessionEnded(event) {
      if (event.session.isImmersive) {
          xrButton.setSession(null);
          // Turn the background back on when we go back to the inlive view.
      }
  }

  function initGL() {
      gl = createWebGLContext({
          xrCompatible: true,
      });
  }

  // Creates a WebGL context and initializes it with some common default state.
  function createWebGLContext(glAttribs) {
      glAttribs = glAttribs || { alpha: false };

      let webglCanvas = document.getElementById("xr-canvas");
      let contextTypes = glAttribs.webgl2
          ? ["webgl2"]
          : ["webgl", "experimental-webgl"];
      let context = null;

      for (let contextType of contextTypes) {
          context = webglCanvas.getContext(contextType, glAttribs);
          if (context) {
              break;
          }
      }

      if (!context) {
          let webglType = glAttribs.webgl2 ? "WebGL 2" : "WebGL";
          console.error("This browser does not support " + webglType + ".");
          return null;
      }

      return context;
  }

  function toggleXrItems() {
      jQuery('.webvr-ui-button, #xr-canvas').toggle();
      jQuery('#overlay-content').toggleClass('full-overlay');
  }

  const MAX_PITCH_IN_DEGREE = 88;

  function validPitch (pitch) {
      if( pitch > MAX_PITCH_IN_DEGREE * 2 && pitch < 360 - MAX_PITCH_IN_DEGREE) {
          pitch = 360 - MAX_PITCH_IN_DEGREE;
      }
      else {
          if (pitch > MAX_PITCH_IN_DEGREE && pitch < 360 - MAX_PITCH_IN_DEGREE) {
              pitch = MAX_PITCH_IN_DEGREE;
          }
      }

      return pitch;
  }

  /* global Cesium*/

  const CAMERA_ANGLE_CHANGE_SPEED_HEADING = -60;
  const CAMERA_ANGLE_CHANGE_SPEED_PITCH = -35;

  class CesiumCameraController{
      constructor(options){
          this._isMobile = options.isMobile;
          this._enabled = false;

          this._cesiumViewer = options.cesiumViewer;
          this._canvas = this._cesiumViewer.canvas;
          this._camera = this._cesiumViewer.camera;


          /**
           * heading: angle with up direction
           * pitch:   angle with right direction
           * roll:    angle with look at direction
           */

          // indicate if heading and pitch is changed
          this._leftButtonPressed = false;
          this._cameraHeadingWhenLbuttonPressed = this._camera.heading;
          this._cameraPitchWhenLbuttonPressed = this._camera.pitch;

          this._startMousePosition = null;

          this._screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler( this._canvas);

          this._screenSpaceEventHandler.setInputAction(this._onMouseLButtonDoubleClicked.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
          this._screenSpaceEventHandler.setInputAction(this._onMouseLButtonClicked.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOWN);
          this._screenSpaceEventHandler.setInputAction(this._onMouseUp.bind(this), Cesium.ScreenSpaceEventType.LEFT_UP);
      }

      _onMouseLButtonDoubleClicked(movement) {

      }

      _onMouseLButtonClicked (movement) {
          if(this._isMobile)
              this._lastTapedPosition = movement.position;

          if(this._startFPVPositionMobile == null) {
              if(this._allowStartPositionTap)
                  this._startFPVPositionMobile = movement.position.clone();
          }

          this._leftButtonPressed = true;
          this._cameraHeadingWhenLbuttonPressed = this._camera.heading;
          this._cameraPitchWhenLbuttonPressed = this._camera.pitch;
          this._startMousePosition = movement.position.clone();
      };

      _onMouseUp (position) {
          this._leftButtonPressed = false;
      };

      _onMouseMove (movement) {
          if(!this._leftButtonPressed)
              return;

          this._changeCameraHeadingPitch(movement.endPosition);
      };

      _changeCameraHeadingPitch (currentMousePosition) {
          const width = this._canvas.clientWidth;
          const height = this._canvas.clientHeight;

          const deltaX = (currentMousePosition.x - this._startMousePosition.x) / width;
          const deltaY = -(currentMousePosition.y - this._startMousePosition.y) / height;

          const deltaHeadingInDegree = (deltaX * CAMERA_ANGLE_CHANGE_SPEED_HEADING);
          const deltaPitchInDegree = (deltaY * CAMERA_ANGLE_CHANGE_SPEED_PITCH);

          this._camera.setView({
              orientation: {
                  heading : this._cameraHeadingWhenLbuttonPressed + Cesium.Math.toRadians(deltaHeadingInDegree),
                  pitch : validPitch(this._cameraPitchWhenLbuttonPressed + Cesium.Math.toRadians(deltaPitchInDegree)),
                  roll : this._camera.roll
              }
          });
      };

  }

  // this mean person is stop
  const DIRECTION_NONE = -1;

  const DIRECTION_FORWARD = 0;
  const DIRECTION_BACKWARD = 1;
  const DIRECTION_LEFT = 2;
  const DIRECTION_RIGHT = 3;

  const DEFAULT_WALKING_SPEED = 0.5;
  const COLLISION_RAY_HEIGHT = 0.5;
  const HUMAN_EYE_HEIGHT = 1.65;

  /* global Cesium*/

  let scratchDirection = new Cesium.Cartesian3();

  class CesiumFPVCameraController extends CesiumCameraController {
      constructor(options) {
          super(options);

          this._FPVStarted = new Cesium.Event();
          this._FPVFinished = new Cesium.Event();

          this._direction = DIRECTION_NONE;

          this._main3dTileset = options.main3dTileset;
          this._defaultCameraPositionOrientationJson = options.defaultCameraPositionOrientationJson;
          this._ignoreCollisionDetection = Cesium.defined(options.ignoreCollisionDetection) ? options.ignoreCollisionDetection : false;

          this._frameMonitor = Cesium.FrameRateMonitor.fromScene(this._cesiumViewer.scene);

          this._screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(this._canvas);

          this._screenSpaceEventHandler.setInputAction(this._onMouseLButtonDoubleClicked.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
          this._screenSpaceEventHandler.setInputAction(this._onMouseLButtonClicked.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOWN);
          this._screenSpaceEventHandler.setInputAction(this._onMouseUp.bind(this), Cesium.ScreenSpaceEventType.LEFT_UP);

          this._startFPVPositionMobile = null;
          this._lastTranslationX = 0;
          this._lastTranslationY = 0;
          this._lastTranslationZ = 0;

          this._lastRotationX = 0;
          this._lastRotationY = 0;
          this._lastRotaionZ = 0;

          this._allowStartPositionTap = false;
          this._walkingSpeed = DEFAULT_WALKING_SPEED;

          // this flag has meaning on mobile device
          this._immersiveArEnabled = options.immersiveArEnabled;

          this._canStart = false;
      }

      setAllowStartPositionTap(value) {
          this._allowStartPositionTap = value;
      }

      _connectEventHandlers() {
          const canvas = this._cesiumViewer.canvas;

          this._screenSpaceEventHandler.setInputAction(this._onMouseMove.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);

          // needed to put focus on the canvas
          canvas.setAttribute('tabindex', '0');

          canvas.onclick = function () {
              canvas.focus();
          };

          const self = this;

          this._onKeyDownCallback = function (event) {
              self._onKeyDown(event);
          };

          this._onKeyUpCallback = function (event) {
              self._onKeyUp(event);
          };

          document.addEventListener('keydown', this._onKeyDownCallback);
          document.addEventListener('keyup', this._onKeyUpCallback);

          this._disconectOnClockTick = this._cesiumViewer.clock.onTick.addEventListener(CesiumFPVCameraController.prototype._onClockTick, this);
      };

      _disconnectEventHandlers() {
          this._screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);

          document.removeEventListener('keydown', this._onKeyDownCallback);
          document.removeEventListener('keyup', this._onKeyUpCallback);
          this._disconectOnClockTick();
      };

      _doStartFPV(cartographic) {
          this._canStart = false;

          const globe = this._cesiumViewer.scene.globe;
          const self = this;

          this._camera.flyTo({
              destination: globe.ellipsoid.cartographicToCartesian(cartographic),
              orientation: {
                  heading: this._camera.heading,
                  pitch: 0,
                  roll: 0.0
              },
              complete: function () {
                  disableDefaultScreenSpaceCameraController(self._cesiumViewer.scene);
                  self._connectEventHandlers();

                  // please note the clone 's meaning.
                  self._cameraDirectionAtArStartedMoment = self._camera.direction.clone();
                  self._cameraRightAtArStartedMoment = self._camera.right.clone();
                  self._cameraUpAtArStartedMoment = self._camera.up.clone();
                  self._cameraPositionAtArStartedMoment = self._camera.position.clone(new Cesium.Cartesian3());
                  self._cameraHeadingAtArStartedMoment = self._camera.heading;
                  self._cameraPitchAtArStartedMoment = self._camera.pitch;

                  self._FPVStarted.raiseEvent();
                  self._enabled = true;
              }
          });
      };

      exitFPV() {
          enableDefaultScreenSpaceCameraController(this._cesiumViewer.scene);
          this._disconnectEventHandlers();
          this._startFPVPositionMobile = null;
          this._allowStartPositionTap = false;
          this._FPVFinished.raiseEvent();
          this._enabled = false;
      };

      _onKeyDown(event) {
          const keyCode = event.keyCode;

          this._direction = DIRECTION_NONE;

          switch (keyCode) {
              case 'W'.charCodeAt(0):
              case 38: // up arrow
                  this._direction = DIRECTION_FORWARD;
                  return;
              case 'S'.charCodeAt(0):
              case 40: //down arrow
                  this._direction = DIRECTION_BACKWARD;
                  return;
              case 'D'.charCodeAt(0):
              case 39: // right arrow
                  this._direction = DIRECTION_RIGHT;
                  return;
              case 'A'.charCodeAt(0):
              case 37: // left arrow
                  this._direction = DIRECTION_LEFT;
                  return;
              case 90: // z
                  if (this._main3dTileset)
                      this._main3dTileset.show = !this._main3dTileset.show;
                  return;
              default:
                  return;
          }
      };

      //noinspection JSUnusedLocalSymbols
      _onKeyUp() {
          this._direction = DIRECTION_NONE;
      };

      _getPickedCartographic(screenPosition) {
          if (this._isMobile)
              screenPosition = this._lastTapedPosition;

          const scene = this._cesiumViewer.scene;

          let globe = scene.globe;

          globe.depthTestAgainstTerrain = true;

          const pickRay = scene.camera.getPickRay(screenPosition);

          const result = scene.pickFromRay(pickRay);

          if (!result) {
              console.warn('pickFromRay failed!');
              return null;
          }

          const pickedCartographic = globe.ellipsoid.cartesianToCartographic(result.position);

          // check if user click the inside of 3d tile.
          // first we get the height value from clicked window position(pickedCartographic.height) which may different from the terrain height when user click the 3d tile
          // next we get the real terran height for clicked window position(terrainHeightAtPickedCartographic).
          // then compare it.

          // if globe is not shown, we do not need to perform this logic.

          if (globe.show) {
              // consider terrain height
              const terrainHeightAtPickedCartographic = globe.getHeight(pickedCartographic);

              if (terrainHeightAtPickedCartographic === undefined) {
                  console.warn('globe.getHeight(cartographic) failed!');
                  return null;
              }

              // determine if we clicked out of main 3d tileset
              if (Cesium.Math.equalsEpsilon(pickedCartographic.height, terrainHeightAtPickedCartographic, Cesium.Math.EPSILON4, Cesium.Math.EPSILON1)) {
                  console.warn('out of 3d tile!');

                  return null;
              }
          }

          // Cesium createWorldTerrain provider gives negative height value on some places
          if (pickedCartographic.height < 0) {
              console.warn("height is negative");
          }

          pickedCartographic.height = pickedCartographic.height + HUMAN_EYE_HEIGHT;

          return pickedCartographic;
      };

      _onMouseLButtonDoubleClicked(movement) {
          // first we get clicked(taped) position

          const pickedCartographic = this._getPickedCartographic(movement.position);

          /**
           * FPV was already started
           * In this case we fly to double clicked(taped) position
           */

          if (this._enabled) {
              if (!pickedCartographic)
                  return;

              const globe = this._cesiumViewer.scene.globe;

              this._camera.flyTo({
                  destination: globe.ellipsoid.cartographicToCartesian(pickedCartographic),
                  orientation: {
                      heading: this._camera.heading,
                      pitch: 0,
                      roll: 0.0
                  }
              });

              return;
          }

          if (!this._canStart)
              return;

          // we can directly start FPV

          if (!pickedCartographic) {
              alert("Unfortunately failed to enter FPV!");
              return;
          }

          this._doStartFPV(pickedCartographic);
      };

      _getCurrentCameraPositionAtCollisionHeight() {
          const currentCameraPosition = this._camera.position;

          const magnitude = Cesium.Cartesian3.magnitude(currentCameraPosition);
          const scalar = (magnitude - HUMAN_EYE_HEIGHT + COLLISION_RAY_HEIGHT) / magnitude;

          return Cesium.Cartesian3.multiplyByScalar(currentCameraPosition, scalar, new Cesium.Cartesian3());
      };

      _getRayPosition() {
          let currentCameraPosition = this._camera.position;

          let magnitude = Cesium.Cartesian3.magnitude(currentCameraPosition);
          let scalar = (magnitude - HUMAN_EYE_HEIGHT + COLLISION_RAY_HEIGHT) / magnitude;

          let ret = new Cesium.Cartesian3();

          return Cesium.Cartesian3.multiplyByScalar(currentCameraPosition, scalar, ret);
      };

      _changeCameraPosition(dt) {
          if (this._direction === DIRECTION_FORWARD)
              Cesium.Cartesian3.multiplyByScalar(this._camera.direction, 1, scratchDirection);
          else if (this._direction === DIRECTION_BACKWARD)
              Cesium.Cartesian3.multiplyByScalar(this._camera.direction, -1, scratchDirection);
          else if (this._direction === DIRECTION_LEFT)
              Cesium.Cartesian3.multiplyByScalar(this._camera.right, -1, scratchDirection);
          else if (this._direction === DIRECTION_RIGHT)
              Cesium.Cartesian3.multiplyByScalar(this._camera.right, 1, scratchDirection);

          let stepDistance = this._fpsConsideredWalkingSpeed() * dt;

          let deltaPosition = Cesium.Cartesian3.multiplyByScalar(scratchDirection, stepDistance, new Cesium.Cartesian3());

          let rayPosition = this._getRayPosition();

          let endPosition = Cesium.Cartesian3.add(rayPosition, deltaPosition, new Cesium.Cartesian3());

          let rayDirection = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(endPosition, rayPosition, new Cesium.Cartesian3()), new Cesium.Cartesian3());

          let ray = new Cesium.Ray(rayPosition, rayDirection);

          let result = this._cesiumViewer.scene.pickFromRay(ray);

          if (Cesium.defined(result)) {
              let distanceToIntersection = Cesium.Cartesian3.distanceSquared(rayPosition, result.position);

              if (distanceToIntersection > stepDistance) {
                  this._setCameraPosition(endPosition);
                  return;
              }

              return;
          }

          this._setCameraPosition(endPosition);
      };

      _setCameraPosition(position) {
          let globe = this._cesiumViewer.scene.globe;
          let ellipsoid = globe.ellipsoid;

          let cartographic = ellipsoid.cartesianToCartographic(position);

          cartographic.height = 0;

          let sampledHeight = this._cesiumViewer.scene.sampleHeight(cartographic);

          let currentCameraCartographic = ellipsoid.cartesianToCartographic(this._camera.position);

          if (sampledHeight === undefined) {
              console.warn('sampled height is undefined');
              return;
          }

          // Cesium createWorldTerrain provider gives negative height value on some places
          if (sampledHeight < 0) {
              console.warn('sampled height is negative');
          }

          if (sampledHeight > currentCameraCartographic.height)
              cartographic.height = currentCameraCartographic.height;
          else {
              cartographic.height = sampledHeight + HUMAN_EYE_HEIGHT;
          }

          this._camera.setView({
              destination: ellipsoid.cartographicToCartesian(cartographic),
              orientation: new Cesium.HeadingPitchRoll(this._camera.heading, this._camera.pitch, this._camera.roll),
              endTransform: Cesium.Matrix4.IDENTITY
          });
      };

      // check collision

      _canMove(startPosition, endPosition, stepDistance) {
          /**
           * code snippet to reconsider
           */

          /*
           const scene = this._cesiumViewer.scene;
           const globe = scene.globe;
           const ellipsoid = globe.ellipsoid;

           const startCartographic = ellipsoid.cartesianToCartographic(startPosition);
           const endCartographic = ellipsoid.cartesianToCartographic(endPosition);

           const startHeight =  scene.sampleHeight(startCartographic);
           const endHeight =  scene.sampleHeight(endCartographic);

           const deltaHeight = endHeight - startHeight;

           if(deltaHeight > 0.5)
           {
           console.warn('can not move 0.5 m higher position!');
           return false;
           }

           */

          if (this._ignoreCollisionDetection)
              return true;

          const rayDirection = Cesium.Cartesian3.subtract(endPosition, startPosition, new Cesium.Cartesian3());

          let ray = new Cesium.Ray(startPosition, rayDirection);

          // horizontal pick
          const result = this._cesiumViewer.scene.pickFromRay(ray);

          if (Cesium.defined(result)) {
              // check collision
              const distanceToIntersection = Cesium.Cartesian3.distanceSquared(startPosition, result.position);

              if (distanceToIntersection >= stepDistance) {
                  // we can safely move to endPosition
                  return true;
              } else {
                  // in future please consider vertical height difference
                  return false;
              }
          } else
              return true;
      };

      _getRevisedCameraPosition(targetPosition) {
          const scene = this._cesiumViewer.scene;
          const globe = scene.globe;
          const ellipsoid = globe.ellipsoid;

          const targetCartographic = ellipsoid.cartesianToCartographic(targetPosition);

          const heightAtTargetPosition = scene.sampleHeight(targetCartographic);

          const currentCameraCartographic = ellipsoid.cartesianToCartographic(this._camera.position);

          // console.log('heightAtTargetPosition: ' + heightAtTargetPosition);
          // console.log('current camera height: ' + currentCameraCartographic.height);

          if (heightAtTargetPosition === undefined) {
              console.warn('heightAtTargetPosition is undefined');
              /**
               *  in future we need to think why heightAtTargetPosition is undefined
               */

              //return null;

              targetCartographic.height = currentCameraCartographic.height;
              return ellipsoid.cartographicToCartesian(targetCartographic);
          }

          if (heightAtTargetPosition < 0) {
              /**
               *  in future we need to think why heightAtTargetPosition is negative
               */

              console.warn('heightAtTargetPosition is negative');
              //return null;

              targetCartographic.height = currentCameraCartographic.height;
              return ellipsoid.cartographicToCartesian(targetCartographic);
          }

          if (heightAtTargetPosition > currentCameraCartographic.height) {
              /**
               * code snippet to reconsider
               */
              targetCartographic.height = currentCameraCartographic.height;
          } else {
              targetCartographic.height = heightAtTargetPosition + HUMAN_EYE_HEIGHT;
          }

          return ellipsoid.cartographicToCartesian(targetCartographic);
      };

      _onClockTick(clock) {
          const dt = clock._clockStep;

          if (this._direction !== DIRECTION_NONE) {
              this._changeCameraPosition(dt);
          }
      };

      started() {
          return this._enabled;
      };

      getViewData() {
          const camera = this._cesiumViewer.camera;

          const cartographic = this._cesiumViewer.scene.globe.ellipsoid.cartesianToCartographic(camera.position);

          const viewData = {};

          viewData.longitude = cartographic.longitude;
          viewData.latitude = cartographic.latitude;
          viewData.height = cartographic.height;

          viewData.heading = camera.heading;
          viewData.pitch = camera.pitch;
          viewData.roll = camera.roll;

          return JSON.stringify(viewData);
      };

      _fpsConsideredWalkingSpeed() {
          const lastFPS = this._frameMonitor.lastFramesPerSecond;

          const defaultWorkingSpeed = this._walkingSpeed;

          if (lastFPS === undefined) {
              return defaultWorkingSpeed;
          }

          const factor = 30;

          return defaultWorkingSpeed * factor / lastFPS;
      };

      FPVStarted() {
          return this._FPVStarted;
      };

      FPVFinished() {
          return this._FPVFinished;
      };

      startFPVMobile() {
          this._doStartFPV(this._startFPVPositionMobile);
      };

      _getModifiedCurrentCameraPositionMobile() {
          const currentCameraPosition = this._cameraPositionAtArStartedMoment;

          const magnitude = Cesium.Cartesian3.magnitude(currentCameraPosition);
          const scalar = (magnitude - HUMAN_EYE_HEIGHT + COLLISION_RAY_HEIGHT) / magnitude;

          return Cesium.Cartesian3.multiplyByScalar(currentCameraPosition, scalar, new Cesium.Cartesian3());
      };

      setView(translationX, translationY, translationZ, rotationX, rotationY, rotationZ) {
          if (translationX == this._lastTranslationX &&
              translationZ == this._lastTranslationZ &&
              rotationX == this._lastRotationX &&
              rotationY == this._lastRotationY
          )
              return;

          let cameraPosition;

          const right = Cesium.Cartesian3.multiplyByScalar(this._cameraRightAtArStartedMoment, translationX, new Cesium.Cartesian3());
          const direction = Cesium.Cartesian3.multiplyByScalar(this._cameraDirectionAtArStartedMoment, -translationZ, new Cesium.Cartesian3());
          const up = Cesium.Cartesian3.multiplyByScalar(this._cameraUpAtArStartedMoment, translationY, new Cesium.Cartesian3());

          let deltaPosition = Cesium.Cartesian3.add(right, direction, new Cesium.Cartesian3());

          // we ignore up movement
          //deltaPosition = Cesium.Cartesian3.add(deltaPosition, up, new Cesium.Cartesian3());

          if (deltaPosition.equals(Cesium.Cartesian3.ZERO)) {
              cameraPosition = this._cameraPositionAtArStartedMoment.clone();
          } else {
              const startPosition = this._getModifiedCurrentCameraPositionMobile();

              const endPosition = Cesium.Cartesian3.add(startPosition, deltaPosition, new Cesium.Cartesian3());

              if (!this._canMove(startPosition, endPosition, Cesium.Cartesian3.magnitude(deltaPosition))) {
                  console.warn('collision detected. can not move!');
                  cameraPosition = this._cameraPositionAtArStartedMoment.clone();
              } else {
                  cameraPosition = this._getRevisedCameraPosition(endPosition);
              }
          }

          // change orientation

          const originalHeadingInDegree = Cesium.Math.toDegrees(this._cameraHeadingAtArStartedMoment);
          const newHeadingInDegree = originalHeadingInDegree + rotationX;

          const originalPitchInDegree = Cesium.Math.toDegrees(this._cameraPitchAtArStartedMoment);
          let newPitchInDegree = originalPitchInDegree + rotationY;

          newPitchInDegree = this._validPitch(newPitchInDegree);

          // we ignore roll
          this._camera.setView({
              destination: cameraPosition,
              orientation: {
                  heading: Cesium.Math.toRadians(newHeadingInDegree),
                  pitch: Cesium.Math.toRadians(newPitchInDegree),
                  roll: this._camera.roll
              },
              endTransform: Cesium.Matrix4.IDENTITY
          });

          this._lastTranslationX = translationX;
          this._lastTranslationY = translationY;
          this._lastTranslationZ = translationZ;

          this._lastRotationX = rotationX;
          this._lastRotationY = rotationY;
          this._lastRotationZ = rotationZ;
      };

      startFPVPositionMobile() {
          return this._startFPVPositionMobile;
      };

      setDirectionLeft() {
          this._direction = DIRECTION_LEFT;
      };

      setDirectionRight() {
          this._direction = DIRECTION_RIGHT;
      };

      setDirectionForward() {
          this._direction = DIRECTION_FORWARD;
      };

      setDirectionBackward() {
          this._direction = DIRECTION_BACKWARD;
      };

      setDirectionNone() {
          this._direction = DIRECTION_NONE;
      };

      onDoubleTaped(movement) {
          this._onMouseLButtonDoubleClicked(movement);
      };

      setWorkingSpeed(speed) {
          this._walkingSpeed = speed;
      };

      setImmersiveArEnabled(b) {
          this._immersiveArEnabled = b;
      };

      setCanStart(b) {
          this._canStart = b;
      };
  }

  function saveCurrentView() {
      let jqSaveCurrentViewButton = jQuery('#save_current_view');

      jqSaveCurrentViewButton.prop('disabled', true);

      jQuery.ajax({
          url : CONSTRUKTED_AJAX.ajaxurl,
          type : 'post',
          data : {
              action : 'post_set_current_view',
              post_id : CONSTRUKTED_AJAX.post_id,
              view_data: getRelativeCurrentCameraPositionOrientationJsonString()
          },
          success : function( response ) {
              jqSaveCurrentViewButton.prop('disabled', false);
              alert(response);
          },
          error: function(xhr, status, error) {
              jqSaveCurrentViewButton.prop('disabled', false);
              alert('error');
          }
      });
  }

  function resetCameraView() {
      let jqResetCameraViewButton = jQuery('#reset_camera_view');

      jqResetCameraViewButton.prop('disabled', true);

      jQuery.ajax({
          url : CONSTRUKTED_AJAX.ajaxurl,
          type : 'post',
          data : {
              action : 'post_reset_current_view',
              post_id : CONSTRUKTED_AJAX.post_id
          },
          success : function( response ) {
              jqResetCameraViewButton.prop('disabled', false);
              alert(response);
          },
          error: function(xhr, status, error) {
              jqResetCameraViewButton.prop('disabled', false);
              alert('error');
          }
      });
  }

  function captureThumbnail(viewer) {
      let jqCaptureThumbnailButton = jQuery('#capture_thumbnail');

      viewer.scene.requestRender();
      viewer.render();

      let mediumQuality  = viewer.canvas.toDataURL('image/jpeg', 0.5);

      jqCaptureThumbnailButton.prop('disabled', true);

      jQuery.ajax({
          url : CONSTRUKTED_AJAX.ajaxurl,
          type : 'post',
          data : {
              action : 'post_set_thumbnail',
              post_id : CONSTRUKTED_AJAX.post_id,
              capturedJpegImage: mediumQuality
          },
          success : function( response ) {
              jqCaptureThumbnailButton.prop('disabled', false);
              alert(response);
          },
          error: function() {
              jqCaptureThumbnailButton.prop('disabled', false);
              alert('error');
          }
      });
  }

  function saveTilesetModelMatrix(tileset) {
      if(tileset.asset.extras && tileset.asset.extras.ion.georeferenced) {
          _saveTilesetModelMatrixForGeoReferencedTileset();
      }
      else {
          _saveTilesetModelMatrixForNonGeoReferencedTileset();
      }
  }

  function _saveTilesetModelMatrixForGeoReferencedTileset() {
      let jqTilesetAltitude = jQuery('#tileset_altitude');

      let data = {
          longitude: 0,
          latitude: 0,
          height: jqTilesetAltitude.val(),
          heading: 0,
          pitch: 0,
          roll: 0,
          scale: 0
      };

      _doDoSaveTilesetModelMatrix(data);
  }

  function _saveTilesetModelMatrixForNonGeoReferencedTileset() {
      if(transformEditor && transformEditor.active) {
          let position = transformEditor.viewModel.position;
          let headingPitchRoll = transformEditor.viewModel.headingPitchRoll;
          let scale = transformEditor.viewModel.scale;

          _doSaveTilesetModelMatrix(position, headingPitchRoll, scale);
      } else {
          let currentModelMatrix = tileset.modelMatrix;

          let position = Cesium.Matrix4.getTranslation(currentModelMatrix, new Cesium.Cartesian3());

          let scene = viewer.scene;

          let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(currentModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

          let scale = Cesium.Matrix4.getScale(currentModelMatrix, new Cesium.Cartesian3());

          _doSaveTilesetModelMatrix(position, headingPitchRoll, scale);
      }
  }

  function _doSaveTilesetModelMatrix(position, headingPitchRoll, scale) {
      let cartographic = Cesium.Cartographic.fromCartesian(position);

      let precision = 8;

      let data = {
          longitude: Cesium.Math.toDegrees(cartographic.longitude).toFixed(precision),
          latitude: Cesium.Math.toDegrees(cartographic.latitude).toFixed(precision),
          height: cartographic.height.toFixed(precision),
          heading: Cesium.Math.toDegrees(headingPitchRoll.heading).toFixed(precision),
          pitch: Cesium.Math.toDegrees(headingPitchRoll.pitch).toFixed(precision),
          roll: Cesium.Math.toDegrees(headingPitchRoll.roll).toFixed(precision),
          scale: scale
      };

      _doDoSaveTilesetModelMatrix(data);
  }

  function _doDoSaveTilesetModelMatrix(data) {
      let jqSaveTilesetModelMatrixButton = jQuery('#save_tileset_model_matrix_button');

      jqSaveTilesetModelMatrixButton.prop('disabled', true);

      jQuery.ajax({
          url : CONSTRUKTED_AJAX.ajaxurl,
          type : 'post',
          data : {
              action : 'set_asset_geo_location_json',
              post_id : CONSTRUKTED_AJAX.post_id,
              asset_geo_location_json: JSON.stringify(data)
          },
          success : function( response ) {
              jqSaveTilesetModelMatrixButton.prop('disabled', false);

              let data = JSON.parse(response);

              if(data.ret === false) {
                  alert('Passed values is the same as the values that is already in the database!');
                  return;
              }

              alert('Successfully updated!');
          },
          error: function(xhr, status, error) {
              jqSaveTilesetModelMatrixButton.prop('disabled', false);

              alert('error');
          }
      });
  }

  function initSettingsPopup(tileset, cesiumFPVCameraController, cesiumFLYCameraController) {
      let jqCaptureThumbnailButton = jQuery('#capture_thumbnail');
      let jqSaveCurrentViewButton = jQuery('#save_current_view');
      let jqResetCameraViewButton = jQuery('#reset_camera_view');
      let jqShowHideWireframeCheckbox = jQuery('#show-hide-wireframe-checkbox');
      let jqShowHideTilesInspectorCheckbox = jQuery('#show-hide-tiles-inspector-checkbox');

      jqCaptureThumbnailButton.click(function () {
          captureThumbnail();
      });

      jqSaveCurrentViewButton.click(function () {
          saveCurrentView();
      });

      jqResetCameraViewButton.click(function () {
          resetCameraView();
      });

      jQuery('#maximum-screen-space-error-slider').change(function () {
          if (!tileset)
              return;

          tileset.maximumScreenSpaceError = 32 - this.value;
      });

      jQuery('#fpv-movement-speed-slider').change(function () {
          if (!tileset)
              return;

          if (!cesiumFPVCameraController)
              return;

          cesiumFPVCameraController.setWorkingSpeed(parseFloat(this.value));
          cesiumFLYCameraController.setMoveRateFactor(parseFloat(this.value));
      });

      jqShowHideWireframeCheckbox.change(function () {
          if (!tileset)
              return;

          tileset.debugWireframe = this.checked;
      });

      jqShowHideTilesInspectorCheckbox.change(function () {
          if (!tileset)
              return;

          showHideTilesInspector(this.checked);
      });
  }

  function initMeasurementPopup(viewer) {
      let measure = viewer.measure;

      let measureViewModel = measure.viewModel;

      let pointMeasurement = measureViewModel._measurements[7];
      let distanceMeasurement = measureViewModel._measurements[1];
      let polylineMeasurement = measureViewModel._measurements[2];
      let areaMeasurement = measureViewModel._measurements[6];

      function addMeasurementCheckbox(id, label) {
          let newCheckBox = ' <div class="form-check">\n' +
              '                                    <input class="form-check-input" type="checkbox" id="' + id + '" checked>\n' +
              '                                    <label class="form-check-label" for="' + id + '">\n' +
              label +
              '                                    </label>\n' +
              '                                </div>';

          $('#measurement-list').append(newCheckBox);

          $('[id=' + id + ']').change(function () {
              let tokens = id.split('-');

              let measurementType = tokens[0];
              let measurementIndex = parseInt(tokens[1]);

              if (measurementType === 'point') {
                  showHidePointMeasurement(pointMeasurement.measurementResult[measurementIndex], this.checked);
              }

              if (measurementType === 'distance') {
                  showHideDistanceMeasurement(distanceMeasurement.measurementResult[measurementIndex], this.checked);
              }

              if (measurementType === 'polyline') {
                  showHidePolylineMeasurement(polylineMeasurement.measurementResult[measurementIndex], this.checked);
              }

              if (measurementType === 'area') {
                  showHideAreaMeasurement(areaMeasurement.measurementResult[measurementIndex], this.checked);
              }

              viewer.scene.requestRender();
          });
      }

      pointMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
          console.log(measurementIndex);

          let measurement = pointMeasurement.measurementResult[measurementIndex];

          console.log(measurement);

          addMeasurementCheckbox('point-' + measurementIndex, 'Point ' + measurementIndex);
      });

      distanceMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
          console.log(measurementIndex);

          let measurement = distanceMeasurement.measurementResult[measurementIndex];

          console.log(measurement);

          addMeasurementCheckbox('distance-' + measurementIndex, 'Distance ' + measurementIndex);
      });

      polylineMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
          console.log(measurementIndex);

          let measurement = polylineMeasurement.measurementResult[measurementIndex];

          console.log(measurement);

          addMeasurementCheckbox('polyline-' + measurementIndex, 'Polyline ' + measurementIndex);
      });

      areaMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
          console.log(measurementIndex);

          let measurement = areaMeasurement.measurementResult[measurementIndex];

          console.log(measurement);

          addMeasurementCheckbox('area-' + measurementIndex, 'Area ' + measurementIndex);
      });

      function deactivateAllMeasurementToolButtons() {
          $('*[id*=measurement-tool-button]').each(function () {
              this.classList.remove('active');
          });
      }

      function enableEndMeasurementButton() {
          $('#end-measurement').removeClass('disabled');
      }

      jQuery('#measurement-tool-button-component-distance').click(function () {
          deactivateAllMeasurementToolButtons();
          this.classList.add('active');

          enableEndMeasurementButton();

          measureViewModel._activate();
          measureViewModel.selectedMeasurement = distanceMeasurement;
      });

      jQuery('#measurement-tool-button-polyline').click(function () {
          deactivateAllMeasurementToolButtons();
          this.classList.add('active');

          enableEndMeasurementButton();
          measureViewModel._activate();
          measureViewModel.selectedMeasurement = polylineMeasurement;
      });

      jQuery('#measurement-tool-button-area').click(function () {
          deactivateAllMeasurementToolButtons();
          this.classList.add('active');

          enableEndMeasurementButton();
          measureViewModel._activate();
          measureViewModel.selectedMeasurement = areaMeasurement;
      });

      jQuery('#measurement-tool-button-point').click(function () {
          deactivateAllMeasurementToolButtons();
          this.classList.add('active');

          enableEndMeasurementButton();

          measureViewModel._activate();
          measureViewModel.selectedMeasurement = pointMeasurement;
      });

      $('#end-measurement').click(function () {
          deactivateAllMeasurementToolButtons();
          measureViewModel._deactivate();
      });

      function showHidePointMeasurement(pointMeasurement, show) {
          pointMeasurement.point.show = show;
          pointMeasurement.label.show = show;
      }

      function showHideDistanceMeasurement(distanceMeasurement, show) {
          distanceMeasurement.startPoint.show = show;
          distanceMeasurement.endPoint.show = show;
          distanceMeasurement.polyline.show = show;
          distanceMeasurement.xyPolyline.show = show;
          distanceMeasurement.xyBox.show = show;
          distanceMeasurement.label.show = show;
          distanceMeasurement.xLabel.show = show;
          distanceMeasurement.xAngleLabel.show = show;
          distanceMeasurement.yLabel.show = show;
          distanceMeasurement.yAngleLabel.show = show;
      }

      function showHidePolylineMeasurement(polylineMeasurement, show) {
          polylineMeasurement.label.show = show;

          for (let i = 0; i < polylineMeasurement.segmentLabels.length; i++)
              polylineMeasurement.segmentLabels[i].show = show;

          polylineMeasurement.polyline.show = show;

          for (let i = 0; i < polylineMeasurement.points.length; i++)
              polylineMeasurement.points[i].show = show;
      }

      function showHideAreaMeasurement(areaMeasurement, show) {
          areaMeasurement.label.show = show;
          areaMeasurement.polygon.show = show;
          areaMeasurement.polyline.show = show;

          for (let i = 0; i < areaMeasurement.points.length; i++)
              areaMeasurement.points[i].show = show;
      }

      function showHideAllMeasurement(show) {
          let pointMeasurements = pointMeasurement.measurementResult;

          for (let i = 0; i < pointMeasurements.length; i++)
              showHidePointMeasurement(pointMeasurements[i], show);

          let distanceMeasurements = distanceMeasurement.measurementResult;

          for (let i = 0; i < distanceMeasurements.length; i++)
              showHideDistanceMeasurement(distanceMeasurements[i], show);

          let polylineMeasurements = polylineMeasurement.measurementResult;

          for (let i = 0; i < polylineMeasurements.length; i++)
              showHidePolylineMeasurement(polylineMeasurements[i], show);

          let areaMeasurements = areaMeasurement.measurementResult;

          for (let i = 0; i < areaMeasurements.length; i++)
              showHideAreaMeasurement(areaMeasurements[i], show);

          viewer.scene.requestRender();
      }

      $('#show-hide-all-measurement-checkbox').change(function () {
          let checked = this.checked;

          showHideAllMeasurement(checked);

          $('*[id*=measurement-result]').each(function () {

              this.checked = checked;

              console.log(this.id);
          });
      });

      $('#end-measurement').click(function () {
          deactivateAllMeasurementToolButtons();
          measureViewModel._deactivate();
      });
  }

  /* global Cesium */

  let assetGeoLocationData;

  function initGeoLocationPopup(viewer, tileset, transformEditor) {
      let jqTilesetLatitude = jQuery('#tileset_latitude');
      let jqTilesetLongitude = jQuery('#tileset_longitude');
      let jqTilesetAltitude = jQuery('#tileset_altitude');
      let jqTilesetEstimateAltitude = jQuery('#tileset_estimate_altitude');
      let jqSaveTilesetModelMatrixButton = jQuery('#save_tileset_model_matrix_button');

      let tileset_model_matrix = null;

      if (CONSTRUKTED_AJAX.asset_geo_location) {
          assetGeoLocationData = CONSTRUKTED_AJAX.asset_geo_location;

          if (!assetGeoLocationData.longitude ||
              !assetGeoLocationData.latitude ||
              !assetGeoLocationData.height) {
              console.warn('invalid asset geo location!');
              console.warn(CONSTRUKTED_AJAX.asset_geo_location);
          } else {
              assetGeoLocationData.longitude = parseFloat(assetGeoLocationData.longitude);
              assetGeoLocationData.latitude = parseFloat(assetGeoLocationData.latitude);
              assetGeoLocationData.height = parseFloat(assetGeoLocationData.height);
              assetGeoLocationData.heading = parseFloat(assetGeoLocationData.heading);
              assetGeoLocationData.pitch = parseFloat(assetGeoLocationData.pitch);
              assetGeoLocationData.roll = parseFloat(assetGeoLocationData.roll);

              let carto = new Cesium.Cartographic(
                  Cesium.Math.toRadians(assetGeoLocationData.longitude),
                  Cesium.Math.toRadians(assetGeoLocationData.latitude),
                  assetGeoLocationData.height);

              tileset_model_matrix = {
                  position: viewer.scene.globe.ellipsoid.cartographicToCartesian(carto),
                  headingPitchRoll: {
                      heading: Cesium.Math.toRadians(assetGeoLocationData.heading),
                      pitch: Cesium.Math.toRadians(assetGeoLocationData.pitch),
                      roll: Cesium.Math.toRadians(assetGeoLocationData.roll)
                  },
                  scale: assetGeoLocationData.scale
              };
          }
      }

      let setHprQuaternion = new Cesium.Quaternion();
      let setHprQuaternion2 = new Cesium.Quaternion();
      let setHprTranslation = new Cesium.Cartesian3();
      let setHprScale = new Cesium.Cartesian3();
      let setHprCenter = new Cesium.Cartesian3();
      let setHprTransform = new Cesium.Matrix4();
      let setHprRotation = new Cesium.Matrix3();

      function setHeadingPitchRoll(transform, headingPitchRoll) {
          //>>includeStart('debug', pragmas.debug);
          Cesium.Check.defined('transform', transform);
          Cesium.Check.defined('headingPitchRoll', headingPitchRoll);
          //>>includeEnd('debug');

          let rotationQuaternion = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, setHprQuaternion);
          let translation = Cesium.Matrix4.getTranslation(transform, setHprTranslation);
          let scale = Cesium.Matrix4.getScale(transform, setHprScale);
          let center = Cesium.Matrix4.multiplyByPoint(transform, Cesium.Cartesian3.ZERO, setHprCenter);
          let backTransform = Cesium.Transforms.eastNorthUpToFixedFrame(center, undefined, setHprTransform);

          let rotationFixed = Cesium.Matrix4.getMatrix3(backTransform, setHprRotation);
          let quaternionFixed = Cesium.Quaternion.fromRotationMatrix(rotationFixed, setHprQuaternion2);
          let rotation = Cesium.Quaternion.multiply(quaternionFixed, rotationQuaternion, rotationFixed);

          return Cesium.Matrix4.fromTranslationQuaternionRotationScale(translation, rotation, scale, transform);
      }

      function changeTilesetModelMatrix(newPosition, headingPitchRoll) {
          let origModelMatrix = tileset.modelMatrix;

          origModelMatrix = Cesium.Matrix4.setTranslation(origModelMatrix, newPosition, origModelMatrix);

          setHeadingPitchRoll(origModelMatrix, headingPitchRoll);
      }

      if (tileset_model_matrix) {
          jqTilesetLatitude.val(assetGeoLocationData.latitude);
          jqTilesetLongitude.val(assetGeoLocationData.longitude);
          jqTilesetAltitude.val(assetGeoLocationData.height);
          jQuery('#tileset_heading').val(assetGeoLocationData.heading);
      } else {
          jqTilesetLatitude.val(0);
          jqTilesetLongitude.val(0);
          jqTilesetAltitude.val(0);
          jQuery('#tileset_heading').val(0);
      }

      jQuery('#edit_asset_geo_location_button').click(function () {
          if (transformEditor)
              transformEditor.viewModel.activate();
      });

      jqSaveTilesetModelMatrixButton.click(function () {
          saveTilesetModelMatrix();
      });

      jqTilesetLongitude.change(function () {
          let longitude = jqTilesetLongitude.val();

          longitude = parseFloat(longitude);

          if (isNaN(longitude) || longitude > 180 || longitude < -180) {
              jqTilesetLongitude.val('');
              alert('invalid longitude: ' + longitude);
              return;
          }

          customSceneSetting(this._viewer, true);

          let origModelMatrix = tileset.modelMatrix;

          let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

          let origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

          origCartographic.longitude = longitude * Cesium.Math.RADIANS_PER_DEGREE;

          let newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

          let scene = viewer.scene;

          let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

          changeTilesetModelMatrix(newPosition, headingPitchRoll);

          viewer.flyTo(tileset);
      });

      jqTilesetLatitude.change(function () {
          let latitude = jqTilesetLatitude.val();
          latitude = parseFloat(latitude);

          if (isNaN(latitude) || latitude > 90 || latitude < -90) {
              jqTilesetLatitude.val('');
              alert('invalid latitude: ' + latitude);
              return;
          }

          customSceneSetting(true);

          let origModelMatrix = tileset.modelMatrix;

          let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

          let origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

          origCartographic.latitude = latitude * Cesium.Math.RADIANS_PER_DEGREE;

          let newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

          let scene = viewer.scene;

          let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

          changeTilesetModelMatrix(newPosition, headingPitchRoll);

          viewer.flyTo(tileset);
      });

      function changeTilesetHeight(height) {
          if (tileset.asset.extras && tileset.asset.extras.ion.georeferenced) {
              doChangeTilesetHeightForGeoReferencedTileset(height);
          } else {
              doChangeTilesetHeightForNonGeoReferencedTileset(height);
          }
      }

      function doChangeTilesetHeightForGeoReferencedTileset(height) {
          let heightDifference = originalBoundingSphereCenterHeight - height;

          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, heightDifference));
      }

      function doChangeTilesetHeightForNonGeoReferencedTileset(height) {
          let origModelMatrix = tileset.modelMatrix;

          let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

          let origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

          origCartographic.height = height;

          let newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

          let scene = viewer.scene;

          let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

          changeTilesetModelMatrix(newPosition, headingPitchRoll);
      }

      jqTilesetAltitude.change(function () {
          let altitude = jqTilesetAltitude.val();
          altitude = parseFloat(altitude);

          if (isNaN(altitude) || altitude > 15000 || altitude < -1000) {
              jqTilesetAltitude.val('');
              alert('invalid altitude: ' + altitude);
              return;
          }

          customSceneSetting(true);
          changeTilesetHeight(altitude);

          viewer.zoomTo(tileset);
      });

      jQuery('#tileset_heading').change(function () {
          let heading = jQuery('#tileset_heading').val();
          heading = parseFloat(heading);

          if (isNaN(heading) || heading > 180 || heading < -180) {
              jQuery('#tileset_heading').val('');
              alert('invalid heading: ' + heading);
              return;
          }

          let origModelMatrix = tileset.modelMatrix;

          let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

          let scene = viewer.scene;

          let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

          headingPitchRoll.heading = heading * Cesium.Math.RADIANS_PER_DEGREE;

          changeTilesetModelMatrix(origPosition, headingPitchRoll);

          viewer.zoomTo(tileset);
      });

      jQuery('#tileset-transparency-slider').change(function () {
          let value = this.value;

          tileset.style = new Cesium.Cesium3DTileStyle({
              color: 'rgba(255, 255, 255,' + value + ')'
          });

          viewer.scene.requestRender();
      });

      jqTilesetEstimateAltitude.click(function () {
          let longitude = jqTilesetLongitude.val();
          let latitude = jqTilesetLatitude.val();

          longitude = parseFloat(longitude);
          latitude = parseFloat(latitude);

          if (longitude === 0 && latitude === 0) {
              alert('Please input valid Latitude and Longitude!');
              return;
          }

          let globe = viewer.scene.globe;
          let cartographic = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude));

          let terrainHeight = globe.getHeight(cartographic);

          if (terrainHeight === undefined) {
              alert('failed to get height!');
              return;
          }

          jqTilesetAltitude.val(terrainHeight.toFixed(3));
          changeTilesetHeight(terrainHeight);
          viewer.zoomTo(tileset);
      });

      return tileset_model_matrix;
  }

  var css_248z$3 = ".construkted-viewer-controlbarContainer {\r\n    display: block;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 33px;\r\n    background-color: #384d68;\r\n\r\n    /*\r\n        override .airkit_single-post .featured-image, .page .featured-image\r\n        text-align center\r\n    */\r\n    text-align: left !important;\r\n}\r\n\r\n.construkted-viewer-controlbar-button {\r\n    background-color: rgba(60, 80, 105,.3);\r\n    border: 1px solid #fff;\r\n    color: #edffff;\r\n    border-radius: 5px;\r\n    padding: 3px 7px;\r\n    cursor: pointer;\r\n    -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    margin-top: 3px;\r\n    margin-left: 2px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.construkted-viewer-controlbar-button:first-child {\r\n    margin-left: 20px;\r\n}";
  const stylesheet$3=".construkted-viewer-controlbarContainer {\r\n    display: block;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 33px;\r\n    background-color: #384d68;\r\n\r\n    /*\r\n        override .airkit_single-post .featured-image, .page .featured-image\r\n        text-align center\r\n    */\r\n    text-align: left !important;\r\n}\r\n\r\n.construkted-viewer-controlbar-button {\r\n    background-color: rgba(60, 80, 105,.3);\r\n    border: 1px solid #fff;\r\n    color: #edffff;\r\n    border-radius: 5px;\r\n    padding: 3px 7px;\r\n    cursor: pointer;\r\n    -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    margin-top: 3px;\r\n    margin-left: 2px;\r\n    margin-right: 2px;\r\n}\r\n\r\n.construkted-viewer-controlbar-button:first-child {\r\n    margin-left: 20px;\r\n}";
  styleInject(css_248z$3);

  const Event = Cesium.Event;

  class Controlbar{
      constructor(container){
          this._fpvButtonClicked = new Event();
          this._flyButtonClicked = new Event();
          this._orbitButtonClicked = new Event();

          const fpvButton = newButton('FPV');

          fpvButton.addEventListener('click', () =>{
              this._fpvButtonClicked.raiseEvent();
          });

          container.appendChild(fpvButton);

          const flyButton = newButton('FLY');

          flyButton.addEventListener('click', () =>{
              this._flyButtonClicked.raiseEvent();
          });

          container.appendChild(flyButton);

          const orbitButton = newButton('ORBIT');

          orbitButton.addEventListener('click', () =>{
              this._orbitButtonClicked.raiseEvent();
          });

          container.appendChild(orbitButton);
      }
  }

  Object.defineProperties(Controlbar.prototype, {
     fpvButtonClicked: {
         get: function () {
             return this._fpvButtonClicked;
         }
     },
      flyButtonClicked: {
          get: function () {
              return this._flyButtonClicked;
          }
      },
      orbitButtonClicked: {
          get: function () {
              return this._orbitButtonClicked;
          }
      }
  });

  function newButton(text) {
      const button = document.createElement('button');

      button.type = "button";
      button.textContent = text;
      button.className = "construkted-viewer-controlbar-button";

      return button;
  }

  /*
   sandcastle sample

   https://sandcastle.cesium.com/?src=Camera%20Tutorial.html
  */

  /*global Cesium*/

  let flags = {
      moveForward: false,
      moveBackward: false,
      moveUp: false,
      moveDown: false,
      moveLeft: false,
      moveRight: false,
  };

  class CesiumFLYCameraController extends CesiumCameraController{
      constructor(options){
          super(options);

          this._started = false;
          this._moveRateFactor = 0.1;

          document.addEventListener(
              "keydown",
              function (e) {
                  const flagName = getFlagForKeyCode(e.keyCode);

                  if (typeof flagName !== "undefined") {
                      flags[flagName] = true;
                  }
              },
              false
          );

          document.addEventListener(
              "keyup",
              function (e) {
                  const flagName = getFlagForKeyCode(e.keyCode);
                  if (typeof flagName !== "undefined") {
                      flags[flagName] = false;
                  }
              },
              false
          );

          const viewer = this._cesiumViewer;
          const canvas = viewer.canvas;
          const ellipsoid = viewer.scene.globe.ellipsoid;

          canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
          canvas.onclick = function () {
              canvas.focus();
          };

          viewer.clock.onTick.addEventListener( (clock) => {
              if(!this._started)
                  return;

              let camera = viewer.camera;

              // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
              const cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;

              let moveRate = cameraHeight / 100.0;

              const adjustFactor = 0.5;

              moveRate = moveRate * this._moveRateFactor * adjustFactor;

              console.log('moveRate', moveRate);

              if (flags.moveForward) {
                  camera.moveForward(moveRate);
              }
              if (flags.moveBackward) {
                  camera.moveBackward(moveRate);
              }
              if (flags.moveUp) {
                  camera.moveUpEx(moveRate);
              }
              if (flags.moveDown) {
                  camera.moveDownEx(moveRate);
              }
              if (flags.moveLeft) {
                  camera.moveLeft(moveRate);
              }
              if (flags.moveRight) {
                  camera.moveRight(moveRate);
              }
          });
      }

      start(){
          disableDefaultScreenSpaceCameraController(this._cesiumViewer.scene);
          this._started = true;

          this._screenSpaceEventHandler.setInputAction(this._onMouseMove.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }

      stop(){
          enableDefaultScreenSpaceCameraController(this._cesiumViewer.scene);
          this._started = false;

          this._screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }

      started() {
          return this._started;
      }

      setMoveRateFactor(n){
          this._moveRateFactor = n;
      }
  }

  function getFlagForKeyCode(keyCode) {
      switch (keyCode) {
          case "W".charCodeAt(0):
              return "moveForward";
          case "S".charCodeAt(0):
              return "moveBackward";
          case "R".charCodeAt(0):
              return "moveUp";
          case "F".charCodeAt(0):
              return "moveDown";
          case "D".charCodeAt(0):
              return "moveRight";
          case "A".charCodeAt(0):
              return "moveLeft";
          default:
              return undefined;
      }
  }

  function initFPVNavigation(cesiumFPVCameraController) {
      let jqMoveLeftButton = jQuery('.fpv-left');
      let jqMoveRightButton = jQuery('.fpv-right');
      let jqMoveFrontButton = jQuery('.fpv-up');
      let jqMoveBackButton = jQuery('.fpv-down');

      jqMoveLeftButton.on('mousedown', function () {
          cesiumFPVCameraController.setDirectionLeft();
      });

      jqMoveLeftButton.on('mouseup', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveRightButton.on('mousedown', function () {
          cesiumFPVCameraController.setDirectionRight();
      });

      jqMoveRightButton.on('mouseup', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveFrontButton.on('mousedown', function () {
          cesiumFPVCameraController.setDirectionForward();
      });

      jqMoveFrontButton.on('mouseup', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveBackButton.on('mousedown', function () {
          cesiumFPVCameraController.setDirectionBackward();
      });

      jqMoveBackButton.on('mouseup', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveLeftButton.on('touchstart', function () {
          cesiumFPVCameraController.setDirectionLeft();
      });

      jqMoveLeftButton.on('touchend', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveRightButton.on('touchstart', function () {
          cesiumFPVCameraController.setDirectionRight();
      });

      jqMoveRightButton.on('touchend', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveFrontButton.on('touchstart', function () {
          cesiumFPVCameraController.setDirectionForward();
      });

      jqMoveFrontButton.on('touchend', function () {
          cesiumFPVCameraController.setDirectionNone();
      });

      jqMoveBackButton.on('touchstart', function () {
          cesiumFPVCameraController.setDirectionBackward();
      });

      jqMoveBackButton.on('touchend', function () {
          cesiumFPVCameraController.setDirectionNone();
      });
  }

  /* global Cesium */

  let xrButton$1;
  let cesiumFPVCameraController$1;
  let tileset_model_matrix = null;
  let originalBoundingSphereCenterHeight$1 = 0;

  let jqTilesetLatitude = jQuery('#tileset_latitude');
  let jqTilesetLongitude = jQuery('#tileset_longitude');
  let jqTilesetAltitude = jQuery('#tileset_altitude');
  let jqTilesetHeading = jQuery('#tileset_heading');
  let jqEditAssetGeoLocationButton = jQuery('#edit_asset_geo_location_button');
  let jqTilesetEstimateAltitude = jQuery('#tileset_estimate_altitude');

  let transformEditor$1 = null;

  class ConstruktedViewer {
      constructor() {
          this._viewer = null;
          this._tileset = null;
      }

      start() {
          this._createCesiumViewer();
          this._addTileset();

          this._flyController = new CesiumFLYCameraController({
              isMobile: isMobile(),
              cesiumViewer: this._viewer
          });

          this._createControlbar();

          tileset_model_matrix = initGeoLocationPopup(this._viewer, this._tileset, transformEditor$1);
          initMeasurementPopup(this._viewer);

          this.initXR();
      }

      _createCesiumViewer(){
          Cesium.Ion.defaultAccessToken = CONSTRUKTED_AJAX.cesium_access_token;

          if (!Cesium.Ion.defaultAccessToken)
              console.warn('default access token is null!');

          let viewer = new Cesium.Viewer('cesiumContainer', {
              terrainProvider: Cesium.createWorldTerrain(),
              animation: false,
              homeButton: false, //  the HomeButton widget will not be created.
              baseLayerPicker: false, // If set to false, the BaseLayerPicker widget will not be created.
              geocoder: false,
              sceneModePicker: false,
              timeline: false,
              fullscreenElement: 'cesiumContainer',
              requestRenderMode: true,
              navigationHelpButton: false
          });

          this._viewer = viewer;

          viewer.resolutionScale = 1.0;
          viewer.scene.globe.depthTestAgainstTerrain = true;

          viewer.extend(Cesium.viewerMeasureMixin, {
              units: new Cesium.MeasureUnits({
                  distanceUnits: Cesium.DistanceUnits.METERS,
                  areaUnits: Cesium.AreaUnits.SQUARE_METERS,
                  volumeUnits: Cesium.VolumeUnits.CUBIC_METERS
              })
          });

          viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);

          const inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;

          inspectorViewModel.picking = false;

          showHideTilesInspector(false);

          /* Switch mouse buttons in Cesium viewer:
              - Left button to pan
              - Right button to rotate
              - Wheel to zoom
              - Middle button to zoom
          */

          viewer.scene.screenSpaceCameraController.rotateEventTypes = Cesium.CameraEventType.LEFT_DRAG;
          viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.MIDDLE_DRAG, Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];

          viewer.scene.screenSpaceCameraController.tiltEventTypes = [
              Cesium.CameraEventType.RIGHT_DRAG, Cesium.CameraEventType.PINCH,
              {
                  eventType: Cesium.CameraEventType.RIGHT_DRAG,
                  modifier: Cesium.KeyboardEventModifier.CTRL
              },
              {
                  eventType: Cesium.CameraEventType.LEFT_DRAG,
                  modifier: Cesium.KeyboardEventModifier.CTRL
              }
          ];
      }

      _addTileset(){
          let tilesetURL = 'https://s3.us-east-2.wasabisys.com/construkted-assets/' + CONSTRUKTED_AJAX.post_slug + '/tileset.json';

          let tileset = this._viewer.scene.primitives.add(
              new Cesium.Cesium3DTileset({
                  url: tilesetURL,
                  immediatelyLoadDesiredLevelOfDetail: false,
                  skipLevelOfDetail: true,
                  loadSiblings: true
              })
          );

          this._tileset = tileset;

          if (tileset == null)
              return;

          // Model level of detail
          tileset.maximumScreenSpaceError = 8.0; // Default is 16
          tileset.maximumMemoryUsage = 512; // Default is 512

          // Point cloud point size
          //tileset.pointCloudShading.attenuation = true;
          //tileset.pointCloudShading.maximumAttenuation = 5;

          tileset.pointCloudShading.maximumAttenuation = 1.2; // Don't allow points larger than 4 pixels.
          tileset.pointCloudShading.baseResolution = 0.44; // Assume an original capture resolution of 5 centimeters between neighboring points.
          tileset.pointCloudShading.geometricErrorScale = 0.3; // Applies to both geometric error and the base resolution.
          tileset.pointCloudShading.attenuation = true;
          tileset.pointCloudShading.eyeDomeLighting = true;
          tileset.pointCloudShading.eyeDomeLightingStrength = 0.5;
          tileset.pointCloudShading.eyeDomeLightingRadius = 0.5;

          tileset.readyPromise.then(() => {
              this._onTilesetReady(tileset);
          }).otherwise(function (error) {
              window.alert(error);
          });
      }

      _onTilesetReady(tileset) {
          const viewer = this._viewer;

          jQuery.fn.doubletap = jQuery.fn.doubletap || function (handler, delay) {
              delay = delay == null ? 300 : delay;

              this.bind('touchend', function (event) {
                  let now = new Date().getTime();
                  // The first time this will make delta a negative number.
                  let lastTouch = $(this).data('lastTouch') || now + 1;
                  let delta = now - lastTouch;
                  if (delta < delay && 0 < delta) {
                      // After we detect a doubletap, start over.
                      $(this).data('lastTouch', null);
                      if (handler !== null && typeof handler === 'function') {
                          handler(event);
                      }
                  } else {
                      $(this).data('lastTouch', now);
                  }
              });
          };

          let jqCesiumCanvas = jQuery('.cesium-widget > canvas');

          jqCesiumCanvas.doubletap(function (event) {
              if (event && event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) {
                  const touch = event.originalEvent.changedTouches[0];

                  // touch.clientX, clientY gives wrong values
                  // so _getPickedCartographic will internally use other values, so called _lastTapedPosition

                  cesiumFPVCameraController$1.onDoubleTaped(
                      {
                          position: {
                              x: touch.clientX,
                              y: touch.clientY
                          }
                      });
              } else {
                  console.warn('can not get position');
              }
          });

          let options = {
              cesiumViewer: viewer,
              main3dTileset: tileset,
              defaultCameraPositionOrientationJson: CONSTRUKTED_AJAX.default_camera_position_direction,
              isMobile: isMobile(),
              ignoreCollisionDetection: false,
              immersiveArEnabled: xrButton$1.enabled
          };

          cesiumFPVCameraController$1 = new CesiumFPVCameraController(options);

          cesiumFPVCameraController$1.FPVStarted().addEventListener(function () {
              jQuery('body').addClass('fpv-mode-on');
              jQuery('.fpv-navigation').show();

              toggleXrItems();
              window.addEventListener("keydown", block_keys, false);
          });

          cesiumFPVCameraController$1.FPVFinished().addEventListener(function () {
              jQuery('body').removeClass('fpv-mode-on');
              jQuery('.fpv-navigation').hide();

              toggleXrItems();

              window.removeEventListener("keydown", block_keys, false);
          });

          initFPVNavigation(cesiumFPVCameraController$1);
          initSettingsPopup(this._tileset, cesiumFPVCameraController$1, this._flyController);

          //required since the tileset may not be geo-referenced.

          if (!georeferenced(tileset)) {
              if (tileset_model_matrix) {
                  setTilesetModelMatrix(tileset, tileset_model_matrix);

                  if (CONSTRUKTED_AJAX.is_owner) {
                      transformEditor$1 = new Cesium.TransformEditor({
                          container: viewer.container,
                          scene: viewer.scene,
                          transform: tileset.modelMatrix,
                          boundingSphere: tileset.boundingSphere
                      });

                      transformEditor$1.viewModel.deactivate();
                  }
              } else {
                  customSceneSetting(false);

                  tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0));
              }

              if (CONSTRUKTED_AJAX.is_owner) {
                  transformEditor$1 = new Cesium.TransformEditor({
                      container: viewer.container,
                      scene: viewer.scene,
                      transform: tileset.modelMatrix,
                      boundingSphere: tileset.boundingSphere
                  });

                  transformEditor$1.viewModel.deactivate();
              }
          } else {
              jqTilesetLatitude.prop('disabled', true);
              jqTilesetLongitude.prop('disabled', true);
              jqTilesetHeading.prop('disabled', true);
              jqEditAssetGeoLocationButton.prop('disabled', true);
              jqTilesetEstimateAltitude.prop('disabled', true);

              let position = tileset.boundingSphere.center;

              let carto = Cesium.Cartographic.fromCartesian(position);

              originalBoundingSphereCenterHeight$1 = carto.height;

              if (CONSTRUKTED_AJAX.asset_geo_location) {
                  let assetGeoLocationData = CONSTRUKTED_AJAX.asset_geo_location;

                  let heightDifference = originalBoundingSphereCenterHeight$1 - parseFloat(assetGeoLocationData.height);

                  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, heightDifference));

                  jqTilesetAltitude.val(assetGeoLocationData.height);
              } else {
                  jqTilesetLongitude.val(Cesium.Math.toDegrees(carto.longitude));
                  jqTilesetLatitude.val(Cesium.Math.toDegrees(carto.latitude));
                  jqTilesetAltitude.val(carto.height);
              }
          }

          setDefaultView(this._viewer, this._tileset);
      }

      _createControlbar() {
          const controlbarContainer = document.createElement("div");

          controlbarContainer.className = "construkted-viewer-controlbarContainer";

          this._viewer.container.appendChild(controlbarContainer);

          const controlbar = new Controlbar(controlbarContainer);

          controlbar.fpvButtonClicked.addEventListener(this.onFPV, this);
          controlbar.flyButtonClicked.addEventListener(this.onFLY, this);
          controlbar.orbitButtonClicked.addEventListener(this.onOrbit, this);
      }

      onFPV() {
          if(cesiumFPVCameraController$1.started())
              return;

          if (this._flyController.started()) {
              this._flyController.stop();
          }

          cesiumFPVCameraController$1.setCanStart(true);

          alert('Double click on the model to start FPV mode');
      }

      onFLY() {
          if(this._flyController.started()){
              console.warn('already started');
              return;
          }

          if(cesiumFPVCameraController$1.started()){
              cesiumFPVCameraController$1.exitFPV();
          }

          cesiumFPVCameraController$1.setCanStart(false);

          this._flyController.start();
      }

      onOrbit() {
          if(cesiumFPVCameraController$1.started()){
              cesiumFPVCameraController$1.exitFPV();
          }
          else if (this._flyController.started()) {
              this._flyController.stop();
          }
          else {
              // do nothing
          }

          cesiumFPVCameraController$1.setCanStart(false);
      }

      tryDeactivateTransformEditor() {
          if(!transformEditor$1)
              return;

          transformEditor$1.viewModel.deactivate();
      }

      initXR() {
          try {
              xrButton$1 = new CONSTRUKTEDXR.WebXRButton({
                  onRequestSession: onRequestSession,
                  onEndSession: onEndSession,
                  textEnterXRTitle: "START AR",
                  textXRNotFoundTitle: "AR NOT FOUND",
                  textExitXRTitle: "EXIT  AR",
              });

              document.querySelector("#cesiumContainer").appendChild(xrButton$1.domElement);

              if (navigator.xr) {
                  // Checks to ensure that 'immersive-ar' mode is available, and only
                  // enables the button if so.
                  navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
                      xrButton$1.enabled = supported;
                  });

                  navigator.xr.requestSession("inline").then(onSessionStarted);
              }
          } catch (e) {
              alert(e.message);
          }
      }
  }

  function initSidebar() {
      /**
       * external dependency
       * {Object} theApp
       *
       */

      jQuery(function ($) {
          let openBtn = $('.bst4-wrapper li.nav-item span.btn');
          let closeBtn = $('.popup-wrapper .close-btn');

          function hideAllPopup() {
              jQuery('.popup-wrapper').hide();
              jQuery('#end-measurement').trigger('click');
          }

          openBtn.click(function () {
              hideAllPopup();

              if( !jQuery(this).parent().hasClass('active') ) {
                  let itemDivID = jQuery(this).attr('id');
                  let popupID = itemDivID.replace('-btn', '');
                  jQuery('#' + popupID).show();
              }

              $(this).parent().toggleClass('active').siblings().not(this).removeClass('active');

              construktedViewer.tryDeactivateTransformEditor();
          });


          closeBtn.click(function () {
              jQuery(this).parents('.popup-wrapper').hide();
              jQuery('#end-measurement').trigger('click');

              construktedViewer.tryDeactivateTransformEditor();
          });

      });

      jQuery('#scroll-down-btn').on('click', function(){
          let toScroll = jQuery('.post-meta').offset().top - jQuery('.featured-image').height() - jQuery('#header').height() + jQuery('.post-meta').height();

          $("html, body").animate({ scrollTop: toScroll }, 600);
      });

      jQuery(window).on('scroll', function(){
          if( jQuery(window).scrollTop() > 200 ) {
              jQuery('#scroll-down-btn').fadeOut(300);
          } else {
              jQuery('#scroll-down-btn').fadeIn(300);
          }
      });


      jQuery('.embed-code-link').on('click', function(){
          jQuery('.embed-content').toggleClass('in');

          return false;
      });

      jQuery(document).on('click', '.letiation-action', function(){
          let currentItem = jQuery(this);
          let currentValue = jQuery(this).attr('data-value');
          jQuery('.letiations #disk_space').val(currentValue).trigger('change');

          currentItem.parent().addClass('selected').siblings().removeClass('selected');
      });

      jQuery(document).ready(function(){
          if( jQuery('table.letiations').length > 0 ) {

              let defaultValue = jQuery('#disk_space').val();

              jQuery('.letiation-action[data-value="'+defaultValue+'"]').trigger('click');

              let currentSubValue = jQuery('.flex-row').data('current');

              if( currentSubValue > 0 ) {
                  jQuery('.letiation-action[data-value="'+currentSubValue+'"]').trigger('click');
              }
          }
      });
  }

  const config = {
    version: 1.0,
    testOnLocal: false,
    testSlug: "arkcnfuk9fw",
    release: false
  };

  // Create the asset modal features
  function initNavigationHelpPopup() {
      const jqFPVNavigationPopup = jQuery('.ck-asset-modal');

      // Check if we have a cookie with the modal box closed
      let ckAssetModal = jQuery.cookie('ck-asset-modal');
      if( ckAssetModal == 'y' ) {
          jqFPVNavigationPopup.addClass('is-closed hidden');
      } else {
          jqFPVNavigationPopup.fadeIn(600);
      }

      jQuery(document).on('click', '.ck-asset-modal .icon-close, .ck-asset-modal-footer .gw3-button', function(e){
          e.preventDefault();
          let modal = jQuery(this).parents('.ck-asset-modal');
          modal.addClass('hidden is-closed');

          // Check if the checkbox is checked to make sure we disable it for 31 days
          if( jQuery('#ck-asset-modal-close').is(':checked') ) {
              jQuery.cookie( 'ck-asset-modal', 'y', { expires: 31 } );
          }
      });

      jQuery(document).on('click', '.ck-modal-toggler', function(e){
          e.preventDefault();
          jqFPVNavigationPopup.removeClass('hidden is-closed');
          jqFPVNavigationPopup.fadeIn(300);
      });

      jQuery('.fpv-nav-btn').on('click', function(e){
          e.preventDefault();
      });
  }

  function overrideCesiumCamera() {
      const Camera = Cesium.Camera;

      let scratchNormal = new Cesium.Cartesian3();

      Camera.prototype.moveUpEx = function (amount) {
          this.moveVertical(amount);
      };

      Camera.prototype.moveDownEx = function (amount) {
          this.moveVertical(-amount);
      };

      Camera.prototype.moveVertical = function (amount) {
          const position = this.position;

          const direction = Cesium.Cartesian3.normalize(position, scratchNormal);

          this.move(direction, amount);
      };
  }

  // ajax parameter from WP
  /* global CONSTRUKTED_AJAX */

  console.log('ConstruktedJs version', config.version);

  enableCesiumIonSDK();
  enableXRDependencies();
  overrideCesiumCamera();

  /*
      for example
      https://construkted.com/asset/arkcnfuk9fw/
  */

  function newConstruktedAjaxForTest(slug) {
      return {
          ajaxurl: "https://construkted.com/wp-admin/admin-ajax.php",
          asset_geo_location: '{"longitude":"-99.13299675","latitude":"19.43416307","height":"2219.46115038","heading":"99.80678649","pitch":"0.00000000","roll":"-0.00000000","scale":{"x":0.9999999999999519,"y":0.9999999999999523,"z":0.9999999999999408}}',
          bg_color_css_string: "",
          cesium_access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MzJlNDI2ZC1hMmE5LTQ4MjEtYmQwYS1iMDRlNTNjM2JiZTkiLCJpZCI6MjkyMSwiaWF0IjoxNTM1MjE4Mjk1fQ.jMg72t7Gnkk4-E9G7zhd_CoTJBUJ39hHALmxGBRL1ok",
          default_camera_position_direction: '{"offsetX":-123.05745039600879,"offsetY":-54.40936731733382,"offsetZ":-72.37648316612467,"heading":55.70190003039015,"pitch":-15.907714727235403,"roll":0.10348905269346916}',
          is_owner: "",
          post_id: "3446",
          post_slug: slug
      }
  }

  jQuery(document).ready(function () {
      window.$ = jQuery;

      initNavigationHelpPopup();

      if(config.testOnLocal){
          window.CONSTRUKTED_AJAX = newConstruktedAjaxForTest(config.testSlug);
      }

      if (CONSTRUKTED_AJAX.asset_geo_location && CONSTRUKTED_AJAX.asset_geo_location !== '') {
          CONSTRUKTED_AJAX.asset_geo_location = JSON.parse(CONSTRUKTED_AJAX.asset_geo_location);
      }

      CONSTRUKTED_AJAX.is_owner = Boolean(CONSTRUKTED_AJAX.is_owner);

      const defaultBackgroundColorStringOfNonGeoReferencedAsset = "#333333";

      if (!CONSTRUKTED_AJAX.bg_color_css_string || CONSTRUKTED_AJAX.bg_color_css_string === "") {
          CONSTRUKTED_AJAX.bg_color_css_string = defaultBackgroundColorStringOfNonGeoReferencedAsset;
      }

      window.construktedViewer = new ConstruktedViewer();

      construktedViewer.start();
      initSidebar();
  });

})));
//# sourceMappingURL=construkted.js.map
