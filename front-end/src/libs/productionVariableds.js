   export let API;
   
   if (process.env.NODE_ENV === 'production') {
        API = "https://mern-chat-app-eta-two.vercel.app/"
    } else {
        API = "http://localhost:5001"
    }
