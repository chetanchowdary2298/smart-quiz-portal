import React, { useEffect, useState, useRef } from 'react';
import {
  FaHeadset,
  FaEnvelope,
  FaQuestionCircle,
  FaPaperPlane,
  FaRobot,
  FaTimes
} from 'react-icons/fa';
import './SupportPage.css';

const SupportPage = () => {
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Backend API URL
  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Chatbot State Managers
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your SmartQuiz Assistant. Ask me anything about our quiz categories (Python, Java, C++, DBMS, AI) or how to check your reports!"
    }
  ]);

  // Auto-scroll chat window when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setFormData(prev => ({
      ...prev,
      name: savedUser.username || "yashuu",
      email: savedUser.email || "yashwanth@smartquiz.com"
    }));
  }, []);

  // Form Submission for Email Support Route
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/accounts/support/send-email/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        }
      );

      if (response.ok) {
        alert(
          `Thanks for reaching out, ${formData.name}! Your message has been sent directly to our inbox.`
        );

        setFormData(prev => ({
          ...prev,
          message: ""
        }));
      } else {
        const errData = await response.json();

        alert(
          `Error sending message: ${
            errData.error || "Server error"
          }`
        );
      }
    } catch (error) {
      console.error(
        "Failed to post email support packet:",
        error
      );

      alert(
        "Network anomaly encountered while connecting to support email server."
      );
    }
  };

  // CHATBOT LOGIC
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    const userText = chatInput.trim();

    const newMessages = [
      ...messages,
      {
        sender: "user",
        text: userText
      }
    ];

    setMessages(newMessages);
    setChatInput("");

    setTimeout(() => {
      let botResponse =
        "I'm not completely sure about that specific topic. You can submit a support message form on the left pane and our technical core developers will get back to you!";

      const query = userText.toLowerCase();

      if (
        query.includes("hi") ||
        query.includes("hello") ||
        query.includes("hey")
      ) {
        botResponse = `Hey there ${formData.name}! Ready to sharpen your programming skills today? Let me know what you need help with!`;
      } else if (
        query.includes("start") ||
        query.includes("take") ||
        query.includes("quiz") ||
        query.includes("test") ||
        query.includes("write")
      ) {
        botResponse =
          "To start a quiz, click on the 'Test' option in the left sidebar menu. From there, select your preferred programming language or core topic, choose the number of questions, and click 'Start Quiz'!";
      } else if (
        query.includes("subject") ||
        query.includes("language") ||
        query.includes("c++") ||
        query.includes("java") ||
        query.includes("python") ||
        query.includes("dbms")
      ) {
        botResponse =
          "SmartQuiz currently hosts comprehensive testing streams for Python, Java, C++, DBMS, and Artificial Intelligence (AI). Head over to the 'Test' sidebar tab to start one!";
      } else if (
        query.includes("score") ||
        query.includes("report") ||
        query.includes("history") ||
        query.includes("track")
      ) {
        botResponse =
          "All your finished quiz evaluation sheets are compiled natively in your local app cache and sent directly to our backend tables. Click on 'Reports' in the sidebar menu grid to check your performance analytics dashboard graph!";
      } else if (
        query.includes("profile") ||
        query.includes("account") ||
        query.includes("avatar") ||
        query.includes("bio")
      ) {
        botResponse =
          "You can update your display name details, write a custom developer bio string profile, or switch out your navigation headshot circle thumbnail by clicking the avatar bubble icon in the top right navbar panel layout framework anytime!";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: botResponse
        }
      ]);
    }, 500);
  };

  return (
    <div
      className="support-scroll-container"
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        paddingRight: '8px',
        position: 'relative'
      }}
    >
      <div
        className="support-wrapper"
        style={{
          paddingBottom: '40px'
        }}
      >

        <div className="support-header animated-fade-in">
          <FaHeadset className="support-hero-icon" />

          <h1 className="selection-title">
            How can we help you?
          </h1>

          <p className="motivation-text">
            Get in touch with the SmartQuiz support team.
          </p>
        </div>

        <div className="support-grid animated-fade-in">

          {/* Contact Form Section */}
          <div className="support-glass-card form-section">
            <h3>Send us a Message</h3>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Your Name</label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background:
                      'rgba(255, 255, 255, 0.07)',
                    border:
                      '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background:
                      'rgba(255, 255, 255, 0.07)',
                    border:
                      '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="input-group">
                <label>What's the issue?</label>

                <textarea
                  placeholder="Describe your problem here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value
                    })
                  }
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background:
                      'rgba(255, 255, 255, 0.07)',
                    border:
                      '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="finish-btn-styled support-submit"
                style={{
                  marginTop: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%'
                }}
              >
                <FaPaperPlane /> Send Message
              </button>

            </form>
          </div>

          {/* Quick Help Cards */}
          <div
            className="help-options"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >

            <div
              className="help-card glass-effect"
              onClick={() => setIsChatOpen(true)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                border:
                  '1px solid rgba(0, 210, 255, 0.2)'
              }}
              onMouseOver={(e) =>
                e.currentTarget.style.transform =
                  'scale(1.02)'
              }
              onMouseOut={(e) =>
                e.currentTarget.style.transform =
                  'scale(1)'
              }
            >
              <FaQuestionCircle
                className="help-icon"
                style={{
                  color: '#00d2ff'
                }}
              />

              <h4>FAQ Section (AI Chatbot)</h4>

              <p>
                Click here to open our interactive
                assistant chatbot to answer setup
                queries instantly!
              </p>
            </div>

            <div className="help-card glass-effect">
              <FaEnvelope className="help-icon" />

              <h4>Email Support</h4>

              <p>
                Contact us directly at{" "}
                <span
                  style={{
                    color: '#00d2ff',
                    fontWeight: '500'
                  }}
                >
                  770superuser770@gmail.com
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Floating AI Chatbot overlay panel */}
      {isChatOpen && (
        <div
          className="chatbot-overlay"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '360px',
            height: '480px',
            background: '#0f172a',
            border: '2px solid #00d2ff',
            borderRadius: '12px',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '1000',
            overflow: 'hidden'
          }}
        >

          {/* Chat Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px',
              background:
                'rgba(255,255,255,0.03)',
              borderBottom:
                '1px solid rgba(255,255,255,0.1)',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#00d2ff',
                fontWeight: '600'
              }}
            >
              <FaRobot />
              <span>SmartQuiz AI Support</span>
            </div>

            <FaTimes
              style={{
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)'
              }}
              onClick={() => setIsChatOpen(false)}
            />
          </div>

          {/* Chat Logs Window */}
          <div
            style={{
              flex: '1',
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    msg.sender === 'user'
                      ? 'flex-end'
                      : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  background:
                    msg.sender === 'user'
                      ? '#00d2ff'
                      : 'rgba(255,255,255,0.07)',
                  color:
                    msg.sender === 'user'
                      ? '#000'
                      : '#fff',
                  wordBreak: 'break-word'
                }}
              >
                {msg.text}
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Toolbar */}
          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              padding: '12px',
              gap: '8px',
              borderTop:
                '1px solid rgba(255,255,255,0.1)',
              background:
                'rgba(0,0,0,0.2)'
            }}
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={chatInput}
              onChange={(e) =>
                setChatInput(e.target.value)
              }
              style={{
                flex: '1',
                padding: '10px',
                background:
                  'rgba(255,255,255,0.05)',
                border:
                  '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />

            <button
              type="submit"
              style={{
                padding: '10px 14px',
                background: '#00d2ff',
                border: 'none',
                borderRadius: '6px',
                color: '#000',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default SupportPage;