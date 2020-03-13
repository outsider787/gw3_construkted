<div id="construkted-popup-settings" class="popup-wrapper" style="display: none;">
    <div class="popup-content">
        <h3 class="popup-title">Settings <span class="close-btn">×</span>

        <div class="content-wrapper">
            <div class="form-group">
                <label for="display_performance">Display performance</label>
                <input type="range" id="maximum-screen-space-error-slider" class="form-control-range" name="display_performance" min="2" max="32" value="24">
                <div class="label-min-max">
                    <span class="lbl-min">Performance</span>
                    <span class="lbl-max" style="float:right">Quality</span>
                </div>
            </div>

            <? global $post; ?>

<!--        if($post->post_author == get_current_user_id()) { ?>-->
<!--        The buttons should only be visible to the asset owner (logged in)-->

            <p class="desc">Update thumbnail from current display</p>
            <button type="button" id="capture_thumbnail" class="btn btn-light">Update thumbnail</button>

            <p class="desc">Set default camera view to current view</p>
            <button type="button" id="save_current_view" class="btn btn-light">Set default view</button>

            <p class="desc">Use if display is not showing in the asset</p>
            <button type="button" id="reset_camera_view" class="btn btn-light">Reset camera view</button>

            <div class="form-group">
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
