<div id="construkted-popup-measurements" class="popup-wrapper" style="display: none;">
    <div class="popup-content">
        <h3 class="popup-title">Measurements
            <span class="close-btn">×</span>
        </h3>

        <div class="content-wrapper">
            <button type="button" id = "measurement-tool-button-component-distance" class="btn btn-light">Distance</button>
            <button type="button" id = "measurement-tool-button-polyline" class="btn btn-light">Polyline</button>
            <button type="button" id = "measurement-tool-button-area" class="btn btn-light">Area</button>
            <button type="button" id = "measurement-tool-button-point" class="btn btn-light">Point</button>
            <button type="button" id = "end-measurement" class="btn btn-light disabled">End Measurement</button>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Measurement Result</h5>
                    <div class="form-check">
                        <input checked class="form-check-input" id="show-hide-all-measurement-checkbox" type="checkbox">
                        <label class="form-check-label" for="show-hide-all-measurement-checkbox">
                            Show / Hide All
                        </label>
                    </div>

                    <div class="card">
                        <div class="card-body" id="measurement-list">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>