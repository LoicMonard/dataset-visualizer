import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Dataset from "../models/api_collections.json";

export const useDatasetStore = defineStore("dataset", () => {
  /**
   * List of all datasets
   */
  const datasets = ref(Dataset);
  /**
   * The active category
   */
  const activeCategory = ref(null);
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
  /**
   * Computed to return the collections of the active category
   */
  const activeCategoryCollections = computed(() => {
    return datasetFilteredByCategoryId.value[activeCategory.value];
  });
  /**
   * Method to set the active category
   * @param {*} category_id
   */
  const setActiveCategory = (category_id) => {
    activeCategory.value = category_id;
  };
  /**
   * Method to return the total number of "count?" of a category
   * @param {*} category_id
   * @returns {String}
   */
  const getDocCountPerCategory = (category_id) => {
    return datasetFilteredByCategoryId.value[category_id]
      .reduce((acc, dataset) => acc + (dataset._source?.count || 0), 0)
      .toLocaleString();
  };
  /**
   * Method to filter the dataset by a search term
   */
  const getCollectionsBySearch = computed(() => {
    return (value) => {
      return datasets.value.filter((dataset) =>
        dataset.label.toLowerCase().includes(value.toLowerCase())
      );
    };
  });

  return {
    datasets,
    datasetFilteredByCategoryId,
    activeCategoryCollections,
    setActiveCategory,
    getDocCountPerCategory,
    getCollectionsBySearch,
  };
});
