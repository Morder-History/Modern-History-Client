import { createStore } from "vuex";
import map, { MapDataProps } from "./map";
export interface globalDataProps {
  map: MapDataProps;
}
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    map,
  },
});

export default store;
