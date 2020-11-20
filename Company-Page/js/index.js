
const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-air-quality-measurements&q=&rows=10&start=1&sort=-measurements_parameter&facet=city&facet=location&facet=measurements_unit&facet=measurements_parameter&facet=measurements_lastupdated';

const getData = fetch(url);

getData.then(res => res.json())
  .then(data => data.records)
  .then(records => {
    const table = records.map(record => {
      const fields = (record && record.fields);
      const city = (fields && fields.city);
      const country = (fields && fields.country);
      const measurements_value = (fields && fields.measurements_value);
      const measurements_lastupdated = (fields && fields.measurements_lastupdated);
      let detail = {};
      detail.location = `${city}, ${country}`;
      detail.pm25 = measurements_value;
      detail.lastupdated = measurements_lastupdated;
      return row;
    });
    return table;
  })
  .then(table => {
    const body = document.getElementById('table-body');
    const details = table.map(detail => {
      const location = (detail && detail.location);
      const pm25 = (detail && detail.pm25);
      const lastupdated = (detail && detail.lastupdated);
      return `
        <tr>
          <td>${location}</td>
          <td>${pm25}</td>
          <td>${lastupdated}</td>      
        </tr>
      `;
    });
    table.innerHTML += body && detail.join('');
  })
  .catch();