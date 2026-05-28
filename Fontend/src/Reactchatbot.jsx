import React, { useEffect, useRef, useState } from 'react'
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import {wezanBotinfo} from "./utils/company"
import Chatuserform from './Chatuserform';
import ChatMessage from './ChatMessage';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import Collectinfo from './Collectinfo';
import { formQuestions,formjobQuestions } from './utils/company';
import Spinner from './animation/Spinner';
// Set fonts for pdfMake
pdfMake.vfs = pdfFonts?.default?.pdfMake?.vfs;

const EMAIL_SERVER_URL = import.meta.env.DEV ? "http://localhost:5000" : "https://chatbot-84am.onrender.com";

const Reactchatbot = () => {
     
    const [chathistory,setchathistory]=useState([]);
    const [showchatbot,setshowchatbot]=useState([false]);
    const [isuserclicked,setuserclicked]=useState(false);
    const [questype,setquestype]=useState()
    const [formMessages, setFormMessages] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormData] = useState({});
    const chatbodyRef=useRef();
    



//SWITCH TO GET DATA FROM USER OR CLIENT

const handleservice = (serviceName,type) => {

 setquestype(type);

 if(type =="job"){

  
    setuserclicked(true);
  
  setFormStep(0); // reset step in case they fill again

  // Save service name directly into form data
  setFormData(prev => ({
    ...prev,
    service: serviceName
  }));

  // Start conversation with first question
  setFormMessages([
    { role: "model", text: formjobQuestions[0].question }
  ]);
 }


 else{
  setuserclicked(true);
  setFormStep(0); // reset step in case they fill again

  // Save service name directly into form data
  setFormData(prev => ({
    ...prev,
    service: serviceName
  }));

  // Start conversation with first question
  setFormMessages([
    { role: "model", text: formQuestions[0].question }
  ]);
 }

  
  
};


// const handlejob = (jobroles)=>{
//         console.log(jobroles);
        
// }



// CHATBOT REPLY FUNCION  START

function getBotReply(userInput) {
    const flows = wezanBotinfo.flows;
  
    // ✅ Ensure userInput is a string
    const input = String(userInput).toLowerCase().trim();
  
    const match = flows.find(entry =>
      entry.role === "bot" &&
      entry.intent.toLowerCase().includes(input )
    );
  
    return match ? match.replies : ["🤖 Oops! Please check your message and try again."];
  }

