var viewer = null;
var cameraController = null;
var tileset_model_matrix = null;

var theApp = (function () {
    var tilesets = null;
    var transformEditor = null;

    var jqTilesetLatitude = jQuery('#tileset_latitude');
    var jqTilesetLongitude = jQuery('#tileset_longitude');
    var jqTilesetAltitude = jQuery('#tileset_altitude');
    var jqTilesetHeading = jQuery('#tileset_heading');
    var jqEditAssetGeoLocationButton = jQuery('#edit_asset_geo_location_button');
    var jqTilesetEstimateAltitude = jQuery('#tileset_estimate_altitude');
    var jqSaveTilesetModelMatrixButton = jQuery('#save_tileset_model_matrix_button');

    function start() {
        _create3DMap();
        _initGeoLocationPopup();
        _initMeasurementPopup();
        _initSettingsPopup();
    }

    function _initGeoLocationPopup() {
        if(CONSTRUKTED_AJAX.asset_geo_location) {
            var assetGeoLocationData = CONSTRUKTED_AJAX.asset_geo_location;

            var carto = new Cesium.Cartographic(
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

        var setHprQuaternion = new Cesium.Quaternion();
        var setHprQuaternion2 = new Cesium.Quaternion();
        var setHprTranslation = new Cesium.Cartesian3();
        var setHprScale = new Cesium.Cartesian3();
        var setHprCenter = new Cesium.Cartesian3();
        var setHprTransform = new Cesium.Matrix4();
        var setHprRotation = new Cesium.Matrix3();

        function setHeadingPitchRoll(transform, headingPitchRoll) {
            //>>includeStart('debug', pragmas.debug);
            Cesium.Check.defined('transform', transform);
            Cesium.Check.defined('headingPitchRoll', headingPitchRoll);
            //>>includeEnd('debug');

            var rotationQuaternion = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, setHprQuaternion);
            var translation = Cesium.Matrix4.getTranslation(transform, setHprTranslation);
            var scale = Cesium.Matrix4.getScale(transform, setHprScale);
            var center = Cesium.Matrix4.multiplyByPoint(transform, Cesium.Cartesian3.ZERO, setHprCenter);
            var backTransform = Cesium.Transforms.eastNorthUpToFixedFrame(center, undefined, setHprTransform);

            var rotationFixed = Cesium.Matrix4.getMatrix3(backTransform, setHprRotation);
            var quaternionFixed = Cesium.Quaternion.fromRotationMatrix(rotationFixed, setHprQuaternion2);
            var rotation = Cesium.Quaternion.multiply(quaternionFixed, rotationQuaternion, rotationFixed);

            return Cesium.Matrix4.fromTranslationQuaternionRotationScale(translation, rotation, scale, transform);
        }

        function changeTilesetModelMatrix(newPosition, headingPitchRoll) {
            var origModelMatrix = tilesets.modelMatrix;

            origModelMatrix = Cesium.Matrix4.setTranslation(origModelMatrix, newPosition, origModelMatrix);

            setHeadingPitchRoll(origModelMatrix, headingPitchRoll);
        }

        if(tileset_model_matrix){
            jQuery('#tileset_latitude').val(assetGeoLocationData.latitude);
            jQuery('#tileset_longitude').val(assetGeoLocationData.longitude);
            jQuery('#tileset_altitude').val(assetGeoLocationData.height);
            jQuery('#tileset_heading').val(assetGeoLocationData.heading);
        }
        else{
            jQuery('#tileset_latitude').val(0);
            jQuery('#tileset_longitude').val(0);
            jQuery('#tileset_altitude').val(0);
            jQuery('#tileset_heading').val(0);
        }

        jQuery('#edit_asset_geo_location_button').click(function () {
            if(transformEditor)
                transformEditor.viewModel.activate();
        });

        jQuery('#save_tileset_model_matrix_button').click(function () {
            _saveTilesetModelMatrix();
        });

        jQuery('#tileset_longitude').change(function () {
            var longitude = jQuery('#tileset_longitude').val();

            longitude = parseFloat(longitude);

            if(isNaN(longitude) || longitude > 180 || longitude < -180) {
                jQuery('#tileset_longitude').val('');
                alert('invalid longitude: ' + longitude);
                return;
            }

            var origModelMatrix = tilesets.modelMatrix;

            var origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            var origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

            origCartographic.longitude = longitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

            var scene = viewer.scene;

            var headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            changeTilesetModelMatrix(newPosition, headingPitchRoll);

            viewer.zoomTo(tilesets);
        });

        jQuery('#tileset_latitude').change(function () {
            var latitude = jQuery('#tileset_latitude').val();
            latitude = parseFloat(latitude);

            if(isNaN(latitude) || latitude > 90 || latitude < -90) {
                jQuery('#tileset_latitude').val('');
                alert('invalid latitude: ' + latitude);
                return;
            }

            var origModelMatrix = tilesets.modelMatrix;

            var origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            var origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

            origCartographic.latitude = latitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

            var scene = viewer.scene;

            var headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            changeTilesetModelMatrix(newPosition, headingPitchRoll);

            viewer.zoomTo(tilesets);
        });

        function changeTilesetHeight(height) {
            var origModelMatrix = tilesets.modelMatrix;

            var origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            var origCartographic = Cesium.Cartographic.fromCartesian(origPosition);

            origCartographic.height = height;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(origCartographic);

            var scene = viewer.scene;

            var headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            changeTilesetModelMatrix(newPosition, headingPitchRoll);
            viewer.zoomTo(tilesets);
        }

        jQuery('#tileset_altitude').change(function () {
            var altitude = jQuery('#tileset_altitude').val();
            altitude = parseFloat(altitude);

            if(isNaN(altitude) || altitude > 15000 || altitude < -1000) {
                jQuery('#tileset_altitude').val('');
                alert('invalid altitude: ' + altitude);
                return;
            }

            changeTilesetHeight(altitude);

            viewer.zoomTo(tilesets);
        });

        jQuery('#tileset_heading').change(function () {
            var heading = jQuery('#tileset_heading').val();
            heading = parseFloat(heading);

            if(isNaN(heading) || heading > 180 || heading < -180) {
                jQuery('#tileset_heading').val('');
                alert('invalid heading: ' + heading);
                return;
            }

            var origModelMatrix = tilesets.modelMatrix;

            var origPosition = Cesium.Matrix4.getTranslation(origModelMatrix, new Cesium.Cartesian3());

            var scene = viewer.scene;

            var headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(origModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            headingPitchRoll.heading = heading * Cesium.Math.RADIANS_PER_DEGREE;

            changeTilesetModelMatrix(origPosition, headingPitchRoll);

            viewer.zoomTo(tilesets);
        });

        jQuery('#tileset-transparency-slider').change(function () {
            var value = this.value;

            tilesets.style = new Cesium.Cesium3DTileStyle({
                color: 'rgba(255, 255, 255,' + value + ')'
            });

            viewer.scene.requestRender();
        });

        jqTilesetEstimateAltitude.click(function () {
            var longitude = jqTilesetLongitude.val();
            var latitude = jqTilesetLatitude.val();

            longitude = parseFloat(longitude);
            latitude = parseFloat(latitude);

            if(longitude === 0 && latitude === 0) {
                alert('Please input valid Latitude and Longitude!');
                return;
            }

            var globe = viewer.scene.globe;
            var cartographic = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude));

            var terrainHeight = globe.getHeight(cartographic);

            if (terrainHeight === undefined) {
                alert('failed to get height!');
                return;
            }

            jqTilesetAltitude.val(terrainHeight.toFixed(3));
            changeTilesetHeight(terrainHeight);
            viewer.zoomTo(tilesets);
        });
    }

    function _initMeasurementPopup() {
        var measure = viewer.measure;

        var measureViewModel = measure.viewModel;

        var pointMeasurement = measureViewModel._measurements[7];
        var distanceMeasurement = measureViewModel._measurements[1];
        var polylineMeasurement = measureViewModel._measurements[2];
        var areaMeasurement = measureViewModel._measurements[6];

        function addMeasurementCheckbox(id, label) {
            var newCheckBox = ' <div class="form-check">\n' +
                '                                    <input class="form-check-input" type="checkbox" id="' + id + '" checked>\n' +
                '                                    <label class="form-check-label" for="' + id + '">\n' +
                label +
                '                                    </label>\n' +
                '                                </div>';

            $('#measurement-list').append(newCheckBox);

            $('[id=' + id + ']').change(function () {
                var tokens = id.split('-');

                var measurementType = tokens[0];
                var measurementIndex = parseInt(tokens[1]);

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

            var measurement = pointMeasurement.measurementResult[measurementIndex];

            console.log(measurement);

            addMeasurementCheckbox('point-' + measurementIndex, 'Point ' + measurementIndex);
        });

        distanceMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
            console.log(measurementIndex);

            var measurement = distanceMeasurement.measurementResult[measurementIndex];

            console.log(measurement);

            addMeasurementCheckbox('distance-' + measurementIndex, 'Distance ' + measurementIndex);
        });

        polylineMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
            console.log(measurementIndex);

            var measurement = polylineMeasurement.measurementResult[measurementIndex];

            console.log(measurement);

            addMeasurementCheckbox('polyline-' + measurementIndex, 'Polyline ' + measurementIndex);
        });

        areaMeasurement.newMeasurement.addEventListener(function (measurementIndex) {
            console.log(measurementIndex);

            var measurement = areaMeasurement.measurementResult[measurementIndex];

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

            for (var i = 0; i < polylineMeasurement.segmentLabels.length; i++)
                polylineMeasurement.segmentLabels[i].show = show;

            polylineMeasurement.polyline.show = show;

            for (i = 0; i < polylineMeasurement.points.length; i++)
                polylineMeasurement.points[i].show = show;
        }

        function showHideAreaMeasurement(areaMeasurement, show) {
            areaMeasurement.label.show = show;
            areaMeasurement.polygon.show = show;
            areaMeasurement.polyline.show = show;

            for (var i = 0; i < areaMeasurement.points.length; i++)
                areaMeasurement.points[i].show = show;
        }

        function showHideAllMeasurement(show) {
            var pointMeasurements = pointMeasurement.measurementResult;

            for(var i = 0; i < pointMeasurements.length; i++)
                showHidePointMeasurement(pointMeasurements[i], show);

            var distanceMeasurements = distanceMeasurement.measurementResult;

            for(i = 0; i < distanceMeasurements.length; i++)
                showHideDistanceMeasurement(distanceMeasurements[i], show);

            var polylineMeasurements = polylineMeasurement.measurementResult;

            for(i = 0; i < polylineMeasurements.length; i++)
                showHidePolylineMeasurement(polylineMeasurements[i], show);

            var areaMeasurements = areaMeasurement.measurementResult;

            for(i = 0; i < areaMeasurements.length; i++)
                showHideAreaMeasurement(areaMeasurements[i], show);

            viewer.scene.requestRender();
        }

        $('#show-hide-all-measurement-checkbox').change(function () {
            var checked = this.checked;

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
        jQuery('#capture_thumbnail').click(function () {
            _captureThumbnail();
        });

        jQuery('#save_current_view').click(function () {
            _saveCurrentView();
        });

        jQuery('#reset_camera_view').click(function () {
            _resetCameraView();
        });

        jQuery('#maximum-screen-space-error-slider').change(function () {
            var value = this.value;

            var maximumScreenSpaceError = 32 - value;

            if(!tilesets)
                return;

            tilesets.maximumScreenSpaceError = maximumScreenSpaceError;
        });
    }

    function _saveTilesetModelMatrix() {
        if(transformEditor && transformEditor.active) {
            var position = transformEditor.viewModel.position;
            var headingPitchRoll = transformEditor.viewModel.headingPitchRoll;
            var scale = transformEditor.viewModel.scale;

            _doSaveTilesetModelMatrix(position, headingPitchRoll, scale);
        } else {
            var currentModelMatrix = tilesets.modelMatrix;

            var position = Cesium.Matrix4.getTranslation(currentModelMatrix, new Cesium.Cartesian3());

            var scene = viewer.scene;

            var headingPitchRoll = Cesium.Transforms.fixedFrameToHeadingPitchRoll(currentModelMatrix, scene.mapProjection.ellipsoid, undefined, new Cesium.HeadingPitchRoll());

            var scale = Cesium.Matrix4.getScale(currentModelMatrix, new Cesium.Cartesian3());

            _doSaveTilesetModelMatrix(position, headingPitchRoll, scale);
        }
    }

    function _doSaveTilesetModelMatrix(position, headingPitchRoll, scale) {
        var cartographic = Cesium.Cartographic.fromCartesian(position);

        var precision = 8;

        var data = {
            longitude: Cesium.Math.toDegrees(cartographic.longitude).toFixed(precision),
            latitude: Cesium.Math.toDegrees(cartographic.latitude).toFixed(precision),
            height: cartographic.height.toFixed(precision),
            heading: Cesium.Math.toDegrees(headingPitchRoll.heading).toFixed(precision),
            pitch: Cesium.Math.toDegrees(headingPitchRoll.pitch).toFixed(precision),
            roll: Cesium.Math.toDegrees(headingPitchRoll.roll).toFixed(precision),
            scale: scale
        };

        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'set_asset_geo_location_json',
                post_id : CONSTRUKTED_AJAX.post_id,
                asset_geo_location_json: JSON.stringify(data)
            },
            success : function( response ) {
                var data = JSON.parse(response);

                if(data.ret === false) {
                    alert('Passed values is the same as the values that is already in the database!');
                    return;
                }

                alert('Successfully updated!');
            },
            error: function(xhr, status, error) {
                alert('error');
            }
        });
    }

    function _create3DMap() {
        Cesium.Ion.defaultAccessToken = CONSTRUKTED_AJAX.cesium_access_token;

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

        viewer.extend(Cesium.viewerMeasureMixin, {
            units: new Cesium.MeasureUnits({
                distanceUnits : Cesium.DistanceUnits.METERS,
                areaUnits : Cesium.AreaUnits.SQUARE_METERS,
                volumeUnits : Cesium.VolumeUnits.CUBIC_METERS
            })
        });

        /* Switch mouse buttons in Cesium viewer:
            - Left button to rotate
            - Right button to pan
            - Wheel to zoom
            - Middle button to zoom
        */

        viewer.scene.screenSpaceCameraController.rotateEventTypes = Cesium.CameraEventType.RIGHT_DRAG;
        viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.MIDDLE_DRAG, Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];

        viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.LEFT_DRAG, Cesium.CameraEventType.PINCH, {
            eventType : Cesium.CameraEventType.LEFT_DRAG,
            modifier : Cesium.KeyboardEventModifier.CTRL
        }, {
            eventType : Cesium.CameraEventType.RIGHT_DRAG,
            modifier : Cesium.KeyboardEventModifier.CTRL
        }];

        var tilesetURL = CONSTRUKTED_AJAX.tile_server_url +  CONSTRUKTED_AJAX.post_slug + '/tileset.json';

        tilesets = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: tilesetURL,
                immediatelyLoadDesiredLevelOfDetail : true,
                skipLevelOfDetail : true,
                loadSiblings : true
            })
        );

        if(tilesets == null)
            return;

        // Model level of detail
        tilesets.maximumScreenSpaceError = 8.0; // Default is 16
        tilesets.maximumMemoryUsage = 512; // Default is 512

        // Point cloud point size
        //tilesets.pointCloudShading.attenuation = true;
        //tilesets.pointCloudShading.maximumAttenuation = 5;

		tilesets.pointCloudShading.maximumAttenuation = 1.2; // Don't allow points larger than 4 pixels.
		tilesets.pointCloudShading.baseResolution = 0.44; // Assume an original capture resolution of 5 centimeters between neighboring points.
		tilesets.pointCloudShading.geometricErrorScale = 0.3; // Applies to both geometric error and the base resolution.
		tilesets.pointCloudShading.attenuation = true;
		tilesets.pointCloudShading.eyeDomeLighting = true;
		tilesets.pointCloudShading.eyeDomeLightingStrength = 0.5;
		tilesets.pointCloudShading.eyeDomeLightingRadius = 0.5;
		
        tilesets.readyPromise.then(function(){
            var options = {
                exitFPVModeButtonId: 'exitFPVModeButton',
                cesiumViewer: viewer,
                objectsToExcludeForCameraControl: [],
                showCameraBreakPoint: true,
                showCameraPath: false
            };

            options.objectsToExcludeForCameraControl.push(tilesets);
            options.main3dTileset = tilesets;

            cameraController = new EDD_CJS.CameraController(options);

            //required since the models may not be geographically referenced.

            if(tilesets.asset.extras !== null) {
                if (tilesets.asset.extras.ion.georeferenced !== true) {
                    if (tileset_model_matrix) {
                        _setTilesetModelMatrix(tilesets, tileset_model_matrix);

                        if(CONSTRUKTED_AJAX.is_owner) {
                            transformEditor = new Cesium.TransformEditor({
                                container: viewer.container,
                                scene: viewer.scene,
                                transform: tilesets.modelMatrix,
                                boundingSphere: tilesets.boundingSphere
                            });

                            transformEditor.viewModel.deactivate();
                        }
                    } else {
                        var modelMatrixIsDetermined = false;

                        viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (queuedTileCount) {
                            if(!modelMatrixIsDetermined && viewer.scene.globe.tilesLoaded){
                                var cartographic = new Cesium.Cartographic(0, 0);

                                var terrainHeight = viewer.scene.globe.getHeight(cartographic);

                                if(terrainHeight) {
                                    tilesets.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0, terrainHeight));
                                    jqTilesetAltitude.val(terrainHeight);
                                }
                                else {
                                    console.warn('failed to get terrain height 0/0');
                                    tilesets.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0));
                                }

                                modelMatrixIsDetermined = true;
                            }
                        });
                    }

                    if(CONSTRUKTED_AJAX.is_owner) {
                        transformEditor = new Cesium.TransformEditor({
                            container: viewer.container,
                            scene: viewer.scene,
                            transform: tilesets.modelMatrix,
                            boundingSphere: tilesets.boundingSphere
                        });

                        transformEditor.viewModel.deactivate();
                    }
                }
                else {
                    jqTilesetLatitude.prop('disabled', true);
                    jqTilesetLongitude.prop('disabled', true);
                    jqTilesetAltitude.prop('disabled', true);
                    jqTilesetHeading.prop('disabled', true);
                    jqEditAssetGeoLocationButton.prop('disabled', true);
                    jqTilesetEstimateAltitude.prop('disabled', true);
                    jqSaveTilesetModelMatrixButton.prop('disabled', true);

                    var position = tilesets.boundingSphere.center;

                    var carto = Cesium.Cartographic.fromCartesian(position);

                    jqTilesetLongitude.val(Cesium.Math.toDegrees(carto.longitude));
                    jqTilesetLatitude.val(Cesium.Math.toDegrees(carto.latitude));
                    jqTilesetAltitude.val(carto.height);
                }
            }

            cameraController.setDefaultView();
        }).otherwise(function(error){
            window.alert(error);
        });
    }

    function _setTilesetModelMatrix(tileset, modelMatrixData) {
        var position = modelMatrixData.position;

        var center = new Cesium.Cartesian3(position.x, position.y, position.z);

        var headingPitchRoll = modelMatrixData.headingPitchRoll;

        var hpr = new Cesium.HeadingPitchRoll(headingPitchRoll.heading ,headingPitchRoll.pitch, headingPitchRoll.roll);

        var scale = modelMatrixData.scale;

        var scaleCartesian3 = new Cesium.Cartesian3(scale.x, scale.y, scale.z);

        var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(center, hpr);

        tilesets.modelMatrix = Cesium.Matrix4.setScale(modelMatrix, scaleCartesian3, new Cesium.Matrix4());
    }

    function _captureThumbnail() {
        viewer.scene.requestRender();
        viewer.render();

        var mediumQuality  = viewer.canvas.toDataURL('image/jpeg', 0.5);

        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'post_set_thumbnail',
                post_id : CONSTRUKTED_AJAX.post_id,
                capturedJpegImage: mediumQuality
            },
            success : function( response ) {
                alert(response);
            },
            error: function() {
                alert('error');
            }
        });
    }

    function _saveCurrentView() {
        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'post_set_current_view',
                post_id : CONSTRUKTED_AJAX.post_id,
                view_data: cameraController.getViewData()
            },
            success : function( response ) {
                alert(response);
            },
            error: function(xhr, status, error) {
                alert('error');
            }
        });
    }

    function _resetCameraView() {
        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'post_reset_current_view',
                post_id : CONSTRUKTED_AJAX.post_id
            },
            success : function( response ) {
                alert(response);
            },
            error: function(xhr, status, error) {
                alert('error');
            }
        });
    }

    return {
        viewer: viewer,
        cameraController: cameraController,
        start: start
    };
})();

jQuery(document).ready(function(){
    window.$ = jQuery;

    if(CONSTRUKTED_AJAX.asset_geo_location && CONSTRUKTED_AJAX.asset_geo_location !== '') {
        CONSTRUKTED_AJAX.asset_geo_location = JSON.parse(CONSTRUKTED_AJAX.asset_geo_location);
    }

    CONSTRUKTED_AJAX.is_owner = Boolean(CONSTRUKTED_AJAX.is_owner);

    theApp.start();
});
