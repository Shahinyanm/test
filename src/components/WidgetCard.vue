<template>
  <div class="rounded shadow-xl w-80 overflow-hidden">
        <div class="header px-5 pt-2 bg-indigo-200 flex justify-between items-center">
          <div>
            <p class="font-bold text-lg text-slate-800 capitalize">
              {{ weather.name }}, {{ weather.sys.country }}
            </p>
            <p class="text-slate-500">
              {{ weather.weather[0].description }}
            </p>
          </div>
          <div class="w-20 h-20" v-if="weather">
            <component :is="`i${weather.weather[0].icon}`"/>
          </div>
        </div>
        <div class="content p-3 flex justify-between items-center">
          <div class="text-5xl font-black font-sans w-1/2">
            {{ convertKelvinToCelsius(weather.main.temp) }} &#8451;
          </div>
          <ul class="w-1/2 flex flex-col gap-1">
            <li class="border-b border-fuchsia-400 font-semibold text-lg">Details</li>
            <li class="font-base text-sm">
              <span class="inline-block w-1/2">Feels like</span>
              <span class="font-bold">{{ convertKelvinToCelsius(weather.main.feels_like) }} &#8451;</span>
            </li>
            <li class="font-base text-sm">
              <span class="inline-block w-1/2">Wind</span>
              <span class="font-bold">{{ weather.wind.speed }}  m/s</span>
            </li>
            <li class="font-base text-sm">
              <span class="inline-block w-1/2">Humidity</span>
              <span class="font-bold">{{ weather.main.humidity }} &#8453;</span>
            </li>
            <li class="font-base text-sm">
              <span class="inline-block w-1/2">Pressure</span>
              <span class="font-bold">{{ weather.main.pressure }} HPA</span>
            </li>
          </ul>
        </div>
        <div class="footer bg-indigo-200 px-3 py-1 flex justify-end items-center">
            {{ currentDate }}
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { i01d, i01n, i02d, i02n, i03d, i03n, i04d, i04n, i09d, i09n, i10d, i10n, i11d, i11n, i13d, i13n, i50d, i50n, } from '@/assets/icons'

export default defineComponent({
  name: 'WidgetCard',
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  components: {
    i01d, i01n, i02d, i02n, i03d, i03n, i04d, i04n, i09d, i09n, i10d, i10n, i11d, i11n, i13d, i13n, i50d, i50n,
  },

  setup() {
    let currentDate: any = ref('')
    const getDate = (): void => {
      const date: any = new Date();
      currentDate.value = date.getDate() + "."
        + (date.getMonth()+1)  + "."
        + date.getFullYear() + "  "
        + date.getHours() + ":"
        + date.getMinutes()
    }

    const interval = setInterval(() => {
      getDate()
    }, 60000)

    onMounted(() => {
      getDate()
    })

    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    const convertKelvinToCelsius = (temp: number) => {
      return Math.round(temp - 273.15)
    }

    return {
      currentDate,
      convertKelvinToCelsius,
    }
  }
})
</script>
