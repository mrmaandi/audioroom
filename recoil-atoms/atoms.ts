import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "textttt", // default value (aka initial value)
});

export const burgerMenuState = atom({
  key: "burgerMenuState",
  default: false,
});
