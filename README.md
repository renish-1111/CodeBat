# Codebat

Codebat is a dynamic platform that combines coding tutorials and a blog system to empower developers and coding enthusiasts. Built with modern technologies like React, Vite, TypeScript, and Flask, it provides a seamless user experience for learning, sharing, and exploring coding content.

## Features

- **Coding Tutorials**: Step-by-step guides and lessons for various programming topics.
- **Blog System**: Create, update, and manage blogs for sharing knowledge and experiences.
- **User Authentication**: Secure login and user management.
- **Admin Panel**: Manage blogs, monitor user activity, and handle administrative tasks.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Technologies Used

### Frontend
- **React**: Component-based library for building the user interface.
- **Vite**: Lightning-fast development environment.
- **TypeScript**: Adds static typing to JavaScript for robust and maintainable code.
- **MUI**: Material-UI library for modern, customizable components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

### Backend
- **Flask**: Lightweight Python web framework for building APIs.
- **SQLAlchemy**: Database ORM for managing relational databases.
- **Flask-Migrate**: Extension for handling database migrations.

## Getting Started

### Prerequisites
- Node.js (16+)
- Python (3.9+)
- MySQL (8.0+)

### Installation

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables:
   - Create a `.env` file in the `backend` directory:
   - Add the following variables to the `.env` file:

    ```bash
    DATABASE_URL=mysql+pymysql://user:password@localhost/database_name
    SECRET_KEY=your_secret_key
    FLASK_APP=app.py
     ```
   - Replace `your-secret-key` with a secure key and update `DATABASE_URL` as needed for your database.

6. Apply database migrations:
   - Initialize the migration directory:
     ```bash
     flask db init
     ```
   - Create a migration for your database tables:
     ```bash
     flask db migrate -m "Initial migration"
     ```
   - Apply the migration to create the tables:
     ```bash
     flask db upgrade
     ```

7. Start the Flask server:
   ```bash
   flask run
   ```

8. Open the app in your browser:
   ```
   http://localhost:5000
   ```

---

### Notes:
- The `.env` file is critical for storing sensitive configurations and database connection details.
- If you are using a production database, ensure to update the `DATABASE_URL` in your `.env` file with the correct credentials and URI.


#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.

---

### Notes:
- The frontend server runs on port 5173 by default. If you need to change the port, update the `vite.config.ts` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Flask](https://flask.palletsprojects.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Material-UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
