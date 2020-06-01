declare module "@capacitor/core" {
    interface PluginRegistry {
        Sharing: SharingPlugin;
    }
}
export interface SharingOptions {
    fileNames: string[];
    base64Values: string[];
    mimeType?: string;
    androidTitle?: string;
}
export interface SharingPlugin {
    share(options: SharingOptions): Promise<any>;
}
