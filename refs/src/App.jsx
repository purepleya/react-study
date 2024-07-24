import Player from './components/Player.jsx';
import TimmerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimmerChallenge title="Easy" targetTime={1} />
        <TimmerChallenge title="Not easy" targetTime={5} />
        <TimmerChallenge title="Getting tough" targetTime={10} />
        <TimmerChallenge title="Pros only" targetTime={15} />
      </div>
    </>
  );
}

export default App;
