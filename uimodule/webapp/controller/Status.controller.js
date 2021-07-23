sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
		var controller, oModel;

	return Controller.extend("com.mindset.oth.unitallocrequests.controller.Status", {
		onInit: function () {
           	controller = this;
			this.oRouter = this.getOwnerComponent().getRouter();
			oModel = controller.getOwnerComponent().getModel();
			controller.router = sap.ui.core.UIComponent.getRouterFor(this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onSelectChange:function(oEvent){
			debugger;
				var sPath = oEvent.getSource().getBindingContextPath();
			var sSelectedItem = this.getView().getModel("RequestModel").getProperty(sPath);
			this.getView().getModel("RequestModel").setProperty("/bindingPath", sPath);
			this.getView().getModel("RequestModel").setProperty("/SelectedItem", sSelectedItem);
			this.oRouter.navTo("Status", {
				
				RequestType: sSelectedItem.name

			});
		}
		
	});
});