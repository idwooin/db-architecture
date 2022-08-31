import Link from "next/link";
import Seo from "../components/Seo";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true

function Profit() {

  const [input, setInput] = useState({
    "date":"",
    "profit":"",
    "profitcode":"",
  })
  const [enter, setEnter] = useState([]);
  const [sum, setSum] = useState(0);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    if (input.profit === "" || input.branch_id === "" || input.profitcode === "" || input.date === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "date":"",
      "profit":"",
      "profitcode":"",
    })
    setSum((current) => current + Number(input.profit));
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
          `http://localhost:3001/profit`, enter
        ).then(alert("서버에 전송완료."));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/5">
            <label>날짜</label>
            <input name="date" onChange={onChange} value={input.date}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label>수익 금액</label>
            <input name="profit" onChange={onChange} value={input.profit}
            type="number" placeholder="금액을 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/5">
            <label>수익 코드</label>
            <input name="profitcode" onChange={onChange} value={input.profitcode}
            type="number" placeholder="코드번호를 입력해주세요."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 mr-0.5 h-full">추가</button>
            <button type="submit" onClick={handleSubmit}
            className="bg-sky-700 text-white rounded-md px-6 h-full">전송</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <tr>
              <td width="25%">금액</td>
              <td width="25%">수익 코드</td>
              <td width="50%">날짜</td>
            </tr>
          </thead>
          {enter?.map((item, index) => 
            <tbody align="center" key={index}>
              <tr>
                <td width="25%">{item.profit} 원</td>
                <td width="25%">{item.profitcode}</td>
                <td width="50%">{item.date}</td>
              </tr>
            </tbody>
          )}
          <tfoot>
            <tr align="left">
              <td>수익 합계: <span className="text-blue-600">{sum} 원</span></td>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  )
}

function Cost() {
  const [input, setInput] = useState({
    time:"",
    cost_size:"",
    costcode:"",
    stock_id:"",
    stock_num:""
  })
  const [enter, setEnter] = useState([]);
  const [sum, setSum] = useState(0);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    if (input.time === ""|| input.costcode === "") {
      alert("시간과 코드를 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      time:"",
      cost_size:"",
      costcode:"",
      stock_id:"",
      stock_num:""
    })
    setSum((current) => current + Number(input.cost_size));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
          `http://localhost:3001/cost`, enter
        ).then(alert("서버에 전송완료."));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article>
        <div className="mb-4">
          <h1 className="font-bold text-red-500">지출 내역 작성 요령</h1>
          <h1 className="text-xs">일반적인 지출은 날짜, 지출 금액, 지출 코드만 입력한다.</h1>
          <h1 className="text-xs"><span className="text-blue-700 font-bold">환불 처리</span>를 위한 지출 코드는 6번으로 물품 일련번호와 개수까지 모두 입력해야 한다.</h1>
          <h1 className="text-xs"><span className="text-blue-700 font-bold">폐기 금액 처리</span>를 위한 지출 코드는 7번으로 물품 일련번호를 입력해야한다.</h1>
        </div>
      </article>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col w-28">
            <label className="">날짜</label>
            <input name="time" onChange={onChange} value={input.time}
            type="date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className="flex flex-col w-24">
            <label>지출 금액</label>
            <input name="cost_size" onChange={onChange} value={input.cost_size}
            type="number" placeholder="금액"/>
          </div>
          <div className="flex flex-col w-16">
            <label>지출 코드</label>
            <input name="costcode" onChange={onChange} value={input.costcode}
            type="number" placeholder="코드"/>
          </div>
          <div className="flex flex-col">
            <label>물품 일련번호</label>
            <input name="stock_id" onChange={onChange} value={input.stock_id}
            type="text" placeholder="환불/폐기처리시 필수 입력사항"/>
          </div>
          <div className="flex flex-col">
            <label>환불 개수</label>
            <input name="stock_num" onChange={onChange} value={input.stock_num}
            type="text" placeholder="환불시 필수 입력사항"/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 mr-0.5 h-full">추가</button>
            <button type="submit" onClick={handleSubmit}
            className="bg-sky-700 text-white rounded-md px-6 h-full">전송</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <tr>
              <td width="20%">금액</td>
              <td width="20%">지출 코드</td>
              <td width="20%">날짜</td>
              <td width="20%">물품 일련번호</td>
              <td width="20%">개수</td>
            </tr>
          </thead>
          {enter?.map((item, index) => 
            <tbody align="center" key={index}>
              <tr>
                <td width="20%">{item.cost_size} 원</td>
                <td width="20%">{item.costcode}</td>
                <td width="20%">{item.time}</td>
                <td width="20%">{item.stock_id}</td>
                <td width="20%">{item.stock_num}</td>
              </tr>
            </tbody>
          )}
          <tfoot>
            <tr>
              <td>지출 합계: <span className="text-red-600">{sum} 원</span></td>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  )
}


export default function TransactionEnter() {
  const [type, setType] = useState("profit");
  const onChange = (event) => setType(event.target.value);
  const openWindow = () => {
    const options = 'top=10, left=10, width=400, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("/code","코드", options);
  }

  return (
  <div>
    <Seo title="입력"/>
    <main className="mx-96">
      <article>
        <div className="flex flex-row justify-between my-8">
          <div className="flex-col">
            <h1 className="text-2xl font-bold">거래내역입력</h1>
            <h1 className="text-xs text-gray-400">고객님의 해당 기간동안의 거래내역을 입력할 수 있습니다.</h1>
            <button onClick={openWindow}
            className="text-sm rounded-md">코드확인</button>
          </div>
          <div>
            <label htmlFor="type-select" className="px-4">거래 유형: </label>
            <select value={type} onChange={onChange} id="type-select">
              <option value="profit">수익 입력</option>
              <option value="spending">지출 입력</option>
            </select>
          </div>
        </div>
      </article>
      {type === "profit" ? <Profit /> : <Cost />}
    </main>
  </div>
  )
}