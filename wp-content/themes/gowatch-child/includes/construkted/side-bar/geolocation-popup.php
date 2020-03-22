<div id="construkted-popup-geolocation" class="popup-wrapper" style="display: none;">
    <div class="popup-content">
        <h3 class="popup-title">Geo-Location
            <span class="close-btn">×</span>
        </h3>

        <div class="content-wrapper">
            <div class="form-group">
                <label >Transparency</label>
                <input type="range" id="tileset-transparency-slider" class="form-control-range" min="0" max="1" value="1" step="0.01">
            </div>

            <!-- These buttons should only be visible to the asset owner (logged in) -->

            <?php
            global $post;

            $is_owner = $post->post_author == get_current_user_id();

            if($is_owner) { ?>
                <div>Adjust the position of the asset.</div>
                <button type="button" id = "edit_asset_geo_location_button" class="btn btn-light">Edit</button>
            <?php } ?>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Latitude:</label>
                    <input type="text" id = "tileset_latitude" name="latitude" <?php if(!$is_owner) { ?>  readonly <?php }?>>
                </div>
            </div>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Longitude:</label>
                    <input type="text" id = "tileset_longitude" name="longitude" <?php if(!$is_owner) { ?>  readonly <?php }?>>
                </div>
            </div>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Altitude:</label>
                    <input type="text" id = "tileset_altitude" name="altitude" <?php if(!$is_owner) { ?>  readonly <?php }?>>
                </div>
            </div>

            <?php
            if($is_owner) { ?>
                <button type="button" id = "" class="btn btn-light">Estimate Altitude</button>
            <?php } ?>
            
            
            <div class="text-input-group">
                <div class="input-group">
                    <label for="heading">Heading:</label>
                    <input type="text" id = "tileset_heading" name="heading" <?php if(!$is_owner) { ?>  readonly <?php }?>>
                </div>
            </div>

            <!-- These buttons should only be visible to the asset owner (logged in) -->

            <?php
            if($is_owner) { ?>
                <button type="button" id = "save_tileset_model_matrix_button" class="btn btn-light">Save</button>
            <?php } ?>
        </div>
    </div>
</div>
