import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getAllProjects, updateProject, deleteProject } from "../store/slices/projectSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProjectManager() {
  const [search, setSearch] = useState("");
  const dispatch: any = useDispatch();
  const projects = useSelector((state: any) => state.project.projects || []);

  function MyVerticallyCenteredModal(props: any) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset";

    async function uploadToCloudinary(file: File) {
      if (!file) return "";
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await fetch(url, { method: "POST", body: formData });
        const data = await res.json();
        return data.secure_url || data.url || "";
      } catch (err) {
        console.error("Cloudinary upload error", err);
        return "";
      }
    }
    const [description, setDescription] = useState("");
    useEffect(()=>{
      if(props.project){
        setName(props.project.projectName || "");
        setImage(props.project.image || "");
        setDescription(props.project.description || "");
      } else {
        setName("");
        setImage("");
        setDescription("");
      }
    },[props.project]);
    return (
      
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm/Sửa dự án
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField label="Tên Dự Án" name="projectName" fullWidth value={name} onChange={(e)=>setName(e.target.value)} />
          <div>
            <label style={{display: 'block', marginBottom: 8}}>Ảnh đại diện</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                setUploading(true);
                const uploadedUrl = await uploadToCloudinary(file);
                if (uploadedUrl) setImage(uploadedUrl);
                setUploading(false);
              }}
            />
            {uploading && <div style={{marginTop:8}}>Đang tải ảnh lên...</div>}
            {image && (
              <img src={image} alt="preview" style={{width: '100%', maxHeight: 180, objectFit: 'cover', marginTop: 8, borderRadius: 6}} />
            )}
          </div>
          <TextField label="Mô tả" name="description" fullWidth multiline rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" disabled={uploading} onClick={() => {
            if(props.onSave) props.onSave({ projectName: name, image, description });
            props.onHide();
          }}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const navigate = useNavigate();
  const filtered = projects.filter((p: any) =>
    (p.projectName || "").toLowerCase().includes(search.toLowerCase())
  );
  const [modalShow, setModalShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<any>(null);

  const handleClose = () => setShow(false);
 
  useEffect(()=>{
    dispatch(getAllProjects());
  },[dispatch]);

  return (
    <div>
      <Header></Header>
      <div
        style={{
          backgroundColor: "#f9fafb",
          height: "90.6vh",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "6px",
            maxWidth: "84%",
            margin: "0 auto",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Quản Lý Dự Án Nhóm
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <Button variant="primary" onClick={() => { setEditing(null); setModalShow(true); }}>
              + Thêm dự án
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              project={editing}
              onSave={async (data: any) => {
                try{
                  if(editing && editing.id){
                    await dispatch(updateProject({ id: editing.id, project: { ...editing, projectName: data.projectName, image: data.image, description: data.description } })).unwrap();
                    toast.success('Cập nhật dự án thành công');
                  } else {
                    await dispatch(addProject({ projectName: data.projectName, image: data.image, description: data.description })).unwrap();
                    toast.success('Thêm dự án thành công');
                  }
                } catch (err){
                  console.error(err);
                  toast.error('Có lỗi xảy ra khi lưu dự án');
                }
              }}
              onHide={() => setModalShow(false)}
            />
            <input
              type="text"
              placeholder="Tìm kiếm dự án"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                padding: "6px 10px",
                width: "220px",
              }}
            />
          </div>
          <div>
            <h4>Danh sách dự án</h4>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#111827", color: "white" }}>
                <th style={{ padding: "10px", textAlign: "center" }}>ID</th>
                <th
                  style={{ padding: "10px", textAlign: "left", width: "70%" }}
                >
                  Tên Dự Án
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center", width: "20%" }}
                >
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {p.id}
                  </td>
                  <td style={{ padding: "10px", width: "70%" }}>{p.projectName}</td>
                  <td
                    style={{
                      padding: "10px",
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="warning" onClick={() => { setEditing(p); setModalShow(true); }}>Sửa</Button>
                    <Button variant="danger" onClick={() => { setSelectedToDelete(p); setShow(true); }}>Xoá</Button>
                    <Button variant="primary" onClick={()=>navigate(`/projects/${p.id}`)}>Chi tiết</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "6px" }}
          >
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "white",
              }}
            >
              {"<"}
            </button>
            <button
              style={{
                border: "1px solid #2563eb",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              1
            </button>
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "4px 10px",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
            >
              2
            </button>
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "4px 10px",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
            >
              3
            </button>
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "white",
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer position="top-right" />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa dự án "{selectedToDelete?.projectName}" ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="danger" onClick={async ()=>{
            if(!selectedToDelete) return;
            try{
              await dispatch(deleteProject(selectedToDelete.id)).unwrap();
              toast.success('Xoá dự án thành công');
            } catch(err){
              console.error(err);
              toast.error('Xoá dự án thất bại');
            } finally {
              setShow(false);
              setSelectedToDelete(null);
            }
          }}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
