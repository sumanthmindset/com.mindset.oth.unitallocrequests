sap.ui.define([
	"./flpSandbox",
	"sap/ui/fl/FakeLrepConnectorLocalStorage",
	"sap/m/MessageBox",
	"com/mindset/EquipmentLogg/localService/mockserver"
], function (flpSandbox, FakeLrepConnectorLocalStorage, MessageBox,Mockserver) {
	"use strict";
	Mockserver.init();

	// initialize the embedded component on the HTML page
	sap.ui.require(["sap/ui/core/ComponentSupport"]);
	flpSandbox.init().then(function () {
		FakeLrepConnectorLocalStorage.enableFakeConnector();
	}, function (oError) {
		MessageBox.error(oError.message);
	});
});