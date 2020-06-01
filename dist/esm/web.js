var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from "@capacitor/core";
import * as FileSaver from "file-saver";
export class SharingWeb extends WebPlugin {
    constructor() {
        super({
            name: "Sharing",
            platforms: ["web"],
        });
    }
    toByteArray(base64Data) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new Uint8Array(byteNumbers);
    }
    share(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                for (let i = 0; i < options.fileNames.length; i++) {
                    let blob = new Blob([this.toByteArray(options.base64Values[i])], {
                        type: "application/octet-stream",
                    });
                    FileSaver.saveAs(blob, options.fileNames[i]);
                }
                resolve();
            });
        });
    }
}
const Sharing = new SharingWeb();
export { Sharing };
import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(Sharing);
//# sourceMappingURL=web.js.map