# Web assembly with go and vite
- go docs: https://github.com/golang/go/wiki/WebAssembly
- vite docs: https://vitejs.dev/guide/features#webassembly
- vite plugin wasm: https://github.com/Menci/vite-plugin-wasm
- syscall/js doc: https://pkg.go.dev/syscall/js

🛠️ for syscall/js import to not error in main.go added to .vscode dir for workspace conf:
```JSON
"go.toolsEnvVars": {
    "GOOS": "js",
    "GOARCH": "wasm",
}
```

🏗️ to build main.wasm run:
```bash
GOOS=js GOARCH=wasm go build -o main.wasm
```

🚚 then move main.wasm file to chess-nuxt/public/

🎉 use generateGame() in front app:
```ts
import services from '~/services/index'

console.log(
    '🚀 GoWasmPOC generateGame',
    services.goWasmPOC.generateGame(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )
)
```