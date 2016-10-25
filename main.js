var rows, columns, repeater, tbdy;

function tableCreate () {
    var body = document.body;
    var tbl = document.createElement('table');
    tbl.style.border = '1px solid black';
    tbl.style.marginTop = '20px';
    tbl.style.textAlign = 'center';

    for (let i = 0; i < rows; i++) {
        var tr = tbl.insertRow();
        for (let j = 0; j < columns; j++) {
            var td = tr.insertCell(0);
            td.appendChild(document.createTextNode('_'));
            td.style.border = '1px solid black';
            td.style.width = '16px';
        }
    }
    body.appendChild(tbl);
    tableFill();
}

function tableClear () {
    var tables = document.getElementsByTagName("table");
    for (let i = tables.length - 1; i >= 0; i--) {
        if (tables[i]) {
            tables[i].parentNode.removeChild(tables[i]);
        }
    }
}

function tableFill () {
    tbdy = document.getElementsByTagName('tbody')[0];
    var filledCellCount = 0;
    for (let i = 0; i < repeater; i++) {
        filledCellCount++;
        var randomCell = tbdy.childNodes[randomInt(0, (rows - 1))].childNodes[randomInt(0, (columns - 1))];
        if (randomCell.innerHTML !== '5') {
            randomCell.innerHTML = '5';
            randomCell.id = filledCellCount;
            randomCell.style.backgroundColor = 'red';
        } else {
            i--;
            filledCellCount--;
        }
    }
    tableFillNeighbours();
}

function tableFillNeighbours () {
    for (let i = 1; i <= repeater; i++) {
        var thisCell = document.getElementById(i.toString());
        for (let j = thisCell.parentNode.rowIndex - 1; j <= thisCell.parentNode.rowIndex + 1; j++) {
            for (let k = thisCell.cellIndex - 1; k <= thisCell.cellIndex + 1; k++) {
                try {
                    var neighbourCell = tbdy.childNodes[j].childNodes[k];
                } catch (e) {
                    continue;
                }
                neighbourCell = tbdy.childNodes[j].childNodes[k];
                if (neighbourCell && neighbourCell.innerHTML !== '5') {
                    neighbourCell.innerHTML = '4';
                    neighbourCell.style.backgroundColor = 'yellow';
                } else continue;
            }
        }
    }
}

function randomInt (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

var btn = document.getElementById("btn");
btn.addEventListener("click", function (){

    tableClear();

    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
    repeater = document.getElementById("repeater").value;

    //document.form.reset();
    tableCreate();
}, false);