# Capacitor Sharing

## Description

Provides a way to share one or more files at a time.

## Installation

- `npm i capacitor-sharing`

## Usage

```ts
import { Plugins } from "@capacitor/core";

const { Sharing } = Plugins;

Sharing.share({
  fileNames: ["myImage.jpg", "myDocument.pdf", "myOtherImag.png"],
  base64Values: ["..."],
  contentType: "*/*",
}).then(
  () => {
    //your code
  },
  (error) => {
    console.log(error);
  }
);
```

## Methods

| Method                         | Default | Type           | Description                                                    |
| ------------------------------ | ------- | -------------- | -------------------------------------------------------------- |
| share(options: SharingOptions) |         | `Promise<any>` | Prompts the user with sharing options for the provided file(s) |

## Interfaces

| Properties   | Default | Type       | Description                                                            |
| ------------ | ------- | ---------- | ---------------------------------------------------------------------- |
| fileNames    |         | `string[]` | Array containing the names of the files.                               |
| base64Values |         | `string[]` | Array containing the corresponding bas64 strings of the files.         |
| mimeType?    | "_/_"   | `string`   | MIME type of the provided file. Define only when one file is provided. |
