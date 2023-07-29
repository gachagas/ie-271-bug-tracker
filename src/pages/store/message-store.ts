import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface MessageState {
  message: string;
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        message: "hello world",
        bears: 0,
        increasePopulation: () =>
          set(
            (state) => ({ bears: state.bears + 1 }),
            false,
            "bear/increasePopulation"
          ),
        removeAllBears: () => set({ bears: 0 }, false, "bear/removePopulation"),
      }),
      { name: "bear-storage" }
    ),
    { enabled: false }
  )
);

export default useMessageStore;
