import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();
  if (router.pathname === "/login" || router.pathname === "/code") return null

  return (
    <>
      <div className="flex flex-row items-center justify-between my-4 mx-8">
        <Link href="/">
          <a><img className="w-28"src="logo.jpg" alt=""/></a>
        </Link>
        <div className="flex flex-row">
          <Link href="/login">
            <a className="mx-8">로그인</a>
          </Link>
          <Link href="/order">
          <a>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M14.857 4.571L16 16H0L1.143 4.571h2.286v-.146a4.263 4.263 0 011.3-3.125A4.263 4.263 0 017.854 0h.286a4.263 4.263 0 013.125 1.3 4.263 4.263 0 011.3 3.125v.143zM4.571 4.425v.143h6.857v-.143a3.165 3.165 0 00-.964-2.321 3.164 3.164 0 00-2.321-.964h-.286a3.165 3.165 0 00-2.321.964 3.165 3.165 0 00-.965 2.321zM1.286 14.857h13.428l-.893-9.143h-1.25V7a1.119 1.119 0 01.571 1 1.112 1.112 0 01-.321.821 1.112 1.112 0 01-.821.321 1.112 1.112 0 01-.821-.321A1.112 1.112 0 0110.858 8a1.119 1.119 0 01.571-1V5.714H4.571V7a1.119 1.119 0 01.571 1 1.112 1.112 0 01-.321.821A1.112 1.112 0 014 9.143a1.112 1.112 0 01-.821-.321 1.112 1.112 0 01-.321-.821 1.119 1.119 0 01.571-1V5.715h-1.25zm0 0" fill="#545454"></path></svg>
          </span>
          </a>
          </Link>
        </div>
      </div>
    </>
  )
}