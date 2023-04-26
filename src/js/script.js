today = new Date();

currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

monthAndYear = document.getElementById("monthAndYear");

showCalendar(currentYear, currentMonth);

function jump(){
    currentMonth = parseInt(selectMonth.value);
    currentYear = parseInt(selectYear.value);
    showCalendar(currentYear, currentMonth);
}

function showCalendar(year, month){
    firstday = (new Date(year, month));

    table = document.getElementById("calendar-body");

    table.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;

    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;

    for (let i = 0; i < 6; i++){

        let row = document.createElement("tr");
        
        for (let j = 0; j < 7; j++){

            if(i === 0 && j < firstday){
                cell = document.createElement("td");
                celltext = document.createTextNode("");
                cell.appendChild(celltext);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)){
                break;
            }
            else{
                cell = document.createElement("td");
                celltext = document.createTextNode(date);
                if(date === today.getDate() && year === today.getFullYear() && month === today.getMonth()){
                    cell.classList.add("bg-info");
                }
                cell.appendChild(celltext);
                row.appendChild(cell);
                date++;
            }

        }

        table.appendChild(row);
    }
}

function daysInMonth(iMonth, iYear){

    return 32 - new Date(iYear, iMonth, 32).getDate();

}