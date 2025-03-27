<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lawyer Dashboard</title>
    <!--<link rel="stylesheet" href="styles.css">  Link to your CSS file -->
    <style>
/* General Page Styling */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Top Navbar */
.navbar {
    background-color: #ffcc00;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 18px;

}

.navbar .logo {
    font-weight: bold;
    font-size: 20px;
}

.navbar .nav-links a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
}

.navbar .nav-links a:hover {
    text-decoration: underline;
}

/* Sidebar */
.sidebar {
    width: 220px;
    height: 100vh;
    position: fixed;
    background: #003366;
    padding-top: 20px;
}

.sidebar h2 {
    color: white;
    text-align: center;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #34495e;
}

.sidebar ul li a {
    color: white;
    text-decoration: none;
    display: block;
    font-size: 16px;
    transition: 0.3s;
}

.sidebar ul li a:hover {
    background: #1abc9c;
    color: white;
}

/* Main Content */
.main-content {
    margin-left: 220px;
    padding: 20px;
}

/* Header */
.header {
    padding: 15px;
    color: #333;
    text-align: center;
    font-size: 24px;
}

/* Quick Stats */
.widgets {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.widget {
    width: 30%;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-weight: bold;
}

.widget:hover {
    background: #1abc9c;
    color: white;
    transition: 0.3s;
}

/* Case Summary Table */
.case-summary {
    margin-top: 20px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.case-summary table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.case-summary th, .case-summary td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.case-summary th {
    background: #ffcc00;
    color: white;
}

.case-summary tr:hover {
    background-color: #f1f1f1;
}

/* Responsive Fixes */
@media screen and (max-width: 768px) {
    .sidebar {
        width: 180px;
    }
    .main-content {
        margin-left: 180px;
    }
    .widgets {
        flex-direction: column;
        align-items: center;
    }
    .widget {
        width: 80%;
        margin-bottom: 10px;
    }
}


    </style>
</head>
<body>

    <!-- Navbar -->
    <div class="navbar">
        <div class="logo">Court Management System</div>
        <div class="nav-links">
            <a href="lawyer_dashboard.jsp">Home</a>
            <a href="#">Profile</a>
            <a href="login.jsp">Logout</a>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
        <h2>Lawyer Dashboard</h2>
        <ul>
            <li><a href="video.jsp">Hearing</a></li>
            <li><a href="#">My Cases</a></li>
            <li><a href="#">Schedule Hearing</a></li>
            <li><a href="upload.jsp">Submit Evidence</a></li>
            <li><a href="#">Legal Notices</a></li>
            <li><a href="#">Live Case Tracking</a></li>
            <li><a href="#">Case Notes</a></li>
            <li><a href="#">Client Messages</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="header">
            <h1>Welcome, Lawyer</h1>
            <p>Manage your cases efficiently</p>
        </div>

        <!-- Quick Stats -->
        <div class="widgets">
            <div class="widget">Upcoming Hearings: 3</div>
            <div class="widget">Pending Cases: 5</div>
            <div class="widget">New Notifications: 2</div>
        </div>

        <!-- Case Summary Table -->
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
                    <td>101</td>
                    <td>John Doe</td>
                    <td>Ongoing</td>
                    <td>April 5, 2025</td>
                    <td>
                        <button>Add Case</button>
                        <button>Upload Evidence</button>
                        <button>Send Notice</button>
                    </td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>Jane Smith</td>
                    <td>Pending</td>
                    <td>April 10, 2025</td>
                    <td>
                        <button>Add Case</button>
                        <button>Upload Evidence</button>
                        <button>Send Notice</button>
                    </td>
                </tr>
            </table>
        </div>

    </div>

</body>
</html>
