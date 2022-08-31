import Link from "next/link";
import Seo from "../components/Seo";
import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true

function Check() {
  const [input, setInput] = useState({
    startd:"",
    endd:""
  })
  const [result, setResult] = useState([]);
  console.log(result);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(e) {
    e.preventDefault();
    if (input.startd === "" || input.endd === "") {
      alert("필수 사항을 입력해주세요.");
      return;
    }
    setInput({
      startd:"",
      endd:""
    });

    try {
      const {data} = await axios.get(
        `http://localhost:3001/commute?startd=${input.startd}&endd=${input.endd}`
      );
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(result);

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/6">
            <label className="">시작 날짜</label>
            <input name="startd" value={input.startd} onChange={onChange} 
            type="date" placeholder="출근 시각을 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label>종료 날짜</label>
            <input name="endd" value={input.endd} onChange={onChange}
            type="date" placeholder="퇴근 시각을 입력해주세요."/>
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
              <td width="33%">직원 일련번호</td>
              <td width="33%">출근 시각</td>
              <td width="33%">퇴근 시각</td>
            </tr>
          </thead>
          {result?.map((item, index) => 
            <tbody key={index}>
              <tr>
                <td width="33%">{item.employee_id}</td>
                <td width="33%">{item.commute_start}</td>
                <td width="33%">{item.commute_end}</td>
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
    startd:"",
    endd:"",
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
    if (input.startd=== "" || input.endd === "") {
      alert("필수 사항을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      startd:"",
      endd:"",
    })
    
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      for (let i = 0; i < enter.length; i++){
        const response = await axios.post(
          `http://localhost:3001/commute`, enter[i]
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
            <label className="">출근 시각</label>
            <input className="w-48"
            name="startd" value={input.startd} onChange={onChange} 
            type="datetime-local" placeholder="출근 시각을 입력해주세요."/>
          </div>
          <div className="flex flex-col w-32">
            <label>퇴근 시각</label>
            <input className="w-48"
            name="endd" value={input.endd} onChange={onChange}
            type="datetime-local" placeholder="퇴근 시각을 입력해주세요."/>
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
          <thead align="center" className="border-y-2 border-sky-700">
            <tr>
              <td width="40%">출근 시각</td>
              <td width="40%">퇴근 시각</td>
            </tr>
          </thead>
          {enter?.map((item, index) => 
            <tbody align="center" key={index}>
              <tr>
                <td>{item.startd}</td>
                <td>{item.endd}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  );
}



export default function Commute() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);

  return (
  <div>
    <Seo title="출근/퇴근"/>
    <main className="mx-96">
      <article>
        <div className="flex flex-row justify-between my-8">
          <div className="flex-col">
            <h1 className="text-2xl font-bold">출근/퇴근</h1>
            <h1 className="text-xs text-gray-400">출근/퇴근 입력과 조회가 가능합니다.</h1>
          </div>
          <div>
            <label htmlFor="type-select" className="px-4">유형: </label>
            <select value={type} onChange={onChange} id="type-select">
              <option value="check">출근/퇴근 조회</option>
              <option value="enter">출근/퇴근 입력</option>
            </select>
          </div>
        </div>
      </article>
      {type === "check" ? <Check /> : <Enter />}
    </main>
  </div>
  )
}
