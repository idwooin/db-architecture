import Link from "next/link";
import Seo from "../components/Seo";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {

  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (item) => {
    item.preventDefault();
    if (!window) return;
    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const submit = {
        id: userId,
        password: password
      }

      try {
        const res = await axios.post(
          `http://localhost:3001/auth/login`, submit
        );
        console.log("res: ", res);
        if(res.status === 200) {
          alert("로그인에 성공했습니다.");
        }
        window.location.replace("http://localhost:3000");
      } catch (err) {
        alert("로그인에 실패했습니다.");
        console.log(err);
      }
    } catch (item) {
      console.error(item);
    }
  }

  return (
    <div className="">
      <div className="flex flex-col items-center center pt-16">
        <Seo title="로그인" />
        <div className="w-2/5">
          <Link href="/">
            <a><img className=""src="logo.jpg" alt=""/></a>
          </Link>
        </div>
        <div className="">
          <div className="">
            <form className="flex flex-col w-96">
              <label className="py-4" htmlFor="">로그인</label>
              <input className="rounded-md py-2 border border-zinc-200"
              value={userId}
              onChange={(item) => setUserId(item.target.value)}
              type="text" placeholder="아이디"/>
              <input className="rounded-md py-2 border border-zinc-200"
              value={password}
              onChange={(item) => setPassword(item.target.value)} 
              type="text" placeholder="비밀번호"/>
              <button onClick={handleLogin}
              className="bg-sky-900 text-white rounded-md py-2 my-8 bold" type="submit">로그인</button>
            </form>
          </div>
        </div>
        <style jsx>{`
        .center {
          position: fixed;
          top: 5%;
          left: 50%;
          transform: translate(-50%, 0);
        }
        input:focus{
          border-color:#0D4A6E;
          outline: none;
      }
      `}</style>
      </div>
    </div>
  )
}