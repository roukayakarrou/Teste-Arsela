import { create } from "zustand";

const useBearStore = create((set) => ({
  secretKey: "",
  setSecretKey: (arg) => {
    set({ secretKey: arg });
    localStorage.setItem("form_secret_key", arg);
  },

  droppedElements: [],
  setDroppedElements: (item) => set((state) => ({ droppedElements: [...state.droppedElements, item] })),
}));

export default useBearStore;
