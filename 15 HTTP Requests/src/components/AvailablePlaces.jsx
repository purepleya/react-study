import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/placesss');
        const resData = await response.json();
        
        if (!response.ok) {
          throw new Error('Failt to fetch places');
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({message: error.message || 'Cloud not fetch places, please try again later.'});
      }

      setIsFetching(false);
    }
    
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
