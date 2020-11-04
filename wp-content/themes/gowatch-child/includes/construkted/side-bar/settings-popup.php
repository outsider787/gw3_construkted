<div id="construkted-popup-settings" class="popup-wrapper" style="display: none;">
    <div class="popup-content">
        <h3 class="popup-title">Settings <span class="close-btn">×</span></h3>

        <div class="content-wrapper">
            <div class="form-group">
                <label for="display_performance"><strong>Display</strong></label>
                <br>Rendering performance
                <input type="range" id="maximum-screen-space-error-slider" class="form-control-range" name="display_performance" min="2" max="32" value="24">
                <div class="label-min-max">
                    <span class="lbl-min">Performance</span>
                    <span class="lbl-max" style="float:right">Quality</span>
                </div>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="show-hide-wireframe-checkbox" type="checkbox">
                <label class="form-check-label" for="show-hide-wireframe-checkbox">
                    Show Wireframe
                </label>
            </div>
            <hr style="width:100%;text-align:left;margin-left:0">
             <div class="form-group">
                <label for="fpv_speed"><strong>FPV Movement</strong></label>
                <br>Movement Speed 
                <input type="range" id="fpv-movement-speed-slider" class="form-control-range" name="fpv_speed" min="0.01" max="1" value="0.3" step="0.01">
                <div class="label-min-max">
                    <span class="lbl-min">Slow</span>
                    <span class="lbl-max" style="float:right">Fast</span>
                </div>
            </div>
            
            <!-- These buttons should only be visible to the asset owner (logged in) -->

            <?php
            global $post;

            if($post->post_author == get_current_user_id()) { ?>
                <hr style="width:100%;text-align:left;margin-left:0">
                <strong>Thumbnail and View Settings</strong>    
                <p class="desc">Create/update thumbnail from current asset view.</p>
                <button type="button" id="capture_thumbnail" class="btn btn-light">Update asset thumbnail</button>

                <p class="desc">Set default camera position displayed on initial asset loading.</p>
                <button type="button" id="save_current_view" class="btn btn-light">Set default view</button>

                <p class="desc">Use if display is not showing the asset.</p>
                <button type="button" id="reset_camera_view" class="btn btn-light">Camera view reset</button>
            <?php } ?>

            <!-- This checkbox should only be visible by an admin user only!-->
            <?php if( current_user_can('administrator') ) {  ?>
                <div class="form-check">
                    <input class="form-check-input" id="show-hide-tiles-inspector-checkbox" type="checkbox">
                    <label class="form-check-label" for="show-hide-tiles-inspector-checkbox">
                        Display Tiles Inspector
                    </label>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
