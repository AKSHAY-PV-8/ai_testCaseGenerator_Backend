import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

export const extractFunctions = async (filePath: string) => {
  const code = fs.readFileSync(filePath, "utf-8");
  const traverseFn = traverse.default;

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
    ranges: true,
  });

  const functions: any[] = [];

  traverseFn(ast, {
    FunctionDeclaration(path: any) {
      const name = path.node.id?.name || "anonymous";

      const params = path.node.params.map((p: any) => {
        return p.type === "Identifier" ? p.name : "unknown";
      });

      const funcCode = code.slice(path.node.start, path.node.end);

      functions.push({
        name,
        params,
        code: funcCode,
      });
    },

    ArrowFunctionExpression(path: any) {
      if (path.parent.type === "VariableDeclarator") {
        const name = path.parent.id.name;

        const params = path.node.params.map((p: any) => {
          return p.type === "Identifier" ? p.name : "unknown";
        });

        const funcCode = code.slice(path.node.start, path.node.end);

        functions.push({
          name,
          params,
          code: funcCode,
        });
      }
    },
  });

  return functions;
};