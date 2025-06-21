# My Resume Builder
A dynamic and intuitive web application that allows users to easily create, customize, and manage their professional resumes. Built with the MERN (MongoDB, Express.js, React, Node.js) stack, this project offers a seamless experience for generating polished, PDF-ready resumes.

---

## ✨ Features

* **User-Friendly Form:** Intuitive input fields for all resume sections.
* **Real-time Preview:** See your resume update instantly as you type.
* **Dynamic Sections:**
    * **Education:** Add multiple entries with Course/Degree, Institution, Years, and **Score (e.g., GPA/Percentage)**.
    * **Experience:** Add multiple work experiences with Company, Role, Dates, and Descriptions.
    * **Certificates:** Add multiple certification entries with Certificate Name, Issuing Organization, and Date.
* **PDF Generation:** Download your complete resume as a print-ready PDF document, perfectly formatted to an A4 size.
* **Data Persistence:** Save your resume data to a MongoDB database for future editing and retrieval.
* **Monorepo Structure:** Organized into `frontend` (React) and `backend` (Node.js/Express) within a single repository for streamlined development.

---

## 🚀 Technologies & Tools

This project is built using the following technologies and tools:

### **Technologies:**

* **Frontend:**
    * **React.js:** A JavaScript library for building user interfaces.
    * **HTML5 & CSS3:** For structuring and styling the web application.
    * **`html2canvas`:** To convert HTML elements into canvas images for PDF generation.
    * **`jspdf`:** A client-side JavaScript PDF generation library.
* **Backend:**
    * **Node.js:** A JavaScript runtime environment.
    * **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
    * **MongoDB:** A NoSQL database for storing resume data.
    * **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
    * **CORS:** Node.js middleware for enabling Cross-Origin Resource Sharing.

### **Development Tools:**

* **VS Code:** Primary Integrated Development Environment (IDE).
* **Git:** Version control system.
* **GitHub:** For hosting the project repositories.
* **npm / Yarn:** Package managers for Node.js.

---

## 📦 Project Structure

The project is organized as a monorepo, containing both the frontend and backend applications in separate subdirectories:
