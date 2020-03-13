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

            <div>Adjust the position of the asset.</div>
            <button type="button" id = "edit_asset_geo_location_button" class="btn btn-light">Edit</button>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Latitude:</label>
                    <input type="text" id = "tileset_latitude" name="latitude">
                </div>
            </div>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Longitude:</label>
                    <input type="text" id = "tileset_longitude" name="longitude">
                </div>
            </div>

            <div class="text-input-group">
                <div class="input-group">
                    <label>Altitude:</label>
                    <input type="text" id = "tileset_altitude" name="altitude">
                </div>
            </div>

            <div class="text-input-group">
                <div class="input-group">
                    <label for="heading">Heading:</label>
                    <input type="text" id = "tileset_heading" name="heading">
                </div>
            </div>

            <button type="button" id = "save_tileset_model_matrix_button" class="btn btn-light">Save</button></div>
    </div>
</div>
