# Tree-sitter Demo

这是一个使用 TypeScript 实现的 Tree-sitter 演示项目，展示了如何使用 Tree-sitter 解析和分析代码的语法结构。

## Tree-sitter 是什么？

Tree-sitter 是一个强大的增量解析器生成工具和解析库，具有以下特点：

1. **多语言支持**：
   - 通过语言特定的语法定义文件（grammar.js）支持不同编程语言
   - 每种语言可以定义自己独特的语法规则
   - 支持特殊的语言特性（如 Python 的缩进、TypeScript 的类型系统等）

2. **增量解析**：
   - 只重新解析修改过的代码部分
   - 对大型代码文件和实时分析非常高效
   - 适合在 IDE 和编辑器中使用

3. **错误恢复**：
   - 能够处理不完整或有语法错误的代码
   - 生成部分正确的语法树
   - 提供良好的开发体验

4. **自定义扫描器**：
   - 支持复杂语法特性的特殊处理
   - 通过 C/C++ 编写的扫描器处理特殊词法规则
   - 例如处理模板字符串、多行字符串等

## 本演示项目说明

这个演示项目展示了：
1. 如何解析 TypeScript 代码
2. 如何遍历和分析语法树
3. 如何提取特定类型的节点（如函数声明、接口定义等）

### 示例代码功能
- 解析包含函数、接口和类的 TypeScript 代码
- 生成完整的抽象语法树（AST）
- 提取和显示函数声明和方法定义
- 分析接口定义

### 技术栈
- TypeScript
- tree-sitter
- tsx (用于运行 TypeScript 代码)
- pnpm (包管理器)

## 如何运行

1. 安装 pnpm（如果还没有安装）：
```bash
npm install -g pnpm
```

2. 安装依赖：
```bash
pnpm install
```

3. 运行演示：
```bash
pnpm start
```

4. 开发模式（支持热重载）：
```bash
pnpm dev
```

## 代码结构

```
tree-sitter-demo/
├── src/
│   ├── types/          # 类型声明文件
│   │   ├── tree-sitter.d.ts
│   │   └── tree-sitter-typescript.d.ts
│   └── index.ts        # 主程序文件
├── package.json
├── tsconfig.json
└── README.md
```

## 代码说明

- `src/index.ts`: 主程序文件，展示了：
  - 初始化 Tree-sitter 解析器
  - 解析 TypeScript 代码
  - 遍历语法树
  - 提取特定类型的节点

- `src/types/`: 类型声明文件
  - 为 tree-sitter 提供类型定义
  - 为 tree-sitter-typescript 提供类型定义

## Tree-sitter 的工作原理

1. **语法定义**：
   - 每种语言都有自己的语法规则
   - 使用声明式的方式定义语法结构
   - 支持语言特定的特性

2. **解析过程**：
   - 词法分析：将代码转换为 token 流
   - 语法分析：构建抽象语法树
   - 增量更新：只重新解析变化的部分

3. **语法树结构**：
   - 节点类型反映语言结构
   - 保留完整的源代码信息
   - 支持详细的代码分析

## 自定义尝试

你可以修改 `src/index.ts` 中的 `sourceCode` 变量，尝试解析不同的 TypeScript 代码结构。例如：
- 添加更多的类型定义
- 使用泛型
- 添加装饰器
- 使用高级 TypeScript 特性

## 构建

如果你想将 TypeScript 代码编译为 JavaScript：
```bash
pnpm build
```
编译后的文件将位于 `dist` 目录中。
