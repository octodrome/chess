# Web assembly with go and vite
- go docs: https://github.com/golang/go/wiki/WebAssembly
- vite docs: https://vitejs.dev/guide/features#webassembly
- vite plugin wasm: https://github.com/Menci/vite-plugin-wasm
- egghead tuto: https://egghead.io/lessons/go-configure-go-build-constraints-in-vs-code-to-work-with-webassembly
- return json from wasm tuto: https://gitlab.com/k33g_org/wasm.builders/01-wasm-golang-browser
- useful for multiple params and return values :https://blog.suborbital.dev/foundations-wasm-in-golang-is-fantastic
- syscall/js doc: https://pkg.go.dev/syscall/js

for syscall/js import to not error in main.go added to .vscode dir for workspace conf:
```
"go.toolsEnvVars": {
    "GOOS": "js",
    "GOARCH": "wasm",
}
```

to build main.wasm run:
```shell
GOOS=js GOARCH=wasm go build -o main.wasm
```