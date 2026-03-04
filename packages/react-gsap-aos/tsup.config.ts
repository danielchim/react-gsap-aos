import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    client: "src/client.ts",
    constants: "src/constants.ts",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
