var viewer = null;
var cameraController = null;

var theApp = (function () {
    var tilesets = null;
    var transformEditor = null;

    // why?
    // please see wp_content/themes/olam/css/color.css.php
    // it define tbody, th, td,, tfoot 's background color

    function applyCesiumCssStyle() {
        var cesiumNavigationHelp = jQuery('.cesium-click-navigation-help.cesium-navigation-help-instructions');
        cesiumNavigationHelp.find('td').css({'background-color': 'rgba(38, 38, 38, 0.75)'});

        var cesiumTouchNavigationHelp = jQuery('.cesium-touch-navigation-help.cesium-navigation-help-instructions');
        cesiumTouchNavigationHelp.find('td').css({'background-color': 'rgba(38, 38, 38, 0.75)'});
    }

    function start() {
        jQuery('#capture_thumbnail').click(function () {
            captureThumbnail();
        });

        jQuery('#save_current_view').click(function () {
            saveCurrentView();
        });

        jQuery('#reset_camera_view').click(function () {
            resetCameraView();
        });

        jQuery('#maximum-screen-space-error-slider').change(function () {
            var value = this.value;

            var maximumScreenSpaceError = 32 - value;

            if(!tilesets)
                return;

            tilesets.maximumScreenSpaceError = maximumScreenSpaceError;
        });

        _initGeoLocationWidget();
        _updateGeoLocationWidget();
        create3DMap();
        applyCesiumCssStyle();
    }

    function setTilesetModelMatrixJson() {
        var latitude = $('#tileset_latitude').val();
        var longitude = $('#tileset_longitude').val();
        var altitude = $('#tileset_altitude').val();
        var heading = $('#tileset_heading').val();

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        altitude = parseFloat(altitude);
        heading = parseFloat(heading);

        if(isNaN(latitude) || latitude < -90 || latitude > 90){
            $('#tileset_latitude').val("");
            alert("invalid latitude!");
            return;
        }

        if(isNaN(longitude) || longitude < -180 || longitude > 180){
            $('#tileset_longitude').val("");
            alert("invalid longitude!");
            return;
        }

        if(isNaN(altitude)){
            $('#tileset_altitude').val("");
            alert("invalid altitude!");
            return;
        }

        if(isNaN(heading)){
            $('#tileset_heading').val("");
            alert("invalid heading!");
            return;
        }

        var position = transformEditor.viewModel.position;
        var headingPitchRoll = transformEditor.viewModel.headingPitchRoll;
        var scale = transformEditor.viewModel.scale;

        var data = {
            latitude: latitude,
            longitude: longitude,
            altitude: altitude,
            heading: heading,

            position: position,
            headingPitchRoll: headingPitchRoll,
            scale: scale
        };

        $.ajax({
            url : CONSTRUKTED_AJAX.ajaxurl,
            type : 'post',
            data : {
                action : 'set_tileset_model_matrix_json',
                post_id : CONSTRUKTED_AJAX.post_id,
                tileset_model_matrix_json: JSON.stringify(data)
            },
            success : function( response ) {
                // I am not sure why?
                var json_string = response.substring(0, response.length - 1);

                var data = JSON.parse(json_string);

                if(data.ret === false) {
                    alert("Passed values is the same as the values that is already in the database!");
                    return;
                }

                alert("Successfully updated!");
                setTilesetModelMatrixData(tilesets, data);
                viewer.zoomTo(tilesets);
            },
            error: function(xhr, status, error) {
                alert("error");
            }
        });
    }

    function _initGeoLocationWidget() {
        jQuery('#edit_asset_geo_location_button').click(function () {
            if(transformEditor)
                transformEditor.viewModel.activate();
        });

        $('#exit_edit_asset_geo_location_button').click(function () {
            setTilesetModelMatrixJson();
        });

        $('#tileset_longitude').change(function () {
            var longitude = $('#tileset_longitude').val();

            if(longitude > 180 || longitude < -180) {
                console.warn('invalid longitude: ' + longitude);
                return;
            }

            var translation = Cesium.Matrix4.getTranslation(tilesets.modelMatrix, new Cesium.Cartesian3());

            var carto = Cesium.Cartographic.fromCartesian(translation);

            carto.longitude = longitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(carto);

            tilesets.modelMatrix = Cesium.Matrix4.setTranslation(tilesets.modelMatrix, newPosition, tilesets.modelMatrix);

            viewer.zoomTo(tilesets);
        });

        $('#tileset_latitude').change(function () {
            var latitude = $('#tileset_latitude').val();

            if(latitude > 90 || latitude < -90) {
                console.warn('invalid latitude: ' + latitude);
                return;
            }

            var translation = Cesium.Matrix4.getTranslation(tilesets.modelMatrix, new Cesium.Cartesian3());

            var carto = Cesium.Cartographic.fromCartesian(translation);

            carto.latitude = latitude * Cesium.Math.RADIANS_PER_DEGREE;

            var newPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(carto);

            tilesets.modelMatrix = Cesium.Matrix4.setTranslation(tilesets.modelMatrix, newPosition, tilesets.modelMatrix);

            viewer.zoomTo(tilesets);
        });

        $('#tileset_altitude').change(function () {
            var altitude = $('#tileset_altitude').val();

            if(altitude > 15000 || altitude < -1000) {
                console.warn('invalid altitude: ' + altitude);
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

    function _updateGeoLocationWidget() {
        var tileset_model_matrix_data = CONSTRUKTED_AJAX.tileset_model_matrix_data;

        if(tileset_model_matrix_data){
            $('#tileset_latitude').val(tileset_model_matrix_data.latitude);
            $('#tileset_longitude').val(tileset_model_matrix_data.longitude);
            $('#tileset_altitude').val(tileset_model_matrix_data.altitude);
            $('#tileset_heading').val(tileset_model_matrix_data.heading);
        }
        else{
            $('#tileset_latitude').val(0);
            $('#tileset_longitude').val(0);
            $('#tileset_altitude').val(0);
            $('#tileset_heading').val(0);
        }
    }

    function create3DMap() {
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
            requestRenderMode : true
        });

        viewer.extend(Cesium.viewerMeasureMixin, {
            units: new Cesium.MeasureUnits({
                distanceUnits : Cesium.DistanceUnits.METERS,
                areaUnits : Cesium.AreaUnits.SQUARE_METERS,
                volumeUnits : Cesium.VolumeUnits.CUBIC_METERS
            })
        });

        // fix css error
        var measureButtons = document.getElementsByClassName('cesium-measure-button');

        for(i = 0; i < measureButtons.length; i++)
        {
            measureButtons[i].style["box-sizing"] = 'content-box';
        }

        var terrainDisable = true;

        if(!terrainDisable)
            viewer.terrainProvider = Cesium.createWorldTerrain();

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

        // Change the text in the Help menu

        jQuery(".cesium-navigation-help-pan").text("Rotate view");
        jQuery(".cesium-navigation-help-zoom").text("Pan view");
        jQuery(".cesium-navigation-help-rotate").text("Zoom view");

        var navigationHelpDetailsElements = jQuery(".cesium-navigation-help-details");

        for(var i = 0; i < navigationHelpDetailsElements.length; i++) {
            var element = navigationHelpDetailsElements[i];

            if(element.textContent === "Right click + drag, or") {
                element.textContent = "Right click + drag";
            }

            if(element.textContent === "Mouse wheel scroll") {
                element.textContent = "";
            }

            if(element.textContent === "Middle click + drag, or") {
                element.textContent = "Scroll mouse wheel";
            }

            if(element.textContent === "CTRL + Left/Right click + drag") {
                element.textContent = "Middle click + drag";
            }
        }

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
		
        viewer.scene.debugShowFramesPerSecond = true;

        tilesets.readyPromise.then(function(){
            var options = {
                exitFPVModeButtonId: "exitFPVModeButton",
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
                    if (CONSTRUKTED_AJAX.tileset_model_matrix_data) {
                        setTilesetModelMatrixData(tilesets, CONSTRUKTED_AJAX.tileset_model_matrix_data);

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

    function setTilesetModelMatrixData(tileset, modelMatrixData) {
        var position = modelMatrixData.position;

        var center = Cesium.Cartesian3.fromDegrees(modelMatrixData.longitude, modelMatrixData.latitude, modelMatrixData.altitude);

        var headingPitchRoll = modelMatrixData.headingPitchRoll;

        var hpr = new Cesium.HeadingPitchRoll(headingPitchRoll.heading ,headingPitchRoll.pitch, headingPitchRoll.roll);

        var scale = modelMatrixData.scale;

        var scaleCartesian3 = new Cesium.Cartesian3(scale.x, scale.y, scale.z);

        var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(center, hpr);

        tilesets.modelMatrix = Cesium.Matrix4.setScale(modelMatrix, scaleCartesian3, new Cesium.Matrix4());
    }

    function captureThumbnail() {
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
                alert("error");
            }
        });
    }

    function saveCurrentView() {
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
                alert("error");
            }
        });
    }

    function resetCameraView() {
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
                alert("error");
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

    theApp.start();
});
