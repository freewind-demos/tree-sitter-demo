declare module 'tree-sitter' {
    export interface SyntaxNode {
        type: string;
        text: string;
        startPosition: Position;
        endPosition: Position;
        children: SyntaxNode[];
        parent: SyntaxNode | null;
        toString(): string;
    }

    export interface Position {
        row: number;
        column: number;
    }

    export interface Tree {
        rootNode: SyntaxNode;
        edit(delta: Edit): void;
        getChangedRanges(other: Tree): Range[];
        walk(): TreeCursor;
    }

    export interface TreeCursor {
        nodeType: string;
        nodeText: string;
        nodeIsNamed: boolean;
        startPosition: Position;
        endPosition: Position;
        startIndex: number;
        endIndex: number;
        gotoFirstChild(): boolean;
        gotoParent(): boolean;
        gotoNextSibling(): boolean;
        gotoPreviousSibling(): boolean;
    }

    export interface Edit {
        startIndex: number;
        oldEndIndex: number;
        newEndIndex: number;
        startPosition: Position;
        oldEndPosition: Position;
        newEndPosition: Position;
    }

    export interface Range {
        startIndex: number;
        endIndex: number;
        startPosition: Position;
        endPosition: Position;
    }

    export interface Language {
        nodeTypeInfo: {[type: string]: {named: boolean}};
        fieldNameInfo: {[field: string]: {multiple: boolean}};
        nodeSubtypeInfo: {[type: string]: {named: boolean}};
    }

    export default class Parser {
        setLanguage(language: any): void;
        parse(input: string | Parser.Input, previousTree?: Tree): Tree;
        getLanguage(): Language;
    }
}
