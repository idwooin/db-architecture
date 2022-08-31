import Link from "next/link";
import Seo from "../components/Seo";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true

function Profit() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState({
    startdate:"",
    enddate:"",
    profitcode:"",
    sumcode:"0"
  })
  const [sum, setSum] = useState(0);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(event) {
    event.preventDefault();
    if (input.sumcode === "" || input.enddate === "" || input.startdate === "") {
      alert("날짜를 입력해주세요.");
      return;
    }

    try {
      const {data} = await axios.get(
        `http://localhost:3001/profit/?startdate=${input.startdate}&enddate=${input.enddate}&profitcode=${input.profitcode}&sumcode=${input.sumcode}`
      );
      setResult(data);
      setSum(()=> data.map(item => item.profit).reduce((prev, curr) => prev + curr, 0));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/5">
            <label className="">시작 날짜</label>
            <input name="startdate" onChange={onChange} value={input.startdate}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label className="">종료 날짜</label>
            <input name="enddate" onChange={onChange} value={input.enddate}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label>수익 코드</label>
            <input name="profitcode" onChange={onChange} value={input.profitcode}
            type="number" placeholder="코드번호를 입력해주세요."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 h-full">조회</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <tr>
              <td width="25%">금액</td>
              <td width="25%">수익 코드</td>
              <td width="50%">수익 날짜</td>
            </tr>
          </thead>
          {result?.map((item, index) => 
            <tbody align="center" key={index}>
              <tr>
                <td width="25%">{item.profit} 원</td>
                <td width="25%">{item.profitcode}</td>
                <td width="50%">{item.profit_date}</td>
              </tr>
            </tbody>
          )}
          <tfoot>
            <tr align="">
              <td>수익 합계: <span className="text-blue-600">{sum} 원</span></td>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  )
}

function Spending() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState({
    startdate:"",
    enddate:"",
    costcode:"",
    sumcode:"0"
  })
  const [sum, setSum] = useState(0);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(event) {
    event.preventDefault();
    if (input.sumcode === "" || input.enddate === "" || input.startdate === "") {
      alert("날짜를 입력해주세요.");
      return;
    }
    const url = `http://localhost:3001/cost/?startdate=${input.startdate}&enddate=${input.enddate}&costcode=${input.costcode}&sumcode=${input.sumcode}`
    try {
      const {data} = await axios.get(
        url
      );
      setResult(data);
      setSum(()=> data.map(item => item.cost).reduce((prev, curr) => prev + curr, 0));
    } catch (err) {
      console.log(err);
    }
  }
  console.log(input);
  console.log(result);
  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/5">
            <label className="">시작 날짜</label>
            <input name="startdate" onChange={onChange} value={input.startdate}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label className="">종료 날짜</label>
            <input name="enddate" onChange={onChange} value={input.enddate}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label>지출 코드</label>
            <input name="costcode" onChange={onChange} value={input.costcode}
            type="number" placeholder="코드번호를 입력해주세요."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 h-full">조회</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <tr>
              <td width="25%">금액</td>
              <td width="25%">지출 코드</td>
              <td width="50%">지출 날짜</td>
            </tr>
          </thead>
          {result?.map((item, index) => 
            <tbody align="center" key={index}>
              <tr>
                <td width="25%">{item.cost} 원</td>
                <td width="25%">{item.costcode}</td>
                <td width="50%">{item.cost_date}</td>
              </tr>
            </tbody>
          )}
          <tfoot>
            <tr align="left">
              <td>지출 합계: <span className="text-red-600">{sum} 원</span></td>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  )
}


export default function TransactionCheck() {
  const [type, setType] = useState("profit");
  const onChange = (event) => setType(event.target.value);
  const openWindow = () => {
    const options = 'top=10, left=10, width=400, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("/code","코드", options);
  }

  return (
  <div>
    <Seo title="조회"/>
    <main className="mx-96">
      <article>
        <div className="flex flex-row justify-between my-8">
          <div className="flex-col">
            <h1 className="text-2xl font-bold">거래내역조회</h1>
            <h1 className="text-xs text-gray-400">고객님의 해당 기간동안의 거래내역을 조회할 수 있습니다.</h1>
            <button onClick={openWindow}
            className="text-sm rounded-md">코드확인</button>
          </div>
          <div>
            <label htmlFor="type-select" className="px-4">거래 유형: </label>
            <select value={type} onChange={onChange} id="type-select">
              <option value="profit">수익 조회</option>
              <option value="spending">지출 조회</option>
            </select>
          </div>
        </div>
      </article>
      {type === "profit" ? <Profit /> : <Spending />}
    </main>
  </div>
  )
}