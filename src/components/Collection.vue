<script>
export default {
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const imgId = Math.floor(Math.random() * 200) + 1;

    return {
      imgId,
    };
  },
};
</script>

<template>
  <div
    class="w-[200px] h-fit w-fit min-w-[150px] flex flex-wrap rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-150 overflow-hidden"
  >
    <div class="w-full">
      <div class="bg-white p-4 w-full flex flex-col gap-4">
        <h3 class="text-l truncate font-medium capitalize">
          📖 {{ collection.label }}
        </h3>
        <p class="text-xs text-gray-600 line-clamp-3">
          {{ collection.summary }}
        </p>
        <div class="flex flex-1 justify-between">
          <p class="text-xs">📂{{ collection._source?.category_id }}</p>
          <a
            target="_blank"
            :href="collection._source?.data_url || collection._source?.info_url"
            class="text-xs text-blue-400"
            :class="{ 'text-gray-400 pointer-events-none line-through	': !collection._source?.data_url && !collection._source?.info_url }"
          >
            LINK
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
