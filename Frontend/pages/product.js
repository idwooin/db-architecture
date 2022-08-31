import { useState } from "react";
import Seo from "../components/Seo";
import axios from "axios";
import { string } from "nunjucks/src/filters";
axios.defaults.withCredentials = true;

function Stock() {
  const [input, setInput] = useState({
    stuff_name: "",
    expired_date: "",
    stock_num: "",
    stock_id: "",
    new_stock_num: ""
  })
  const [result, setResult] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleCheck(e) {
    e.preventDefault();
    setResult([]);
    console.log("input: ", input);


    try {
      const res = await axios.get(
        `http://localhost:3001/stock?stuff_name=${input.stuff_name}`
      );
      setResult(res.data);
      console.log("test: ", res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePost(e) {
    e.preventDefault();

    const submit = {
      stuff_name: input.stuff_name,
      expired_date: input.expired_date,
      stock_num: input.stock_num
    }

    try {
      const res = await axios.post(`http://localhost:3001/stock`, submit).then(alert("물품 추가가 완료되었습니다."));
      console.log("result: ", res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePut(e) {
    e.preventDefault();
    
    const submit = {
      stock_id: input.stock_id,
      stock_num: input.new_stock_num
    }

    try {
      const res = await axios.put(`http://localhost:3001/stock`, submit).then(alert("재고량을 업데이트했습니다"))
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
        <div>
            <button onClick={handleCheck}
              className="bg-sky-700 text-white rounded-md px-6 h-full">조회</button>
          </div>
          <div className="flex flex-col w-32">
            <label className="">물품명</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
              type="text" placeholder="물품명" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">유통기한</label>
            <input name="expired_date" value={input.expired_date} onChange={onChange}
              type="text" placeholder="yyyy-mm-dd" />
          </div>
          <div className="flex flex-col w-48">
            <label className="">재고 설정하기</label>
            <input name="stock_num" value={input.stock_num} onChange={onChange}
              type="number" placeholder="재고량" />
          </div>
          <div>
            <button onClick={handlePost}
              className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
          </div>
          <div className="flex flex-col w-48">
            <label className="">재고id</label>
            <input name="stock_id" value={input.stock_id} onChange={onChange}
              type="number" placeholder="재고id" />
          </div>
          <div className="flex flex-col w-48">
            <label className="">재고량 입력</label>
            <input name="new_stock_num" value={input.new_stock_num} onChange={onChange}
              type="number" placeholder="새 재고량" />
          </div>
          <div>
            <button onClick={handlePut}
              className="bg-sky-700 text-white rounded-md px-6 h-full">수정</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="25%">제품id</td>
              <td width="25%">재고id</td>
              <td width="25%">유통기한</td>
              <td width="25%">재고량</td>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.stuff_id}</td>
                <td>{item.stock_id}</td>
                <td>{item.expired_date == null ? "" : (item.expired_date.substring(0, 10) + " " + item.expired_date.substring(11, 19))}</td>
                <td>{item.stock_num}</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  );
}

function BuyList() {
  const [input, setInput] = useState({
    startdate: "",
    enddate: "",
    buycode: "",
    age: "",
    sex: "",
    sumcode: "",
  })
  const [result, setResult] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(e) {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:3001/buy?startdate=${input.startdate}&enddate=${input.enddate}&buycode=${input.buycode}&age=${input.age}&sex=${input.sex}&sumcode=${input.sumcode}` 
    );
    if (input.sumcode === '0') {
      setResult(res.data);
    } else {
      alert("구매가격의 총합은 " + res.data[0].sumPrice + "원 입니다.");
    }
    console.log("result: ", res.data);
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col w-32">
            <label className="">시작 날짜</label>
            <input name="startdate" value={input.startdate} onChange={onChange}
              type="text" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-32">
            <label className="">종료 날자</label>
            <input name="enddate" value={input.enddate} onChange={onChange}
              type="text" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-32">
            <label className="">구매 코드</label>
            <input name="buycode" value={input.buycode} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-32">
            <label className="">나이</label>
            <input name="age" value={input.age} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-32">
            <label className="">성별</label>
            <input name="sex" value={input.sex} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-32">
            <label className="">결과 확인(0:리스트/1:구매총액)</label>
            <input name="sumcode" value={input.sumcode} onChange={onChange}
              type="number" placeholder="0 또는 1 입력" />
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
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="20%">물품id</td>
              <td width="20%">구매 코드</td>
              <td width="20%">가격</td>
              <td width="20%">구매 수량</td>
              <td width="20%">구매 시간</td>
            </tr>
          </thead>
          <tbody>
            {input.sumcode === '0' ? result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.stuff_id}</td>
                <td>{item.buycode}</td>
                <td>{item.price}</td>
                <td>{item.buy_num}</td>
                <td>{item.buy_date.substring(0, 10)}</td>
              </tr>
            ) : <tr></tr>}
          </tbody>
        </table>
      </article>
    </div>
  );
}

function Buy() {
  const [input, setInput] = useState({
    "buy_num": "",
    "buycode": "",
    "age": "",
    "sex": "",
    "time": "",
    "stuff_id": ""
  })
  const [enter, setEnter] = useState([]);
  console.log(enter);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.buy_num === "" || input.buycode === "" || input.age === "" || input.sex === "" || input.time === "" || input.stuff_id === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "buy_num": "",
      "buycode": "",
      "age": "",
      "sex": "",
      "time": "",
      "stuff_id": ""
    })

    console.log(enter);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(enter));

    try {
      const res = await axios.post(`http://localhost:3001/buy`, enter).then(alert("구매처리가 완료되었습니다"));
      console.log("result: ", res.data);
      setEnter([]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col w-24">
            <label className="">물품 개수</label>
            <input name="buy_num" value={input.buy_num} onChange={onChange}
              type="text" placeholder="물품 개수" />
          </div>
          <div className="flex flex-col w-24">
            <label className="">구매코드</label>
            <input name="buycode" value={input.buycode} onChange={onChange}
              type="text" placeholder="구매코드" />
          </div>
          <div className="flex flex-col w-24">
            <label className="">나이</label>
            <input name="age" value={input.age} onChange={onChange}
              type="text" placeholder="나이" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">성별</label>
            <input name="sex" value={input.sex} onChange={onChange}
              type="text" placeholder="남성: 0, 여성: 1" />
          </div>
          <div className="flex flex-col w-24">
            <label className="">날짜</label>
            <input name="time" value={input.time} onChange={onChange}
              type="date" placeholder="yyyy-mm-dd" />
          </div>
          <div className="flex flex-col">
            <label className="">물품id</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="text" placeholder="물품id" />
          </div>
          <div>
            <button onClick={handleClick} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md ml-1 px-6 h-full">확인</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
          <tr>
            <td width="16%">물품 개수</td>
            <td width="16%">구매 코드</td>
            <td width="16%">나이</td>
            <td width="16%">성별</td>
            <td width="16%">날짜</td> 
            <td width="16%">물품id</td>
          </tr>
          </thead>
          {enter?.map((item, index) =>
            <tbody align="center" key={index}>
              <tr>
                <td width="16%">{item.buy_num}</td>
                <td width="16%">{item.buycode}</td>
                <td width="16%">{item.age}</td>
                <td width="16%">{item.sex}</td>
                <td width="16%">{item.time}</td>
                <td width="16%">{item.stuff_id}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

function Enter() {
  const [input, setInput] = useState({
    "stuff_name": "",
    "stuffcode": "",
    "first_cost": "",
    "fixed_price": "",
    "provider": "",
    "auto_order_num": ""
  })
  const [enter, setEnter] = useState([]);
  console.log(enter);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.stuff_name === "" || input.stuffcode === "" || input.first_cost === "" || input.fixed_price === "" || input.provider === "" || input.auto_order_num === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "stuff_name": "",
      "stuffcode": "",
      "first_cost": "",
      "fixed_price": "",
      "provider": "",
      "auto_order_num": ""
    })

    console.log(enter);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(enter));

    try {
      const res = await axios.post(`http://localhost:3001/stuff/newitem`, enter).then(alert("물품을 추가했습니다"));
      console.log("result: ", res.data);
      setEnter([]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label className="">물품 명</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
              type="text" placeholder="물품 명" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">물품 코드</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="text" placeholder="물품 코드" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">원가</label>
            <input name="first_cost" value={input.first_cost} onChange={onChange}
              type="text" placeholder="원가" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">정가</label>
            <input name="fixed_price" value={input.fixed_price} onChange={onChange}
              type="text" placeholder="정가" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">제조사</label>
            <input name="provider" value={input.provider} onChange={onChange}
              type="text" placeholder="제조사" />
          </div>
          <div className="flex flex-col w-32">
            <label className="">자동발주 기준</label>
            <input name="auto_order_num" value={input.auto_order_num} onChange={onChange}
              type="text" placeholder="자동발주 기준" />
          </div>
          <div>
            <button onClick={handleClick} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md ml-1 px-6 h-full">확인</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <td width="16%">물품명</td>
            <td width="16%">물품 코드</td>
            <td width="16%">원가</td>
            <td width="16%">정가</td>
            <td width="16%">제조사</td>
            <td width="16%">자동발주 기준</td>
          </thead>
          {enter?.map((item, index) =>
            <tbody align="center" key={index}>
              <tr>
                <td width="16%">{item.stuff_name}</td>
                <td width="16%">{item.stuffcode}</td>
                <td width="16%">{item.first_cost}</td>
                <td width="16%">{item.fixed_price}</td>
                <td width="16%">{item.provider}</td>
                <td width="16%">{item.auto_order_num}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

function Check() {
  const [input, setInput] = useState({
    stuff_name: "",
    stuff_id: "",
    stuffcode: "",
  })
  const [result, setResult] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(e) {
    e.preventDefault();
    setResult([]);
    console.log("input: ", input);

    const res = await axios.get(
      `http://localhost:3001/stuff`, input
    );

    let a;

    if (input.stuff_name !== "") {
      // setResult(res.data.filter((item, index) => (input.stuff_name === item.stuff_name)));
      a = res.data.filter((item, index) => (input.stuff_name === item.stuff_name));
    } else {
      a = res.data;
    }
    if (input.stuff_id !== "") {
      // setResult(res.data.filter((item, index) => (input.stuff_id === string(item.stuff_id))));
      a = a.filter((item, index) => (input.stuff_id === string(item.stuff_id)));
    }
    if (input.stuffcode !== "") {
      // setResult(res.data.filter((item, index) => (input.stuffcode === string(item.stuffcode))));
      a = a.filter((item, index) => (input.stuffcode === string(item.stuffcode)));
    }
    setResult(a);
  }

  async function deleteStuff(e, id) {
    console.log(id);

    try {
      const res = await axios.delete(
        `http://localhost:3001/stuff/ditem`, {
        data: {
          stuff_id: id
        }
      }
      );

      alert("삭제되었습니다.");

      const { data } = await axios.get(
        `http://localhost:3001/stuff`, JSON.stringify(input)
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
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/3">
            <label className="">특정 물품 선택하기</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
              type="text" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col basis-1/3">
            <label className="">특정 물품id 선택하기</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col w-48">
            <label className="">특정 상품분류코드 선택하기</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
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
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="7%">물품id</td>
              <td width="9%">물품명</td>
              <td width="8%">상품분류코드</td>
              <td width="9%">원가</td>
              <td width="9%">정가</td>
              <td width="9%">제조사</td>
              <td width="9%">유통기한</td>
              <td width="9%">자동발주 실시 재고량</td>
              <td width="9%">생성일</td>
              <td width="9%">수정일</td>
              <td width="4%">삭제</td>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.stuff_id}</td>
                <td>{item.stuff_name}</td>
                <td>{item.stuffcode}</td>
                <td>{numberWithCommas(item.first_cost)}</td>
                <td>{numberWithCommas(item.fixed_price)}</td>
                <td>{item.provider}</td>
                <td>{item.expire_period}</td>
                <td>{item.auto_order_num}</td>
                <td>{item.createdAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td>{item.updatedAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td><button onClick={(e) => deleteStuff(e, item.stuff_id)}>삭제</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  );
}

function Revise() {
  const [input, setInput] = useState({
    "stuff_id": "",
    "auto_order_num": "",
    "stuffcode": "",
    "fixed_price": "",
  })
  const [enter, setEnter] = useState([]);
  console.log(enter);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.stuff_id === "" || input.auto_order_num === "" || input.stuffcode === "" || input.fixed_price === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "stuff_id": "",
      "auto_order_num": "",
      "stuffcode": "",
      "fixed_price": "",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(enter));

    try {
      const res = await axios.put(`http://localhost:3001/stuff/uitem`, enter).then(alert("물품정보를 업데이트했습니다"))
      console.log("result: ", res);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label className="">물품 번호</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="text" placeholder="물품id" />
          </div>
          <div className="flex flex-col">
            <label className="">자동발주 기준</label>
            <input name="auto_order_num" value={input.auto_order_num} onChange={onChange}
              type="text" placeholder="자동발주 기준" />
          </div>
          <div className="flex flex-col">
            <label className="">상품분류코드</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="text" placeholder="상품분류코드" />
          </div>
          <div className="flex flex-col">
            <label className="">정가</label>
            <input name="fixed_price" value={input.fixed_price} onChange={onChange}
              type="text" placeholder="정가" />
          </div>
          <div>
            <button onClick={handleClick} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md ml-1 px-6 h-full">확인</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <td width="25%">물품 번호</td>
            <td width="25%">자동발주 기준</td>
            <td width="25%">물품코드</td>
            <td width="25%">정가</td>
          </thead>
          {enter?.map((item, index) =>
            <tbody align="center" key={index}>
              <tr>
                <td width="25%">{item.stuff_id}</td>
                <td width="25%">{item.auto_order_num}</td>
                <td width="25%">{item.stuffcode}</td>
                <td width="25%">{item.fixed_price}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

export default function Product() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);
  const openWindow = () => {
    const options = 'top=10, left=10, width=400, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("/code","코드", options);
  }

  return (
    <div>
      <Seo title="물품" />
      <main className="mx-96">
        <article>
          <div className="flex flex-row justify-between my-8">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">물품 관리</h1>
              <h1 className="text-xs text-gray-400">물품 조회/추가/수정/삭제가 가능합니다.</h1>
              <button onClick={openWindow}
                className="text-sm rounded-md">코드확인</button>
            </div>
            <div>
              <label htmlFor="type-select" className="px-4">유형: </label>
              <select value={type} onChange={onChange} id="type-select">
                <option value="check">물품 조회</option>
                <option value="enter">물품 추가</option>
                <option value="revise">물품정보 수정</option>
                <option value="buy">물품구매 추가</option>
                <option value="buyList">물품구매 조회</option>
                <option value="stock">재고 관리</option>
              </select>
            </div>
          </div>
        </article>
        {type === "check" ? <Check /> : (type === "enter" ? <Enter /> : (type === "revise" ? <Revise /> : (type === "buy" ? <Buy /> : (type === "buyList" ? <BuyList /> : <Stock />))))}
      </main>
    </div>
  )
}