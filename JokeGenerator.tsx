import React, { useEffect, useState } from 'react';

const JokeGenerator: React.FC = () => {
    const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchJoke = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setJoke(data);
        } catch (err) {
            setError('Failed to fetch a joke. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div>
            <h1>Random Joke Generator</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {joke && (
                <div>
                    <p>{joke.setup}</p>
                    <p><strong>{joke.punchline}</strong></p>
                </div>
            )}
            <button onClick={fetchJoke} disabled={loading}>
                Fetch New Joke
            </button>
        </div>
    );
};

export default JokeGenerator;
