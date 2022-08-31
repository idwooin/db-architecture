import Link from "next/link";
import Seo from "../components/Seo";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true

function Check() {
  const [deleteStaff, setDeleteStaff] = useState("");
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState([]);

  const onChangeName = (event) => {
    setDeleteStaff(event.target.value);
  };
  const onChangeSalary = (event) => {
    setSalary(event.target.value);
  }
  async function handleCheck(e) {
    e.preventDefault();
    try {
      const {data} = await axios.get(
        `http://localhost:3001/employee`
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
        `http://localhost:3001/employee`, {
          data: {
            employee_name: deleteStaff
          }
        }
      ).then(alert("삭제를 완료했습니다."));
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePatch(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/employee/salary`, {
            employee_name: deleteStaff,
            salary: salary
          }
      ).then(alert("급여 변경을 완료했습니다."));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="flex flex-row flex-wrap">
        <div className="flex border-2 rounded-md w-1/6 items-center justify-between mr-4">
          <div className="">직원 조회</div>
          <button onClick={handleCheck}
            className="bg-sky-700 text-white rounded-md px-4 h-12">조회</button>
        </div>
        <div className="flex flex-row border-2 rounded-md items-center justify-between">
          <form className="flex flex-row">
            <div className="flex flex-col mr-4 w-80">
              <label className="">직원 이름</label>
              <input name="deleteStaff" onChange={onChangeName} value={deleteStaff}
                  type="text" placeholder="삭제/ 급여를 변경할 직원이름을 입력해주세요."/>
            </div>
            <div className="flex flex-col mx-06 w-32">
              <label className="">변경할 급여</label>
              <input name="salary" onChange={onChangeSalary} value={salary}
                  type="text" placeholder="직원 삭제시 입력X"/>
            </div>
          </form>
          <button onClick={handleDelete}
            className="bg-sky-700 text-white rounded-md px-4 mr-1 h-12">삭제</button>
          <button onClick={handlePatch}
            className="bg-sky-700 text-white rounded-md px-4 h-12">급여 변경</button>
        </div>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="25%">직원 일련번호</td>
              <td width="25%">이름</td>
              <td width="25%">전화번호</td>
              <td width="25%">급여</td>
            </tr>
          </thead>
          {result?.map((item, index) => 
            <tbody key={index}>
              <tr>
                <td>{item.employee_id}</td>
                <td>{item.employee_name}</td>
                <td>{item.employee_phone}</td>
                <td>{item.salary}</td>
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
    employee_name:"",
    employee_phone:"",
    salary:"",
    id:"",
    pw:""
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
    if (input.id === "" || input.employee_name === "" || input.pw === "") {
      alert("직원이름 / ID / PW 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      employee_name:"",
      employee_phone:"",
      salary:"",
      id:"",
      pw:""
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      for (let i = 0; i < enter.length; i++){
        const response = await axios.post(
          `http://localhost:3001/employee`, enter[i]
        ).then(alert("서버에 전송완료."));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col w-32">
            <label className="">이름</label>
            <input name="employee_name" onChange={onChange} value={input.employee_name}
            type="text" placeholder="직원 이름"/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label>전화번호</label>
            <input name="employee_phone" onChange={onChange} value={input.employee_phone}
            type="text" placeholder="직원 전화번호"/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label>급여</label>
            <input name="salary" onChange={onChange} value={input.salary}
            type="number" placeholder="급여를 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label className="">직원 계정 ID</label>
            <input name="id" onChange={onChange} value={input.id}
            type="text" placeholder="ID를 입력해주세요."/>
          </div>
          <div className="flex flex-col basis-1/6">
            <label className="">직원 계정 PW</label>
            <input name="pw" onChange={onChange} value={input.pw}
            type="text" placeholder="PW를 입력해주세요."/>
          </div>
          <div>
            <button onClick={handleClick}
            className="bg-sky-700 text-white rounded-md px-4 mr-0.5 h-full">추가</button>
            <button onClick={handleSubmit}
            className="bg-sky-700 text-white rounded-md px-4 h-full">전송</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="20%">이름</td>
              <td width="20%">전화번호</td>
              <td width="20%">급여</td>
              <td width="20%">계정 ID</td>
              <td width="20%">계정 PW</td>
            </tr>
          </thead>
          {enter?.map((item, index) => 
            <tbody key={index}>
              <tr>
                <td>{item.employee_name}</td>
                <td>{item.employee_phone}</td>
                <td>{item.salary}</td>
                <td>{item.id}</td>
                <td>{item.pw}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

export default function Staff() {

  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);

  return (
  <div>
    <Seo title="직원 관리"/>
    <main className="mx-96">
      <article>
        <div className="flex flex-row justify-between my-8">
          <div className="flex-col">
            <h1 className="text-2xl font-bold">직원관리</h1>
            <h1 className="text-xs text-gray-400">직원 현황 조회 및 추가를 할 수 있습니다.</h1>
          </div>
          <div>
            <label htmlFor="type-select" className="px-4">유형: </label>
            <select value={type} onChange={onChange} id="type-select">
              <option value="check">직원 조회</option>
              <option value="enter">직원 추가</option>
            </select>
          </div>
        </div>
      </article>
      {type === "check" ? <Check /> : <Enter />}
    </main>
  </div>
  )
}

