import { useState } from 'react'

const Button = ({text, handleClick}) => 
  <button onClick={handleClick}>{text}</button>

const StatisticsRow = ({text, value}) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr> 

const Statistics = (props) => {
  const [good, neutral, bad] = props.data;
  const total = good + neutral + bad
  const average = (good + (bad * -1)) / total
  const positive_pct = good/total
  if (total>0) {
    return (
    <>
      <table>
        <tbody>
          <StatisticsRow text="good" value={good}/>
          <StatisticsRow text="neutral" value={neutral}/>
          <StatisticsRow text="bad" value={bad}/>
          <StatisticsRow text="all" value={total}/>
          <StatisticsRow text="average" value={average}/>
          <StatisticsRow text="positive" value={positive_pct}/>
        </tbody>
      </table>
    </> 
    )
  }
  else {
    return <h3>No Freedback given</h3>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good+1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" handleClick={() => setBad(bad+1)}/>
      <br />
      <h2>Statistics</h2>
      <Statistics data={[good, neutral, bad]}/>
    </div>
  )
}

export default App