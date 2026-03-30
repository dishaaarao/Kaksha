import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Send, User, Bot, Loader2 } from 'lucide-react';

const ChatTutor = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am Kaksha, your AI Study Tutor. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/chat', 
      { message: input, history: messages.slice(-5) }, 
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops! I am having trouble connecting to the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto font-outfit">
      <div className="mb-10 flex-shrink-0">
        <h1 className="text-5xl font-black text-[#0A0A0A] dark:text-white flex items-center gap-4 italic tracking-tighter uppercase">
          <div className="bg-[#694AFF]/10 text-[#694AFF] p-3 rounded-2xl border border-[#694AFF]/20">
             <MessageSquare size={32} />
          </div>
          The Mentor
        </h1>
        <p className="text-[#0A0A0A]/40 dark:text-white/40 mt-4 text-xl font-bold tracking-tight">
          Consult your AI guide. Every query is a step toward your masterpiece.
        </p>
      </div>

      <div className="flex-1 glass-card rounded-[3rem] flex flex-col overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl relative">
        <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                msg.role === 'user' 
                ? 'bg-[#694AFF] text-white' 
                : 'bg-[#0A0A0A] text-white'
              }`}>
                {msg.role === 'user' ? <User size={22} /> : <Bot size={22} />}
              </div>
              <div className={`max-w-[80%] p-6 rounded-[2rem] text-lg font-bold tracking-tight leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#694AFF] text-white rounded-tr-none shadow-xl shadow-[#694AFF]/10'
                  : 'bg-[#F2F0E7] dark:bg-white/5 text-[#0A0A0A] dark:text-white rounded-tl-none border border-black/5 dark:border-white/5'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center shadow-lg">
                <Bot size={22} />
              </div>
              <div className="bg-[#F2F0E7] dark:bg-white/5 p-6 rounded-[2rem] rounded-tl-none border border-black/5 dark:border-white/5">
                <Loader2 size={24} className="animate-spin text-[#694AFF]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
          <form onSubmit={sendMessage} className="relative flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your mentor anything..."
                className="w-full bg-white dark:bg-white/5 border-2 border-black/5 dark:border-white/5 rounded-2xl py-5 pl-6 pr-16 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#694AFF]/50 transition-all font-bold text-lg placeholder:opacity-30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#0A0A0A] dark:bg-[#694AFF] text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-20 disabled:scale-100 shadow-xl"
              >
                <Send size={22} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;
