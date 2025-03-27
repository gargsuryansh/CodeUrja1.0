<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
    // Database Connection Details
    String dbURL = "jdbc:mysql://localhost:3306/cr?useSSL=false";
    String dbUser = "root";  // Change to your MySQL username
    String dbPass = "sher";  // Change to your MySQL password

    // Fetching form data
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    String role = request.getParameter("role");

    if (username != null && password != null && role != null) {
        try {
            // Load JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish Connection
            Connection conn = DriverManager.getConnection(dbURL, dbUser, dbPass);

            // Insert User Data into Database
            String sql = "select * from users WHERE u1='"+username+"' AND u2='"+password+"' AND u3='"+role+"' ";
            Statement pstmt = conn.createStatement();
            ResultSet rs = pstmt.executeQuery(sql);

      

            if (rs.next()) {
                String dbRole = rs.getString("u3");  // Get actual role from DB

                // Redirect to the correct dashboard
                if (dbRole.equals("lawyer")) {
                    response.sendRedirect("lawyer_dashboard.jsp");
                } else if (dbRole.equals("judge")) {
                    response.sendRedirect("judge_dashboard.jsp");
                } else if (dbRole.equals("public")) {
                    response.sendRedirect("public_dashboard.jsp");
                } else {
                    out.println("<p style='color: red;'>Invalid role assigned. Contact admin.</p>");
                }
            } else {
                out.println("<p style='color: red;'>Invalid username or password.</p>");
            }
            rs.close();
            conn.close();
            
        } catch (Exception e) {
            e.printStackTrace();
            out.println("<p>Database Error: " + e.getMessage() + "</p>");
        }
        // Close connection
          
    }
%>
