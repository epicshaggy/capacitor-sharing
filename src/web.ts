import { WebPlugin } from "@capacitor/core";
import { SharingPlugin, SharingOptions } from "./definitions";

export class SharingWeb extends WebPlugin implements SharingPlugin {
  constructor() {
    super({
      name: "Sharing",
      platforms: ["web"],
    });
  }

  async share(options: SharingOptions): Promise<any> {
    console.log("ECHO", options);
    return Promise.resolve();
  }
}

const Sharing = new SharingWeb();

export { Sharing };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(Sharing);
