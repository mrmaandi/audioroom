import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "textttt", // default value (aka initial value)
});

export const audioSampleState = atom<File | undefined>({
  key: "audioSampleState",
  default: undefined,
});
