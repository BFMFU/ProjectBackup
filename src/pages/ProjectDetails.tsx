import {
  Card,
  Avatar,
  Space,
  Input,
  Row,
  Col,
  Collapse,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTasks, addTask, updateTask, deleteTask } from "../store/slices/taskSlice";
import { getAllProjects } from "../store/slices/projectSlice";
import { getAllAccounts } from "../store/slices/accountSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Search } = Input;
const { Panel } = Collapse;
function MyVerticallyCenteredModal(props: any) {
  const [taskName, setTaskName] = useState("");
  const [assigneeId, setAssigneeId] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  useEffect(()=>{
    if(props.task){
      setTaskName(props.task.taskName || "");
      setAssigneeId(props.task.assigneeId);
      setStatus(props.task.status || "");
      setStartDate(props.task.asignDate || "");
      setDueDate(props.task.dueDate || "");
      setPriority(props.task.priority || "");
      setProgress(props.task.progress || "");
    } else {
      setTaskName(""); setAssigneeId(undefined); setStatus(""); setStartDate(""); setDueDate(""); setPriority(""); setProgress("");
    }
  },[props.task]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm/Sửa nhiệm vụ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <Form.Group>
          <label>Tên nhiệm vụ</label>
          <TextField label="Tên nhiệm vụ" name="taskName" fullWidth value={taskName} onChange={(e)=>setTaskName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <label> Người phụ trách</label>
          <Form.Select style={{ height: "60px" }} value={assigneeId} onChange={(e:any)=>setAssigneeId(Number(e.target.value))}>
            <option value={""}>Chọn người phụ trách</option>
            <option value={1}>An Nguyễn</option>
            <option value={2}>Nguyễn Duy</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label> Trạng thái nhiệm vụ</label>
          <Form.Select style={{ height: "60px" }} value={status} onChange={(e:any)=>setStatus(e.target.value)}>
            <option value={""}>Chọn trạng thái nhiệm vụ</option>
            <option value={"To do"}>To do</option>
            <option value={"Pending"}>Pending</option>
            <option value={"In Progess"}>In Progess</option>
            <option value={"Done"}>Done</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label>Ngày bắt đầu</label>
          <input type="date" value={startDate} onChange={(e:any)=>setStartDate(e.target.value)} style={{height: "60px", width: "100%", padding: "10px", border: "1px solid #c4c4c4ad", borderRadius: "5px"}} />
        </Form.Group>
        <Form.Group>
          <label>Hạn cuối</label>
          <input type="date" value={dueDate} onChange={(e:any)=>setDueDate(e.target.value)} style={{height: "60px", width: "100%", padding: "10px", border: "1px solid #c4c4c4ad", borderRadius: "5px"}} />
        </Form.Group>
        <Form.Group>
          <label>Độ ưu tiên</label>
          <Form.Select style={{ height: "60px" }} value={priority} onChange={(e:any)=>setPriority(e.target.value)}>
            <option value={""}>Chọn độ ưu tiên</option>
            <option value={"Thấp"}>Thấp</option>
            <option value={"Trung bình"}>Trung bình</option>
            <option value={"Cao"}>Cao</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label>Tiến độ</label>
          <Form.Select style={{ height: "60px" }} value={progress} onChange={(e:any)=>setProgress(e.target.value)}>
            <option value={""}>Chọn tiến độ</option>
            <option value={"Đúng tiến độ"}>Đúng tiến độ</option>
            <option value={"Có rủi ro"}>Có rủi ro</option>
            <option value={"Trễ hạn"}>Trễ hạn</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={() => { if(props.onSave) props.onSave({ taskName, assigneeId, status, asignDate: startDate, dueDate, priority, progress }); props.onHide(); }}> Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ProjectContent(){
  const { id } = useParams();
  const projectId = Number(id);
  const dispatch: any = useDispatch();
  const allTasks = useSelector((state: any) => state.task.tasks || []);
  const [modalShow, setModalShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState<any>(null);

  useEffect(()=>{
    dispatch(getAllTasks());
    dispatch(getAllProjects());
    dispatch(getAllAccounts());
  },[dispatch]);

  const projects = useSelector((state:any)=> state.project.projects || []);
  const users = useSelector((state:any)=> state.account.users || []);

  const projectTasks = allTasks.filter((t: any) => Number(t.projectId) === projectId);
  const project = projects.find((p:any)=> Number(p.id) === projectId) || {};


  return (
    <div>
      <Header />
      <div style={{padding:24, minHeight:'90.6vh', maxWidth:'84%', margin:'0 auto'}}>
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={24} align="middle">
            <Col span={16}>
              <Row gutter={16}>
                <Col span={6} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <img
                    src={project.image || "https://via.placeholder.com/150x100.png?text=Project+Thumbnail"}
                    alt="project-thumbnail"
                    style={{ width: 150, height: 100, objectFit: 'cover', borderRadius: 8 }}
                  />
                </Col>
                <Col span={18} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 style={{ marginBottom: 8, fontSize: 20, fontWeight: 700 }}>{project.projectName || `Chi tiết dự án #${projectId}`}</h2>
                  <p style={{ marginBottom: 16, color: '#374151' }}>{project.description || "Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh toán và quản lý sản phẩm."}</p>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ margin: 0 }}>Thành viên</h3>
                <Button
                  variant="secondary"
                  style={{
                    width: "150px",
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #c4c4c4ad ",
                    fontSize: "14px",
                  }}
                >
                  <UserAddOutlined />
                  Thêm thành viên
                </Button>
              </div>
              <Space size="large">
                {(project.members || []).map((m: any) => {
                  const u = users.find((x: any) => Number(x.id) === Number(m.userId));
                  const initials = (u?.fullName || `U${m.userId}`).split(' ').map((s:string)=>s[0]).slice(0,2).join('').toUpperCase();
                  return (
                    <Space key={m.userId}>
                      <Avatar style={{ backgroundColor: "#1890ff" }}>{initials}</Avatar>
                      <div>
                        <b>{u?.fullName || `User ${m.userId}`}</b>
                        <div style={{ fontSize: 12, color: "#888" }}>{m.role}</div>
                      </div>
                    </Space>
                  );
                })}
                <Button
                  variant="secondary"
                  style={{
                    backgroundColor: "#E2E3E5",
                    color: "black",
                    border: "none",
                    borderRadius: "50%",
                    fontSize: "20px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  ...
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16, alignItems:'center'}}>
          <Button variant="primary" onClick={()=>{ setEditing(null); setModalShow(true); }}><PlusOutlined/> Thêm nhiệm vụ</Button>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <Select defaultValue="all" style={{ width: 150 }}>
              <Select.Option value="all">Sắp xếp theo</Select.Option>
              <Select.Option value="priority">Ưu tiên</Select.Option>
              <Select.Option value="date">Ngày</Select.Option>
            </Select>
            <Search placeholder="Tìm kiếm nhiệm vụ" style={{ width: 200 }} />
          </div>
        </div>

        <Card title="Danh Sách Nhiệm Vụ">
          <div className="task-table-header">
            <div className="header-col-task-name">Tên Nhiệm Vụ</div>
            <div className="header-col-assignee">Người Phụ Trách</div>
            <div className="header-col-priority">Ưu Tiên</div>
            <div className="header-col-start-date">Ngày Bắt Đầu</div>
            <div className="header-col-deadline">Hạn Chót</div>
            <div className="header-col-progress">Tiến độ</div>
            <div className="header-col-actions">Hành động</div>
          </div>

          {(() => {
            const statusOrder = ["To do", "Pending", "In Progess", "Done"];
            const formatDateShort = (d: any) => {
              if (!d) return '-';
              try {
                const dt = new Date(d);
                if (isNaN(dt.getTime())) return d;
                const mm = String(dt.getMonth() + 1).padStart(2, '0');
                const dd = String(dt.getDate()).padStart(2, '0');
                return `${mm} - ${dd}`;
              } catch (e) { return d; }
            };

            const priorityColor = (p: string) => {
              if (!p) return '#9CA3AF';
              if (p === 'Thấp') return '#60A5FA';
              if (p === 'Trung bình') return '#F59E0B';
              if (p === 'Cao') return '#EF4444';
              return '#9CA3AF';
            };

            return (
              <Collapse defaultActiveKey={statusOrder} style={{ borderRadius: 0, borderTop: 'none' }}>
                {statusOrder.map((group: string) => {
                  const groupTasks = projectTasks.filter((t: any) => String(t.status || 'Chưa phân loại') === group);
                  return (
                    <Panel header={group} key={group}>
                      <div>
                        {groupTasks.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: 12, color: '#888' }}>
                            Chưa có nhiệm vụ
                          </div>
                        ) : (
                          groupTasks.map((t: any) => {
                            const assignee = users.find((u: any) => Number(u.id) === Number(t.assigneeId));
                            return (
                              <div key={t.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <div className="header-col-task-name" style={{ flex: 3, textDecoration: t.status === 'Done' ? 'line-through' : 'none' }}>{t.taskName}</div>
                                <div className="header-col-assignee" style={{ flex: 1 }}>{assignee?.fullName || (t.assigneeId ? `User ${t.assigneeId}` : '-')}</div>
                                <div className="header-col-priority" style={{ flex: 1 }}>
                                  <span style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 12, background: priorityColor(t.priority), color: 'white', fontWeight: 600, fontSize: 12 }}>{t.priority || '-'}</span>
                                </div>
                                <div className="header-col-start-date" style={{ flex: 1 }}>
                                  <a style={{ color: '#1D4ED8', textDecoration: 'none' }}>{formatDateShort(t.asignDate)}</a>
                                </div>
                                <div className="header-col-deadline" style={{ flex: 1 }}>
                                  <a style={{ color: '#1D4ED8', textDecoration: 'none' }}>{formatDateShort(t.dueDate)}</a>
                                </div>
                                <div className="header-col-progress" style={{ flex: 1 }}>
                                  {(() => {
                                    const s = String(t.progress || t.status || '');
                                    // map Vietnamese progress values to classes
                                    const cls = s === 'Đúng tiến độ' ? 'badge badge--green' : s === 'Có rủi ro' ? 'badge badge--yellow' : s === 'Trễ hạn' ? 'badge badge--red' : (s ? 'badge badge--gray' : 'badge badge--gray');
                                    return <span className={cls}>{s || '-'}</span>;
                                  })()}
                                </div>
                                <div className="header-col-actions" style={{ flex: 1, display: 'flex', gap: 8, justifyContent: 'center' }}>
                                  <Button variant="warning" size="sm" onClick={()=>{ setEditing(t); setModalShow(true); }} style={{ backgroundColor: '#FFB020', borderColor: '#FFB020', color: '#111', padding: '6px 10px' }}><EditOutlined/> Sửa</Button>
                                  <Button variant="danger" size="sm" onClick={()=>{ setSelectedDelete(t); setShow(true); }} style={{ backgroundColor: '#EF4444', borderColor: '#EF4444', padding: '6px 10px' }}><DeleteOutlined/> Xóa</Button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>
            );
          })()}
        </Card>

        <MyVerticallyCenteredModal show={modalShow} task={editing} onHide={()=>setModalShow(false)} onSave={async (data:any)=>{
          try{
            if(editing && editing.id){
              await dispatch(updateTask({ id: editing.id, task: { ...editing, ...data } })).unwrap();
              toast.success('Cập nhật nhiệm vụ thành công');
            } else {
              await dispatch(addTask({ ...data, projectId })).unwrap();
              toast.success('Thêm nhiệm vụ thành công');
            }
            dispatch(getAllTasks());
          }catch(err){
            console.error(err);
            toast.error('Lỗi khi lưu nhiệm vụ');
          }
        }} />

        <Modal show={show} onHide={()=>setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Xác Nhận Xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc muốn xóa nhiệm vụ "{selectedDelete?.taskName}" ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>Hủy</Button>
            <Button variant="danger" onClick={async ()=>{
              try{
                if(selectedDelete) await dispatch(deleteTask(selectedDelete.id)).unwrap();
                toast.success('Xoá nhiệm vụ thành công');
                dispatch(getAllTasks());
              }catch(err){ console.error(err); toast.error('Xoá thất bại'); }
              finally{ setShow(false); setSelectedDelete(null); }
            }}>Xóa</Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer position="top-right" />
      </div>
      <Footer />
    </div>
  )
}
