<div class="bst4-wrapper">
    <div class="container-fluid">
        <nav id="navbar-right" class="navbar-right bg-light p-3">
            <ul class="nav flex-column">
                <li class="nav-item" id="nav-layers">
                    <button type="button" class="btn btn-light " id="construkted-popup-layers-btn" title="Layers of hover tips"></button>
                </li>

                <li class="nav-item" id="nav-geo">
                    <button type="button" class="btn btn-light " id="construked-popup-geo-btn" title="Geo-Location of hover tips"></button>
                </li>

                <li class="nav-item" id="nav-measurements">
                    <button type="button" class="btn btn-light " id="construkted-popup-measurements-btn" title="Measurements of hover tips"></button>
                </li>

                <li class="nav-item" id="nav-settings">
                    <button type="button" class="btn btn-light " id="construkted-popup-settings-btn" title="Settings of hover tips"></button>
                </li>
            </ul>
        </nav>

        <?php require_once __DIR__ . '/layers-popup.php'; ?>
        <?php require_once __DIR__ . '/geo-popup.php'; ?>
        <?php require_once __DIR__ . '/measurements-popup.php'; ?>
        <?php require_once __DIR__ . '/settings-popup.php'; ?>
    </div>
</div>
