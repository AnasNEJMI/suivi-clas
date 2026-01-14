import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",     // We are testing a backend, not a browser
    globals: true,           // Allows describe(), it(), expect()
    setupFiles: ["./tests/setup.ts"], // Optional global setup
  },
});