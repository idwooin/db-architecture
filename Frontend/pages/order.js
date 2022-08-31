import { useState } from "react";
import Seo from "../components/Seo";
import axios from "axios";
axios.defaults.withCredentials = true;

function Check() {
  const [result, setResult] = useState([]);

  async function handleClick(e) {
    e.preventDefault();
    setResult([]);

    try {
      const res = await axios.get(
        `http://localhost:3001/order`
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteStuff(e, id) {
    console.log(id);

    try {
      const res = await axios.delete(
        `http://localhost:3001/order/` + id, {
        data: {
          order_id: id
        }
      }
      );

      alert("삭제되었습니다.");

      const { data } = await axios.get(
        `http://localhost:3001/order`
      );
      setResult(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <article className="">
        <div>
          <button onClick={handleClick}
          className="bg-sky-700 text-white rounded-md py-2.5 px-6 w-28">조회하기</button>
        </div>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="16%">발주id</td>
              <td width="16%">발주 개수</td>
              <td width="16%">비용</td>
              <td width="16%">시간</td>
              <td width="16%">물품id</td>
              <td width="16%">지점코드</td>
              <td width="4%">삭제</td>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.order_id}</td>
                <td>{item.order_num}</td>
                <td>{numberWithCommas(item.order_cost)}</td>
                <td>{item.order_date.substring(0, 10) + " " + item.order_date.substring(11, 19)}</td>
                <td>{item.stuff_id}</td>
                <td>{item.branch_id}</td>
                <td><button onClick={(e) => deleteStuff(e, item.order_id)}>삭제</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  );
}

function Submit() {
  const [input, setInput] = useState({
    order_num: "",
    stuff_id: "",
  })

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleSubmit(e) {
    try {
      const res = await axios.post(`http://localhost:3001/order`, input).then(alert("발주처리가 완료되었습니다"));
      console.log("result: ", res.data);
      const { data } = await axios.get(
        `http://localhost:3001/order`
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/3">
            <label className="">발주 수량</label>
            <input name="order_num" value={input.order_num} onChange={onChange}
              type="text" placeholder="발주 수량을 입력해주세요." />
          </div>
          <div className="flex flex-col basis-1/3">
            <label className="">물품 번호</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="text" placeholder="물품번호를 입력해주세요." />
          </div>
          <div>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
          </div>
        </form>
      </article>
    </div>
  )
}

function Check2(){
  const [result, setResult] = useState([]);

  async function handleSubmit2(e) {
    e.preventDefault();
    setResult([]);
    try {
      const res = await axios.get(`http://localhost:3001/order/necessary`)
      console.log("result: ", res.data);
      setResult(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <div>
      <article className="">
        <div>
          <button onClick={handleSubmit2} className="bg-sky-700 text-white rounded-md py-2.5 px-6 w-28">조회하기</button>
        </div>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="16%">재고id</td>
              <td width="16%">재고개수</td>
              <td width="16%">유통기한</td>
              <td width="16%">물품id</td>
              <td width="16%">지점코드</td>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.stock_id}</td>
                <td>{item.stock_num}</td>
                <td>{(item.expired_date == null) ? "":(item.expired_date.substring(0, 10) + " " + item.expired_date.substring(11, 19))}</td>
                <td>{item.stuff_id}</td>
                <td>{item.branch_id}</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  )
}

export default function Order() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);
  const openWindow = () => {
    const options = 'top=10, left=10, width=400, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("/code", "코드", options);
  }

  return (
    <div>
      <Seo title="발주" />
      <main className="mx-96">
        <article>
          <div className="flex flex-row justify-between my-8">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">발주 신청/조회</h1>
              <h1 className="text-xs text-gray-400">발주 신청과 조회가 가능합니다.</h1>
              <button onClick={openWindow}
                className="text-sm rounded-md">코드확인</button>
            </div>
            <div>
              <label htmlFor="type-select" className="px-4">유형: </label>
              <select value={type} onChange={onChange} id="type-select">
                <option value="check">발주기록 조회</option>
                <option value="enter">발주 신청</option>
                <option value="check2">발주요망물품 조회</option>
              </select>
            </div>
          </div>
        </article>
        {type === "check" ? <Check /> : (type === "enter"? <Submit />: <Check2/>)}
      </main>
    </div>
  )
}