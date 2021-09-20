let holidays = [];
let newHolidays = [];

async function request(Year, CountryCode) {
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://date.nager.at/api/v2/PublicHolidays/${Year}/${CountryCode}`)
        .then(response => response.json())
        .then(data => {
            holidays = data;
            newHolidays = holidays.map(item => {
                const container = {};
                container.name = item.name;
                container.date = item.date;
                return container;
            })
        })
}


// генерация таблицы
async function createTable() {
    let table = document.createElement('table');

    document.body.appendChild(table);
    table.classList.add("holiday__table");

    for (let i = 0; i < newHolidays.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        tr.innerHTML = newHolidays[i].date;
        td.innerHTML =  newHolidays[i].name;
        tr.appendChild(td);
        table.appendChild(tr);
    }
}

//загрузка данных
document.querySelector('.holiday__button-get')
    .addEventListener('click', async () => {
        let Year = document.querySelector('.holiday__input-year').value;
        let CountryCode = document.querySelector('.holiday__input-country').value;
        if (document.querySelector('.holiday__table')) {
            document.querySelector('.holiday__table').remove();
        }
        await request(Year, CountryCode)
        await createTable(newHolidays.length, 1)
    })

//очистить данные
document.querySelector('.holiday__button-clean')
    .addEventListener('click', async () => {
        document.querySelector('.holiday__input-year').value = "";
        document.querySelector('.holiday__input-country').value = "";
        document.querySelector('.holiday__table').remove();
    })





