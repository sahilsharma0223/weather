import React, {Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import cities from './components/Mcities.js';
import AutoSearch from './components/autosearch.js';
const API_key = "01be7ae461279c38ae07d0a82769040b";

console.log(cities);


class App extends Component{
constructor(){
  super();
  this.state={
    bkValue:"",
    city:"New Delhi",
    country:"India",
    main: "N/A",
    pressure:"N/A",
    humidity: "N/A",
    wind: "N/A",
    visibility: "N/A",
    weather:"Weather",
    date: new Date().getDate(),
    month:new Date().getMonth(),
    year: new Date().getFullYear(),
    monthWord:["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],
    time:new Date().getHours(),
    clickMain:false,  
  };
  this.boxEmpty = React.createRef();

 this.getweather();
}



getweather = async(e) => {
  
   
  var city;
  if(e){
    e.preventDefault();
  
    
     city = e.target.elements.city.value;
     if(city===""){
       city = this.state.city;
   
     }
  }
   else{
     
     city = "New Delhi";
   
   }
   
    
  const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`);
  const response = await api_call.json();
  if(response.cod>=400){
    city="";
    this.getweather();
  }
  console.log(api_call);
  console.log(response);
 
  var times= this.state.time + Math.floor(((84-response.coord.lon)*4)/60);
  times=24-times;
  if(times===24){
    times=0;
  }
  else if(times>24){
    times=times-24;
  }

  if ((times >= 0 && times <= 5) || (times >= 19 && times <= 24)) {

    this.setState({
      city: response.name,
      country: response.sys.country,
      main: Math.floor(response.main.temp),
      pressure: response.main.pressure,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      visibility: response.visibility,
      weather: response.weather[0].main,
      bkValue:"2",
      click: !this.state.click,
      clickMain:!this.state.clickMain,
      textEmpty:true,
    })
  }
  else if (times > 5 && times <= 16) {
    this.setState({
      city: response.name,
      country: response.sys.country,
      main: Math.floor(response.main.temp),
      pressure: response.main.pressure,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      visibility: response.visibility,
      weather: response.weather[0].main,
      bkValue:"1",
      click: !this.state.click,
      clickMain: !this.state.clickMain,
      textEmpty: true,
    })
  }
  else {
    this.setState({
      city: response.name,
      country: response.sys.country,
      main: Math.floor(response.main.temp),
      pressure: response.main.pressure,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      visibility: response.visibility,
      weather: response.weather[0].main,
      bkValue:"3",
      click: !this.state.click,
      clickMain: !this.state.clickMain,
    })
  }

this.boxEmpty.current.boxEmpty();
  
}

clickmain = () =>{
 
  setTimeout(function(){
  
    this.setState({
      clickMain:!this.state.clickMain,
    })
  }.bind(this), 50)
}


  render(){
    const bktype = this.state.weather + this.state.bkValue;

    const snow = "Snow" + this.state.bkValue;
    return (
   
              <div className={this.state.clickMain?"app":"maindiv"}>
               {console.log(this.state.clickMain)}
        {console.log(this.state.clickMain ? "app" : "maindiv")
               }
                {console.log("sahil")}
                <div className={`main ${this.state.main<0?snow:bktype}`}>
                  <div className="search-box">
                    <form onSubmit={this.getweather} className="search-bar">
                      <div className="greet">
                        <AutoSearch items={cities} ref={this.boxEmpty}></AutoSearch>
                      {/* <LocationSearchInput></LocationSearchInput> */}
                      {/* <input title="Change location" type="search" name="city" className="search" placeholder="Enter City..." /> */}
                {console.log(this.state.suggestions)
                      }
                      <button title="Search" type="submit" className="submit" onClick={this.clickmain}><i className="fa fa-search fa-2x"></i></button>
                      </div>
                    </form>
                  </div>
                  <div className="location">
                    <span className="location-text">{this.state.city}, {this.state.country}</span>
                  </div>
                  <div className="date">
                    <span className="day">{this.state.date}</span>
                    <span className="month">{this.state.monthWord[this.state.month]}</span>
                    <span className="year"> {this.state.year}</span>
                  </div>
                  <div className="temperature">
                    <span className="temp-inner">
                      {this.state.main}<span>&#8451;</span>
                    </span>
                  </div>
                  <div className="weather">
                    {this.state.weather}
                  </div>
                  <div className="container">
                    <div className="addData">
                      <div className="details">Details</div>
                      <div className="row1">
                        <div className="pressure">
                          <div className="dataText">Pressure</div>
                          <div className="dataValue">{this.state.pressure} hPa</div>
                        </div>
                        <div className="humidity">
                          <div className="dataText">Humidity</div>
                          <div className="dataValue">{this.state.humidity}</div>
                        </div>
                      </div>
                      <div className="row2">
                        <div className="wind">
                          <div className="dataText">wind Speed</div>
                          <div className="dataValue">{this.state.wind} km/h</div>
                        </div>
                        <div className="visibility">
                          <div className="dataText">Visibility</div>
                          <div className="dataValue">{this.state.visibility}</div>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
    );
  }
      
}

export default App;
