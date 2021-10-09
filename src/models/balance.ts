import { Category } from "./category";
import { Release } from "./release";
import { TreeNode } from "./tree-node";

export class Balance {
  categoryTree: TreeNode<Category>;

  constructor(private releases: Release[], private categories: Category[]) {
    this.categoryTree = this.buildCategoryTree();
    this.computeValues();
  }

  computeValues() {
    this.releases.forEach((rel) => this.computeLeafValues(rel));
    this.categoryTree = this.computeNonLeafValue();
  }

  private buildCategoryTree(): TreeNode<Category> {
    const recursiveAppendToFather = (cat: Category): TreeNode<Category> => ({
      data: cat,
      children: this.categories
        .filter((child) => child.father === cat.id)
        .map(recursiveAppendToFather),
    });

    return {
      data: {
        father: -1,
        id: 0,
        initial_value: 0,
        name: "root",
      },
      children: [
        {
          data: {
            ...this.categories[0],
          },
          children: [...recursiveAppendToFather(this.categories[0]).children],
        },
      ],
    };
  }

  computeLeafValues(rel: Release) {
    const recursiveComputeLeafValue = (
      node: TreeNode<Category>
    ): TreeNode<Category> => ({
      data: {
        ...node.data,
        initial_value:
          node.data.id === rel.category_id
            ? node.data.initial_value + rel.amount * rel.value
            : node.data.initial_value,
      },
      children: node.children.map(recursiveComputeLeafValue),
    });

    this.categoryTree = recursiveComputeLeafValue(this.categoryTree);
  }

  computeNonLeafValue(): TreeNode<Category> {
    const recursiveComputeNonLeafValue = (
      node: TreeNode<Category>
    ): TreeNode<Category> => {
      node.children = node.children.map(recursiveComputeNonLeafValue);
      return {
        ...node,
        data: {
          ...node.data,
          initial_value: node.children.length
            ? node.children.reduce(
                (acc, child) => acc + child.data.initial_value,
                node.data.initial_value
              )
            : node.data.initial_value,
        },
      };
    };

    return recursiveComputeNonLeafValue(this.categoryTree);
  }
}
