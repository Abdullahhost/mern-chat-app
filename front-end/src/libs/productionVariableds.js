   export let API;
   
   if (process.env.NODE_ENV === 'production') {
        API = "https://mern-chat-app-ermc.onrender.com"
    } else {
        API = "http://localhost:5001"
    }
