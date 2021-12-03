// $(document).ready(function(){
//     $('.search_box select').selectpicker();  
// });


// -------------------------- SERVER SIDE SCRIPTING ------------------------

function passValues(){
	var today = new Date();

	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	var minutes = today.getMinutes();
	var hours = today.getHours();
	var sec = today.getSeconds();

	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	var address = document.getElementById('address').value;
	var email = document.getElementById('email').value;
	var invoice_date = dd +'/'+ mm  +'/'+ yyyy +' '+ hours +':'+ minutes +':'+ sec;

	var due_date1 = document.getElementById('due_date').value;
	var due_date = due_date1.slice(8,) +'/'+ due_date1.slice(5,7) +'/'+ due_date1.slice(0, 4);

	localStorage.setItem('firstname', firstname);   
	localStorage.setItem('lastname', lastname);   
	localStorage.setItem('address', address);
	localStorage.setItem('email', email);
	localStorage.setItem('invoice_date', invoice_date);

	localStorage.setItem('due_date', due_date);

}	
// --------------------------------------------------------------------------

function changeTable(){
	var x = document.getElementById('droppy');
	
	initializeTable(x.value);
}


function initializeTable(dataset){

	if(d3.select('table') && d3.select('#MyInput')){
		d3.selectAll('table').remove();
		d3.select('#MyInput').remove();
		var input_search_engine = d3.select('body').append('input')
									.attr('id', 'MyInput');
	}
	
	d3.csv(`../Datasets/${dataset}.csv`)
		.then(function(co2){
			var data = co2;

			tabulate(data, data.columns);

			var tr = document.getElementsByTagName('tr');

			for(var i = 1; i < data.length + 1; i++){
				tr[i].childNodes[0].setAttribute('class', 'SearchTarget');
				tr[i].childNodes[1].setAttribute('class', 'OtherColumns');
			}
			
			$('#MyInput').attr('placeholder', `Search ${capitalizeFirstLetter(data.columns[0])}..`);

			var user_input = document.querySelector('#MyInput');

			user_input.addEventListener('keyup', function(filter_rows){
				search_rows = filter_rows.target.value.toLowerCase();
				
				var actual_rows = document.querySelectorAll('.myTable tbody tr .SearchTarget');

				actual_rows.forEach(function(item){
					if(item.textContent.toLowerCase().indexOf(search_rows) != -1){
						item.closest('tr').style.display = '';
					}
					else{
						item.closest('tr').style.display = 'none';
					}
				});

			});

	});

}

function tabulate(data, columns) {
	var table = d3.select('body').append('table')
					.attr('class', 'myTable')
					.style('table-layout', 'fixed')
					.style('width', 'auto');
					
	var thead = table.append('thead');
	var	tbody = table.append('tbody');

	// append the header row
	thead.append('tr')
	.selectAll('th')
	.data(columns).enter()
	.append('th')
		.text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	.data(data)
	.enter()
	.append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	.data(function (row) {
		return columns.map(function (column) {
		return { value: row[column]};  //, value: row[column]
		});
	})
	.enter()
	.append('td')
		.text(function (d) { return d.value; });

	return table;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
  }
