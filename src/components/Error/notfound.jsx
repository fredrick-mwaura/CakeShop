import './notfound.css'
import notfound from '../../images/character-6.webp'
export default function Notfound() {
  return (
    <div className='notfound'>
      <img src="https://media.tenor.com/Hj01008oQ-UAAAAC/404-error.gif" alt="" />
      <div className="body">
        <h1 classsName="sorry">!Sorry, Page not found </h1>
        <p>sorry, we could not find the page you are looking for. Perhaps you have misstyped
           the URL? Be sure to check your spelling.
        </p>
        <div className='notfound-img'>
          <img src={notfound} alt="404" />
          <div className='overlay'>
            4 <span style={{color:'rgba(0,255, 0, 0.6)'}}> 0 </span>4
           </div> 
        </div>
        <a className='home' href="/">Back to Home</a>
      </div>
    </div>
  )
}
