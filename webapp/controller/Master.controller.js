sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";
	var controller, oModel;
	return Controller.extend("com.mindset.oth.unitallocrequests.controller.Master", {
		onInit: function () {
			controller = this;
			this.oRouter = this.getOwnerComponent().getRouter();
			oModel = controller.getOwnerComponent().getModel();
			controller.router = sap.ui.core.UIComponent.getRouterFor(this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Master").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function (oEvent) {
             debugger
			var RequestId = oEvent.getParameter("arguments").RequestId;
			var RequestDescription = oEvent.getParameter("arguments").RequestDescription;
			var ReqModel = this.getView().getModel("RequestModel");
			var ReqSelected = oEvent.getParameters().arguments.RequestSelected;
			ReqModel.setProperty("/selectRequestDescription", RequestDescription);
			ReqModel.setProperty("/selectRequestId", RequestId);
			ReqModel.updateBindings(true);

			// var aFilter = [];

			// aFilter.push(new Filter("RequestId", FilterOperator.EQ, RequestId));
			var Requests = this.getView().getModel("RequestModel").getProperty("/Requests");
			var FilteredReq = Requests.filter(function (e) {
				return e.RequestId === RequestId;
			});
			var RequestDescription = FilteredReq[0].RequestDescription;
			ReqModel.setProperty("/selectRequestDescription", RequestDescription);

			var FilteredReqItem = FilteredReq[0].Items.filter(
				function (e) {
					return e.RequestId === RequestId;

				});
			this.getView().getModel("RequestModel").setProperty("/FilteredReq", FilteredReqItem);

		},

		onDelete: function (oEvent) {

			var Index = oEvent.mParameters.id.split("-")[10];
			var itemId = parseInt(Index);
			var ReqModel = this.getView().getModel("RequestModel")
			var arrItems = ReqModel.getProperty("/FilteredReq");
			arrItems.splice(itemId, 1);
			var Requests = this.getView().getModel("RequestModel").getProperty("/Requests");
				var arrItemsupdated = ReqModel.getProperty("/FilteredReq");
				 var RequestId = arrItems[0].RequestId;
				 	var FilteredRequest = Requests.filter(function (e) {
				return e.RequestId === RequestId;
			});
			FilteredRequest[0].Items.splice(itemId,1);
				 
				
			
			// ReqModel.setProperty()

			ReqModel.updateBindings(true);
		},
		onSelectChange: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContextPath();
			var sSelectedItem = this.getView().getModel("RequestModel").getProperty(sPath);
			this.getView().getModel("RequestModel").setProperty("/bindingPath", sPath);
			this.getView().getModel("RequestModel").setProperty("/SelectedItem", sSelectedItem);
			this.oRouter.navTo("Detail", {
				RequestId: sSelectedItem.RequestId,
				ItemId: sSelectedItem.ItemId

			});

		},
		onAddItemDialog: function (oEvent) {
			var oView = this.getView();
			this._Dialog = sap.ui.xmlfragment("com.mindset.oth.unitallocrequests.fragment.NewItemDialog",
				this);
			oView.addDependent(this._Dialog);
			this._Dialog.open();
		},
		onCancel: function (oEvent) {

			this._Dialog.close();
		},
		onItemSelect: function (oEvent) {
			var selectedItem = oEvent.getSource().getValue();
			this.getView().getModel("RequestModel").setProperty("/newCopyItem", selectedItem);

		},

		onAddItem: function (oEvent) {

			var RequestModel = this.getView().getModel("RequestModel");
			var oData = RequestModel.getData();
			var sitemIdSelected = this.getView().getModel("RequestModel").getProperty("/newCopyItem");
			var arrFilteredReq = oData.FilteredReq,
				lastItemId = parseInt(arrFilteredReq[arrFilteredReq.length - 1].ItemId),
				newItemObj = RequestModel.getProperty("/NewItem"),
				aItem = arrFilteredReq.filter(function (e) {
					return e.ItemId === sitemIdSelected;
				});
			var obj = jQuery.extend({}, aItem);
			var oItem = obj[0];
			newItemObj = jQuery.extend({}, oItem);
			var newItemId = lastItemId + 1;
			newItemObj.ItemId = newItemId.toString();
			newItemObj.RequestorItem = newItemId.toString();
			newItemObj.RequestId = oItem.RequestId;

			arrFilteredReq.push(newItemObj);
            var RequestId = oItem.RequestId;
			RequestModel.setProperty("/FilteredReq", arrFilteredReq);
				var Requests = this.getView().getModel("RequestModel").getProperty("/Requests");
			var FilteredRequest = Requests.filter(function (e) {
				return e.RequestId === RequestId;
			});
			FilteredRequest[0].Items.push(newItemObj);
			RequestModel.updateBindings(true);
		
			this._Dialog.close();
		}

	});
});