import Link from "next/link";
import Seo from "../components/Seo";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function Check() {
  const [input, setInput] = useState({
    event_type:"",
    stuff_name:"",
    sortBy:"",
    limit:"",
    page:"",
  })
  const [result, setResult] = useState([]);
  const [eventId, setEventId] = useState("");

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const onChangeDelete = (event) => {
    setEventId(event.target.value);
  }

  async function handleClick(e) {
    e.preventDefault();
    // if (input.stuff_name === "" || input.event_type=== "") {
    //   alert("필수 사항을 입력해주세요.");
    //   return;
    // }
    setInput({
      event_type:"",
      stuff_name:"",
      sortBy:"",
      limit:"",
      page:"",
    });
    const url = `http://localhost:3001/event?event_type=${input.event_type.replace(/\+/g,"%2B")}&stuff_name=${input.stuff_name}&sortBy=${input.sortBy}&limit=${input.limit}&page=${input.page}`;

    try {
      const {data} = await axios.get(
        url
      );
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:3001/event?event_id=${eventId}`, {
          data: {
            event_id: eventId
          }
        }
      ).then(alert("삭제를 완료했습니다."));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/6">
            <label className="">이벤트 타입</label>
            <input name="event_type" value={input.event_type} onChange={onChange} 
            type="text" placeholder="이벤트 종류를 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label>품목</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
            type="text" placeholder="품목 이름을 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label>정렬</label>
            <input name="sortBy" value={input.sortBy} onChange={onChange}
            type="text" placeholder="asc/desc 둘 중 하나 입력."/>
          </div>
          <div className="flex flex-col w-32">
            <label>조회 개수</label>
            <input name="limit" value={input.limit} onChange={onChange}
            type="number" placeholder="선택사항입니다."/>
          </div>
          <div className="flex flex-col w-32">
            <label>조회 페이지수</label>
            <input name="page" value={input.page} onChange={onChange}
            type="number" placeholder="선택사항입니다."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 h-full">조회</button>
          </div>
        </form>
      </article>
      <article>
        <form className="flex flex-row mt-4 border-2 rounded-md w-fit">
          <div className="flex flex-col">
            <label>이벤트 번호</label>
            <input name="eventId" value={eventId} onChange={onChangeDelete}
            type="number" placeholder="삭제할 이벤트 번호 입력."/>
          </div>
          <div>
            <button onClick={handleDelete}
            className="bg-sky-700 text-white rounded-md px-6 h-full">삭제</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="">이벤트 번호</td>
              <td width="">이벤트 코드</td>
              <td width="">물품 번호</td>
              <td width="">물품</td>
              <td width="">할인가</td>
              <td width="">할인율</td>
              <td width="">시작 날짜</td>
              <td width="">종료 날짜</td>
            </tr>
          </thead>
          {result?.map((item, index) => 
            <tbody key={index}>
              <tr>
                <td width="10%">{item.id}</td>
                <td width="10%">{item.eventcode}</td>
                <td width="10%">{item.stuff_id}</td>
                <td width="10%">{item.stuff_name}</td>
                <td width="10%">{item.disprice}</td>
                <td width="10%">{item.disrate}</td>
                <td width="20%">{item.startdate}</td>
                <td width="20%">{item.enddate}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  );
}

function Enter() {
  const [input, setInput] = useState({
    stuff_name:"",
    disprice:"",
    disrate:"",
    startdate:"",
    enddate:"",
    event_type:""
  })
  const [enter, setEnter] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.stuff_name === "" || input.startdate=== "" || input.enddate === "") {
      alert("필수 사항을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      stuff_name:"",
      disrate:"",
      disprice:"",
      startdate:"",
      enddate:"",
      event_type:""
    })
    
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      for (let i = 0; i < enter.length; i++){
        const response = await axios.post(
          `http://localhost:3001/event`, enter[i]
        ).then(alert("서버에 전송완료."));
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-32">
            <label className="">품목</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange} 
            type="text" placeholder="품목 이름"/>
          </div>
          <div className="flex flex-col w-32">
            <label>할인가</label>
            <input name="disprice" value={input.disprice} onChange={onChange}
            type="number" placeholder="선택사항입니다."/>
          </div>
          <div className="flex flex-col w-32">
            <label className="">할인율</label>
            <input name="disrate" value={input.disrate} onChange={onChange} 
            type="number" placeholder="선택사항입니다."/>
          </div>
          <div className="flex flex-col">
            <label className="">이벤트 시작날짜</label>
            <input name="startdate" value={input.startdate} onChange={onChange} 
            type="date" placeholder="시작날짜를 입력해주세요."/>
          </div>
          <div className="flex flex-col">
            <label className="">이벤트 종료날짜</label>
            <input name="enddate" value={input.enddate} onChange={onChange} 
            type="date" placeholder="종료날짜를 입력해주세요."/>
          </div>
          <div className="flex flex-col">
            <label className="">이벤트 종류</label>
            <input name="event_type" value={input.event_type} onChange={onChange} 
            type="text" placeholder="이벤트 타입을 입력해주세요."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-6 mr-0.5 h-full">추가</button>
            <button onClick={handleSubmit}
            className="bg-sky-700 text-white rounded-md px-6 mr-0.5 h-full">전송</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="12.5%">품목</td>
              <td width="12.5%">할인가</td>
              <td width="12.5%">할인율</td>
              <td width="12.5%">시작 날짜</td>
              <td width="12.5%">종료 날짜</td>
              <td width="12.5%">이벤트 타입</td>
            </tr>
          </thead>
          {enter?.map((item, index) => 
            <tbody key={index}>
              <tr>
                <td>{item.stuff_name}</td>
                <td>{item.disprice}</td>
                <td>{item.disrate}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.event_type}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  );
}



export default function Event() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);
  const openWindow = () => {
    const options = 'top=10, left=10, width=400, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("/code","코드", options);
  }

  return (
  <div>
    <Seo title="이벤트"/>
    <main className="mx-96">
      <article>
        <div className="flex flex-row justify-between my-8">
          <div className="flex-col">
            <h1 className="text-2xl font-bold">이벤트</h1>
            <h1 className="text-xs text-gray-400">이벤트 물품 조회/등록을 할 수 있습니다.</h1>
            <button onClick={openWindow}
            className="text-sm rounded-md">코드확인</button>
          </div>
          <div>
            <label htmlFor="type-select" className="px-4">유형: </label>
            <select value={type} onChange={onChange} id="type-select">
              <option value="check">이벤트 조회</option>
              <option value="enter">이벤트 입력</option>
            </select>
          </div>
        </div>
      </article>
      {type === "check" ? <Check /> : <Enter />}
    </main>
  </div>
  )
}