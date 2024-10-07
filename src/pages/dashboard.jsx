import React from "react"

const Dashboard = () => {
  return (
    <div className="dashboard max-w-[1200px] mx-auto">
      <h1>Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can find an overview of your
        activities and statistics.
      </p>
      <div className="stats">
        <h2>Your Stats</h2>
        <ul>
          <li>Total Projects: 5</li>
          <li>Completed Tasks: 20</li>
          <li>Pending Tasks: 3</li>
        </ul>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Task "Design Mockup" completed.</li>
          <li>Project "Website Redesign" started.</li>
          <li>Task "Write Documentation" pending.</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
