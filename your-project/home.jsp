<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.*, java.util.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Courtroom Management System</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Header Section -->
    <header class="header">
        <div class="container" >
            <div id="first">
                <h1 class="logo">Digital Courtroom</h1>
            </div>
            <div id="second">
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
            
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-text">
            <h2>Transforming Indian Courts with Speed & Efficiency</h2>
            <p>Real-time case tracking, digital evidence management, and automated legal processes.</p>
            <a href="#features" class="btn">Explore Features</a>
        </div>
    </section>

    <!-- Case Status Section -->
    <section id="case-status" class="case-status">
        <h2>📌 Live Case Status Updates</h2>
        <p id="status-text">
            <%  
                String[] caseUpdates = {"Hearing in progress", "Judgment pending", "Case closed"};
                int randomIndex = new Random().nextInt(caseUpdates.length);
                out.println(caseUpdates[randomIndex]);
            %>
        </p>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <h2>Key Features</h2>
        <div class="feature-container">
            <div class="feature">
                <h3>📅 Real-Time Case Scheduling</h3>
                <p>Automated scheduling for judges and lawyers with live updates.</p>
            </div>
            <div class="feature">
                <h3>🔒 Secure Digital Evidence</h3>
                <p>Encrypted document submission with controlled access.</p>
