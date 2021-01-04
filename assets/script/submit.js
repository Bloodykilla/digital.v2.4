 "use strict"

 document.addEventListener('DOMContentLoaded', function () {
     const form = document.getElementById('form');
     form.addEventListener('submit', formSend);


     async function formSend(e) {
         e.preventDefault();

         let error = formValidate(form);

         let formData = new formData(form);

         if (error===0) {
             form.classList.add('_sending');
             let response = await fetch('sendmail.php', {
                 method:'POST',
                 body:formData
             });
             if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
             }else {
                alert ('Error');
                form.classList.remove('_sending');
             }
         }else {
                alert('Please,fill the fields)') 
             }
     }

     function formValidate(form) {
         let error = 0;
         let formReq =  documetn.querySelectorAll('._req');

         for (let index = 0; index < formReq.length;index++) {
             const input = array [index];
             formRemoveError(input);

             if(input.classList.contains('_email')) {
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
             }else if (input.getAttribute ("type") === "checkbox" && input.checked === false) {
                 formAddError(input);
                 error++;
             }else {
                 if (input.value === ' ') {
                     formAddError(input);
                     error++;
                 }
             }
         }
     }

     function formAddError (input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
     }
     function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classlist.remove('error');
     }

     function emailTest(input) {
         return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
     }
 });