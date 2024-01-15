import { type TJElement, type TJElementBuilder } from "./builders";

class DocumentTreeNode {
  public element: TJElement;
  public parent: DocumentTreeNode | null;
  public children: DocumentTreeNode[];

  constructor(element: TJElement, parent: DocumentTreeNode | null) {
    this.element = element;
    this.parent = parent;
    this.children = [];
  }
}

class DocumentTree {
  public root: DocumentTreeNode | null;

  constructor() {
    this.root = null;
  }

  public addNode(
    element: TJElementBuilder,
    parentElementId: string | null
  ): void {
    const tjElement = element.build();

    if (parentElementId === null) {
      this.root = new DocumentTreeNode(tjElement, null);
      return;
    }

    const parent = this.findNode(parentElementId);
    const node = new DocumentTreeNode(tjElement, parent);

    if (parent != null) {
      parent.children.push(node);
    } else {
      this.root = new DocumentTreeNode(tjElement, null);
    }
  }

  public findNode(elementId: string): DocumentTreeNode | null {
    if (this.root === null) {
      return null;
    }

    const queue: DocumentTreeNode[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();

      if (node?.element.getAttribute("id") === elementId) {
        return node;
      }

      if (node instanceof DocumentTreeNode && node?.children.length > 0) {
        queue.push(...node.children);
      }
    }

    return null;
  }
}

export default class DocumentManager {
  public documentTree: DocumentTree;

  constructor(public doc: Document) {
    this.doc = doc;
    this.documentTree = new DocumentTree();
  }

  public addElement(
    builder: TJElementBuilder,
    parentElementId: string | null
  ): void {
    this.documentTree.addNode(builder, parentElementId);
  }

  public buildDocument(): void {
    if (this.documentTree.root === null) {
      return;
    }

    const queue: DocumentTreeNode[] = [this.documentTree.root];
    while (queue.length > 0) {
      const node = queue.shift();

      if (node instanceof DocumentTreeNode) {
        const element = node.element;
        const parentElementId = node.parent?.element.getAttribute("id") ?? null;

        if (parentElementId === null) {
          this.doc.body.appendChild(element.getHtml());
        } else {
          const parentElement = this.doc.getElementById(parentElementId);
          if (parentElement !== null) {
            parentElement.appendChild(element.getHtml());
          }
        }
        queue.push(...node.children);
      }
    }
  }
}
