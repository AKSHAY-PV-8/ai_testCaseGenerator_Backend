import traverseModule from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

const traverse = (traverseModule as any).default;

export const extractFunctions = (ast: string) => {
    const functions: {
        name: string | undefined;
        params: string[];
        code: string;
    }[] = [];

    traverse(ast, {
        FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
            functions.push({
                name: path.node.id?.name,
                params: path.node.params.map(param =>
                    t.isIdentifier(param) ? param.name : "unknown"
                ),
                code: path.toString(),
            });
        }
    });

    return functions;
};