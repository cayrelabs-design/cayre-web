import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // El back office no puede tocar la clave secreta de la base. La única puerta
  // a esa clave es src/lib/consultas-db.ts (la usa el formulario de la web): si
  // un archivo del back office lo importa, este chequeo falla.
  {
    files: ["src/interno/**", "src/app/interno/**", "src/proxy.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/consultas-db", "**/lib/consultas-db"],
              message:
                "El back office no usa la clave secreta. Todo va con la sesión del socio (src/interno/lib/supabase/servidor.ts).",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
