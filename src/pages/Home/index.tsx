import { useEffect, useState } from "react";
import categories_json from "../../assets/categories.json";
import releases_json from "../../assets/releases.json";
import { Balance, TreeNode } from "../../models/balance";
import { Category } from "../../models/category";
import "./home.css";

const balance = new Balance(releases_json, categories_json);

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function Home() {
  const [data, setData] = useState<TreeNode[]>([]);
  const [flatData, setFlatData] = useState<TreeNode[]>([]);

  useEffect(() => {
    function recursiveUpdateIndex(
      curr: TreeNode<Category>,
      idx: number,
      sid: string
    ): TreeNode {
      sid += idx === curr.children.length - 1 ? "" : `${idx + 1}`;
      return {
        data: {
          ...curr.data,
          id: sid,
        },
        children: curr.children.map((child, idx: number) =>
          recursiveUpdateIndex(child, idx, `${sid}.`)
        ),
      };
    }

    setData(
      balance.categoryTree.children.map((child, idx: number) =>
        recursiveUpdateIndex(child, idx, "")
      )
    );
  }, []);

  useEffect(() => {
    function recursiveFlat(curr: TreeNode<Category>): TreeNode<Category>[] {
      return curr.children.length
        ? [curr, ...curr.children.map(recursiveFlat).flat()]
        : [curr];
    }
    setFlatData(data.map(recursiveFlat).flat());
  }, [data]);

  function renderPatrimonialBalance() {
    // function recursiveBills(curr: TreeNode<Category>) {
    //   return (
    //     <li key={curr.data.id}>
    //       <strong>{curr.data.name}</strong>
    //       <ol>{curr.children.map((b: TreeNode<Category>) => recursiveBills(b))}</ol>
    //     </li>
    //   );
    // }

    function renderBillInfo(bill: TreeNode<Category>) {
      return (
        <tr key={bill.data.id}>
          <td style={{ paddingLeft: "1rem" }}>
            <strong>{bill.data.id}</strong>
          </td>
          <td style={{ fontWeight: !bill.children.length ? "normal" : "bold" }}>
            {bill.data.name}
          </td>
          <td>{currencyFormatter.format(bill.data.initial_value)}</td>
        </tr>
      );
    }

    return (
      <div className="container">
        {/* <ol>{data.map(recursiveBills)}</ol> */}

        <div className="tables space-x-3">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Contas Ativas</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {flatData
                .filter((b: TreeNode) => b.data.id.startsWith("1"))
                .map(renderBillInfo)}
            </tbody>
          </table>

          <table style={{ marginLeft: "2rem" }}>
            <thead>
              <tr>
                <th>id</th>
                <th>Contas Passivas</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {flatData
                .filter((b: TreeNode) => b.data.id.startsWith("2"))
                .map(renderBillInfo)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <>{renderPatrimonialBalance()}</>;
}
