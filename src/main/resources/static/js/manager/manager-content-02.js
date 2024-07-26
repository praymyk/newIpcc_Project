window.onload = function () {
    var downloadExcelBtn = document.getElementById('download_excel');

    downloadExcelBtn.addEventListener("click", function () {
        console.log("주소 : " + downloadExcelBtn.getAttribute('data-url'));

        location.href = downloadExcelBtn.getAttribute('data-url');
    });
}