/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["com/mindset/oth/unitallocrequests/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
