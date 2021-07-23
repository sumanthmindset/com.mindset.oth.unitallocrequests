sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("com.mindset.oth.unitallocrequests.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.mindset.oth.unitallocrequests",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
