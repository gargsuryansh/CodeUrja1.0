<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Digital Courtroom</title>
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

        /* Navbar Styles */
        .header {
            background: #0b2a5e;
            color: white;
            padding: 15px 0;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
        }

        .container {
            width: 90%;
            max-width: 1100px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            font-size: 20px;
            font-weight: bold;
        }

        .nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
        }

        .nav ul li {
            margin: 0 15px;
        }

        .nav ul li a {
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: 0.3s;
        }

        .nav ul li a:hover {
            color: #ffcc00;
        }

        /* Mobile Menu */
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .nav ul {
                display: none;
                flex-direction: column;
                background: #0b2a5e;
                position: absolute;
                top: 60px;
                right: 0;
                width: 200px;
                box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
            }

            .nav ul.show {
                display: flex;
            }

            .nav ul li {
                padding: 10px;
                text-align: center;
            }

            .menu-toggle {
                display: block;
            }
        }

        /* Login Container */
        .login-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 350px;
            text-align: center;
            margin-top: 100px;
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

    <script>
        function toggleMenu() {
            document.getElementById("nav-menu").classList.toggle("show");
        }
    </script>
</head>
<body>

    <!-- Header Section -->
    <header class="header">
        <div class="container">
            <h1 class="logo">Digital Courtroom Management System</h1>
            <nav class="nav">
                <button class="menu-toggle" onclick="toggleMenu()">☰</button>
                <ul id="nav-menu">
                    <li><a href="home.jsp">Home</a></li>
                    <li><a href="login.jsp">Login</a></li>
                    <li><a href="signup.jsp">Signup</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <div class="login-container">
        <h2>Login to Digital Courtroom</h2>
        <form action="login1.jsp" method="post">
            <label for="role">Login as:</label>
            <select name="role" id="role" required>
                <option value="lawyer">Lawyer</option>
                <option value="public">Public</option>
                <option value="judge">Judge</option>
            </select>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="signup.jsp">Register here</a></p>
    </div>

</body>
</html>
