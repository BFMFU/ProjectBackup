import {
  Button,
  Card,
  Avatar,
  Table,
  Tag,
  Space,
  Input,
  Row,
  Col,
  Collapse,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Option } from "antd/es/mentions";

const { Search } = Input;
const { Panel } = Collapse;

type Task = {
  id: number;
  name: string;
  assignee: string;
  priority: "Thấp" | "Trung bình" | "Cao";
  startDate: string;
  deadline: string;
  status: "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn";
};

const tasks: Record<string, Task[]> = {
  "To do": [
    {
      id: 1,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Thấp",
      startDate: "02-24",
      deadline: "02-27",
      status: "Đúng tiến độ",
    },
    {
      id: 2,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Trung bình",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
    },
    {
      id: 3,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Cao",
      startDate: "02-24",
      deadline: "02-27",
      status: "Trễ hạn",
    },
  ],
  "In Progress": [
    {
      id: 4,
      name: "Lên lịch họp kickoff",
      assignee: "An Nguyễn",
      priority: "Trung bình",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
    },
  ],
  Pending: [],
  Done: [],
};

function MyVerticallyCenteredModal(props: any) {
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
      <Modal.Body style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <Form.Group>
          <label>Tên nhiệm vụ</label>
          <TextField label="Tên nhiệm vụ" name="projectName" fullWidth />
        </Form.Group>
        <Form.Group>
          <label> Người phụ trách</label>
          <Form.Select style={{ height: "60px" }}>
            <option>Chọn người phụ trách</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label> Trạng thái nhiệm vụ</label>
          <Form.Select style={{ height: "60px" }}>
            <option>Chọn trạng thái nhiệm vụ</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label>Ngày bắt đầu</label>
          <input
            type="date"
            style={{
              height: "60px",
              width: "100%",
              padding: "10px",
              border: "1px solid #c4c4c4ad",
              borderRadius: "5px",
            }}
          />
        </Form.Group>
        <Form.Group>
          <label>Hạn cuối</label>
          <input
            type="date"
            style={{
              height: "60px",
              width: "100%",
              padding: "10px",
              border: "1px solid #c4c4c4ad",
              borderRadius: "5px",
            }}
          />
        </Form.Group>
        <Form.Group>
          <label>Độ ưu tiên</label>
          <Form.Select style={{ height: "60px" }}>
            <option>Chọn độ ưu tiên</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <label>Tiến độ</label>
          <Form.Select style={{ height: "60px" }}>
            <option>Chọn tiến độ</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Hủy</Button>
        <Button type="primary"> Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ProjectContent() {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const columns = [
    {
      dataIndex: "name",
    },
    {
      dataIndex: "assignee",
    },
    {
      dataIndex: "priority",
      render: (priority: string) => {
        let color =
          priority === "Cao"
            ? "red"
            : priority === "Trung bình"
            ? "orange"
            : "blue";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      dataIndex: "startDate",
    },
    {
      dataIndex: "deadline",
    },
    {
      dataIndex: "status",
      render: (status: string) => {
        let color =
          status === "Đúng tiến độ"
            ? "green"
            : status === "Trễ hạn"
            ? "red"
            : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      key: "action",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" size="small">
            Sửa
          </Button>
          <Button danger icon={<DeleteOutlined />} size="small" onClick={() => setShow(true)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "24px",
          minHeight: "90.6vh",
          maxWidth: "84%",
          margin: "0 auto",
        }}
      >
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={24} align="middle">
            <Col span={16}>
              <Row gutter={16}>
                <Row>
                  <h2 style={{ marginBottom: 8 }}>
                    Xây dựng website thương mại điện tử
                  </h2>
                </Row>
                <Row
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <img
                    src="https://via.placeholder.com/150x100.png?text=Project+Thumbnail"
                    alt="project-thumbnail"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <p style={{ marginBottom: 16 }}>
                    Dự án nhằm phát triển một nền tảng thương mại điện tử với
                    các tính năng như giỏ hàng, thanh toán và quản lý sản phẩm.
                  </p>
                </Row>
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
                  icon={<UserAddOutlined />}
                  type="dashed"
                  style={{ width: "150px" }}
                >
                  Thêm thành viên
                </Button>
              </div>
              <Space size="large">
                <Space>
                  <Avatar style={{ backgroundColor: "#1890ff" }}>AN</Avatar>
                  <div>
                    <b>An Nguyễn</b>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      Project owner
                    </div>
                  </div>
                </Space>
                <Space>
                  <Avatar style={{ backgroundColor: "#722ed1" }}>BA</Avatar>
                  <div>
                    <b>Bách Nguyễn</b>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      Frontend developer
                    </div>
                  </div>
                </Space>
                <Button shape="circle">...</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalShow(true)}
          >
            Thêm nhiệm vụ
          </Button>
          <Space>
            <Select defaultValue="all" style={{ width: 150 }}>
              <Option value="all">Sắp xếp theo</Option>
              <Option value="priority">Ưu tiên</Option>
              <Option value="date">Ngày</Option>
            </Select>
            <Search placeholder="Tìm kiếm nhiệm vụ" style={{ width: 200 }} />
          </Space>
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
          <Collapse
            defaultActiveKey={["0"]}
            style={{ borderRadius: "0", borderTop: "none" }}
          >
            {Object.entries(tasks).map(([group, groupTasks], index) => (
              <Panel header={group} key={index.toString()}>
                <Table
                  columns={columns}
                  dataSource={groupTasks}
                  pagination={false}
                  bordered
                  showHeader={false}
                />
                {groupTasks.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px",
                      color: "#888",
                    }}
                  >
                    Chưa có nhiệm vụ
                  </div>
                )}
              </Panel>
            ))}
          </Collapse>
        </Card>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa nhiệm vụ này ?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Hủy
          </Button>
          <Button type="primary" danger >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

      <Footer />
    </div>
  );
}
