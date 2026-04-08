import traverseModule from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

const traverse = (traverseModule as any).default;

export const extractFunctions = (ast: any) => {
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
        },

        ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
            const parent = path.parent;

            if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
                functions.push({
                    name: parent.id.name,
                    params: path.node.params.map(param =>
                        t.isIdentifier(param) ? param.name : "unknown"
                    ),
                    code: path.toString(),
                });
            }
        },

        FunctionExpression(path: NodePath<t.FunctionExpression>) {
            const parent = path.parent;

            if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
                functions.push({
                    name: parent.id.name,
                    params: path.node.params.map(param =>
                        t.isIdentifier(param) ? param.name : "unknown"
                    ),
                    code: path.toString(),
                });
            }
        }

    });

    return functions;
};