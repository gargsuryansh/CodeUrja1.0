<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evidence List</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Submitted Evidence</h2>
        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Case Number</th>
                    <th>File Name</th>
                    <th>Uploaded At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <%
                    String DB_URL = "jdbc:mysql://localhost:3306/court_management";
                    String DB_USER = "root";
                    String DB_PASSWORD = "yourpassword"; // Replace with your MySQL password

                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                    Statement stmt = conn.createStatement();
                    ResultSet rs = stmt.executeQuery("SELECT id, case_number, file_name, uploaded_at FROM evidence");

                    while (rs.next()) {
                %>
                <tr>
                    <td><%= rs.getInt("id") %></td>
                    <td><%= rs.getString("case_number") %></td>
                    <td><%= rs.getString("file_name") %></td>
                    <td><%= rs.getTimestamp("uploaded_at") %></td>
                    <td>
                        <a href="DownloadEvidenceServlet?id=<%= rs.getInt("id") %>" class="btn btn-primary btn-sm">Download</a>
                    </td>
                </tr>
                <% } conn.close(); %>
            </tbody>
        </table>
    </div>
</body>
</html>
