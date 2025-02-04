# Bono front end APP

CRUD operations for Rules

This project implements a Vue-based frontend that communicates with a Spring Boot backend to perform CRUD operations on "Rules." Below you will find instructions on how to clone this repository, install dependencies, and run the application locally (using **npm**). You will also need to have your Spring Boot backend running on `http://localhost:8080/` (or whichever host/port you prefer).

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) for package management
- A Spring Boot backend exposing the `/api/rules` endpoints on `http://localhost:8080/` by default

---

## Getting Started

1. **Clone the repository**  
   `git clone https://github.com/LuisAvbax/bono-frontend.git`

2. **Navigate into the project directory**  
   `cd my-vue-project`

3. **Install dependencies**  
   `npm install`

4. **Run the application**  
   `npm run dev`

   Once the server starts, open your browser and navigate to the URL displayed in the terminal (for example, `http://localhost:5173/`).

---

## Project Structure

- **App.vue**  
  Contains the sidebar and logic to switch between different views (rule table, add rule form, etc.).

- **components/RuleTable.vue**  
  Displays the list of rules, handles filtering, editing, and deleting.

- **components/AddRuleForm.vue**  
  Form for creating new rules.

- **services/ruleService.js**  
  Contains logic for making HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) to the Spring Boot backend at `/api/rules`.

---

## CRUD Operations for Rules

- **List Rules**  
  `RuleTable.vue` sends a GET request to `/api/rules` on the Spring Boot backend and displays them in a table.
  
- **Create a Rule**  
  `AddRuleForm.vue` sends a POST request to `/api/rules` with the form data in JSON.
  
- **Edit a Rule**  
  From the table (`RuleTable.vue`), click the edit button to open a dialog. Save changes by sending a PUT request to `/api/rules/{id}`.
  
- **Delete a Rule**  
  From the table, click the delete button to send a DELETE request to `/api/rules/{id}`.

---

## Build for Production

If you want to create a production-ready build:

`npm run build`

This will generate a `dist/` folder with the compiled assets. You can then deploy these files to your preferred hosting environment.

---

## Troubleshooting

- Ensure the Spring Boot backend is running on the correct port (`8080` by default).
- If your backend is on a different URL/port, update the endpoint in `ruleService.js`.
- Check your browser’s console or terminal logs for any error messages.
