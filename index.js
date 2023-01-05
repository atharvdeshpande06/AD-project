/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

     function getRollNumdAsJsonObj(){
        var rollnum = $("#rollnum").val();
                var jsonStr = {
                Roll-No:rollnum
                }
        return JSON.stringify(jsonStr);
        }
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.Full - Name);
    $("#class").val(record.Class)
    $("#DOB").val(record.Birth - Date);
    $("#addrs").val(record.Address);
    $("#Enrolldate").val(record.Enrollment - Date);
     }
function getEmp() {
    var rollNumJsonObj = getRollNumAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90938207|-31949272868879549|90954833", "Student", "Std-Rel", rollNumJsonObj)
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: True});
    $("#empId").focus();
    if (resultObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
        }
    if (resultObj.status === 200){
        $("#rollnum").prop("disabled", true);
        FillData(resultObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
       }
}
function validateAndGetFormData() {
var rollnumVar = $("#rollnum").val();
        if (rollnumVar === "") {
alert("Roll Number is Required Value");
        $("#rollnum").focus();
        return "";
        }
var NameVar = $("#name").val();
        if (NameVar === "") {
alert("Student Name is Required Value");
        $("#name").focus();
        return "";
        }
var ClassVar = $("#class").val();
        if (ClassVar === "") {
alert("Class standard is Required Value");
        $("#class").focus();
        return "";
        }
var DOBVar = $("#DOB").val();
        if (DOBVar === "") {
alert("Date of birth is Required Value");
        $("#DOB").focus();
        return "";
        }
var addrsvar = $("#addrs").val();
        if (addrsvar === "") {
alert("Address is Required field");
        $("#addrs").focus();
        return "";
        }
var Enrolldatevar = $("#Enrolldate").val();
        if (Enrolldatevar === "") {
alert("Enrollment Date is Required field");
        $("#Enrolldate").focus();
        return "";
        }
var jsonStrObj = {
Roll - No: rollnumVar,
        Full - Name: NameVar,
        Class : ClassVar,
        Birth - Date: DOBVar,
        Address : addrsvar,
        Enrollment - Date : Enrolldatevar
        };
        return JSON.stringify(jsonStrObj);
        }
function resetForm() {
$("#empnum").val("")
        $("#name").val("");
        $("#class").val("");
        $("#DOB").val("");
        $("#Addrs").val("")
        $("#Enrolldate").val("");
        $("#empId").prop("disabled", false)
        $("#save").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#change").prop("disabled", true);
        $("#empId").focus();
        }
function changeData(){
var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
return;
        }
var updReqStr = createUPDATERecordRequest("90938207|-31949272868879549|90954833", jsonStr, "Student", "Std-Rel", localStorage.getItem("recno"));
        alert(updReqStr);
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(updReqStr, "http://api.login2explore.com:5577", "/api/iml");
        jQuery.ajaxSetup({async: true});
        console.log(resultObj);
        resetForm();
        $("#rollnum").focus();
        }
function saveEmployee() {
        var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
               return;
        }
        var putReqStr = createPUTRequest("90938207|-31949272868879549|90954833", jsonStr, "Student", "Std-Rel");
        alert(putReqStr);
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
        alert(JSON.stringify(resultObj));
        jQuery.ajaxSetup({async: true});
        resetForm();
        $("#empId").focus();
        }

