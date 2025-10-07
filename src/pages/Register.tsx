import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAccount, getAllAccounts } from "../store/slices/accountSlice";
import { Alert } from "react-bootstrap";

export default function Register() {
  const dispatch:any = useDispatch();
  const navigate = useNavigate();

  const accounts = useSelector((state: any) => state.account.users);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  useEffect(() => {
    dispatch(getAllAccounts());
      if (alert) {
      setShow(true);
    }
    }, [alert]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
    return re.test(password);
  };

  const handleRegister = () => {
    setError(null);

    if (!fullName.trim()) {
      setError("Họ và tên không được để trống");
      return;
    }
    if (!email.trim()) {
      setError("Email không được để trống");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không đúng định dạng");
      return;
    }
    if (!password) {
      setError("Mật khẩu không được để trống");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Mật khẩu phải có ít nhất 1 ký tự số, 1 chữ thường, 1 chữ in hoa và dài hơn 6 ký tự"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    
    const emailExists = accounts?.some(
      (acc: any) => acc.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExists) {
      setError("Email đã tồn tại, vui lòng dùng email khác");
      return;
    }

    dispatch(
      addUserAccount({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password,
      }) as any
    );

    setAlert({ type: "success", message: "Đăng ký thành công" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1
          style={{ textAlign: "center", padding: "20px", fontWeight: "600" }}
        >
          Đăng Ký
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
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              width: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              paddingTop: "10px",
            }}
          >
            <Form.Control
              type="text"
              id="fullName"
              placeholder="Họ Và Tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Form.Control
              type="email"
              id="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              type="password"
              id="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control
              type="password"
              id="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </form>

          {error && (
            <div style={{ color: "red", fontWeight: "600" }}>{error}</div>
          )}

          <Button
            variant="primary"
            style={{ marginTop: "15px", maxWidth: "120px", margin: "0 auto" }}
            onClick={handleRegister}
          >
            Đăng Ký
          </Button>
          <div>
            Đã có tài khoản ?{" "}
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
