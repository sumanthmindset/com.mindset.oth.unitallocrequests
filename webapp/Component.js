sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/mindset/oth/unitallocrequests/model/models",
		"com/mindset/oth/unitallocrequests/localService/mockserver",
			"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models,Mockserver,JSONModel) {
"use strict";
	Mockserver.init();
     var component;

	return UIComponent.extend("com.mindset.oth.unitallocrequests.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
				component = this;
				var ODataModel=this.getModel();
				var oCore = sap.ui.getCore();
				var mConfig = component.getMetadata().getConfig();

				var oConfig = {
					disableHeadRequestForToken: true,
					useBatch: true,
					defaultOperationMode: "Client"
				};

				var oModel = component.getModel(mConfig.serviceUrl, oConfig);

				if (ODataModel.isBindingModeSupported(sap.ui.model.BindingMode.TwoWay)) { // true
					ODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
				}
				var RequestModel = new JSONModel(jQuery.sap.getModulePath("com.mindset.oth.unitallocrequests.model", "/ITEM.json"));
			this.setModel(RequestModel, "RequestModel");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});