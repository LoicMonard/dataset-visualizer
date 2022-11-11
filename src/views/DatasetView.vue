<script>
import { storeToRefs } from "pinia";
import { useDatasetStore } from "../stores/dataset";
import Collection from "../components/Collection.vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const datasetStore = useDatasetStore();
    const { activeCategoryCollections } = storeToRefs(datasetStore);
    const { setActiveCategory } = datasetStore;

    return {
      route,
      activeCategoryCollections,
      setActiveCategory,
    };
  },
  components: {
    Collection,
  },
  mounted() {
    this.setActiveCategory(this.route.params.category_id);
  },
};
</script>

<template>
  <div
    class="container mx-auto h-full w-fit flex flex-col justify-center items-center gap-4 relative"
  >
    <div class="flex flex-row gap-2">
      <router-link to="/categories/" class="text-md"> CATEGORIES </router-link>
      <span class="text-md font-bold">
        >
        {{ route.params.category_id.toUpperCase() }}
      </span>
    </div>
    <div
      class="h-[80vh] grid gap-4 grid-cols-4 overflow-auto auto-rows-max p-2"
    >
      <Collection
        v-for="(collection, index) in activeCategoryCollections"
        :key="index"
        :collection="collection"
      />
    </div>
  </div>
</template>
