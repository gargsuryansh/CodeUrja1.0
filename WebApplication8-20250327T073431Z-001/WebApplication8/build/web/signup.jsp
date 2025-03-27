<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Digital Courtroom</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* General Styles */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        
        /* Login Container */
        .login-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
            margin-top: 80px;
        }
        
        select, input[type="text"], input[type="password"], button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        
        button {
            background-color: #ffcc00;
            color: black;
            border: none;
            cursor: pointer;
            font-weight: bold;
        }
        
        button:hover {
            background-color: #ffc107;
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <header class="header">
        <div class="container">
            <h1 class="logo">Digital Courtroom Management System</h1>
            <nav class="nav">
                <ul id="nav-menu">
                    <li><a href="home.jsp">Home</a></li>
                    <li><a href="login.jsp">Login</a></li>
                    <li><a href="signup.jsp">Signup</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button class="menu-toggle" onclick="toggleMenu()">☰</button>
            </nav>
        </div>
    </header>

    <div class="login-container">
        <h2>Register to Digital Courtroom</h2>
        <form action="signup1.jsp" method="post">
            <label for="role">Register as:</label>
            <select name="role" id="role" required>
                <option value="lawyer">Lawyer</option>
                <option value="public">Public</option>
                <option value="judge">Judge</option>
            </select>
            
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            
            <button type="submit">Register</button>
        </form>
        <p>Don't have an account? <a href="register.jsp">Register here</a></p>
    </div>
</body>
</html>
