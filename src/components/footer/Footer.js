import React, {useState} from 'react'

// styles
import './Footer.css'

const Footer = (props) => {
    const [moneyPerHour, setMoneyPerHour] = useState(0)
    const [earnings, setEarnings] = useState({title: ''})
    const earningSum = (e) => {
        e.preventDefault();
        const allEvents = props.allEvents;
        const sum = allEvents.reduce((acc, i) => acc + parseInt(i.title), 0);
        setMoneyPerHour(parseInt(sum * earnings.title));
    }
  return (
    <section id='count'>
        <div className='footer__container'>
            <div className='footer__content'>
                <form onSubmit={(e) => earningSum(e)}>
                <input
                        type='number'
                        className='footer__input'
                        placeholder="Earnings per hour"
                        value={earnings.title}
                        onChange={(e) => setEarnings({title: e.target.value})}
                    />
                    <button type='submit' className="btn btn-primary">Calculate</button>
                </form>
                <div className='footer__earnings'>
                    You've earned <br />
                    {moneyPerHour} PLN
                </div>
            </div>
            <div className='footer'>
                <div className='footer__link'>
                    Created by <a href='https://github.com/wiktorkoscielny' rel="noopener noreferrer" target='_blank' >wiktorkoscielny</a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer