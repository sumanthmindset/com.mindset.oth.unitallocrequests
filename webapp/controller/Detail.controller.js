sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, Filter, FilterOperator, JSONModel, History) {
	"use strict";
	var controller, oModel, cloneModel;
	return Controller.extend("com.mindset.oth.unitallocrequests.controller.Detail", {
		onInit: function () {
			controller = this;
			oModel = controller.getOwnerComponent().getModel();
			controller.router = sap.ui.core.UIComponent.getRouterFor(this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
			var RequestModel = this.getView().getModel("RequestModel");

		},
		_onObjectMatched: function (oEvent) {
			var RequestModel = this.getView().getModel("RequestModel");
			var sPath = RequestModel.getProperty("/bindingPath");
			var oItem = RequestModel.getProperty(sPath);
			var RequestType = this.getView().getModel("RequestModel").getProperty(sPath + "/RequestType");
			//cloning the model
			var obj = jQuery.extend(true, {}, oItem);
			cloneModel = new JSONModel(obj);

			if (RequestType === "New Allocation") {
				this.getView().getModel("RequestModel").setProperty(sPath + "/Requestvisible", false);

				this.getView().getModel("RequestModel").setProperty(sPath + "/CurrencySurveyvisible", false);
				this.getView().getModel("RequestModel").setProperty(sPath + "/RestructringAllocationvisible", true);
			} else {
				this.getView().getModel("RequestModel").setProperty(sPath + "/Requestvisible", true);
				this.getView().getModel("RequestModel").setProperty(sPath + "/CurrencySurveyvisible", true);
				this.getView().getModel("RequestModel").setProperty(sPath + "/RestructringAllocationvisible", false);
			}
			RequestModel.updateBindings(true);
			this.getView().setModel(RequestModel);
			this.getView().bindElement(sPath);

		},

		onChange: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var sproperty = oEvent.getSource().getCustomData()[0].getKey();
			if (path) {
				this.getView().getModel("RequestModel").setProperty(path + "/" + sproperty, oEvent.getSource().getSelectedKey());
			}

		},
		handleChange: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var value = oEvent.getParameter("value");

		},
		onSelectionChange: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var sValue = oEvent.getSource().getValue();
			if (path) {

				this.getView().getModel().setProperty(path + "/ReferenceUnit", sValue);
			}
			this.getView().getModel().updateBindings(true);
		},
		onCancel: function (oEvent) {

			var ReqModel = this.getView().getModel("RequestModel");
			var sPath = oEvent.getSource().getBindingContext().sPath;
			var oItem = cloneModel.getData();
			ReqModel.setProperty(sPath, oItem);
			this.router.navTo("Main");

		},
		onSendBack: function (oEvent) {
			var oObject = oEvent;
			controller = this;
			if (!controller.actionConfirmationDialog) {
				controller.actionConfirmationDialog = new sap.m.Dialog({
					title: "Send Back to Requestor",
					type: "Message",
					content: [
						new sap.m.Label({
							text: "Do you want to send back to Requestor?"
						})
					],
					beginButton: new sap.m.Button({
						text: "Confirm",
						press: function () {
							controller.onSaveSubmit(oObject);
							controller.actionConfirmationDialog.close();
							controller.actionConfirmationDialog.destroyContent();
							controller.actionConfirmationDialog = undefined;
						}
					})
				});
				controller.getView().addDependent(controller.actionConfirmationDialog);
			}
			controller.actionConfirmationDialog.open();
		},
		onSubmit: function (oEvent) {
			var oObject = oEvent;
			controller = this;
			if (!controller.actionConfirmationDialog) {
				controller.actionConfirmationDialog = new sap.m.Dialog({
					title: "Submit",
					type: "Message",
					content: [
						new sap.m.Label({
							text: "Do you want to submit this request?"
						})
					],
					beginButton: new sap.m.Button({
						text: "Confirm",
						press: function () {
							controller.onSaveSubmit(oObject);
							controller.actionConfirmationDialog.close();
							controller.actionConfirmationDialog.destroyContent();
							controller.actionConfirmationDialog = undefined;
						}
					})
				});
				controller.getView().addDependent(controller.actionConfirmationDialog);
			}
			controller.actionConfirmationDialog.open();
		},
		onSaveSubmit: function (oEvent) {

			var spath = this.getView().getBindingContext().getPath();
			var oItem = this.getView().getModel("RequestModel").getProperty(spath);
				this.router.navTo("Main");
		

		},
				
		onUnassign: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			if (path) {
				this.getView().getModel().setProperty(path + "/Status", "Un Assigned");
			}
				this.onSaveSubmit();
		},
		/**
		 * Event handler for the reject event
		 * @param {sap.ui.base.Event} oEvent the reject event
		 * @private
		 */
		onReject: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			if (path) {
				this.getView().getModel().setProperty(path + "/Status", "Rejected");
			}
			this.onSaveSubmit();
		},
		/**
		 * Event handler for the reassign event
		 * @param {sap.ui.base.Event} oEvent the onApprove event
		 * @private
		 */
		onApprove: function (oEvent) {
			var RequestModel = this.getView().getModel("RequestModel");
			var path = oEvent.getSource().getBindingContext().getPath();
			// var Id = parseInt(path.split("/")[2]);
			
			if (path) {
				this.getView().getModel().setProperty(path + "/Status", "Approved");
				// RequestModel.getProperty("/FilteredReqType")[Id].Status = "Approved";
				
			}
		  
			RequestModel.updateBindings(true);
			this.onSaveSubmit();
		}
	});
});