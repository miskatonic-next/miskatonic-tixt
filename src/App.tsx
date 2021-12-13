import React from 'react';

import logo from './logo.svg';
import './App.css';

import TentacleIndex from './TentacleIndex'
import {Bar, BarChart, XAxis, YAxis} from 'recharts'


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <TentacleIndex
                    youTubeAPIKey={process.env.MISKATONIC_YOUTUBE_API_KEY as string}
                    videoId="UJCGgUhwLqo"

                    scorer={({scores, ...props}) =>
                        <BarChart
                            width={300}
                            height={100}

                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => Object({
                                name: num,
                                value: scores.filter(score => score === num).length,
                            }))}>

                            <XAxis dataKey="name" />
                            <Bar dataKey="value" fill="#00ff00" />
                        </BarChart>}

                    tixer={({tixValue, ...props}) =>
                        <div>{tixValue}</div>}
                />

            </header>
        </div>
    );
}

export default App;
