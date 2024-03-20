# SAST UI

## Quick start

```shell
git clone https://github.com/NJUPT-SAST/SAST-UI.git

cd SAST-UI

pnpm i  #安装依赖

pnpm run dev    #vite build --watch

pnpm link --global  #link
```

## Use in Vue

```shell
pnpm link --global sast-ui

# if the answer is
# + sast-ui ^0.0.1
# you are successfully
```

```js
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
});
```

### Usage sample

```js
<script setup>
import { Sbutton } from "sast-ui";
</script>

<template>
  <s-button>test</s-button>
</template>
```

## Use in React

See vue above for pnpm link methods

### Usage sample

```jsx
import { Button } from "sast-ui";

function App() {
  return (
    <>
      <Button>test</Button>
    </>
  );
}

export default App;
```
