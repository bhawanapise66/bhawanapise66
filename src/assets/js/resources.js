function SuccessAlert(message) {
    $('#newSuccessModal').modal('show');
    try {
        document.getElementById('successmessagediv').innerText = message
    }
    catch (e) {
        alert(e)
    }
}

function errorAlert(message) {
    $('#newErrorModal').modal('show');
    try {
        document.getElementById('errormessagediv').innerText = message
    }
    catch (e) {
        alert(e)
    }
}