<script setup>
import { storeToRefs } from "pinia";
import { useDatasetStore } from "../stores/dataset";
import Category from "../components/Category.vue";
import Collection from "../components/Collection.vue";
import { ref, Transition } from "vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

const router = useRouter();

const goToCategory = (category) => {
  router.push("/categories/" + category);
};

const search = ref("");

const isSearchEmpty = computed(() => search.value.length === 0);

const datasetStore = useDatasetStore();
const { datasetFilteredByCategoryId } = storeToRefs(datasetStore);
</script>

<template>
  <main
    class="container mx-auto h-full w-fit flex flex-col justify-center items-center gap-4 relative"
  >
    <div class="h-screen flex flex-col justify-center items-center gap-4">
      <input
        v-model="search"
        type="text"
        placeholder="Browse collections"
        class="max-w-[420px] mt-[30vh] bg-white py-2 px-4 rounded-lg border w-full"
      />
      <Transition name="fade" mode="out-in">
        <div
          v-if="isSearchEmpty"
          class="flex-1 w-fit grid gap-4 grid-cols-2 auto-rows-max"
        >
          <Category
            v-for="(value, key) in datasetFilteredByCategoryId"
            @click="goToCategory(key)"
            :key="key"
            :title="key"
            :documents="value"
          />
        </div>
        <div
          v-else="isSearchEmpty"
          class="h-full h-max-[100vh] grid gap-4 grid-cols-2 overflow-auto auto-rows-max p-2"
        >
          <Collection
            v-for="(collection, index) in datasetStore.getCollectionsBySearch(
              search
            )"
            :key="index"
            :collection="collection"
          />
          <span v-if="datasetStore.getCollectionsBySearch(search).length === 0">
            No results found
          </span>
        </div>
      </Transition>
    </div>
    <div
      class="fixed bottom-0 w-full h-[150px] bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"
    ></div>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(227, 227, 227);
  border-radius: 10px;
  transition: all var(--transition-duration) ease;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgb(200, 200, 200);
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>
