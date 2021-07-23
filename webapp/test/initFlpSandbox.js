sap.ui.define(["./flpSandbox", "sap/ui/fl/FakeLrepConnectorLocalStorage", "sap/m/MessageBox","com/mindset/EquipmentLog/localService/mockserver"], function (e, n, o,Mockserver) {
	"use strict";
	e.init().then(function () {
		Mockserver.init();

	// initialize the embedded component on the HTML page
	 sap.ui.require(["sap/ui/core/ComponentSupport"]);
		n.enableFakeConnector()
		
	}, function (e) {
		o.error(e.message)
	})
});