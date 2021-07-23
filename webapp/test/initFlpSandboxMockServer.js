sap.ui.define(["../localService/mockserver", "./flpSandbox", "sap/ui/fl/FakeLrepConnectorLocalStorage", "sap/m/MessageBox"], function (e, a,
	n, o) {
	"use strict";
	e.start();
	var i = [];
	i.push(e.init());
	i.push(a.init());
	Promise.all(i).catch(function (e) {
		o.error(e.message)
	}).finally(function () {
		n.enableFakeConnector()
	})
});