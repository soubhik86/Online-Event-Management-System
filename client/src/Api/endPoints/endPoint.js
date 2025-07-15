export const baseURL = "http://localhost:5000"; 

export const profilePic = (media)=>{
  return media ? `${baseURL}/uploads/${media}` : `${baseURL}/uploads/default.png`;

}

export const endPoints = {

    user: {
      register: "register",            
      login: "login",   
      verify: "verify-email",
      updateProfile: "update-profile",
      forgotPassword: "forgot-password",    
      resetPassword: "reset-password",      
      
      
     
    },

    event: {
      getAll: "events",                 
      getById: (id) => `events/${id}`,  
   
    },
    
    registration: {
      register: (eventId) => `register/${eventId}`,       // POST register for an event
      myRegistrations: "my-registrations",                // GET logged-in user's registrations
    },
  
    ticket: {
      getByEvent: (eventId) => `ticket/${eventId}`,       // GET ticket for logged-in user and event
      download: (ticketId) => `ticket/download/${ticketId}`, // GET QR image download
    },


    blog: {
      getAll: "blogs", // GET all blogs with comment counts
      comment: (blogId) => `blogs/${blogId}/comment`, // POST a comment
      getComments: (blogId) => `blogs/${blogId}/comments`, // GET all comments for a blog
      like: (blogId) => `blogs/like/${blogId}`, // POST like/unlike blog
    }
    





 
};
