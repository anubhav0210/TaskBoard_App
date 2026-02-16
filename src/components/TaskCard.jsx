// TaskCard.jsx
// Task card now draggable

import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import { useDraggable } from "@dnd-kit/core";
import { Card, Button, Typography, Popconfirm } from "antd";

const { Paragraph, Text, Title } = Typography;

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);

  // Make task draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const transformStyle = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div ref={setNodeRef} style={transformStyle} {...listeners} {...attributes}>
      <Card className="neo-card task-card" size="small">
        {editing ? (
          <TaskForm existingTask={task} closeForm={() => setEditing(false)} />
        ) : (
          <>
            <Title level={5} style={{ margin: 0 }}>{task.title}</Title>
            <Paragraph style={{ margin: '8px 0', color: 'var(--muted)' }}>{task.description}</Paragraph>
            <div className="neo-flex" style={{ justifyContent: 'space-between' }}>
              <Text type="secondary">Priority: {task.priority}</Text>
              <Text type="secondary">Due: {task.dueDate || "No due date"}</Text>
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Button type="default" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Popconfirm
                title="Delete Task"
                description={`Are you sure you want to delete "${task.title}"?`}
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default TaskCard;
