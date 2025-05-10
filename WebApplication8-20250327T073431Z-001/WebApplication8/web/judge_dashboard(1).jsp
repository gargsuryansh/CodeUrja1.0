<!DOCTYPE html>
<html>
<head>
    <title>Judge Dashboard</title>
    <style>body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.navbar {
    display: flex;
    justify-content: space-between;
    background-color: #ffcc00;
    padding: 15px;
}

.navbar .logo {
    font-weight: bold;
    font-size: 20px;
}

.navbar .nav-links a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
}

.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #1a2b4c;
    color: white;
    position: fixed;
    padding: 20px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    margin: 20px 0;
}

.sidebar ul li a {
    color: white;
    text-decoration: none;
}

.main-content {
    margin-left: 270px;
    padding: 20px;
}

.dashboard-cards {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.case-summary {
    margin-top: 30px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.case-summary table {
    width: 70%;
    border-collapse: collapse;
    margin-top: 10px;
    padding-left: 500px;
    margin-left: 100px; 
}

.case-summary table, th, td {
    border: 1px solid #ddd;
    padding: 10px;
}

th {
    background-color: #ffcc00;
}

button {
    background-color: #1a2b4c;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 5px;
}
</style>
</head>
<body>
    <div class="navbar">
        <div class="logo">Court Management System</div>
        <div class="nav-links">
            <a href="judge_dashboard.jsp">Home</a>
            <a href="#">Profile</a>
            <a href="login.jsp">Logout</a>
        </div>
    </div>

    <div class="sidebar">
        <h2>Judge Dashboard</h2>
        <ul>
            <li><a href="#">Case Review</a></li>
            <li><a href="#">Schedule Hearings</a></li>
            <li><a href="#">Verdict & Orders</a></li>
            <li><a href="#">Evidence Review</a></li>
            <li><a href="#">Live Case Tracking</a></li>
            <li><a href="#">Court Notices</a></li>
            <li><a href="#">Manage Court Calendar</a></li>
        </ul>
    </div>

    <div class="content">
        <h1>Welcome, Judge</h1>
        <p>Manage court proceedings efficiently</p>

        <div class="stats">
            <div class="stat-box">Ongoing Cases: 8</div>
            <div class="stat-box">Pending Judgments: 4</div>
            <div class="stat-box">Upcoming Hearings: 6</div>
        </div>

        <div class="case-summary">
            <h2>Case Summary</h2>
            <table>
                <tr>
                    <th>Case ID</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Next Hearing</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>201</td>
                    <td>Alice Brown</td>
                    <td>Ongoing</td>
                    <td>April 8, 2025</td>
                    <td>
                        <button>Review</button>
                        <button>Schedule</button>
                        <button>Issue Order</button>
                    </td>
                </tr>
                <tr>
                    <td>202</td>
                    <td>Michael Green</td>
                    <td>Pending</td>
                    <td>April 12, 2025</td>
                    <td>
                        <button>Review</button>
                        <button>Schedule</button>
                        <button>Issue Order</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
