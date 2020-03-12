var viewer = null;
var cameraController = null;

var theApp = (function () {
    var tilesets = null;
    var transformEditor = null;

    function start() {
        _create3DMap();
        _initGeoLocationPopup();
        _initMeasurementPopup();
        _initSettingsPopup();
    }

    function _initGeoLocationPopup() {
        var tileset_model_matrix = CONSTRUKTED_AJAX.tileset_model_matrix;

        if(tileset_model_matrix){
            var position = tileset_model_matrix.position;

            var carto = Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(position.x , position.y, position.z));

            jQuery('#tileset_latitude').val(Cesium.Math.toDegrees(carto.longitude));
            jQuery('#tileset_longitude').val(Cesium.Math.toDegrees(carto.latitude));
            jQuery('#tileset_altitude').val(carto.height);
            jQuery('#tileset_heading').val(tileset_model_matrix.headingPitchRoll.heading);
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

            var translation = Cesium.Matrix4.getTranslation(tilesets.modelMatrix, new Cesium.Cartesian3());

            var carto = Cesium.Cartographic.fromCartesian(translation);

            carto.longitude = longitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(carto);

            tilesets.modelMatrix = Cesium.Matrix4.setTranslation(tilesets.modelMatrix, newPosition, tilesets.modelMatrix);

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

            var translation = Cesium.Matrix4.getTranslation(tilesets.modelMatrix, new Cesium.Cartesian3());

            var carto = Cesium.Cartographic.fromCartesian(translation);

            carto.latitude = latitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(carto);

            tilesets.modelMatrix = Cesium.Matrix4.setTranslation(tilesets.modelMatrix, newPosition, tilesets.modelMatrix);

            viewer.zoomTo(tilesets);
        });

        jQuery('#tileset_altitude').change(function () {
            var altitude = jQuery('#tileset_altitude').val();
            altitude = parseFloat(altitude);

            if(isNaN(altitude) || altitude > 15000 || altitude < -1000) {
                jQuery('#tileset_altitude').val('');
                alert('invalid altitude: ' + altitude);
                return;
            }

            var translation = Cesium.Matrix4.getTranslation(tilesets.modelMatrix, new Cesium.Cartesian3());

            var carto = Cesium.Cartographic.fromCartesian(translation);

            carto.allatitude = altitude;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(carto);

            tilesets.modelMatrix = Cesium.Matrix4.setTranslation(tilesets.modelMatrix, newPosition, tilesets.modelMatrix);

            viewer.zoomTo(tilesets);
        });
    }

    function _initMeasurementPopup() {
        var measure = viewer.measure;

        var viewModel = measure.viewModel;

        jQuery('#measurement-component-distance').click(function () {
            viewModel._activate();
            viewModel.selectedMeasurement = viewModel._measurements[1];
        });

        jQuery('#measurement-polyline').click(function () {
            viewModel._activate();
            viewModel.selectedMeasurement = viewModel._measurements[2];
        });

        jQuery('#measurement-area').click(function () {
            viewModel._activate();
            viewModel.selectedMeasurement = viewModel._measurements[6];
        });

        jQuery('#measurement-point').click(function () {
            viewModel._activate();
            viewModel.selectedMeasurement = viewModel._measurements[7];
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
        var position = transformEditor.viewModel.position;
        var headingPitchRoll = transformEditor.viewModel.headingPitchRoll;
        var scale = transformEditor.viewModel.scale;

        var data = {
            position: position,
            headingPitchRoll: headingPitchRoll,
            scale: scale
        };

        jQuery.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'set_tileset_model_matrix_json',
                post_id : CONSTRUKTED_AJAX.post_id,
                tileset_model_matrix_json: JSON.stringify(data)
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
        //test

        CONSTRUKTED_AJAX.is_owner = true;

        Cesium.Ion.defaultAccessToken = CONSTRUKTED_AJAX.cesium_access_token;

        viewer = new Cesium.Viewer('cesiumContainer', {
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

		tilesets.maximumScreenSpaceError = 6.0;
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

            if(tilesets.asset.extras != null) {
                if (tilesets.asset.extras.ion.georeferenced !== true) {
                    if (CONSTRUKTED_AJAX.tileset_model_matrix) {
                        _setTilesetModelMatrix(tilesets, CONSTRUKTED_AJAX.tileset_model_matrix);

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
                        tilesets.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0));
                    }
                }
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

    if(CONSTRUKTED_AJAX.tileset_model_matrix && CONSTRUKTED_AJAX.tileset_model_matrix !== '')
        CONSTRUKTED_AJAX.tileset_model_matrix = JSON.parse(CONSTRUKTED_AJAX.tileset_model_matrix);

    theApp.start();
});
