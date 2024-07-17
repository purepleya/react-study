import { calculateInvestmentResults } from '../util/investment'

export default function Results({ input }) {
  
  const result = calculateInvestmentResults(input);

  console.log(result);

  return <p>Results...</p>;
}