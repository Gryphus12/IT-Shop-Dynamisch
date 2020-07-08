const helper = require("../helper.js");
const FormularDao = require("../dao/formularDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/formular/gib/:id", function(request, response) {
    helper.log("Service Formular: Client requested one record, id=" + request.params.id);

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var result = formularDao.loadById(request.params.id);
        helper.log("Service Formular: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Formular: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/formular/alle", function(request, response) {
    helper.log("Service Formular: Client requested all records");

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var result = formularDao.loadAll();
        helper.log("Service Formular: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Formular: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/formular/existiert/:id", function(request, response) {
    helper.log("Service Formular: Client requested check, if record exists, id=" + request.params.id);

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var result = formularDao.exists(request.params.id);
        helper.log("Service Formular: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Formular: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/formular", function(request, response) {
    helper.log("Service Formular: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("name fehlt");
    if (helper.isUndefined(request.body.email)) 
        request.body.email = "";
    if (helper.isUndefined(request.body.nachricht)) 
        errorMsgs.push("nachricht fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Formular: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var result = formularDao.create(request.body.name, request.body.email, request.body.nachricht);
        helper.log("Service Formular: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Formular: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/formular", function(request, response) {
    helper.log("Service Formular: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("name fehlt");
    if (helper.isUndefined(request.body.email)) 
        request.body.email = "";
    if (helper.isUndefined(request.body.nachricht)) 
        errorMsgs.push("nachricht fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Formular: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var result = formularDao.update(request.body.id, request.body.name, request.body.email, request.body.nachricht);
        helper.log("Service Formular: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Formular: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/formular/:id", function(request, response) {
    helper.log("Service Formular: Client requested deletion of record, id=" + request.params.id);

    const formularDao = new FormularDao(request.app.locals.dbConnection);
    try {
        var obj = formularDao.loadById(request.params.id);
        formularDao.delete(request.params.id);
        helper.log("Service Formular: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Formular: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;