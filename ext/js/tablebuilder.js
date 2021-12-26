function rowbuilder(...data) {
    const row = document.createElement('tr');
    for (const datum of data) {
        const cell = document.createElement('td');
        if (datum instanceof HTMLElement) {
            cell.appendChild(datum);
        } else {
            cell.innerHTML = datum;
        }
        row.appendChild(cell);
    }
    return row;
}

function colorpreview(table) {
    for (const row of table.children) {
        for (const cell of row.children) {
            if (cell.innerHTML.match(/^#[0-9a-fA-F]{6}$/) != null) {
                const color = document.createElement('span');
                color.classList.add('colorpreview');
                color.style.backgroundColor = cell.innerHTML;
                cell.prepend(color);
            }
        }
    }
}