jQuery(function ($) {
    $(document).on('click', '#navbar-right .nav-item', function (e) {
        e.stopPropagation();

        // add class active to current button and remove it from the siblings
        $(this).toggleClass('active').siblings().not(this).removeClass('active');
    });
});

jQuery(function ($) {
    var jqNavbarLayersBtn = $('#construkted-popup-layers-btn');
    var jqNavbarGeoBtn = $('#construked-popup-geo-btn');
    var jaNavbarMeasurementsBtn = $('#construkted-popup-measurements-btn');
    var jqNavbarSettingsBtn = $('#construkted-popup-settings-btn');

    var jqLayersPopup = $('#construkted-popup-layers');
    var jqGeolocationPopup = $('#construkted-popup-geolocation');
    var jqMeasurementsPopup = $('#construkted-popup-measurements');
    var jqSettingsPopup = $('#construkted-popup-settings');

    var jqLayersPopupCloseBtn = $('#construkted-popup-layers .close-btn');
    var jqGeoPopupCloseBtn = $('#construkted-popup-geolocation .close-btn');
    var jqMeasurementsPopupCloseBtn = $('#construkted-popup-measurements .close-btn');
    var jqSettingsPopupCloseBtn = $('#construkted-popup-settings .close-btn');

    function hideAllPopup() {
        jqLayersPopup.hide();
        jqGeolocationPopup.hide();
        jqMeasurementsPopup.hide();
        jqSettingsPopup.hide();
    }

    jqNavbarLayersBtn.click(function () {
        hideAllPopup();
        jqLayersPopup.show();
    });

    jqNavbarGeoBtn.click(function () {
        hideAllPopup();
        jqGeolocationPopup.show();
    });

    jaNavbarMeasurementsBtn.click(function () {
        hideAllPopup();
        jqMeasurementsPopup.show();
    });

    jqNavbarSettingsBtn.click(function () {
        hideAllPopup();
        jqSettingsPopup.show();
    });

    jqLayersPopupCloseBtn.click(function () {
        jqLayersPopup.hide();
    });

    jqGeoPopupCloseBtn.click(function () {
        jqGeolocationPopup.hide();
    });

    jqMeasurementsPopupCloseBtn.click(function () {
        jqMeasurementsPopup.hide();
    });

    jqSettingsPopupCloseBtn.click(function () {
        jqSettingsPopup.hide();
    });
});