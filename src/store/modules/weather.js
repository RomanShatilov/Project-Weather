import axios from 'axios';

const api = 'http://api.openweathermap.org/data/2.5/';
const apiKey = '&appid=63a8d214857a03c326b8b3796625a26c';

const getTime = (unix) => {

  let date = new Date(unix * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();

  let time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return time;
};

const setData = (response) => {
  let current = {};
  current.temp = Math.floor(response.data.main.temp - 273.15);
  current.cityName = response.cityName;
  current.pressure = response.data.main.pressure;
  current.humidity = response.data.main.humidity;
  current.wind = response.data.wind.speed;
  current.sunrise = getTime(response.data.sys.sunrise);
  current.sunset = getTime(response.data.sys.sunset);
  current.weather = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
  current.id = response.data.id;
  current.name = response.data.name;

  return current;
};

const getDayName = (dateStr, locale) => {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, {weekday: 'long'});
};


export default {
  actions: {

    getWeather(ctx, data) {
      let current = {};
      let week = [];
      if (!data.location) {

        //Current weather by day
        let url = `${api}weather?q=${data.name}${apiKey}`;
        axios.get(url)
          .then(response => {
            response.cityName = data.name;
            current = setData(response);
            ctx.commit('setWeather', current)
          })
          .catch(error => {
            console.log(error);
          });

        //Daily weather by location
        let urlWeek = `${api}forecast?q=${data.name}${apiKey}`;
        axios.get(urlWeek)
          .then(response => {
            let data = response.data.list;
            data.forEach((day) => {
              let date = new Date(day.dt * 1000);
              let hours = date.getHours();
              if (hours === 12) {
                week.push(day);
                day.name = getDayName(date, "en");
                day.main.temp = Math.floor(day.main.temp - 273.15);
                day.weather = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
              }
            });

            ctx.commit('setDailyWeather', week)

          })
          .catch(error => {
            console.log(error);
          });
      } else {

        data.location.getCurrentPosition(position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          let url = `${api}weather?lat=${lat}&lon=${lng}${apiKey}`;

          //Current weather by location
          axios.get(url)
            .then(response => {

              response.cityName = response.data.name;

              current = setData(response);
              ctx.commit('setWeather', current)
            })
            .catch(error => {
              console.log(error);
            });

          //Daily weather by location
          let urlWeek = `${api}forecast?lat=${lat}&lon=${lng}${apiKey}`;
          axios.get(urlWeek)
            .then(response => {

              let data = response.data.list;
              data.forEach((day) => {
                let date = new Date(day.dt * 1000);
                let hours = date.getHours();
                if (hours === 12) {
                  week.push(day);
                  day.name = getDayName(date, "en");
                  day.main.temp = Math.floor(day.main.temp - 273.15);
                  day.weather = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
                }
              });

              ctx.commit('setDailyWeather', week)

            })
            .catch(error => {
              console.log(error);
            });

        });

      }
    },
    getSavedLocation(ctx){
      let savedLocations = [];

      if(localStorage.location){
        savedLocations = JSON.parse(localStorage.location);
      } else {
        savedLocations = [];
      }
      ctx.commit('setLocation', savedLocations)

    },
    getCurrentSavedLocation(ctx){
      let savedLocations = [];

      if(localStorage.location){
        savedLocations = JSON.parse(localStorage.location);
      } else {
        savedLocations = [];
      }

      ctx.commit('setCurrentLocation', savedLocations)

    },

    createSavedLocation(ctx) {
      let savedLocations = [];

      if(localStorage.location){
        savedLocations = JSON.parse(localStorage.location);
      } else {
        savedLocations = [];
      }

      if(localStorage.location) {
        let arr = JSON.parse(localStorage.location);

        let valid = arr.filter((item) => {
          return item.current.id === ctx.state.saveWeather.current.id;
        });
        if(!valid.length){
          savedLocations.push(ctx.state.saveWeather);
          localStorage.location = JSON.stringify(savedLocations);
          ctx.commit('setLocation', savedLocations)
        }
      } else {
        savedLocations.push(ctx.state.saveWeather);
        localStorage.location = JSON.stringify(savedLocations);
        ctx.commit('setLocation', savedLocations)
      }
    }

  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather
      state.saveWeather.current = weather
    },
    setDailyWeather(state, weather) {
      state.dailyWeather = weather
      state.saveWeather.week = weather
    },
    setLocation(state, weather) {
      state.savedWeather = weather
    },
    setCurrentLocation(state, weather) {
      state.currentSavedWeather = weather
    },
  },
  state: {
    weather: [],
    dailyWeather: [],
    saveWeather: {},
    savedWeather: [],
    currentSavedWeather: {},
  },
  getters: {
    viewWeather(state) {
      return state.weather;
    },
    viewDailyWeather(state) {
      return state.dailyWeather;
    },
    viewSavedWeather(state) {
      return state.savedWeather;
    },
    viewCurrentSavedWeather(state) {
      return state.currentSavedWeather;
    }
  }
}