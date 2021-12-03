 $('#printInvoice').click(function(){
            Popup($('.invoice')[0].outerHTML);
            function Popup(data) 
            {
                window.print();
                return true;
            }
        });

window.addEventListener('load', function(){
    var firstname = localStorage.getItem('firstname');
    var lastname = localStorage.getItem('lastname');
    var email = localStorage.getItem('Email');
    var address = localStorage.getItem('address');

    var invoice_date = localStorage.getItem('invoice_date');
    var due_date = localStorage.getItem('due_date');

    console.log(firstname);

    document.querySelector('h2.to').innerHTML = firstname +' '+ lastname;
    document.querySelector('.email #a_email').innerHTML = email;
    document.querySelector('.address').innerHTML = address;
    document.querySelector('.invoice_date').innerHTML = 'Date of Invoice: ' + invoice_date;

    document.querySelector('.due_date').innerHTML = 'Due Date: ' + due_date;

});

function generatePDF(){
    document.getElementById('download').addEventListener("click", function(){
        var invoice = document.getElementsByClassName('invoice');

        html2pdf().from(invoice).save();

    });

}