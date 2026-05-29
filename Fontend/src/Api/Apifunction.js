const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "https://chatbot-anco.onrender.com";

export const projectapi = async (formData) => {

  console.log("api function ", formData);



  try {
    const response = await fetch(`${API_BASE_URL}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json();

    console.log(data, "successfull stored data in db");

  }
  catch (err) {
    console.error("Error:", err);
    console.log("THERE WAS A PROBLEM STORE IN DATABASE.");

  }

}

export const jobapi = async (formData) => {

  console.log("api function ", formData);



  try {
    const response = await fetch(`${API_BASE_URL}/api/job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json();

    console.log(data, "successfull stored data in db");

  }
  catch (err) {
    console.error("Error:", err);
    console.log("THERE WAS A PROBLEM STORE IN DATABASE.");

  }

}