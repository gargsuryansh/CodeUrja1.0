<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Public Dashboard</title>
    <!--<link rel="stylesheet" href="styles.css">  Link to your CSS file -->
    <style>/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

/* General Styling */
body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #ecf0f1, #dfe4ea);
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

/* Navbar */
.navbar {
    background: linear-gradient(135deg, #ffcc00, #ff9f1a);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.navbar h1 {
    font-size: 22px;
    font-weight: bold;
    color: white;
}

.navbar .nav-links {
    display: flex;
}

.navbar .nav-links a {
    text-decoration: none;
    color: white;
    margin: 0 15px;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
}

.navbar .nav-links a:hover {
    color: #222;
    text-shadow: 0 0 5px white;
}

/* Sidebar */
.sidebar {
    width: 250px;
    height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 80px;
    transition: 0.3s ease-in-out;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
}

.sidebar h2 {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 15px 25px;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
}

.sidebar ul li a {
    text-decoration: none;
    color: white;
    display: block;
    font-size: 16px;
}

.sidebar ul li:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
    cursor: pointer;
}

/* Main Content */
.main-content {
    margin-left: 270px;
    padding: 80px 20px;
    width: calc(100% - 270px);
    text-align: center;
}

/* Stats Container */
.stats-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
}

.stat-box {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    flex: 1;
    min-width: 200px;
    margin: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
}

.stat-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.stat-box h3 {
    font-size: 18px;
    margin: 0;
    color: #555;
}

.stat-box p {
    font-size: 22px;
    font-weight: bold;
    margin: 5px 0;
    color: #27ae60;
}

/* Case Summary Table */
.table-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

.table-container h2 {
    font-size: 22px;
    color: #222;
    margin-bottom: 15px;
}

.table-container table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
}

.table-container th, .table-container td {
    padding: 14px;
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.table-container th {
    background: linear-gradient(135deg, #ffcc00, #ff9f1a);
    color: white;
    font-weight: bold;
}

.table-container td {
    background: rgba(255, 255, 255, 0.7);
}

.table-container tr:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* Buttons */
.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    margin: 10px;
}

.btn-primary {
    background: #27ae60;
    color: white;
}

.btn-primary:hover {
    background: #219150;
    transform: scale(1.05);
}

.btn-secondary {
    background: #2980b9;
    color: white;
}

.btn-secondary:hover {
    background: #1c6fa3;
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
    .stats-container {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
        text-align: center;
    }

    .main-content {
        margin-left: 0;
        padding: 10px;
        width: 100%;
    }
    /* Table Container */
.table-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

/* Table */
table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
}

th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

th {
    background: linear-gradient(135deg, #ffcc00, #ff9f1a);
    color: white;
    font-weight: bold;
    text-align: center;
}

td {
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
}

/* Row Hover Effect */
tr:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* Status Colors */
.ongoing {
    color: #27ae60;
    font-weight: bold;
}

.pending {
    color: #e74c3c;
    font-weight: bold;
}

}

    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Court Management System</div>
        <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="login.jsp">Logout</a>
        </div>
    </nav>
    
    <div class="dashboard-container">
        <aside class="sidebar">
            <h2>Public Dashboard</h2>
            <ul>
                <li><a href="#case-status">Case Status</a></li>
                <li><a href="#court-schedule">Court Schedule</a></li>
                <li><a href="video.jsp">hearing</a></li>
                <li><a href="#public-notices">Public Notices</a></li>
                <li><a href="#faq">FAQs</a></li>
            </ul>
        </aside>
        
        <main class="main-content">
            <h1>Welcome, Citizen</h1>
            <p>Access court-related information easily.</p>
            
            <div class="summary">
                <div class="card">Case Status: 102</div>
                <div class="card">Upcoming Hearings: 15</div>
                <div class="card">Public Notices: 8</div>
            </div>
            
            <section class="case-summary">
                <h2>Recent Cases</h2>
                <div class="table-container">
    <h2>Recent Cases</h2>
    <table>
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Petitioner</th>
                <th>Respondent</th>
                <th>Status</th>
                <th>Next Hearing</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2021</td>
                <td>John Doe</td>
                <td>State</td>
                <td class="ongoing">Ongoing</td>
                <td>April 10, 2025</td>
            </tr>
            <tr>
                <td>2022</td>
                <td>Jane Smith</td>
                <td>XYZ Corp.</td>
                <td class="pending">Pending</td>
                <td>April 15, 2025</td>
            </tr>
        </tbody>
    </table>
</div>

            </section>
        </main>
    </div>
</body>
</html>