// CHATBOT REPLY FUNCION  END


  // GENERATE BOT FUNCTION RESPONSE START

  const updateHistory=(text)=>{
    setchathistory(prev=>[...prev.filter(msg=>msg.text !=="Thinking..."),{role:"model",text}])

 }
    const generateBotResponse=async (history)=>{

         


       
    

        const historyy=history.map(({role,text})=>({role,parts:[{text}]}));

        const usermsg=historyy[history.length-1].parts[0].text;
        
        // console.log(usermsg);
        

        const result =getBotReply(usermsg);
        
        
        
        setTimeout(()=>{
          updateHistory(result)

        },700 )



         console.log(chathistory);
         



   // ✅ Auto download & send if end of chat

    if (usermsg.includes("thanks")) {
      setTimeout(() => {
         exportChatAsTextPDF(chathistory);
      }, 1000);
    }

    }


  // GENERATE BOT FUNCTION RESPONSE END



  //PDF GENRATER FUNCTION START 

    // ---------------------------------------------

    
    const exportChatAsTextPDF = async (chatHistory) => {
      if (!chatHistory || chatHistory.length === 0) {
        console.error("❌ No chat history provided");
        return;
      }
    
      // Build chat content
      const content = [];
    
      chatHistory.forEach((msg) => {
        const isUser = msg.role === "user";
        const label = isUser ? "User:" : "Chatbot:";
        const message = Array.isArray(msg.text) ? msg.text.join(" ") : msg.text;
    
        content.push({
          columns: [
            { width: "auto", text: label, bold: true },
            { width: "*", text: message },
          ],
          margin: [0, 5],
          fontSize: 12,
        });
      });
    
      const docDefinition = {
        content,
        defaultStyle: {
          font: "Roboto", // standard font
        },
        pageMargins: [30, 40, 30, 40],
      };
    
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    
      // Get the PDF as Blob and send it to email
      pdfDocGenerator.getBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "chat-history.pdf");
    
        try {
          const response = await fetch(`${EMAIL_SERVER_URL}/send-email`, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            console.log("✅ PDF sent via email successfully");
          } else {
            console.error("❌ Failed to send PDF:", await response.text());
          }
        } catch (err) {
          console.error("❌ Network error:", err);
        }
      });
    };

    //---------------------------------
  //PDF GENRATER FUNCTION END 
 const Diplayinformation=(data)=>{
  console.log(data);
  
 const result= getBotReply(data)
        
  setTimeout(()=>{
    updateHistory(result)

  },300 )
 }



    useEffect(()=>{
        chatbodyRef.current.scrollTo({top: chatbodyRef.current.scrollHeight, behavior:"smooth"})
        window.handleservice = handleservice;
        // window.handlejob=handlejob;
    },[chathistory,formMessages])



  return (
    <div className= {`container ${showchatbot ? 'show-chatbot':""}`} >

          <button onClick={()=>setshowchatbot(prev => !prev)} id='chatbot-toggler' className='flex boder-2 border-solid'>
            <span><FaRegMessage/></span>
            {/* <span><MdClose/></span> */}

          </button>
        
        <div className='chatbot-popup'>

            <div className='chat-header'>
                <div className='header-info'>
                    <TbMessageChatbotFilled className='text-[1.5rem] text-white'/>
                    <h2 className='logo-text'>Chatbot</h2>
                </div>

                <button onClick={()=>setshowchatbot(prev => !prev)} className='text-white text-[1.5rem]'>
                  <IoIosArrowDown/>
                </button>

            </div>

            {/* CHATBOT BODY */}

            <div className='chatbot-body' ref={chatbodyRef}>



              {

                   isuserclicked ? <div>
                       <h2 className='mb-[1rem] text-center' >{ questype=="job" ? "Apply for a Job" : "Service Enquiry Form"}</h2>
                   {
                    formMessages?.map((chat,index)=>(
                        <ChatMessage key={index} chat={chat}   />
                    ))
                   }
                </div>
                   
                   :


                  <div>
                       <div className="message bot-message mb-[1rem]">
                <TbMessageChatbotFilled className='text-[1.5rem]'/>
                 <div className="message-text">
                  <h2>👋Hi! I'm XYZ chatbot, how may I assist you? </h2>
                  <button className='servicebtn' onClick={()=>Diplayinformation('job descriptions')}> Job descriptions</button><br/>   
                  <button className='servicebtn' onClick={()=>Diplayinformation('Project Enquiries')}>Project enquiries</button> 
                 </div>

                </div>

                {/* RENDER THE CHACT */}
                <div >
                   
                   {
                    chathistory.map((chat,index)=>(
                        <ChatMessage key={index} chat={chat}   />
                    ))
                   }
                </div>
                  </div>
              }


             
              

            </div>

            {/* CHATBOT footer */}
            <div className='chat-footer'>
                 
                    {
                      isuserclicked ? <Chatuserform questype={questype} isuserclicked={isuserclicked} formData={formData} setFormData={setFormData} formStep={formStep}  setFormStep={setFormStep} formMessages={formMessages} setFormMessages={setFormMessages} setuserclicked={setuserclicked} chathistory={chathistory} setchathistory={setchathistory}/> :<Chatuserform chathistory={chathistory} setchathistory={setchathistory} generateBotResponse={generateBotResponse}/>
                    }
                 
            </div>

        </div>
       

    </div>
  )
}

export default Reactchatbot
