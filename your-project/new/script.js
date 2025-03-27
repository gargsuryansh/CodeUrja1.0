const backendURL = "http://localhost:5000"; // Change if deployed

async function sendOTP() {
    const aadhaar = document.getElementById('aadhaar').value;
    const mobile = document.getElementById('mobile').value;

    const response = await fetch(`${backendURL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar, mobile })
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) document.getElementById('otpSection').classList.remove('hidden');
}

async function verifyOTP() {
    const aadhaar = document.getElementById('aadhaar').value;
    const mobile = document.getElementById('mobile').value;
    const otp = document.getElementById('otp').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${backendURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar, mobile, otp, password })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "dashboard.html";
}

async function login() {
    const aadhaar = document.getElementById('loginAadhaar').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar, password })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "dashboard.html";
}
