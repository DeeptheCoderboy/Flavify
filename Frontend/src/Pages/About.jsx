import React, { useState } from 'react';
import mosquitoImg from '../assets/mosquitoImage.jpg';
import flavifyLogo from '../assets/logo.png';

export default function About() {
  const faqs = [
    {
      question: 'How accurate is the fuzzy logic-based dengue detection ?',
      answer: 'Our fuzzy logic system increases accuracy by analyzing a broad range of symptoms and factors, but it is not a replacement for medical diagnosis.'
    },
    {
      question: 'Can I use this tool for self-diagnosis ?',
      answer: 'It provides a preliminary risk estimate, but you should consult a doctor for a confirmed diagnosis.'
    },
    {
      question: 'Is the platform available for mobile use ?',
      answer: 'Yes, FLAVIFY is responsive and works on all devices including mobiles and tablets.'
    },
    {
      question: 'How is dengue fever diagnosed ?',
      answer: 'Dengue is diagnosed via lab tests like NS1 antigen, PCR, and antibody testing.'
    },
    {
      question: 'Can dengue fever be treated ?',
      answer: 'There’s no specific treatment, but symptoms can be managed with hydration and supportive care.'
    },
    {
      question: 'Is there a vaccine for dengue ?',
      answer: 'Yes, Dengvaxia is available for individuals with a previous dengue infection.'
    },
    {
      question: 'How can I prevent dengue fever ?',
      answer: 'By avoiding mosquito bites, using repellent, and eliminating standing water sources.'
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto text-black space-y-12">

      {/* Features */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded shadow text-left">
            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
            <p>Designed with user experience in mind, our platform is easy to navigate, ensuring that users can quickly and efficiently use the dengue detection tool.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow text-left">
            <h3 className="text-xl font-bold mb-2">Real-Time Detection</h3>
            <p>Our platform offers real-time detection, providing immediate results and recommendations based on the latest data.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow text-left">
            <h3 className="text-xl font-bold mb-2">Comprehensive Analysis</h3>
            <p>We utilize comprehensive data analysis to consider multiple factors affecting dengue transmission and symptoms.</p>
          </div>
        </div>
      </section>

      {/* What is Dengue */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">What Is Dengue ?</h2>
          <p className="mb-4">
            Dengue fever is a mosquito-borne viral infection causing severe flu-like illness and, sometimes, developing into a potentially lethal complication called severe dengue. It is prevalent in tropical and subtropical regions around the world, affecting millions of people each year.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => window.open("https://en.wikipedia.org/wiki/Dengue_fever", "_blank")}
          >
            Learn More About Dengue Fever
          </button>
        </div>
        <img src={mosquitoImg} alt="Dengue mosquito" className="w-full h-auto rounded shadow" />
      </section>

      {/* How FLAVIFY Works */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img src={flavifyLogo} alt="FLAVIFY logo" className="w-full max-w-xs mx-auto" />
        <div>
          <h2 className="text-2xl font-bold mb-4">How FLAVIFY Works ?</h2>
          <p className="mb-4">
            FLAVIFY is dedicated to the early detection of dengue fever using cutting-edge Fuzzy Logic technology. Our goal is to provide accurate, efficient, and timely diagnosis to help mitigate the spread of dengue fever. Fuzzy Logic ensures that the general public can trust FLAVIFY for accurate and early diagnosis.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => window.open("https://en.wikipedia.org/wiki/Fuzzy_logic", "_blank")}
          >
            Learn More About Fuzzy Logic
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-gray-200">
              <button
                className="w-full text-left flex justify-between items-center px-4 py-3 text-lg font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>Q: {faq.question}</span>
                <span className="text-red-600 text-2xl">{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
