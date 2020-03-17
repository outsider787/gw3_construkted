<div class="bst4-wrapper">
    <div class="container-fluid">
        <nav id="navbar-right" class="navbar-right bg-light p-3">
            <ul class="nav flex-column">
                <li class="nav-item" id="nav-layers">
                    <span class="btn btn-light gwicon-layers" id="construkted-popup-layers-btn" title="Layers of hover tips">
                    </span>
                </li>

                <li class="nav-item" id="nav-geo">
                    <span class="btn btn-light gwicon-global" id="construkted-popup-geolocation-btn" title="Geo-Location of hover tips"></span>
                </li>

                <li class="nav-item" id="nav-measurements">
                    <span class="btn btn-light gwicon-pencil" id="construkted-popup-measurements-btn" title="Measurements of hover tips"></span>
                </li>

                <li class="nav-item" id="nav-settings">
                    <span class="btn btn-light gwicon-gear" id="construkted-popup-settings-btn" title="Settings of hover tips"></span>
                </li>
            </ul>
        </nav>

        <?php require_once __DIR__ . '/layers-popup.php'; ?>
        <?php require_once __DIR__ . '/geolocation-popup.php'; ?>
        <?php require_once __DIR__ . '/measurements-popup.php'; ?>
        <?php require_once __DIR__ . '/settings-popup.php'; ?>
    </div>
</div>
