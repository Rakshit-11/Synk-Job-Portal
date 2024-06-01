import React, { useState } from 'react';

function FrequentlyAsked() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: "What is the application process?",
      answer: "To apply for a job, simply visit our website and navigate to the job listing you're interested in. Click on the job title to view more details and then click on the 'Apply Now' button. Follow the instructions to complete your application."
    },
    {
      question: "How do I update my profile information?",
      answer: "You can update your profile information by logging into your account and navigating to the 'Profile' section. From there, you can edit your personal details, qualifications, and work experience."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time. Simply go to the 'Account Settings' page and look for the option to delete your account. Please note that this action is irreversible and will permanently remove all your data from our system."
    },
    {
      question: "Are there any upfront recruiting or contractual costs?",
      answer: "  we charge basis on  monthly subscription or pay per post model "
    }
  ];

  const handleQuestionClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
      <div>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => handleQuestionClick(index)}>
              <h3 className="text-2xl font-semibold">{faq.question}</h3>
              <span>{expandedIndex === index ? '-' : '+'}</span>
            </div>
            {expandedIndex === index && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrequentlyAsked;
