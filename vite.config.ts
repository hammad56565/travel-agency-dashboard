import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
   optimizeDeps: {
    include: ['@syncfusion/ej2-base', '@syncfusion/ej2-react-buttons', '@syncfusion/ej2-react-grids']
  },
  server: {
    port: 5173,   
    strictPort: true,
  }
});
