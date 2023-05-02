var events;
//importando os eventos
function httpRequest(){
    return new Promise(function(resolve, reject){
        var http = new XMLHttpRequest();
        http.open("GET", "events.json");
        http.send();
        http.onload = function() {
            if(http.status === 200){
                let events = JSON.parse(this.responseText);
                resolve(events);
            }else {
                reject(new Error('Erro ao executar requisição do JSON.'));
            };
        }
    });
}
httpRequest().then(function(response){
    
    events = response;

    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    selectYear = 2023;
    selectMonth = document.getElementById("month");

    showCalendar(currentYear, currentMonth);
    fecthEvents(currentMonth);

}).catch(function(error) {
    
    console.error(error);
  
});

//calendario
today = new Date();

months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

monthAndYear = document.getElementById("monthAndYear");

function next(){
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentYear, currentMonth);
    fecthEvents(currentMonth);
}

function previous(){
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentYear, currentMonth);
    fecthEvents(currentMonth);
}

function jump(){
    currentMonth = parseInt(selectMonth.value);
    currentYear = 2023;
    showCalendar(currentYear, currentMonth);
    fecthEvents(currentMonth);
}
function fecthEvents(month){
    eventsDiv = document.getElementById("events");
    eventsDiv.innerHTML = "";

        let output = "";

        for(let item of events[month]){
            output += `
                <p class="event-day">${item.dia} - ${item.evento}</p>
            `;
            document.querySelector(".events").innerHTML = output;
        }
}

function showCalendar(year, month){
    firstday = (new Date(year, month)).getDay();

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
                    cell.classList.add("today");
                }

                for(let item of events[month]){
                    if(date == item.dia){
                        cell.classList.add("today");
                    }
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