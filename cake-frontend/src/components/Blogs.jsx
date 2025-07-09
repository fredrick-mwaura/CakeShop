import React from 'react';
import customer from '../images/customer.jpg'
import '../stylesheets/Blogs.css'
import Footer from './footer'

const Blogs = () => {
  const ideas = [
    {
      title: 'Kickoff with a Cake Party',
      description: `Start the week off right with a festive cake party. Nillavee Cake Shop can design a custom cake featuring your company’s logo or a message of appreciation for your customer service team. Share a slice with customers who visit that day.`,
    },
    {
      title: 'Daily Cupcake Surprises',
      description: `Surprise your staff with a different flavor of cupcakes every day. Each day could represent a different aspect of customer service excellence. Nillavee Cake Shop offers a wide variety of cupcake flavors delivered daily.`,
    },
    {
      title: 'Customer Appreciation Cupcakes',
      description: `Celebrate your customers during Customer Service Week with personalized "Thank You" cupcakes. Nillavee Cake Shop offers same-day delivery in Nairobi to make this gesture even easier.`,
    },
    {
      title: 'Custom Cake for Employee Recognition',
      description: `Recognize top-performing employees with personalized cakes. Nillavee Cake Shop creates cakes with messages like "Employee of the Month," offering a unique way to celebrate achievements.`,
    },
    {
      title: 'Wellness and Self-Care Break',
      description: `Organize a wellness break with meditation, fun games, or guided breathing exercises. End the session with cupcakes or healthy snacks from Nillavee Cake Shop.`,
    },
    {
      title: 'Team-Building Activities',
      description: `Plan activities like scavenger hunts, trivia games, or dance challenges to boost teamwork. Reward winners with cakes, cupcakes, or small personalized gifts.`,
    },
    {
      title: 'Surprise Snack Deliveries',
      description: `Delight your team with unexpected snack or mini-cupcake deliveries throughout the week. Nillavee Cake Shop offers reliable delivery services in Nairobi for easy organization.`,
    },
    {
      title: 'Office Decoration Challenge',
      description: `Host an office decoration challenge around themes like "Customer Service Heroes." Reward the best-decorated workspace with cakes, cupcakes, or practical prizes.`,
    },
    {
      title: 'Personalized Thank-You Cards and Gifts',
      description: `Write thank-you cards for each team member, paired with small cakes, cupcakes, or practical gifts to express appreciation for their hard work.`,
    },
    {
      title: 'Grand Finale Celebration',
      description: `End the week with a celebration featuring music, snacks, and a custom cake. Nillavee Cake Shop can provide Champagne or sparkling wine to toast your team’s dedication.`,
    },
  ];

  return (
    <>
    <div className="page-container">
      <div className="blog-content">
        <img src={customer} alt="Customers consultation" className='customer'/>
        <h1 className="titlee">10 Fun and Practical Customer Service Week Ideas in Kenya</h1>
        <p className="intro">
          Customer Service Week 2024 is the perfect time to celebrate your customer service team. Here are 10 creative ideas to make the week memorable for your team and customers.
        </p>
        <ul className="ideas-list">
          {ideas.map((idea, index) => (
            <li key={index} className="idea">
              <h2 className="idea-title">{idea.title}</h2>
              <p className="idea-description">{idea.description}</p>
            </li>
          ))}
        </ul>
        <div className="final-thoughts">
          <h3>Why Cakes and Cupcakes are Ideal for Customer Service Week</h3>
          <p>
            Cakes and cupcakes are symbolic of celebration and appreciation. Nillavee Cake Shop offers customizable treats to sweeten your events. Let’s make Customer Service Week 2024 unforgettable!
          </p>
        </div>
      </div>
      <div className="sidebar">

        <h3>Delicious cakes available</h3>
        <p>delicious cakes</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Blogs;
