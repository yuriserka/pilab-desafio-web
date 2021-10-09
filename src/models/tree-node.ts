export type TreeNode<T = any> = {
  data: T;
  children: TreeNode<T>[];
};
