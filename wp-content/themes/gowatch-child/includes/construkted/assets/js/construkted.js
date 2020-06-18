// ajax parameter from WP
/* global Cesium */
/* global Cesium.Math */

/* global jQuery */

/* global CONSTRUKTED_AJAX */

let viewer = null;
let cesiumFPVCameraController = null;
let tileset_model_matrix = null;
let originalBoundingSphereCenterHeight = 0;
let assetGeoLocationData;

let theApp = (function () {
    let tileset = null;
    let transformEditor = null;

    let jqExitFPVModeButton = jQuery('#exitFPVModeButton');
    let jqMoveLeftButton = jQuery('.fpv-left');
    let jqMoveRightButton = jQuery('.fpv-right');
    let jqMoveFrontButton = jQuery('.fpv-up');
    let jqMoveBackButton = jQuery('.fpv-down');

    let jqTilesetLatitude = jQuery('#tileset_latitude');
    let jqTilesetLongitude = jQuery('#tileset_longitude');
    let jqTilesetAltitude = jQuery('#tileset_altitude');
    let jqTilesetHeading = jQuery('#tileset_heading');
    let jqEditAssetGeoLocationButton = jQuery('#edit_asset_geo_location_button');
    let jqTilesetEstimateAltitude = jQuery('#tileset_estimate_altitude');
    let jqSaveTilesetModelMatrixButton = jQuery('#save_tileset_model_matrix_button');

    let jqCaptureThumbnailButton = jQuery('#capture_thumbnail');
    let jqSaveCurrentViewButton = jQuery('#save_current_view');
    let jqResetCameraViewButton = jQuery('#reset_camera_view');
    let jqShowHideWireframeCheckbox = jQuery('#show-hide-wireframe-checkbox');

    function _start() {
        _create3DMap();
        _initGeoLocationPopup();
        _initMeasurementPopup();
        _initSettingsPopup();
    }

    function _block_keys(e) {
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    }

    function _initGeoLocationPopup() {
        if(CONSTRUKTED_AJAX.asset_geo_location) {
            assetGeoLocationData = CONSTRUKTED_AJAX.asset_geo_location;

            if(!assetGeoLocationData.longitude ||
               !assetGeoLocationData.latitude ||
               !assetGeoLocationData.height ) {
                console.warn('invalid asset geo location!');
                console.warn(CONSTRUKTED_AJAX.asset_geo_location);
            }
            else {
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
                    position:  viewer.scene.globe.ellipsoid.cartographicToCartesian(carto),
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

        if(tileset_model_matrix){
            jqTilesetLatitude.val(assetGeoLocationData.latitude);
            jqTilesetLongitude.val(assetGeoLocationData.longitude);
            jqTilesetAltitude.val(assetGeoLocationData.height);
            jQuery('#tileset_heading').val(assetGeoLocationData.heading);
        }
        else{
            jqTilesetLatitude.val(0);
            jqTilesetLongitude.val(0);
            jqTilesetAltitude.val(0);
            jQuery('#tileset_heading').val(0);
        }

        jQuery('#edit_asset_geo_location_button').click(function () {
            if(transformEditor)
                transformEditor.viewModel.activate();
        });

        jqSaveTilesetModelMatrixButton.click(function () {
            _saveTilesetModelMatrix();
        });

        jqTilesetLongitude.change(function () {
            let longitude = jqTilesetLongitude.val();

            longitude = parseFloat(longitude);

            if(isNaN(longitude) || longitude > 180 || longitude < -180) {
                jqTilesetLongitude.val('');
                alert('invalid longitude: ' + longitude);
                return;
            }

            _toggleGlobeSkyBoxAtmosphere(true);

            let origModelMatrix = tileset.modelMatrix;

            let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            let origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

            origCartographic.longitude = longitude * Cesium.Math.RADIANS_PER_DEGREE;

            let newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

            let scene = viewer.scene;

            let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            changeTilesetModelMatrix(newPosition, headingPitchRoll);

            viewer.zoomTo(tileset);
        });

        jqTilesetLatitude.change(function () {
            let latitude = jqTilesetLatitude.val();
            latitude = parseFloat(latitude);

            if(isNaN(latitude) || latitude > 90 || latitude < -90) {
                jqTilesetLatitude.val('');
                alert('invalid latitude: ' + latitude);
                return;
            }

            _toggleGlobeSkyBoxAtmosphere(true);

            let origModelMatrix = tileset.modelMatrix;

            let origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            let origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

            origCartographic.latitude = latitude * Cesium.Math.RADIANS_PER_DEGREE;

            let newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

            let scene = viewer.scene;

            let headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            changeTilesetModelMatrix(newPosition, headingPitchRoll);

            viewer.zoomTo(tileset);
        });

        function changeTilesetHeight(height) {
            if(tileset.asset.extras && tileset.asset.extras.ion.georeferenced) {
                doChangeTilesetHeightForGeoReferencedTileset(height);
            }
            else {
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

            if(isNaN(altitude) || altitude > 15000 || altitude < -1000) {
                jqTilesetAltitude.val('');
                alert('invalid altitude: ' + altitude);
                return;
            }

            _toggleGlobeSkyBoxAtmosphere(true);
            changeTilesetHeight(altitude);

            viewer.zoomTo(tileset);
        });

        jQuery('#tileset_heading').change(function () {
            let heading = jQuery('#tileset_heading').val();
            heading = parseFloat(heading);

            if(isNaN(heading) || heading > 180 || heading < -180) {
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

            if(longitude === 0 && latitude === 0) {
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
    }

    function _initMeasurementPopup() {
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

                if(measurementType === 'point') {
                    showHidePointMeasurement(pointMeasurement.measurementResult[measurementIndex], this.checked);
                }

                if(measurementType === 'distance') {
                    showHideDistanceMeasurement(distanceMeasurement.measurementResult[measurementIndex], this.checked);
                }

                if(measurementType === 'polyline') {
                    showHidePolylineMeasurement(polylineMeasurement.measurementResult[measurementIndex], this.checked);
                }

                if(measurementType === 'area') {
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
            $('*[id*=measurement-tool-button]').each(function() {
                this.classList.remove('active');
            });
        }

        function enableEndMeasurementButton () {
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

            for (i = 0; i < polylineMeasurement.points.length; i++)
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

            for(let i = 0; i < pointMeasurements.length; i++)
                showHidePointMeasurement(pointMeasurements[i], show);

            let distanceMeasurements = distanceMeasurement.measurementResult;

            for(i = 0; i < distanceMeasurements.length; i++)
                showHideDistanceMeasurement(distanceMeasurements[i], show);

            let polylineMeasurements = polylineMeasurement.measurementResult;

            for(i = 0; i < polylineMeasurements.length; i++)
                showHidePolylineMeasurement(polylineMeasurements[i], show);

            let areaMeasurements = areaMeasurement.measurementResult;

            for(i = 0; i < areaMeasurements.length; i++)
                showHideAreaMeasurement(areaMeasurements[i], show);

            viewer.scene.requestRender();
        }

        $('#show-hide-all-measurement-checkbox').change(function () {
            let checked = this.checked;

            showHideAllMeasurement(checked);

            $('*[id*=measurement-result]').each(function() {

                this.checked = checked;

                console.log(this.id);
            });
        });

        $('#end-measurement').click(function () {
            deactivateAllMeasurementToolButtons();
            measureViewModel._deactivate();
        });
    }

    function _initSettingsPopup() {
        jqCaptureThumbnailButton.click(function () {
            _captureThumbnail();
        });

        jqSaveCurrentViewButton.click(function () {
            _saveCurrentView();
        });

        jqResetCameraViewButton.click(function () {
            _resetCameraView();
        });

        jQuery('#maximum-screen-space-error-slider').change(function () {
            if(!tileset)
                return;

            if(camera)

            tileset.maximumScreenSpaceError = 32 - this.value;
        });

        jQuery('#fpv-movement-speed-slider').change(function () {
            if(!tileset)
                return;

            if(!cesiumFPVCameraController)
                return;

            cesiumFPVCameraController.setWorkingSpeed(parseFloat(this.value));
        });

        jqShowHideWireframeCheckbox.change(function () {
            if(!tileset)
                return;

            tileset.debugWireframe = this.checked;
        });
    }

    function _saveTilesetModelMatrixForGeoReferencedTileset() {
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

    function _saveTilesetModelMatrix() {
        if(tileset.asset.extras && tileset.asset.extras.ion.georeferenced) {
            _saveTilesetModelMatrixForGeoReferencedTileset();
        }
        else {
            _saveTilesetModelMatrixForNonGeoReferencedTileset();
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

    function _create3DMap() {
        Cesium.Ion.defaultAccessToken = CONSTRUKTED_AJAX.cesium_access_token;

        if(!Cesium.Ion.defaultAccessToken)
            console.warn('default access token is null!');

        viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
            animation: false,
            homeButton: false, //  the HomeButton widget will not be created.
            baseLayerPicker: false, // If set to false, the BaseLayerPicker widget will not be created.
            geocoder: false,
            sceneModePicker: false,
            timeline: false,
            fullscreenElement: 'cesiumContainer',
            requestRenderMode : true,
            navigationHelpButton: false
        });

        viewer.resolutionScale = 1.0;
        viewer.scene.globe.depthTestAgainstTerrain = true;

        viewer.extend(Cesium.viewerMeasureMixin, {
            units: new Cesium.MeasureUnits({
                distanceUnits : Cesium.DistanceUnits.METERS,
                areaUnits : Cesium.AreaUnits.SQUARE_METERS,
                volumeUnits : Cesium.VolumeUnits.CUBIC_METERS
            })
        });

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
                eventType : Cesium.CameraEventType.RIGHT_DRAG,
                modifier : Cesium.KeyboardEventModifier.CTRL
            },
            {
                eventType : Cesium.CameraEventType.LEFT_DRAG,
                modifier : Cesium.KeyboardEventModifier.CTRL
            }
        ];

        let tilesetURL = 'https://s3.us-east-2.wasabisys.com/construkted-assets/' + CONSTRUKTED_AJAX.post_slug + '/tileset.json';

        tileset = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: tilesetURL,
                immediatelyLoadDesiredLevelOfDetail : false,
                skipLevelOfDetail : true,
                loadSiblings : true
            })
        );

        if(tileset == null)
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

        tileset.readyPromise.then(function(){
            window.isMobile = function() {
                let check = false;

                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

                return check;
            };

            jQuery.fn.doubletap = jQuery.fn.doubletap || function(handler, delay) {
                delay = delay == null ? 300 : delay;

                this.bind('touchend', function(event) {
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
                if(event && event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0])
                {
                    const touch = event.originalEvent.changedTouches[0];

                    // touch.clientX, clientY gives wrong values
                    // so _getPickedCartographic will internally use other values, so called _lastTapedPosition

                    cesiumFPVCameraController.onDoubleTaped(
                    {
                        position : {
                            x: touch.clientX,
                            y: touch.clientY
                        }
                    });
                }
                else {
                    console.warn('can not get position');
                }
            });

            let options = {
                cesiumViewer: viewer,
                main3dTileset: tileset,
                defaultCameraPositionOrientationJson : CONSTRUKTED_AJAX.default_camera_position_direction,
                isMobile: isMobile(),
                ignoreCollisionDetection: false
            };

            cesiumFPVCameraController = new CesiumFVPCameraController(options);

            cesiumFPVCameraController.FPVStarted().addEventListener(function() {
                jqExitFPVModeButton.show();
                jQuery('body').addClass('fpv-mode-on');
                jQuery('.fpv-navigation').show();

                window.addEventListener("keydown", _block_keys, false);
            });

            cesiumFPVCameraController.FPVFinished().addEventListener(function() {
                jqExitFPVModeButton.hide();
                jQuery('body').removeClass('fpv-mode-on');
                jQuery('.fpv-navigation').hide();

                window.removeEventListener("keydown", _block_keys, false);
            });

            jqExitFPVModeButton.click(function () {
                cesiumFPVCameraController.exitFPV();
            });

            jqMoveLeftButton.on('mousedown' , function () {
                cesiumFPVCameraController.setDirectionLeft();
            });

            jqMoveLeftButton.on('mouseup' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveRightButton.on('mousedown' , function () {
                cesiumFPVCameraController.setDirectionRight();
            });

            jqMoveRightButton.on('mouseup' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveFrontButton.on('mousedown' , function () {
                cesiumFPVCameraController.setDirectionForward();
            });

            jqMoveFrontButton.on('mouseup' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveBackButton.on('mousedown' , function () {
                cesiumFPVCameraController.setDirectionBackward();
            });

            jqMoveBackButton.on('mouseup' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveLeftButton.on('touchstart' , function () {
                cesiumFPVCameraController.setDirectionLeft();
            });

            jqMoveLeftButton.on('touchend' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveRightButton.on('touchstart' , function () {
                cesiumFPVCameraController.setDirectionRight();
            });

            jqMoveRightButton.on('touchend' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveFrontButton.on('touchstart' , function () {
                cesiumFPVCameraController.setDirectionForward();
            });

            jqMoveFrontButton.on('touchend' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            jqMoveBackButton.on('touchstart' , function () {
                cesiumFPVCameraController.setDirectionBackward();
            });

            jqMoveBackButton.on('touchend' , function () {
                cesiumFPVCameraController.setDirectionNone();
            });

            //required since the models may not be geographically referenced.

            if(tileset.asset.extras !== null) {
                if (tileset.asset.extras.ion.georeferenced !== true) {
                    if (tileset_model_matrix) {
                        _setTilesetModelMatrix(tileset, tileset_model_matrix);

                        if(CONSTRUKTED_AJAX.is_owner) {
                            transformEditor = new Cesium.TransformEditor({
                                container: viewer.container,
                                scene: viewer.scene,
                                transform: tileset.modelMatrix,
                                boundingSphere: tileset.boundingSphere
                            });

                            transformEditor.viewModel.deactivate();
                        }
                    } else {
                        _toggleGlobeSkyBoxAtmosphere(false);

                        tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0));

                        let modelMatrixUpdateTried = false;

                        viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (queuedTileCount) {
                            if(!modelMatrixUpdateTried && viewer.scene.globe.tilesLoaded){
                                let cartographic = new Cesium.Cartographic(0, 0);

                                let magicTerrainHeight = 17;
                                let terrainHeight = viewer.scene.globe.getHeight(cartographic);

                                if(terrainHeight) {
                                    if(terrainHeight < magicTerrainHeight) {
                                        console.warn('invalid terrain height 0/0 : ' + terrainHeight);
                                        terrainHeight = magicTerrainHeight;
                                    }
                                }
                                else {
                                    console.warn('failed to get terrain height 0/0');
                                    terrainHeight = magicTerrainHeight;
                                }

                                tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0, terrainHeight));

                                jqTilesetAltitude.val(terrainHeight);

                                modelMatrixUpdateTried = true;

                                viewer.camera.flyToBoundingSphere(tileset.boundingSphere);
                            }
                        });
                    }

                    if(CONSTRUKTED_AJAX.is_owner) {
                        transformEditor = new Cesium.TransformEditor({
                            container: viewer.container,
                            scene: viewer.scene,
                            transform: tileset.modelMatrix,
                            boundingSphere: tileset.boundingSphere
                        });

                        transformEditor.viewModel.deactivate();
                    }
                }
                else {
                    jqTilesetLatitude.prop('disabled', true);
                    jqTilesetLongitude.prop('disabled', true);
                    jqTilesetHeading.prop('disabled', true);
                    jqEditAssetGeoLocationButton.prop('disabled', true);
                    jqTilesetEstimateAltitude.prop('disabled', true);

                    let position = tileset.boundingSphere.center;

                    let carto = Cesium.Cartographic.fromCartesian(position);

                    originalBoundingSphereCenterHeight = carto.height;

                    if(CONSTRUKTED_AJAX.asset_geo_location) {
                        let assetGeoLocationData = CONSTRUKTED_AJAX.asset_geo_location;

                        let heightDifference = originalBoundingSphereCenterHeight - parseFloat(assetGeoLocationData.height);

                        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, heightDifference));

                        jqTilesetAltitude.val(assetGeoLocationData.height);
                    }
                    else
                    {
                        jqTilesetLongitude.val(Cesium.Math.toDegrees(carto.longitude));
                        jqTilesetLatitude.val(Cesium.Math.toDegrees(carto.latitude));
                        jqTilesetAltitude.val(carto.height);
                    }
                }
            }

            cesiumFPVCameraController.setDefaultView() ;
        }).otherwise(function(error){
            window.alert(error);
        });
    }

    function _toggleGlobeSkyBoxAtmosphere(show) {
        viewer.scene.globe.show = show;
        viewer.scene.skyAtmosphere.show = show;
        viewer.scene.skyBox.show = show;

        if(show)
            viewer.scene.backgroundColor = Cesium.Color.BLACK.clone();
        else
            viewer.scene.backgroundColor = Cesium.Color.LIGHTGREY.clone();
    }

    function _setTilesetModelMatrix(tileset, modelMatrixData) {
        let position = modelMatrixData.position;

        let center = new Cesium.Cartesian3(position.x, position.y, position.z);

        let headingPitchRoll = modelMatrixData.headingPitchRoll;

        let hpr = new Cesium.HeadingPitchRoll(headingPitchRoll.heading ,headingPitchRoll.pitch, headingPitchRoll.roll);

        let scale = modelMatrixData.scale;

        let scaleCartesian3 = new Cesium.Cartesian3(scale.x, scale.y, scale.z);

        let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(center, hpr);

        tileset.modelMatrix = Cesium.Matrix4.setScale(modelMatrix, scaleCartesian3, new Cesium.Matrix4());
    }

    function _captureThumbnail() {
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

    function _saveCurrentView() {
        jqSaveCurrentViewButton.prop('disabled', true);

        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'post_set_current_view',
                post_id : CONSTRUKTED_AJAX.post_id,
                view_data: _getRelativeCurrentCameraPositionOrientationJsonString()
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

    function _resetCameraView() {
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

    function _tryDeactivateTransformEditor() {
        if(!transformEditor)
            return;

        transformEditor.viewModel.deactivate();
    }

    // https://github.com/outsider787/gw3_construkted/wiki/Construkted-Meta-Data-Definition

    function _getRelativeCurrentCameraPositionOrientationJsonString() {
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

    return {
        viewer: viewer,
        cameraController: cesiumFPVCameraController,
        start: _start,
        tryDeactivateTransformEditor: _tryDeactivateTransformEditor
    };
})();

jQuery(document).ready(function(){
    window.$ = jQuery;

    initAssetModelFeatures();

    if(CONSTRUKTED_AJAX.asset_geo_location && CONSTRUKTED_AJAX.asset_geo_location !== '') {
        CONSTRUKTED_AJAX.asset_geo_location = JSON.parse(CONSTRUKTED_AJAX.asset_geo_location);
    }

    CONSTRUKTED_AJAX.is_owner = Boolean(CONSTRUKTED_AJAX.is_owner);

    theApp.start();
});

// Create the asset modal features
function initAssetModelFeatures() {
    // Check if we have a cookie with the modal box closed
    let ckAssetModal = jQuery.cookie('ck-asset-modal');
    if( ckAssetModal == 'y' ) {
        jQuery('.ck-asset-modal').addClass('is-closed hidden');
    } else {
        jQuery('.ck-asset-modal').fadeIn(600);
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
        let modal = jQuery('.ck-asset-modal');
        modal.removeClass('hidden is-closed');
        modal.fadeIn(300);
    });

    jQuery('.fpv-nav-btn').on('click', function(e){
        e.preventDefault();
    });
}
