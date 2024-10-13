import "../stylesheets/Features.css";
import ball from "../images/1.jpg";
import gum from "../images/2.jpg";
import mango from "../images/3.jpg";
import orange from "../images/4.jpg";
import strawberry from "../images/5.jpg";
import flavor from "../images/6.jpg";
import cele from "../images/cele.webp";

function Features() {
  const PhoneNumber = '0705776570';
  const message = "Hello Cakes and Pastries.";
  const WhatsappLink = `https://api.whatsapp.com/send?phone=${PhoneNumber}&text=${encodeURIComponent(message)}`;

  const feature = [
    {
      icon: "fas fa-shipping-fast",
      title: "Cake delivered to your door",
      description: "Order early for same-day delivery or a later date.",
    },
    {
      icon: "fas fa-cake",
      title: "Fresh from the oven",
      description: "Freshly baked, delivered moist and tasty.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "You envision it, we bake it.",
      description: "Get custom designs. Bring your cake ideas to life.",
    },
  ];

  return (
    <>
      <div className="features">
        {feature.map((feature, index) => (
          <div className="feature" key={index}>
            <i
              className={`${feature.icon} feature-icon`}
              aria-hidden="true"
            ></i>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="flavor">Flavours Available</h3>
        <div className="flavours">
          <div className="flavour">
            <img src={gum} alt="flavour" />
            <p>Rocky Road</p>
          </div>

          <div className="flavour">
            <img src={orange} alt="flavour" />
            <p>Rocky Road</p>
          </div>

          <div className="flavour">
            <img src={strawberry} alt="flavour" />
            <p>Rocky Road</p>
          </div>

          <div className="flavour">
            <img src={mango} alt="flavour" />
            <p>Rocky Road</p>
          </div>

          <div className="flavour">
            <img src={ball} alt="flavour" />
            <p>Rocky Road</p>
          </div>

          <div className="flavour">
            <img src={flavor} alt="flavour" />
            <p>Rocky Road</p>
          </div>
        </div>

        <div className="disp_1">
          <div className='celebrate'>
            <img src={cele} alt="Celebrate" />
            <div>
              <h3>Celebrate with us</h3>
              <p >
                Are you ready to channel the magic of birthdays and make your
                <br />
                celebrations complete? The missing wow factor is exquisite
                birthday <br />
                cakes baked in a design unique to you to create memories that
                last.
                <br />
                We can help!
              </p>
            </div>
          </div>
          <div className="Chat">
            <p> Any Question?</p>
            <a
              href={WhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="chat"
            >
              Chat On Whatsapp
            </a>
          </div>

          <div className="card_2">
            <div>
              <h3>Cakes for Kids</h3>
              <p>
                Show love and create sweet memories with your kid(s). Make your
                child&apos;s <br />
                birthday special with our kid-friendly cake flavors, and vibrant
                themes of their <br />
                favorite cartoon and comic characters. We bring their
                imagination to life!Show love and create sweet memories with
                your kid(s). Make your child&apos;s <br />
                birthday special with our kid-friendly cake flavors, and vibrant
                themes of their <br />
                favorite cartoon and comic characters. We bring their
                imagination to life!Show love and create sweet memories with
                your kid(s). Make your child&apos;s <br />
                birthday special with our kid-friendly cake flavors, and vibrant
                themes of their <br />
                favorite cartoon and comic characters. We bring their
                imagination to life!
              </p>
            </div>
            <img src={flavor} className="img_2" alt="Celebrate" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
