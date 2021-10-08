import { useEffect, useState } from "react";
import json from "../../assets/db.json";
import { Balance } from "../../models/balance";
import { Bill } from "../../models/bill";
import "./home.css";

export default function Home() {
  const [data, setData] = useState<Balance>([]);
  const [flatData, setFlatData] = useState<Balance>([]);

  useEffect(() => {
    function recursive(curr: Bill, idx: number, sid: string): Bill {
      sid += idx === curr.contas.length - 1 ? "" : `${idx + 1}`;
      return {
        ...curr,
        id: sid,
        contas: curr.contas.map((bill, idx) => {
          return recursive(bill, idx, `${sid}.`);
        }),
      };
    }
    setData((json as Balance).map((bill, idx) => recursive(bill, idx, "")));
  }, []);

  useEffect(() => {
    function recursive(curr: Bill): any[] {
      return curr.contas.length
        ? [curr, ...curr.contas.map(recursive).flat()]
        : [curr];
    }
    setFlatData(data.map(recursive).flat());
  }, [data]);

  function renderPatrimonialBalance() {
    // function recursiveBills(curr: Bill) {
    //   return (
    //     <li key={curr.id}>
    //       <strong>{curr.nome}</strong>
    //       <ol>{curr.contas.map((b) => recursiveBills(b))}</ol>
    //     </li>
    //   );
    // }

    function renderBillInfo(bill: Bill) {
      return (
        <tr key={bill.id}>
          <td style={{ paddingLeft: "1rem" }}>
            <strong>{bill.id}</strong>
          </td>
          <td style={{ fontWeight: !bill.contas.length ? "normal" : "bold" }}>
            {bill.nome}
          </td>
          <td>R$ {bill.valor}</td>
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
                .filter((b) => !b.id.startsWith("2"))
                .map(renderBillInfo)}
            </tbody>
          </table>

          <table style={{ marginLeft: "2rem" }}>
            <thead>
              <tr>
                <th>id</th>
                <th>Contas Ativas</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {flatData.filter((b) => b.id.startsWith("2")).map(renderBillInfo)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <>{renderPatrimonialBalance()}</>;
}
