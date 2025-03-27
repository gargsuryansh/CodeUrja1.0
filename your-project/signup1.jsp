<%@ page import="java.sql.*" %>
<%
    // Database Connection Details
    String dbURL = "jdbc:mysql://localhost:3306/cr?useSSL=false";
    String dbUser = "root";  
    String dbPass = "sher";  

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

            // Fix SQL Column Names
            String sql = "INSERT INTO users (u1,u2,u3) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.setString(3, role);
            
            int rows = pstmt.executeUpdate();

            // Close connection
            pstmt.close();
            conn.close();

            // Redirect based on Role
            if (rows > 0) {
                response.sendRedirect("login.jsp");
            } else {
                out.println("<p>Registration Failed. Please try again.</p>");
            }
        } catch (SQLException e) {
            out.println("<p>SQL Error: " + e.getMessage() + "</p>");
        } catch (Exception e) {
            out.println("<p>Database Error: " + e.getMessage() + "</p>");
        }
    }
%>
