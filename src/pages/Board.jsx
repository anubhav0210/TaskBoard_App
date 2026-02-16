// Board.jsx
// Main task board layout

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import Column from "../components/Column";
import { DndContext } from "@dnd-kit/core";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";
import { Layout, Button, Input, Select, Space, Row, Col, Card } from "antd";

const { Content } = Layout;
const { Search } = Input;

function Board() {
  const { logout } = useAuth();
  const { resetBoard, moveTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  // Search / Filter / Sort state
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If dropped outside any column
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    moveTask(taskId, newStatus);
  };

  return (
    <Layout className="app-root board-container">
      <Content>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Task Board</h2>

          <Space>
            <Button onClick={logout}>Logout</Button>
            <Button type="primary" onClick={() => setShowForm(true)}>Add Task</Button>
            <Button danger onClick={resetBoard}>Reset</Button>
          </Space>
        </div>

        <Card className="neo-card" style={{ marginTop: 16 }}>
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={12} md={10} lg={8}>
              <Search placeholder="Search by title" allowClear value={search} onChange={(e) => setSearch(e.target.value)} />
            </Col>

            <Col xs={12} sm={6} md={4} lg={4}>
              <Select value={filterPriority} onChange={(v) => setFilterPriority(v)} style={{ width: '100%' }}>
                <Select.Option value="All">All Priorities</Select.Option>
                <Select.Option value="Low">Low</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="High">High</Select.Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4} lg={4}>
              <Select value={sortOrder} onChange={(v) => setSortOrder(v)} style={{ width: '100%' }}>
                <Select.Option value="">No Sort</Select.Option>
                <Select.Option value="asc">Due Date Asc</Select.Option>
                <Select.Option value="desc">Due Date Desc</Select.Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {showForm && <TaskForm closeForm={() => setShowForm(false)} />}

        {/* Drag & Drop Context */}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="columns" style={{ marginTop: 18 }}>
            <Column
              status="Todo"
              search={search}
              filterPriority={filterPriority}
              sortOrder={sortOrder}
            />
            <Column
              status="Doing"
              search={search}
              filterPriority={filterPriority}
              sortOrder={sortOrder}
            />
            <Column
              status="Done"
              search={search}
              filterPriority={filterPriority}
              sortOrder={sortOrder}
            />
          </div>
        </DndContext>

        <ActivityLog />
      </Content>
    </Layout>
  );
}

export default Board;
