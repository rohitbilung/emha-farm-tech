import {useState} from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { THIRD_PARTY_URL } from '../../config/thirdpartyUrls';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="text-green-600" size={24} />,
      label: "Call Us",
      value: "+91 89842 73765",
      sub: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <Mail className="text-green-600" size={24} />,
      label: "Email Us",
      value: "hello@emhafarm.com or emhafarm2026@gmail.com",
      sub: "Direct inquiries & support"
    },
    {
      icon: <MapPin className="text-green-600" size={24} />,
      label: "Visit Us",
      value: "Teliposh , Kuarmunda, Ps- Birmitrapur ",
      sub: "Sundergarh, Odisha, India"
    }
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
        console.log(THIRD_PARTY_URL.CONTACT,"kjhgjklkjhgfghj")
      const response = await fetch(THIRD_PARTY_URL.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(response,"ressss")
      if (response.ok) {
        setStatus('Message Sent!! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Error sending message. Try again.');
      }
    } catch (err) {
      console.log(err)
      setStatus('Server error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-green-600 font-bold tracking-widest uppercase text-sm">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-4 mb-6 leading-tight">
              Let’s Start a <br />Conversation
            </h2>
            <p className="text-stone-600 text-lg mb-12 max-w-md">
              Have questions about our technology or organic practices? Reach out and our team will get back to you within 24 hours.
            </p>

            <div className="grid sm:grid-cols-1 gap-8">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:text-white transition-all duration-300 border border-stone-100">
                    <div className="group-hover:text-white">
                        {item.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-stone-900 mb-1">{item.value}</p>
                    <p className="text-stone-500 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-stone-100"
          >
            <form className="space-y-6" onSubmit={handleSubmit} method='POST'>
              <div className="space-y-2">
                <label className="text-stone-900 font-bold text-sm">Full Name</label>
                <input 
                  required
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full p-4 rounded-xl border border-stone-200 text-stone-900 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-stone-50/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-stone-900 font-bold text-sm">Email Address</label>
                <input 
                  required
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  placeholder="your email example: someone@gmail.com" 
                  className="w-full p-4 rounded-xl border border-stone-200 text-stone-900 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-stone-50/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-stone-900 font-bold text-sm">How can we help?</label>
                <textarea 
                  required
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your inquiry..." 
                  className="w-full p-4 rounded-xl border border-stone-200 text-stone-900 h-32 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-stone-50/50"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-3 group">
                Send Message 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              {status && <p className="text-sm mt-2 text-primary">{status}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}