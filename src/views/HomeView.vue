<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useDatasetStore } from "../stores/dataset";

export default defineComponent({
  setup() {
    const datasetStore = useDatasetStore();
    const { datasets, datasetFilteredByCategoryId, datasetNames } =
      storeToRefs(datasetStore);

    return {
      datasets,
      datasetFilteredByCategoryId,
      datasetNames,
    };
  },
});
</script>

<template>
  <main>
    This is the default view. {{ datasets.length }},
    {{ datasetFilteredByCategoryId }}
  </main>
</template>
