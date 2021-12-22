//unit is fahrenheit by default
let unit = "fahrenheit";

//get elements from DOM
const weatherDisplay = document.querySelector(".weather");
const button = document.querySelector("button");
const cityInput = document.querySelector("#cityInput");
const cel = document.querySelector('#celsius');
const fahr = document.querySelector('#fahr');
//set text on fahr to bold
fahr.classList.add("active");

//Create elements
const title = document.createElement("h2");
const tempLabel = document.createElement("h2");
const flex = document.createElement("div");
const img = document.createElement("img");
const descLabel = document.createElement("div");
const humidityLabel = document.createElement("div");
const windLabel = document.createElement("div");

//object that contains all the methods and variables
let weather = {
    //API Key
    'apiKey' : 'ce944073ac99031c6cb91ba28be4f945',
    //function to fetch data
    getWeather : async function(city) {
        try{
            const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
            let data = res.data;
            this.displayWeather(data);
        }
        catch(e){
            this.clearLabels();
            console.log(e);
            title.innerHTML = "Error getting weather, please try again!";
            tempLabel.innerHTML = "";
            weatherDisplay.appendChild(title);
        }
    },
    //function that displays data
    displayWeather : function(data){
        //get data into variables
        const city = data.name;
        const country = data.sys.country;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const wind = data.wind.speed;
        const temp = data.main.temp;
        const humidity = data.main.humidity;

        //change backround image to a image of the searched place(replace " " by "-")
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?" + city.replace(/ /g, "-") + ")";
       
        //clear labels
        this.clearLabels();

        //set title with city and country and append it to container
        title.innerHTML = `Weather in ${city}, ${country}:`;
        weatherDisplay.appendChild(title);

        //set correct temperature unit and append it to container
        if(unit == "fahrenheit"){
            let tempF = 9/5 * (temp-273) + 32;
            tempLabel.innerHTML = `${tempF.toFixed(1)}ºF`;
        }
        else{
            let tempC = temp - 273.15;
            tempLabel.innerHTML = `${tempC.toFixed(1)}ºC`;
        }  
        weatherDisplay.appendChild(tempLabel);

        //add new class to container and append it to main container
        flex.classList.add("flex");
        weatherDisplay.appendChild(flex);

        //get correct weather icon and append it to flex container
        img.src = `https://openweathermap.org/img/wn/${icon}.png`;
        img.classList.add("icon");
        flex.appendChild(img);

        //add class to container, set it's inner text and append it to flex container
        descLabel.classList.add("description");
        descLabel.innerText = desc;
        flex.appendChild(descLabel);

        //set label and append it to main container
        humidityLabel.innerText = `Humidity: ${humidity}%`;
        weatherDisplay.appendChild(humidityLabel);

        //set label and append it to main container
        windLabel.innerText = `Wind speed: ${wind} m/s`;
        weatherDisplay.appendChild(windLabel);

        //reset input box
        cityInput.value = "";

        //listen for changes in unit
        cel.addEventListener('click', () => {
            unit = "celsius";
            let tempC = temp - 273.15;
            tempLabel.innerHTML = `${tempC.toFixed(1)}ºC`;
        });      
        fahr.addEventListener('click', () => {
            unit = "fahrenheit";
            let tempF = 9/5 * (temp-273) + 32;
            tempLabel.innerHTML = `${tempF.toFixed(1)}ºF`;
        });
    },
    //function that clears labels
    clearLabels: function(){
        title.innerText= "";
        tempLabel.innerText="";
        img.src = "";
        descLabel.innerText = "";
        humidityLabel.innerText = "";
        windLabel.innerText = "";
    }
};

//Event Listeners(click on button or enter key and Celsius/Fahrenheit toggler)
button.addEventListener('click', function(){
    weather.getWeather(cityInput.value);
});

cityInput.addEventListener('keyup', function(e){
    if(e.key == "Enter"){
        weather.getWeather(cityInput.value);
    }
});

cel.addEventListener('click', () => {
    unit = "celsius";
    cel.classList.add("active");
    fahr.classList.remove("active");
});

fahr.addEventListener('click', () => {
    unit = "fahrenheit";
    fahr.classList.add("active");
    cel.classList.remove("active");
});
