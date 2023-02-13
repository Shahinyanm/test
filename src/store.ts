import { reactive, watch } from 'vue'
const API_KEY: string = '439d4b804bc8187953eb36d2a8c26a02'

interface globalStateType {
  citiesList: string[],
  weatherList: any,
  isLoading: boolean,
  hasError: boolean
}

export const globalState = reactive<globalStateType>({
  citiesList: [],
  weatherList: [],
  isLoading: true,
  hasError: false
})

export const getUserLocation = async () => {
  await navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        const data = await response.json()
        const userLocation:string = data.address.city.toLowerCase()
        globalState.citiesList.push(userLocation)
        await addWeatherToList(userLocation)
        return data

      } catch (error) {
        return error
      }
    },
    (error) => {
      return error
    }
  )
}

export const getWeather = async (city: string, apiKey: string): Promise<object> => {
  const response = await fetch(`https://openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}`)
  const data = await response.json()
  return data
}

export const addWeatherToList = async (city: string): Promise<void> => {
  globalState.isLoading = true
  const weather: any = await getWeather(city, API_KEY)
  if (weather && weather.list.length) {
    globalState.weatherList.push(weather.list[0])
  } else {
    setError()
  }
  globalState.isLoading = false
  return weather
}

export const removeWeatherFromList = async (city: string) => {
  globalState.weatherList = globalState.weatherList.filter((item) => item.name.toLowerCase() !== city.toLowerCase())
}

export const addCity = (cityName: string) => {
  addWeatherToList(cityName)
  .then(res => {
    if (res && res.list.length) {
      globalState.citiesList.push(cityName)
    }
  })

}

export const removeCity = async (cityName:string): Promise<void> => {
  globalState.citiesList = globalState.citiesList.filter((item:string) => item.toLowerCase() !== cityName.toLowerCase())
  await removeWeatherFromList(cityName)
}

export const updateWeather = async (): Promise<void> => {
  const newWeathersList: object[] = []
  for(let city of globalState.citiesList) {
    const weather: any = await getWeather(city, API_KEY)
    newWeathersList.push(weather.list[0])
  }
  globalState.weatherList = newWeathersList
  globalState.isLoading = false
}

const setError = () => {
  globalState.isLoading = false
  globalState.hasError = true
  setTimeout(() => {
    globalState.hasError = false
  }, 3000)
}

watch(
    () => globalState.citiesList,
    () => {
      localStorage.setItem('citiesList', JSON.stringify(globalState.citiesList))
    },
    { deep: true }
  )
