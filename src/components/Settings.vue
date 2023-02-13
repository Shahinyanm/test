<template>
  <div class="relative w-80 flex justify-end">
    <div class="w-7 h-7 cursor-pointer" @click.stop="cardHandler">
      <settings />
    </div>

    <div v-if="isOpenSettings" class="absolute -top-1 -right-2 bg-slate-50 rounded shadow-lg p-2">
      <div class="flex items-center justify-between w-full mb-3">
        <span class="font-bold text-slate-600 text-lg">Settings</span>
        <div class="w-6 h-6 cursor-pointer" @click.stop="cardHandler">
          <close />
        </div>
      </div>
      <draggable
        tag="ul"
        :list="list"
        class="flex flex-col gap-5"
        handle=".handle"
        item-key="name"
      >
        <template #item="{ element }">
          <li class="bg-sky-200 rounded flex flex-row items-center justify-between px-3 py-2 w-80">
            <div class="handle cursor-pointer flex gap-7 items-center">
              <div class="w-7 h-7 cursor-move">
                <burger />
              </div>
              <span class="font-semibold capitalize">{{ element }} </span>
            </div>
            <div class="w-7 h-7 cursor-pointer"  @click.stop="removeAt(element)">
              <remove />
            </div>
          </li>
        </template>
      </draggable>

      <form @submit.prevent="add" class="mt-8">
        <p class="font-semibold">Add Location</p>
        <div class="flex justify-between items-center gap-1 mt-1">
          <input v-model="newCity" type="text" placeholder="City name" class="border-slate-300 w-100 rounded w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          <button type="submit" class="w-8 cursor-pointer">
            <go />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { addCity, removeCity, globalState } from '@/store'
import draggable from 'vuedraggable'
import { go, close, remove, burger, settings } from '@/assets/icons'

export default defineComponent( {
  components: {
    draggable,
    go, close, remove, burger, settings
  },

  setup() {
    const isOpenSettings = ref <boolean>(false)
    const newCity = ref <string>('')

    const list = computed(() => globalState.citiesList)

    const cardHandler = (): void => {
      isOpenSettings.value = !isOpenSettings.value
    }

    const removeAt = (cityName:string): void => {
      removeCity(cityName)
    }

    const add = (): void => {
      if(newCity.value) {
        addCity(newCity.value)
        newCity.value = ''
        cardHandler()
      }
    }

    return {
      isOpenSettings, newCity, list, cardHandler, removeAt, add
    }
  }
})
</script>
