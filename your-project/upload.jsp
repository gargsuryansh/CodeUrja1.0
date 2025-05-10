<%@ page import="java.sql.*, java.io.*, jakarta.servlet.http.*, jakarta.servlet.*, java.util.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload PDF</title>
</head>
<body>

    <h2>Upload a PDF File</h2>
    <form action="upload.jsp" method="post" enctype="multipart/form-data">
        <input type="file" name="pdfFile" accept="application/pdf" required>
        <button type="submit">Upload</button>
    </form>

    <%
    if (request.getMethod().equalsIgnoreCase("POST")) {
        Part filePart = request.getPart("pdfFile");  // Get the uploaded file
        String fileName = filePart.getSubmittedFileName();
        InputStream fileContent = filePart.getInputStream();

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/cr?useSSL=false", "root", "sher");

            pstmt = conn.prepareStatement("INSERT INTO pdf_files (name, pdf_data) VALUES (?, ?)");
            pstmt.setString(1, fileName);
            pstmt.setBlob(2, fileContent);
            pstmt.executeUpdate();
            
            out.println("<h3>PDF Uploaded Successfully!</h3>");
        } catch (Exception e) {
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
        } finally {
            if (pstmt != null) pstmt.close();
            if (conn != null) conn.close();
        }
    }
    %>

</body>
</html>
