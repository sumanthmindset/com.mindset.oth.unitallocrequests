sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator,MessageToast) {
	"use strict";
     	var controller;
	return Controller.extend("com.mindset.oth.unitallocrequests.controller.Main", {
		onInit: function () {
				controller = this;
			
				controller = this;
			this.oRouter = this.getOwnerComponent().getRouter();
		   var	oModel = controller.getOwnerComponent().getModel();
			controller.router = sap.ui.core.UIComponent.getRouterFor(this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Status").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			debugger

			var RequestType = oEvent.getParameter("arguments").RequestType;
			var FilteredReqType =[];
			
			var ReqModel = this.getView().getModel("RequestModel");
			// var aFilter = [];

			// aFilter.push(new Filter("RequestId", FilterOperator.EQ, RequestId));
			var Requests = ReqModel.getProperty("/Requests");
			var FilteredReq = Requests.filter(function (e) {
				return e.RequestType === RequestType;
			});
			this.getView().getModel("RequestModel").setProperty("/FilteredReqType", FilteredReq);

		},
			onSearch: function (oEvent) {
			var oTable = this.getView().byId("RequestTableId");
			var oBinding = oTable.getBinding("items");

			var sValue = oEvent.getSource().getValue();
			var oFilter = new Filter({

				filters: [

					new Filter("RequestId", FilterOperator.Contains, sValue),
					new Filter("RequestDescription", FilterOperator.Contains, sValue),
					new Filter("BusinessReason", FilterOperator.Contains, sValue),
					new Filter("Priority", FilterOperator.Contains, sValue),
					new Filter("Status", FilterOperator.Contains, sValue),
					new Filter("DateSubmitted", FilterOperator.Contains, sValue)
				]
			});
			oBinding.filter(oFilter);

		},
			onPress: function (oEvent) {
            debugger
			var ss = oEvent.getSource().getBindingContextPath();
			var oSelectedItem = this.getView().getModel("RequestModel").getObject(ss);
			this.oRouter.navTo("Master", {
				
				RequestId: oSelectedItem.RequestId
				// RequestDescription: oSelectedItem.RequestDescription

			});

		},
			handlePopoverPress: function (oEvent) {
			// if (!this._oPopover) {
			// 	this._oPopover = sap.ui.xmlfragment("com.mindset.oth.unitallocrequests.fragment.Popover", this);
			// 	this.getView().addDependent(this._oPopover);
			// }
			debugger
			var RequestModel = this.getView().getModel("RequestModel");
			
			// this._oPopover.openBy(oEvent.getSource());
			var oTable = this.getView().byId("RequestTableId");
			oTable.getSelectedContexts();
			var idx = oTable.indexOfItem(oTable.getSelectedItem());
			if(idx !== -1){
			var oItems = oTable.getSelectedItems();
			var oSelectedItems = [];
			for(var i=0;i<oItems.length;i++){
					var aSelectedPaths =	oTable.getSelectedContexts()[i].sPath;
				var oSelectedPaths =RequestModel.getProperty(aSelectedPaths);
			     
			      var SelectedRequestId= parseInt(oSelectedPaths.RequestId);
			      
			      oSelectedItems.push(SelectedRequestId);
			     var sSelectedItems =oSelectedItems.toString();
			     this.getView().getModel("RequestModel").setProperty("/selectedRequests",sSelectedItems);
			      MessageToast.show("The Following Requests "+sSelectedItems+ "are Assigned to you");
			     
			}
				 oTable.removeSelections(true) ;
			}else{
				MessageToast.show("please select a Request");
			}

		},
		/**
		 * Event handler for the close  event
		 * @param {sap.ui.base.Event} oEvent the close event
		 * @private
		 */
		onclosePopOver: function (oEvent) {
			this._oPopover.close();
		}

		
	});
});