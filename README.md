# Tokopedia Image Downloader
ToID uses selenium webdriver to run the download function

## Requirements

- Google Chrome Browser
- [chromedriver.exe](https://chromedriver.chromium.org/downloads) (depending on chrome version)

## Build
```powershell
PS F:\tokopedia> npm i
26 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

PS F:\tokopedia> npm run build
> tokopedia@1.0.0 build
> babel src/index.mjs --plugins @babel/plugin-transform-modules-commonjs -o index.js --verbose

```

## Help
```powershell
PS F:\tokopedia> node index.js --help

Commands:
  index.js download [link]  input download link

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

```

## Example
```powershell
PS F:\tokopedia> node index.js download https://www.tokopedia.com/eaztrip/masker-sensi-mask-duckbill-face-mask-3ply-original-50pcs-earloop --cache --output c:\users\bit\documents\masker

DevTools listening on ws://127.0.0.1:51340/devtools/browser/550a58e4-2434-41a7-ab86-5d16c8aff588


Output
c:\users\bit\documents\masker\313a8298-7682-4ff6-a3e1-6ecd81f84960.jpg success
c:\users\bit\documents\masker\ca3aa415-6ed0-4fed-8c0e-f17244ff35a8.jpg success
PS F:\tokopedia>  
```