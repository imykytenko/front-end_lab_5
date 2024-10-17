const regexPatterns = {
    name: /^[А-Яа-яІіЇїЄєҐґ]+\s[А-Яа-яІіЇїЄєҐґ]\.[А-Яа-яІіЇїЄєҐґ]\.$/,
    tel: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    idCard: /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/,
    faculty: /^[А-Яа-яІіЇїЄєҐґ\s]+$/
};

const today = new Date().toISOString().split('T')[0];
document.getElementById('birthday').setAttribute('max', today);
const birthdayInput = document.getElementById('birthday');

birthdayInput.addEventListener('keydown', function(event) {
    event.preventDefault();
});


function validateField(field, regex) {
    field.classList.remove('error', 'valid');
    if (regex ? regex.test(field.value) : field.value) {
        field.classList.add('valid');
        return true;
    } else {
        field.classList.add('error');
        return false;
    }
}

function addInputEventListeners() {
    document.getElementById('name').addEventListener('input', function() {
        validateField(this, regexPatterns.name);
    });

    document.getElementById('tel').addEventListener('input', function() {
        validateField(this, regexPatterns.tel);
    });

    document.getElementById('idCard').addEventListener('input', function() {
        validateField(this, regexPatterns.idCard);
    });

    document.getElementById('faculty').addEventListener('input', function() {
        validateField(this, regexPatterns.faculty);
    });

    document.getElementById('birthday').addEventListener('input', function() {
        validateField(this);
    });
}

addInputEventListeners();

function validateForm() {
    const nameValid = validateField(document.getElementById('name'), regexPatterns.name);
    const telValid = validateField(document.getElementById('tel'), regexPatterns.tel);
    const idCardValid = validateField(document.getElementById('idCard'), regexPatterns.idCard);
    const facultyValid = validateField(document.getElementById('faculty'), regexPatterns.faculty);
    const birthdayValid = validateField(document.getElementById('birthday'));

    return nameValid && telValid && idCardValid && facultyValid && birthdayValid;
}
function registerUser() {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const tel = document.getElementById('tel').value;
        const idCard = document.getElementById('idCard').value;
        const faculty = document.getElementById('faculty').value;
        const birthday = document.getElementById('birthday').value;

        showDataInNewWindow(name, tel, idCard, faculty, birthday);
        clearForm();
    } else {
        alert("Є помилки у введених даних. Перевірте ще раз.");
    }
}

function showDataInNewWindow(name, tel, idCard, faculty, birthday) {
    const newWindow = window.open("", "User Data", "width=400,height=400");
    newWindow.document.write("<h2>Введені дані</h2>");
    newWindow.document.write(`<p>ПІБ: ${name}</p>`);
    newWindow.document.write(`<p>Номер телефону: ${tel}</p>`);
    newWindow.document.write(`<p>ID Card: ${idCard}</p>`);
    newWindow.document.write(`<p>Факультет: ${faculty}</p>`);
    newWindow.document.write(`<p>Дата народження: ${birthday}</p>`);
}


function clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('valid', 'error');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('myTable');
    const colorPicker = document.getElementById('color');
    generateTable(6, table);

    table.addEventListener('mouseenter', handleMouseEnter, true);
    table.addEventListener('click', handleClick, true);
    table.addEventListener('dblclick', handleDblClick, true);
});

function generateTable(size, table) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            const cellNumber = i * size + j + 1;
            cell.textContent = cellNumber;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function handleMouseEnter(event) {
    const cell = event.target;
    if (cell.tagName === 'TD' && cell.textContent == 3) {
        cell.style.backgroundColor = getRandomColor();
    }
}

function handleClick(event) {
    const cell = event.target;
    const colorPicker = document.getElementById('color');
    if (cell.tagName === 'TD' && cell.textContent == 3) {
        cell.style.backgroundColor = colorPicker.value;
    }
}

function handleDblClick(event) {
    const cell = event.target;
    const colorPicker = document.getElementById('color');
    if (cell.tagName === 'TD' && cell.textContent == 3) {
        changeDiagonalColor(colorPicker.value);
    }
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeDiagonalColor(color) {
    const table = document.getElementById('myTable');
    const diagonalCells = [0, 7, 14, 21, 28, 35];
    diagonalCells.forEach(num => {
        const diagonalCell = table.rows[Math.floor(num / 6)].cells[num % 6];
        diagonalCell.style.backgroundColor = color;
    });
}