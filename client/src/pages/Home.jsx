import { Link, Navigate } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to={"/auth/login"}>Trang login</Link>
      Home
    </div>
  );
}
