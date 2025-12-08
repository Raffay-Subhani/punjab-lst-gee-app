# Punjab Land Surface Temperature Web Application (Google Earth Engine)

This repository contains the Google Earth Engine (GEE) code for a web application that visualises Land Surface Temperature (LST) over Punjab using the MODIS dataset. The app helps users analyse thermal variations and urban heat patterns.

---

## Live Web App  
**URL:** https://raffaysubhani.users.earthengine.app/view/punjablst

---

## Overview

The Punjab LST Web Application enables users to explore surface temperatures through a user-friendly interface.  
The app integrates MODIS remote sensing data, cloud masking and UI elements for smooth map visualisation.

Key capabilities include:
- LST display
- Cloud-masked MODIS data
- Automatic map updates when the date changes
- Dynamic legend
- Responsive, minimalistic interface

---

## Key Features

### 1. **Interactive Date Selection**  
Select any day to load the corresponding LST image.

### 2. **Cloud Masking**
MODIS QA bits are applied to remove low-quality pixels.

### 3. **Dynamic Map Rendering**
Map updates automatically when dates are changed.

### 4. **Lightweight & Fast**
Optimised GEE script ensures smooth performance.

---

## Dataset Used

### **MODIS MOD11A1 — Land Surface Temperature & Emissivity (Daily)**  
- **Resolution:** 1 km  
- **Temporal:** Daily  
- **Bands Used:**  
  - LST_Day_1km  
  - QC_Day  
  - Emissivity bands  

The dataset is ideal for urban heat analysis and climate-related research.

---

## Technologies & Tools

- **Google Earth Engine (JavaScript API)**
- **MODIS Remote Sensing Data**
- **GIS & Geospatial Analysis**

---

## Repository Structure

- app.js # Main GEE application script
- README.md # Documentation and project details

---

## How to Use the Web App

1. Open the live application link.  
2. Select a date from the side panel.  
3. The LST layer loads automatically.  
4. View the temperature distribution across Punjab.  
5. The legend (bottom-right) helps interpret values.

---

## How to Run the Code Manually (For Developers)

1. Open **Google Earth Engine Code Editor**.  
2. Create a new script.  
3. Copy & paste the content of `app.js`.  
4. Click **Run** to test.  
5. Go to **Publish → New App** to deploy your own version.

---

## License

This project is open-source and free to use, modify, and share with attribution.

---

## Author

**Raffay Subhani**  
Email: raffaysubhani9@gmail.com
