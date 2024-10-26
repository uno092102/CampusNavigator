# CIT-U Campus Navigator

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents

- [Overview](#overview)
- [Proponents](#proponents)
- [Pain Points](#pain-points)
- [Solution](#solution)
- [Functional Requirements](#functional-requirements)
- [Technology Stack](#technology-stack)
- [Future Enhancements](#future-enhancements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The **CIT-U Campus Navigator** is a user-friendly web application designed to simplify navigation across the Cebu Institute of Technology campus. It aims to address common navigational challenges faced by students, visitors, and staff by providing an interactive and comprehensive map, enhancing information accessibility, and improving overall campus orientation.

---

## Proponents

- **Math Lee L. Biacolo** - BSIT 3
- **Terence John N. Duterte** - BSIT 3
- **Christian Brent G. Alpez** - BSIT 3
- **Claive Justin J. Barrientos** - BSIT 3
- **Michael C. Gelera** - BSIT 3

---

## Pain Points

1. **Navigational Challenges:** Difficulty in navigating the CIT campus due to the absence of a comprehensive and interactive map.
2. **Inefficient Time Usage:** Time wasted searching for destinations, leading to delays and frustration.
3. **Lack of Information Accessibility:** Important details about campus buildings and points of interest are not centralized.
4. **Orientation Difficulties:** New students and visitors struggle with campus orientation, negatively impacting their experience.

---

## Solution

The **CIT-U Campus Navigator** offers a streamlined solution to the aforementioned challenges by providing:

- **Interactive Campus Map:** A detailed online map showcasing all campus buildings and key locations.
- **Informative Icons:** Visual markers that display relevant information about buildings and points of interest upon interaction.
- **Advanced Geolocation Features:** Integration of geolocation services to help users identify their current location on campus for easier orientation.
- **Building Search Functionality:** A search feature enabling users to quickly locate specific buildings by name.
- **Smooth and Intuitive Experience:** A user-centric interface ensuring ease of use across all user demographics.

Built with modern technologies such as **ReactJS**, **Spring Boot**, and **MySQL**, the application ensures responsive and reliable performance. Future iterations aim to incorporate features like **route planning**, **3D mapping**, and **offline functionality** to further enhance user experience.

---

## Functional Requirements

1. **Interactive Map Display:**
   - Display a comprehensive, interactive map of the CIT campus highlighting all buildings and significant points of interest.

2. **Informative Icon Integration:**
   - Utilize icons on the map to represent buildings and points of interest.
   - Display relevant information about a location when a user interacts with its icon.

3. **User Geolocation Services:**
   - Integrate geolocation features to identify and display the user's current location on the campus map.
   - Update the user's location in real-time as they move around the campus (subject to device capabilities).

4. **Search Functionality:**
   - Provide a search bar for users to input the name of a building or location.
   - Dynamically display search results as the user types.
   - Highlight the selected location on the map upon selection.

5. **User-Friendly Interface:**
   - Design an intuitive and responsive user interface accessible via web browsers.
   - Optimize the interface for various devices, including desktops, tablets, and mobile phones.

6. **Technology Stack Implementation:**
   - Develop the frontend using **ReactJS** for optimal user interface components.
   - Utilize **Spring Boot** for efficient server-side operations.
   - Employ **MySQL** as the database to store map data, building information, and other relevant data.

7. **Scalability for Future Enhancements:**
   - Design the system architecture to accommodate future features like 3D mapping and offline capabilities without significant restructuring.

8. **Performance Optimization:**
   - Ensure swift loading of maps and information for a seamless user experience.
   - Handle multiple simultaneous users without performance degradation.

9. **Security Measures:**
   - Implement security protocols to protect user data and prevent unauthorized access.

10. **Future Route Planning Feature (Planned):**
    - Offer route planning to generate optimal paths between two or more locations on campus in future versions.

---

## Technology Stack

- **Frontend:** 
  - [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
  
- **Backend:** 
  - [Spring Boot](https://spring.io/projects/spring-boot) - A framework for building production-ready Spring applications.
  
- **Database:** 
  - [MySQL](https://www.mysql.com/) - An open-source relational database management system.
  
- **Other Technologies:**
  - [Hibernate](https://hibernate.org/) - For Object-Relational Mapping (ORM).
  - [Bootstrap](https://getbootstrap.com/) or [Material-UI](https://material-ui.com/) - (Optional) For responsive UI components.
  - [Mapbox](https://www.mapbox.com/) or [Google Maps API](https://developers.google.com/maps) - For interactive map functionalities.

---

## Future Enhancements

- **Route Planning:** Generate optimal paths between selected locations on campus.
- **3D Mapping:** Provide a three-dimensional view of campus structures for better visualization.
- **Offline Functionality:** Allow users to access maps and information without an active internet connection.
- **Enhanced Search Capabilities:** Include filters and advanced search options for more precise results.
- **User Authentication:** Enable personalized experiences and save user preferences.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** or **yarn**
- **Java Development Kit (JDK)** (v17 or later)
- **Maven** (for managing Spring Boot dependencies)
- **MySQL Server**

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/CIT-U-Campus-Navigator.git
   cd CIT-U-Campus-Navigator
   ```

2. **Setup the Backend (Spring Boot):**

   - **Navigate to the backend directory:**
     
     ```bash
     cd backend
     ```
   
   - **Configure the Database:**
     - Create a MySQL database named `campus_navigator`.
     - Update the `application.properties` file with your MySQL credentials:
       
       ```properties
       spring.datasource.url=jdbc:mysql://localhost:3306/campus_navigator
       spring.datasource.username=your_username
       spring.datasource.password=your_password
       spring.jpa.hibernate.ddl-auto=update
       spring.jpa.show-sql=true
       ```
   
   - **Build the Backend:**
     
     ```bash
     mvn clean install
     ```

3. **Setup the Frontend (ReactJS):**

   - **Navigate to the frontend directory:**
     
     ```bash
     cd ../frontend
     ```
   
   - **Install Dependencies:**
     
     ```bash
     npm install
     # or
     yarn install
     ```
   
   - **Configure API Endpoints:**
     - Update the frontend configuration to point to the backend server (e.g., `http://localhost:8080`).

4. **Run the Application:**

   - **Start the Backend:**
     
     ```bash
     cd ../backend
     mvn spring-boot:run
     ```
   
   - **Start the Frontend:**
     
     ```bash
     cd ../frontend
     npm start
     # or
     yarn start
     ```

5. **Access the Application:**

   - Open your web browser and navigate to `http://localhost:3000` to view the frontend.
   - The backend API is accessible at `http://localhost:8080`.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add some AmazingFeature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and includes necessary tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or support, please contact:

- **Math Lee L. Biacolo** - math.biacolo@example.com
- **Terence John N. Duterte** - terence.duterte@example.com
- **Christian Brent G. Alpez** - christian.alpez@example.com
- **Claive Justin J. Barrientos** - claive.barrientos@example.com
- **Michael C. Gelera** - michael.gelera@example.com

Feel free to reach out for collaboration, feedback, or any questions regarding the project.

---

**Happy Navigating! 🚀**
