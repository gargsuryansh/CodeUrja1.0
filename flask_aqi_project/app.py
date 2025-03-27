from flask import Flask, render_template, jsonify
import requests
import time

app = Flask(__name__)

# OpenWeather API Key (Replace with your own)
API_KEY = "e39ea656f2794c69db1593417b235834"

# City Coordinates
cities = {
    "delhi": {"lat": 28.7041, "lon": 77.1025},
    "mumbai": {"lat": 19.0760, "lon": 72.8777},
    "bangalore": {"lat": 12.9716, "lon": 77.5946},
    "kolkata": {"lat": 22.5726, "lon": 88.3639},
}

# Cache to store AQI data (to reduce API calls)
aqi_cache = {}
CACHE_EXPIRY = 600  # 10 minutes

# AQI Levels Mapping (Based on OpenWeather AQI scale)
AQI_LEVELS = {
    1: ("🟢 Good", "Air quality is considered satisfactory."),
    2: ("🟡 Fair", "Air quality is acceptable but could be better."),
    3: ("🟠 Moderate", "Air quality may affect sensitive individuals."),
    4: ("🔴 Poor", "Unhealthy for general public."),
    5: ("🔴 Very Poor", "Health warnings issued."),
}

def fetch_aqi(city):
    """Fetch AQI from OpenWeather API with error handling."""
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={city['lat']}&lon={city['lon']}&appid={API_KEY}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise error for failed requests
        data = response.json()

        if "list" in data and data["list"]:
            aqi_index = data["list"][0]["main"]["aqi"]
            level, description = AQI_LEVELS.get(aqi_index, ("❓ Unknown", "No data available"))
            return {"aqi": aqi_index, "level": level, "description": description}
    except requests.RequestException as e:
        print(f"Error fetching AQI: {e}")
    return None  # Return None if API call fails

def get_cached_aqi(city):
    """Get AQI from cache or fetch new data if expired."""
    current_time = time.time()
    if city in aqi_cache and (current_time - aqi_cache[city]["timestamp"] < CACHE_EXPIRY):
        return aqi_cache[city]["data"]

    # Fetch new AQI data
    aqi_data = fetch_aqi(cities[city])
    if aqi_data:
        aqi_cache[city] = {"data": aqi_data, "timestamp": current_time}
    return aqi_data

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/aqi")
def aqi():
    return render_template("aqi.html")

@app.route("/forecast")
def forecast():
    return render_template("forecast.html")

@app.route("/proactive")
def proactive():
    return render_template("proactive.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/api/aqi")
def get_aqi_data():
    """API endpoint to get AQI data for all cities."""
    aqi_data = {city: get_cached_aqi(city) for city in cities}
    return jsonify(aqi_data)

if __name__ == "__main__":
    app.run(debug=True)
