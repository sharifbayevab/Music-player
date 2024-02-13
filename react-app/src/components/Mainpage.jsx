import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/api';
import './Mainpage.css';
import MusicalBox from './MusicalBox';
import Sidebar from './Sidebar';


function MainPage({ setSelectedSong, setIsPlayerVisible}) {

    const [songInfoRecom, setSongInfoRecom] = useState([]);
    const [songInfoRecent, setToRecent] = React.useState([]);
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

    useEffect(() => {
        axiosInstance.get('/main/recommended-tracks/')
            .then(response => {
                setSongInfoRecom(response.data.map(item => item.track_detail));
            })
            .catch(error => {
                console.error('Ошибка при получении списка рекомендованных треков:', error);
            });
    }, []);

    useEffect(() => {
        axiosInstance.get('/main/recently-played/')
            .then(response => {
                setToRecent(response.data.map(item => item.track_detail));
            })
            .catch(error => {
                console.error('Ошибка при получении списка недавно воспроизведенных:', error);
            });
    }, []);

    const refreshRecentlyPlayed = async () => {
        try {
            const response = await axiosInstance.get('/main/recently-played/');
            setToRecent(response.data.map(item => item.track_detail));
        } catch (error) {
            console.error('Ошибка при обновлении списка недавно воспроизведенных:', error);
        }
    };

    const handleSongSelection = async (song) => {
        setSelectedSong(song);
        setIsPlayerVisible(true);
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData.id;
            await axiosInstance.post('/main/recently-played/', { track: song.id, user: userId });
            refreshRecentlyPlayed();
        } catch (error) {
            console.error('Ошибка при обновлении недавно воспроизведенных:', error);
        }
    };



    return (
        <div className="main-container">
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
                <div className="box box-recommendation">
                    <MusicalBox nameOfBox="Recommended" songInfo = {songInfoRecom} onSelectSong={handleSongSelection}/>
                </div>

                <div className="box box-recent">
                    <MusicalBox nameOfBox="Recent" songInfo = {songInfoRecent} onSelectSong={handleSongSelection}/>
                </div>
                {/* <div className="box box-player">
                    {isPlayerVisible && <Player songInfo = {selectedSong} refreshRecentlyPlayed = {refreshRecentlyPlayed}/>}
                </div> */}
            </div>
        </div>
    );
}

export default MainPage;