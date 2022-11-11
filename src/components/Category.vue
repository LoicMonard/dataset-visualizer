<script>
import { useDatasetStore } from "../stores/dataset";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    documents: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const imgId = Math.floor(Math.random() * 200) + 1;

    const datasetStore = useDatasetStore();
    const { getDocCountPerCategory } = datasetStore;
    return {
      imgId,
      getDocCountPerCategory,
    };
  },
};
</script>

<template>
  <div
    class="h-fit w-fit min-w-[150px] flex flex-wrap rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-150 overflow-hidden"
  >
    <div>
      <div class="w-[200px] h-[120px]">
        <img
          :src="`https://picsum.photos/id/${imgId}/200/120`"
          alt="random image from picsum"
        />
      </div>
      <div class="bg-white p-4">
        <h3 class="text-l font-medium capitalize">📂 {{ title }}</h3>
        <p class="text-xs text-gray-600">
          {{ documents.length }} collection{{ documents.length > 1 ? "s" : "" }}
        </p>
        <p class="text-xs text-gray-600">
          {{ getDocCountPerCategory(title) }} documents
        </p>
      </div>
    </div>
  </div>
</template>
