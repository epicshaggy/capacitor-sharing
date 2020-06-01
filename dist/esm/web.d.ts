import { WebPlugin } from "@capacitor/core";
import { SharingPlugin, SharingOptions } from "./definitions";
export declare class SharingWeb extends WebPlugin implements SharingPlugin {
    constructor();
    share(options: SharingOptions): Promise<any>;
}
declare const Sharing: SharingWeb;
export { Sharing };
