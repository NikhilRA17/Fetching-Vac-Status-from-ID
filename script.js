const btn = document.getElementById('btn');
const username = document.getElementById('username');
const adharNo = document.getElementById('adharNo');
const vacStatus = document.getElementById('status');
const vacCertificate = document.getElementById('certificate');

btn.addEventListener('click', function () {
  fetch('http://139.59.8.250:8080/getAdharAndNames')
    .then((response) => response.json())
    .then((data) => {
      let arrayOfproduct = data.data;

      arrayOfproduct.forEach(function (ele) {
        console.log(ele.name);
        console.log(ele.adhar);
      });

      let adharID = '';
      for (let i = 0; i < arrayOfproduct.length; i++) {
        if (arrayOfproduct[i].name == username.value) {
          adharID = arrayOfproduct[i].adhar;
        }
      }
      // console.log(adharID);

      fetch('http://139.59.8.250:8080/getCertificate?adharId=' + adharID)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // console.log(data.message);
          // console.log(data.certificate);

          adharNo.textContent = adharID;
          vacStatus.textContent = data.message;
          if (data.certificate == undefined) {
            vacCertificate.textContent = 'No Certificate Issued';
          } else {
            vacCertificate.textContent = data.certificate;
          }

          if (vacStatus.textContent == 'Success') {
            vacStatus.style.background = 'green';
          } else {
            vacStatus.style.background = 'red';
          }

          if (adharID == '') {
            adharNo.textContent = 'Result Not Found';
          }
        });
    });
});
