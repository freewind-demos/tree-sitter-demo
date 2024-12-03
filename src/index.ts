import Parser, { SyntaxNode } from 'tree-sitter';
import TypeScript from 'tree-sitter-typescript';

async function main() {
    // 初始化解析器
    const parser = new Parser();
    parser.setLanguage(TypeScript.typescript);  // 使用 TypeScript 解析器

    // 要解析的示例代码（TypeScript版本）
    const sourceCode = `
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

interface MathUtils {
    factorial: (n: number) => number;
    sum: (a: number, b: number) => number;
}

class Calculator implements MathUtils {
    factorial(n: number): number {
        return factorial(n);
    }

    sum(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.factorial(5));
    `;

    // 解析代码
    const tree = parser.parse(sourceCode);

    // 打印语法树
    console.log('Abstract Syntax Tree:');
    console.log(tree.rootNode.toString());

    // 遍历所有函数声明和方法定义
    console.log('\nFound functions and methods:');
    const functionNodes: SyntaxNode[] = [];
    traverseTree(tree.rootNode, (node: SyntaxNode) => {
        if (node.type === 'function_declaration' || node.type === 'method_definition') {
            functionNodes.push(node);
        }
    });

    // 打印每个函数的信息
    functionNodes.forEach(node => {
        const name = node.children.find(child => child.type === 'identifier' || child.type === 'property_identifier')?.text ?? 'unknown';
        const parameters = node.children.find(child => child.type === 'formal_parameters')?.text ?? '()';
        const body = node.children.find(child => child.type === 'statement_block')?.text ?? '{}';

        console.log(`\nFunction/Method name: ${name}`);
        console.log(`Parameters: ${parameters}`);
        console.log(`Body: ${body}`);
    });

    // 查找接口定义
    console.log('\nFound interfaces:');
    traverseTree(tree.rootNode, (node: SyntaxNode) => {
        if (node.type === 'interface_declaration') {
            const name = node.children.find(child => child.type === 'type_identifier')?.text ?? 'unknown';
            console.log(`\nInterface name: ${name}`);
            console.log(`Content: ${node.text}`);
        }
    });
}

// 遍历语法树的辅助函数
function traverseTree(node: SyntaxNode, callback: (node: SyntaxNode) => void) {
    callback(node);
    if (node.children.length > 0) {
        node.children.forEach(child => traverseTree(child, callback));
    }
}

main().catch(console.error);
