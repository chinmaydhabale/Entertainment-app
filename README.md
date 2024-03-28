# Entertainment App

The Entertainment App is a full-stack application designed to provide users with access to a vast collection of movies and TV series. It features user authentication, media exploration, and personal bookmarks, offering a comprehensive and personalized media browsing experience.

## Features

- **User Authentication**: Utilizes JWT for secure login and registration, ensuring user data protection.
- **Media Exploration**: Allows users to discover trending movies and TV series, with detailed views available for each media item.
- **Bookmarks**: Enables users to bookmark their favorite media, creating a personalized list of favorites accessible at any time.
- **Detailed Media Information**: Provides in-depth details about movies and TV series, including cast, genres, ratings, and more.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB instance (local or remote)

### Backend Setup

1. **Clone the Repository**: Start by cloning the Entertainment App repository to your local machine.
   ```bash
   https://github.com/chinmaydhabale/Entertainment-app.git
   ```
   
2. **Navigate to the Backend Directory**: Move into the `server` directory of the project.
   ```bash
   cd server
   ```

3. **Install Dependencies**: Install the necessary dependencies using npm.
   ```bash
   npm install
   ```

4. **Configure Environment Variables**: Create a `.env` 
   ```bash
    PORT = 8080
    MONGO_URL = "Here is your mongo url"
    SECRETE_KEY = "Here is your jwt secrete Key"
    FRONT_URI="Here is your frontend local server Url"
   ```

5. **Start the Server**: Run the backend server.
   ```bash
   npm start
   ```

6. **Verify Backend Setup**: Confirm that the backend server is running without any errors.

### Frontend Setup

1. **Navigate to the Frontend Directory**: Move into the `client` directory of the project.
   ```bash
   cd client
   ```

2. **Install Dependencies**: Install the necessary dependencies using npm.
   ```bash
   npm install
   ```

3. **Configure Environment Variables**: Create a `.env` file in the frontend directory and specify the URL of the backend server. For example:
   ```bash
   VITE_HOST="Here is your backcend local server url"
   ```

4. **Start the Application**: Run the frontend application.
   ```bash
   npm run dev
   ```

5. **Access the Application**: Open your web browser and navigate to the specified URL (default: `http://localhost:5173`) to access the Entertainment App.

By following these steps, you should have both the backend server and frontend application running locally, allowing you to explore the features of the Entertainment App.
## Project Structure

### Backend

- **Controllers**: Contains logic for handling API requests.
- **Models**: Defines the schema for database collections.
- **Routes**: Here is API routes for handling requests to different endpoints.
- **Middleware**: Here is middleware for authentication and error handling.
- **Createdatabase**: Here we can store a movie and tvseries data to database.


### Frontend

- **Components**: Reusable UI components .
- **Pages**: React components representing pages 
- **redux**: Here is Redux setup for state management.
- **Utils**: Here is Utility functions.

### Deployment
- **Frontend** : https://entertainment-app-1-kvea.onrender.com/
- **Backend** : https://entertainment-app-w3vk.onrender.com
### API Documentation
You can visit API documentation from [here](https://documenter.getpostman.com/view/31265541/2sA35EaNk8)


