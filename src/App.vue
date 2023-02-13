<template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="min-h-screen flex items-center justify-center">
      <div class="relative flex flex-col gap-y-5">
        <template v-for="weather in weatherList" :key="weather.name">
          <widget-card :weather="weather"/>
        </template>
        <div>
          <widget-loader v-if="globalState.isLoading"/>
          <div v-if="globalState.hasError" class="font-black text-red-500 text-2xl w-80 text-center mt-10">
            This city was not found.
          </div>
        </div>
        <div class="absolute top-1 right-1 z-50">
          <Settings />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { getUserLocation, globalState, updateWeather } from '@/store'

import WidgetCard from '@/components/WidgetCard.vue'
import WidgetLoader from '@/components/loaders/WidgetLoader.vue'
import Settings from '@/components/Settings.vue'

export default defineComponent({
  name: 'App',
  components: { Settings, WidgetCard, WidgetLoader },

  setup() {
    onMounted(async () => {
      const storageData = localStorage.getItem('citiesList' )
      if (storageData && JSON.parse(storageData).length) {
        globalState.citiesList = JSON.parse(storageData)
      } else {
        await getUserLocation()
      }
      await updateWeather()
    })

    const weatherList = computed(() => {
      return globalState.weatherList
    })

    return {
      weatherList, globalState
    }
  }
})
</script>
