import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    localStorage.removeItem("isExist");
    navigate("/login");
  };
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
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "0",
          marginLeft: "8%",
          cursor: "pointer",
        }}
        onClick={() => navigate("/projects")}
      >
        Quản Lý Dự Án
      </h1>

      <nav style={{ display: "flex", gap: "24px", marginRight: "8%" }}>
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
        <button
          onClick={handleShow}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Đăng Xuất
        </button>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Đăng Xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn xác nhận có muốn đăng xuất hay không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={()=>{handleLogout(); handleClose();}}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}
