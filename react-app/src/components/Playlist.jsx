import React, { useState, useEffect} from 'react';
import axiosInstance from '../services/api';
import './Playlist.css';
import Sidebar from './Sidebar';


const genres = ["Classical", "Jazz", "Hip-hop", "Dance" ,
                "Rap", "Pop", "Rock", "Metal", "R&B", "Disco"]

                
function Playlist({ songs, setSelectedSong, setIsPlayerVisible }) {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const filteredSongs = selectedGenres.length > 0
        ? songs.filter((song) => selectedGenres.includes(song.genre))
        : songs;
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');   
        if (storedUserData) {
            try {
                const parsedData = JSON.parse(storedUserData);
                setUserData(parsedData);
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        }
    }, []);

    return(
        <div className='main-container-playlist'>
            <Sidebar setSelectedSong={setSelectedSong} setIsPlayerVisible={setIsPlayerVisible} />
            <div className="main-content">
                <div className="box box1">
                    <div className="search-container">
                        <input type="text" placeholder="Search artist, title, album" />
                    </div>
                    <a href="/#" className="premium-link">Premium</a>
                    {userData.profile_image ? (
                        <img className="user-icon" 
                             src={`http://localhost:8000${userData.profile_image}`} 
                             alt="User" 
                        />
                    ) : (
                        <div className="user-icon"></div>
                    )}
                </div>
                <div className='space-ply'></div>
                <div className='playlist-header'>
                    <div className="name">{"Playlist"}</div>
                </div>

                <div className="box-playlist"> 
                    <div className="musical">
                        <div className="genres"> 
                            {genres.map((genr, index) => (
                                    <Genres key={index} 
                                            nameOfgenr={genr} 
                                            selectedGenres={selectedGenres} 
                                            setSelectedGenres={setSelectedGenres}
                                    />
                            ))}
                        </div> 

                        <div className="songs">
                            {filteredSongs.map((song, index) => (
                                    <Song key={index} 
                                        song={song} 
                                        setSelectedSong={setSelectedSong}
                                        setIsPlayerVisible={setIsPlayerVisible} />
                            ))}
                        </div>                     
                    </div> 
    
                    {/* <div className="box box-player" >
                        {isPlayerVisible && selectedSong && <Player songInfo={selectedSong}/>}
                    </div> */}
                </div>


            </div>
        </div>
    )
}

function Genres({ nameOfgenr, selectedGenres, setSelectedGenres }) {
    const isActive = selectedGenres.includes(nameOfgenr);

    const handleClick = () => {
        if (isActive) {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== nameOfgenr));
        } else {
            setSelectedGenres([...selectedGenres, nameOfgenr]);
        }
    };

    return (
        <button
            className={`genr-box ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className="genr-name">{nameOfgenr}</div>
        </button>
    );
}

function Song({ song, setSelectedSong, setIsPlayerVisible }) {
    const handleSongClick = () => {
        setSelectedSong(song);
        setIsPlayerVisible(true);
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData.id;
            axiosInstance.post('/main/recently-played/', { track: song.id, user: userId });
        } catch (error) {
            console.error('Ошибка при обновлении недавно воспроизведенных:', error);
        }
    };

    return (
        <button className="info-music" onClick={handleSongClick}>
            <div className="name-music"> {song.title} </div>
            <div className="name-artist"> {song.artist} </div>
        </button>
    )
}

export default Playlist;
