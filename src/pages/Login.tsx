import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/slices/accountSlice";
export default function Login() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  useEffect(() => {
    dispatch(getAllAccounts());
    if (alert) {
    setShow(true);
  }
  }, [dispatch, alert]);
  const account = useSelector((state: any) => {
    return state.account.users;
  });

  const handleLogin = () => {
    if (!account || !Array.isArray(account)) {
      setAlert({ type: "danger", message: "Dữ liệu người dùng chưa sẵn sàng" });
      return;
    }

    const isExist = account.find(
      (acc: any) =>
        acc.email === email.trim() && acc.password === password.trim()
    );

    if (isExist) {
      localStorage.setItem("isExist", JSON.stringify(true));
      setAlert({ type: "success", message: "Đăng nhập thành công" });
      setTimeout(() => {
        navigate("/projects");
      }, 4000);
    } else {
      setAlert({ type: "danger", message: "Email hoặc mật khẩu không đúng" });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        width: "100vw",
        height: "100vh",
        paddingTop: "100px",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: 300,
          zIndex: 9999,
          transform: show ? "translateX(0)" : "translateX(120%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {alert && (
          <Alert
            variant={alert.type}
            onClose={() => {
              setShow(false);
              setTimeout(() => setAlert(null), 300);
            }}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
      </div>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", padding: "20px", fontWeight: "600" }}>
          Đăng Nhập
        </h1>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              width: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              paddingTop: "10px",
            }}
          >
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Địa chỉ email"
                style={{ marginBottom: "20px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                placeholder="Mật Khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="button"
              variant="primary"
              style={{ marginTop: "15px", maxWidth: "120px", margin: "0 auto" }}
              onClick={handleLogin}
            >
              Đăng Nhập
            </Button>
          </form>

          <div>
            Chưa có tài khoản ?{" "}
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
