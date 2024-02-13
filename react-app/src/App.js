// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState} from 'react';
import axiosInstance from './services/api';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Authorization';
import MainPage from './components/Mainpage';
import FavouritPage from './components/Favourit';
import Account from './components/Account'; 
import Playlist from './components/Playlist';
import Regstration from './components/Registration';
import Player from './components/Player';

function App() {

    const [selectedSong, setSelectedSong] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [songs, setSongs] = useState([]);

    
    const fetchTracks = async () => {
        try {
            const response = await axiosInstance.get('playlists/tracks/');
            setSongs(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };
  
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm fetchTracks = {fetchTracks} />} />
                    <Route path="/mainpage" element={<MainPage setSelectedSong={setSelectedSong} 
                                                                setIsPlayerVisible={setIsPlayerVisible} 
                                                                />} />
                    <Route path="/favourit" element={<ProtectedRoute><FavouritPage setSelectedSong={setSelectedSong} 
                                                                                    setIsPlayerVisible={setIsPlayerVisible}
                                                    /></ProtectedRoute>} />
                    <Route path="/playlist" element={<ProtectedRoute>
                                                                    <Playlist songs={songs} 
                                                                                setSelectedSong={setSelectedSong} 
                                                                                setIsPlayerVisible={setIsPlayerVisible} />
                                                    </ProtectedRoute>} />
                    <Route path="/account" element={<ProtectedRoute><Account setSelectedSong={setSelectedSong} 
                                                                             setIsPlayerVisible={setIsPlayerVisible}
                                                                    /></ProtectedRoute>} />
                    <Route path="/registration" element={<Regstration fetchTracks = {fetchTracks}/>} />
                </Routes>
                    {isPlayerVisible && (
                        <div className="box app-box-player">
                            <Player songInfo={selectedSong}                             
                            songPrev={selectedSong.id - 2 >= 0 ? songs[selectedSong.id - 2] : songs[songs.length - 1]}
                            songNext={songs[selectedSong.id % songs.length]}
                            setSelectedSong = {setSelectedSong}
                            />
                        </div>
                    )}
            </div>
        </Router>
    );
}

export default App;
