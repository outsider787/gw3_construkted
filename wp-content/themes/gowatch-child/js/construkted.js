var viewer = null;
var cameraController = null;

var theApp = (function () {
    var tilesets = null;
    var transformEditor = null;

    // why?
    // please see wp_content/themes/olam/css/color.css.php
    // it define tbody, th, td,, tfoot 's background color

    function applyCesiumCssStyle() {
        var cesiumNavigationHelp = $('.cesium-click-navigation-help.cesium-navigation-help-instructions');
        cesiumNavigationHelp.find("td").css({"background-color": "rgba(38, 38, 38, 0.75)"});

        var cesiumTouchNavigationHelp = $('.cesium-touch-navigation-help.cesium-navigation-help-instructions');
        cesiumTouchNavigationHelp.find("td").css({"background-color": "rgba(38, 38, 38, 0.75)"});
    }

    function start() {
        $('#capture_thumbnail').click(function () {
            captureThumbnail();
        });

        $('#save_current_view').click(function () {
            saveCurrentView();
        });

        $('#reset_camera_view').click(function () {
            resetCameraView();
        });

        create3DMap();
        applyCesiumCssStyle();
    }

    function create3DMap() {
        // tom
        Cesium.Ion.defaultAccessToken = CONSTRUKTED_AJAX.cesium_access_token;


        viewer = new Cesium.Viewer('cesiumContainer', {
            animation: false,
            homeButton: false, //  the HomeButton widget will not be created.
            baseLayerPicker: false, // If set to false, the BaseLayerPicker widget will not be created.
            geocoder: false,
            sceneModePicker: false,
            timeline: false,
            fullscreenElement: "cesiumContainer",
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

        $(".cesium-navigation-help-pan").text("Rotate view");
        $(".cesium-navigation-help-zoom").text("Pan view");
        $(".cesium-navigation-help-rotate").text("Zoom view");

        var navigationHelpDetailsElements = $(".cesium-navigation-help-details");

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

        $.ajax({
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
        $.ajax({
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
        $.ajax({
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
    }
})();

jQuery(document).ready(function(){
    window.$=jQuery;

    theApp.start();
});
