// ActivityLog.jsx
// Displays latest actions

import { useTasks } from "../context/TaskContext";

function ActivityLog() {
  const { activityLog } = useTasks();

  return (
    <div className="activity-log">
      <h3>Activity Log</h3>

      {activityLog.length === 0 && <p>No activity yet</p>}

      {activityLog.map((log) => (
        <p key={log.id}>
          [{log.time}] {log.message}
        </p>
      ))}
    </div>
  );
}

export default ActivityLog;
