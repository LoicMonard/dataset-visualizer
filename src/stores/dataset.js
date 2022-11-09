import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Dataset from "../models/api_collections.json";

export const useDatasetStore = defineStore("dataset", () => {
  /**
   * List of all datasets
   */
  const datasets = ref(Dataset);
  /**
   * Computed property that returns a dictionnary of categories grouped by dataset depending on
   * category_id
   *
   * @returns {Object} - Object with dataset_id as key and an array of categories as value
   */
  const datasetFilteredByCategoryId = computed(() => {
    const categories = {};
    datasets.value.forEach((dataset) => {
      categories[dataset.category_id]
        ? categories[dataset.category_id].push(dataset)
        : (categories[dataset.category_id] = [dataset]);
    });
    return categories;
  });

  const datasetNames = computed(() =>
    datasets.value.map((dataset) => dataset.name)
  );

  return { datasets, datasetFilteredByCategoryId, datasetNames };
});
