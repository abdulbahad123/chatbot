export const wezanBotinfo = {
    botName: "XYZ Bot",
    companyName: "XYZ Company",
    flows: [

    
        

     
        
        {
          role: "bot",
          intent: "Thanks, thank you ,thank",
          replies: [
            "👋 Thank you for chatting with XYZ Company. Have a great day!",
            
          ]
        },
        
        {
          role: "bot",
          intent: "Can you tell me about your services?,What services do you offer?,Tell me about your development services,Do you develop apps? ,project inquiries, your services, service projec inqueries ,Project Enquiries, project enquiries  "
          ,
          replies: [
            `
                 📱We Provide Services For Your Business.
    <button onclick="window.handleservice('Ecommerce','project')" class="servicebtn">Ecommerce</button>
    <button onclick="window.handleservice('AI','project')" class="servicebtn">Artificial Intelligence</button>
    <button onclick="window.handleservice('MERN','project')" class="servicebtn">MERN Stack</button>
    <button onclick="window.handleservice('Datascience','project')" class="servicebtn">Data Science</button>`
           
            
          ]
        
       
        }
     ,
      
        {
          role: "bot",
          intent: "Hi, are there any job openings?, job description ,job descriptions,give a job descriptions, give job descriptions, give me a job description ,give me a job descriptions , give your job descriptions",
          replies: [
            
            `
            We're currently hiring
        
            Role: Full-Stack Developer
            Experience: 2–5 years
            Education: Any degree
            <button  class="jobbtn" onclick="window.handleservice('Fullstack Developer','job') ">Apply Now</button>
        
            Role: PHP Developer
            Experience: 1–3 years
            Education: Any degree
            <button    class="jobbtn" onclick="window.handleservice('PHP Developer','job')">Apply Now</button>
        
            Role: SEO Expert
            Experience: 0–3 years
            Education: Any degree
            <button    class="jobbtn" onclick="window.handleservice('SEO Expert','job')">Apply Now</button>
          `
            
            
          
          ]
        }
       
      
    
      ]
    }

    

    
  export const formQuestions = [
    
    { key: "name", question: "Enter your name" },
    { key: "email", question: "Enter  your email." },
    { key: "phone", question: "Enter your phone number." },
    { key: "budget", question: "Enter What is your budget?" },
    { key: "descript", question: "Please describe your project,50-100 words" }
  ];

      
  export const formjobQuestions = [
    
    { key: "name", question: "Enter your name." },
    { key: "email", question: "Enter your email. " },
    { key: "phone", question: "Enter your phone number." }
 
  ];