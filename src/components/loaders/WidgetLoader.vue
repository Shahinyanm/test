<template>
  <div class="rounded shadow-xl w-80 overflow-hidden">
    <div class="header px-5 pt-2 bg-indigo-200 flex justify-between items-center">
      <div class="flex flex-col gap-2">
        <p class="animate-pulse bg-slate-200 rounded-lg w-20 h-5" />
        <p class="animate-pulse bg-slate-200 rounded-lg w-32 h-5" />
      </div>
      <div class="w-16 h-16 animate-pulse bg-slate-200 rounded-full m-2" />
    </div>
    <div class="content px-3 pt-2.5 pb-2 flex justify-between items-center">
      <div class="text-5xl font-black font-sans w-1/2">
        <div class="animate-pulse bg-slate-200 rounded-lg w-24 h-12" />
      </div>
      <ul class="w-1/2 flex flex-col gap-1">
        <li class="border-b border-fuchsia-400 font-semibold text-lg">Details</li>
        <li class="font-base text-sm">
          <span class="inline-block w-1/2">Feels like</span>
          <span class="inline-block animate-pulse bg-slate-200 rounded-lg w-16 h-4" />
        </li>
        <li class="font-base text-sm">
          <span class="inline-block w-1/2">Wind</span>
          <span class="inline-block animate-pulse bg-slate-200 rounded-lg w-16 h-4" />
        </li>
        <li class="font-base text-sm">
          <span class="inline-block w-1/2">Humidity</span>
          <span class="inline-block animate-pulse bg-slate-200 rounded-lg w-16 h-4" />
        </li>
        <li class="font-base text-sm">
          <span class="inline-block w-1/2">Pressure</span>
          <span class="inline-block animate-pulse bg-slate-200 rounded-lg w-16 h-4" />
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

  export default defineComponent({
    name: 'WidgetLoader',

    setup() {
      let currentDate: any = ref <string> ('')
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

      return {
        currentDate,
      }
    }
  })
</script>
