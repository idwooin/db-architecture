import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  if (router.pathname === "/code") return null;


  return (
    <div>
      <h1 className="text-xs center bottom-3">서울시립대 데이터베이스 프로젝트 ©2022 Created by 원우인, 이대현, 이현민</h1>
      <style jsx>{`
        .center {
          position: fixed;
          left: 50%;
          transform: translate(-50%, 0);
        }
      `}</style>
    </div>
  )
}