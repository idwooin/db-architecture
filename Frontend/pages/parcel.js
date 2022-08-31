import { useState } from "react";
import Seo from "../components/Seo";
import axios from "axios";
import { filter } from "async";
axios.defaults.withCredentials = true;

function Check() {
  const [input, setInput] = useState({
    branch: "",
    package_type: "",
    sortBy: "asc",
    limit: "",
    page: ""
  })
  const [result, setResult] = useState([]);
  const [print, setPrint] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(e) {
    e.preventDefault();
    
    const res = await axios.get(
      `http://localhost:3001/package`, input
    );
    
    if (input.package_type !== "") {
      setResult(res.data.filter((item, index)=> (input.package_type === "택배" ? (item.pakage_type !== 2) : (item.pakage_type !== 1))));
    } else {
      setResult(res.data);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/3">
            <label className="">배송 지점</label>
            <input name="branch" value={input.branch} onChange={onChange}
              type="text" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col basis-1/3">
            <label className="">택배 종류</label>
            <select name="package_type" value={input.package_type} onChange={onChange}>
              <option value="">선택하기</option>
              <option value="택배">택배</option>
              <option value="반값택배">반값택배</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="">정렬</label>
            <select name="sortBy" value={input.sortBy} onChange={onChange}>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
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
              <td width="25%">날짜</td>
              <td width="25%">주소</td>
              <td width="25%">비용</td>
              <td width="25%">종류</td>
            </tr>
          </thead>
          {input.sortBy === "asc" ? <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.createdAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td>{item.s_address}</td>
                <td>{item.package_price}</td>
                <td>{item.pakage_type === 1 ? "택배" : "반값택배"}</td>
              </tr>
            )}
          </tbody> : <tbody>
            {result?.reverse().map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.createdAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td>{item.s_address}</td>
                <td>{item.package_price}</td>
                <td>{item.pakage_type === 1 ? "택배" : "반값택배"}</td>
              </tr>
            )}
          </tbody>}
        </table>
      </article>
    </div> 
  );
}

function Enter() {
  const [input, setInput] = useState({
    branch: "",
    weight: "",
    b_phone: "",
    b_name: "",
    b_address: "",
    s_phone: "",
    s_address: "",
    s_name: "",
    commision: "",
    package_price: "",
    package_type: "택배"
  })

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input)

    try {
      const res = await axios.post(`http://localhost:3001/package`, input).then(alert("운송장 정보를 기록했습니다"));
      console.log("result: ", res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/7">
            <label className="">지점</label>
            <input name="branch" value={input.branch} onChange={onChange}
              type="text" placeholder="지점 명" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">배송 정보</label>
            <input name="b_phone" value={input.b_phone} onChange={onChange}
              type="text" placeholder="연락처(-없이)" />
            <input name="b_name" value={input.b_name} onChange={onChange}
              type="text" placeholder="이름" />
            <input name="b_address" value={input.b_address} onChange={onChange}
              type="text" placeholder="주소" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">수송 정보</label>
            <input name="s_phone" value={input.s_phone} onChange={onChange}
              type="text" placeholder="연락처(-없이)" />
            <input name="s_name" value={input.s_name} onChange={onChange}
              type="text" placeholder="이름" />
            <input name="s_address" value={input.s_address} onChange={onChange}
              type="text" placeholder="주소" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">택배 정보</label>
            <select name="package_type" value={input.package_type} onChange={onChange}>
              <option value="택배">택배</option>
              <option value="반값택배">반값택배</option>
            </select>
            <input name="weight" value={input.weight} onChange={onChange}
              type="number" placeholder="택배 무게(kg)" />
            <input name="commision" value={input.commision} onChange={onChange}
              type="number" placeholder="업체 수수료" />
            <input name="package_price" value={input.package_price} onChange={onChange}
              type="number" placeholder="배송비" />
          </div>
          <div>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
          </div>
        </form>
      </article>
    </div>
  )
}

export default function Parcel() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);

  return (
    <div>
      <Seo title="택배" />
      <main className="mx-96">
        <article>
          <div className="flex flex-row justify-between my-8">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">택배 운송장 입력/조회</h1>
              <h1 className="text-xs text-gray-400">운송장 입력과 조회가 가능합니다.</h1>
            </div>
            <div>
              <label htmlFor="type-select" className="px-4">유형: </label>
              <select value={type} onChange={onChange} id="type-select">
                <option value="check">운송장 조회</option>
                <option value="enter">운송장 입력</option>
              </select>
            </div>
          </div>
        </article>
        {type === "check" ? <Check /> : <Enter />}
      </main>
    </div>
  )
}