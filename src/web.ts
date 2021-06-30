import { WebPlugin } from "@capacitor/core";
import { SharingPlugin, SharingOptions } from "./definitions";

import * as FileSaver from "file-saver";

export class SharingWeb extends WebPlugin implements SharingPlugin {
  constructor() {
    super({
      name: "Sharing",
      platforms: ["web"],
    });
  }

  toByteArray(base64Data: string): Uint8Array {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  async share(options: SharingOptions): Promise<any> {
    return new Promise<any>((resolve) => {
      for (let i = 0; i < options.fileNames.length; i++) {
        let blob = new Blob([this.toByteArray(options.base64Values[i])], {
          type: "application/octet-stream",
        });
        FileSaver.saveAs(blob, options.fileNames[i]);
      }
      resolve(undefined);
    });
  }
}
