import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate();
  return (
    <header
      style={{
        backgroundColor: "#212529",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "48px",
        padding: "0 24px",
      }}
    >
      <h1 style={{ fontWeight: "bold", fontSize: "18px" , marginBottom:"0", marginLeft:"8%", cursor:"pointer"}} onClick={()=>navigate("/projects")}>Quản Lý Dự Án</h1>

      <nav style={{ display: "flex", gap: "24px" , marginRight:"8%"}}>
        <a
          href="/projects"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Dự Án
        </a>
        <a
          href="#"
          style={{
            color: "#d1d5db",
            textDecoration: "none",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.textDecoration = "none";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#d1d5db";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          Nhiệm vụ của tôi
        </a>
        <a
          href="/login"
          style={{
            color: "#d1d5db",
            textDecoration: "none",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.textDecoration = "none";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#d1d5db";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          Đăng Xuất
        </a>
      </nav>
    </header>
  );
}
