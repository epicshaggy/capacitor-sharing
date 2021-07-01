import { registerPlugin } from "@capacitor/core";
import { SharingPlugin } from "./definitions";

const Sharing = registerPlugin<SharingPlugin>("Sharing", {
  web: () => import("./web").then((m) => m.SharingWeb),
});

export * from "./definitions";
export { Sharing };
