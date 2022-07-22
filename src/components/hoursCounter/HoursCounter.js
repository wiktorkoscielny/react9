import React from 'react';
// styles 
import '../../App.css'

// counter
import CountUp from 'react-countup';

export default function SumOfHours(props) {
  const allEvents = props.allEvents;
  if (props.allEvents.length > 0) {
    const sum = allEvents.reduce((acc, i) => acc + parseInt(i.title), 0);
    return (
      <div className='container__counter'>
        <CountUp
          end={sum}
          duration={2}
          preserveValue={sum}
        />
      </div>
    )
  } else if (
    props.allEvents.length === undefined ||
    props.allEvents.length === 0
  ) {
    return (
      <div className='container__counter'>
        0
      </div>
    );
  }
}
