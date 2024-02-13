import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/api';
import './Favourit.css';
import MusicalBox from './MusicalBox';
import Sidebar from './Sidebar';

function FavouritPage({ setSelectedSong, setIsPlayerVisible}) {

    const [favouriteTracks, setFavouriteTracks] = useState([]);
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

    const handleSongSelection = async (song) => {
        setSelectedSong(song);
        setIsPlayerVisible(true);
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData.id;
            await axiosInstance.post('/main/recently-played/', { track: song.id, user: userId });
        } catch (error) {
            console.error('Ошибка при обновлении недавно воспроизведенных:', error);
        }
    };

    useEffect(() => {
        axiosInstance.get('favourites/favourites-list/')
            .then(response => {
                const trackDetails = response.data.map(item => item.track_detail);
                setFavouriteTracks(trackDetails);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    // const refreshFavourites = () => {
    //     axiosInstance.get('favourites/favourites-list/')
    //         .then(response => {
    //             const trackDetails = response.data.map(item => item.track_detail);
    //             setFavouriteTracks(trackDetails);
    //         })
    //         .catch(error => {
    //             console.error('Ошибка при получении данных:', error);
    //         });
    // };

    return (
        <div className="main-container">
            <Sidebar setSelectedSong={setSelectedSong} setIsPlayerVisible={setIsPlayerVisible} />
            <div className="main-content">
                <div className="box box1">
                    <div className="search-container">
                        <input type="text" placeholder="Search artist, title, album" />
                    </div>
                    <a href="/premium" className="premium-link">Premium</a>
                    {userData.profile_image ? (
                        <img className="user-icon" 
                             src={`http://localhost:8000${userData.profile_image}`} 
                             alt="User" 
                        />
                    ) : (
                        <div className="user-icon"></div>
                    )}
                </div>
                <div className="box box-favourit">
                    <MusicalBox nameOfBox="Favourit" songInfo = {favouriteTracks} onSelectSong={handleSongSelection}/>
                </div>
                <div className="box box-none"></div>
                {/* <div className="box box-player">
                    {isPlayerVisible && <Player songInfo = {selectedSong} refreshFavourites={refreshFavourites}/>}
                </div> */}
            </div>
        </div>
    );
}

export default FavouritPage;