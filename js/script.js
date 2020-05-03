/*----- constants -----*/

/*----- app's state (variables) -----*/
let cityData, userInput, tempF;

/*----- cached element references -----*/
const $city = $('#city');
const $temp = $('#temp');
const $wind = $('#wind');
const $humidity = $('#humidity');
const $forecast = $('#forecast');
const $input = $('input[type="text"]');
const $again = $('#again');


/*----- event listeners -----*/
$('form').on('submit', handleGetData);

/*----- functions -----*/
function handleGetData(event) {
    event.preventDefault();

    if($input.val() === "") return;
    userInput = $input.val();

    $input.val("");

    $.ajax({
        url:'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=878f1912f9c90477cc9bedf427fe3f6c'
    }).then(function(data) {
            cityData = data;
            tempF = conversion(data.main.temp);
            render();
        }, function(error) {
            console.log('bad request: ', error);
        }
    );

    clickAgain();
}

function render() {
    $city.html(cityData.name + ', ' + cityData.sys.country);
    $forecast.html(cityData.weather[0].main);
    $temp.html(tempF);
    $wind.html(cityData.wind.speed + " MPH");
    $humidity.html(cityData.main.humidity + "%");
}

//Converting the kelvin data to fahrenheit
function conversion(kelvin) {
    return Math.floor(kelvin * (9/5) - 459.67) + "°F";
}

function clickAgain() {
    $again.html('Search another city!');
}





// formula for user input and their city selection'api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=878f1912f9c90477cc9bedf427fe3f6c'
