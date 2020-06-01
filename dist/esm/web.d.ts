import { WebPlugin } from "@capacitor/core";
import { SharingPlugin, SharingOptions } from "./definitions";
export declare class SharingWeb extends WebPlugin implements SharingPlugin {
    constructor();
    toByteArray(base64Data: string): Uint8Array;
    share(options: SharingOptions): Promise<any>;
}
declare const Sharing: SharingWeb;
export { Sharing };
