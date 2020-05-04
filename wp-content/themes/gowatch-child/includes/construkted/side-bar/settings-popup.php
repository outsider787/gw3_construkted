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
                <input class="form-check-input" id="show-hide-all-measurement-checkbox" type="checkbox">
                <label class="form-check-label" for="show-hide-all-measurement-checkbox">
                    Show Wireframe
                </label>
            </div>

            <!-- These buttons should only be visible to the asset owner (logged in) -->

            <?php
            global $post;

            if($post->post_author == get_current_user_id()) { ?>
                <hr style="width:100%;text-align:left;margin-left:0">
                <strong>Thumbnail and View Settings</strong>    
                <p class="desc">Create/update thumbnail from current asset view.</p>
                <button type="button" id="capture_thumbnail" class="btn btn-light">Update asset thumbnail</button>

                <p class="desc">Set default camera position displayed on ititial asset loading.</p>
                <button type="button" id="save_current_view" class="btn btn-light">Set default view</button>

                <p class="desc">Use if display is not showing the asset.</p>
                <button type="button" id="reset_camera_view" class="btn btn-light">Camera view reset</button>
            <?php } ?>

            <div class="form-group hidden">
                <label for="fpv_speed">FPV movement speed</label>
                <input type="range" class="form-control-range" name="fpv_speed" id="fpv_speed">
                <div class="label-min-max">
                    <span class="lbl-min">Slow</span>
                    <span class="lbl-max" style="float:right">Fast</span>
                </div>
            </div>
        </div>
    </div>
</div>
