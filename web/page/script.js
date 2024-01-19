async function fetchAPI() {
	$('.LoadingBox').show();
	$('.UnavailableData').hide();
	$('.TextBox').hide();

	const url = `http://127.0.0.1:4000`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();

		setTable(data);

		$('.LoadingBox').hide();
		$('.TextBox').show();
	} catch (error) {
		console.error('Error fetching data:', error);
		$('.LoadingBox').hide();
		$('.UnavailableData').show();
		hideInfo();
	}
}

function setTable(data) {
	const dataList = [
		['Manufacturer', 'systemInfo.manufacturer'],
		['Model', 'systemInfo.version'],
		['Serial Number', 'systemInfo.serial'],
		['Temperature', 'cpuTemperatureInfo.main'],
		['CPU Manufacturer', 'cpuInfo.manufacturer'],
		['Brand', 'cpuInfo.brand'],
		['Cores', 'cpuInfo.cores'],
		['Total', 'memInfo.total'],
	];

	const table = document.createElement('table');
	table.classList.add('table', 'table-bordered');

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	tr.innerHTML = '<tr><th>Name</th><th>Value</th></tr>';
	thead.appendChild(tr);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');

	function addRow(name, key) {
		const keys = key.split('.');
		const value = data[keys[0]][keys[1]];
		const row = tbody.insertRow();
		const cell1 = row.insertCell(0);
		const cell2 = row.insertCell(1);
		cell1.innerHTML = name;
		cell2.innerHTML = value;
	}
	for (const element of dataList) {
		addRow(element[0], element[1]);
	}

	table.appendChild(tbody);

	let section = document.getElementById('Section');

	console.log(section);

	section.appendChild(table);
}

fetchAPI();
