import { registerPlugin } from "@capacitor/core";
import type { SharingPlugin } from "./definitions";

const Sharing = registerPlugin<SharingPlugin>("Sharing", {
  web: () => import("./web").then((m) => new m.SharingWeb()),
});

export * from "./definitions";
export { Sharing };
