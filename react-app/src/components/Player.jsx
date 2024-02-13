import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../services/api';
import './Player.css';
import { BsRewindFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { BsFastForwardFill } from 'react-icons/bs';
import { FaPause } from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai'
import {CiVolumeHigh} from 'react-icons/ci'


function Player({songInfo, songNext, songPrev, setIsRefreshFavourite, setSelectedSong}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isVolumeBarVisible, setIsVolumeBarVisible] = useState(false);

    useEffect(() => {
        const checkIfFavourite = async () => {
            try {
                const response = await axiosInstance.get(`/favourites/check/${songInfo.id}`);
                setIsFavourite(response.data.isFavourite);
            } catch (error) {
                console.error('Ошибка при проверке статуса избранного:', error);
            }
        };
    
        if (songInfo) {
            checkIfFavourite();
        }
    }, [songInfo]);

    useEffect(() => {
        if (songInfo && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [songInfo]);

    useEffect(() => {
        const audio = audioRef.current;
    
        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };
    
        const updateCurrentTime = () => {
            setCurrentTime(audio.currentTime);
        };
    
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', updateCurrentTime);
    
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', updateCurrentTime);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    const calculateProgress = (currentTime, duration) => {
        return (currentTime / duration) * 100;
    };

    const handleFavouriteToggle = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userId = userData.id;
    
            await axiosInstance.post(`/favourites/toggle/`, {   track: songInfo.id, 
                                                                user: userId 
                                                            });
            setIsFavourite(current => !current);

            if (setIsRefreshFavourite) {
                setIsRefreshFavourite(true);
            }

        } catch (error) {
            console.error('Ошибка при обновлении списка любимых:', error);
        }
    };

    const handlePrevSong = () => {
        if (songPrev) {
            setSelectedSong(songPrev);
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const userId = userData.id;
                axiosInstance.post('/main/recently-played/', { track: songPrev.id, user: userId });
            } catch (error) {
                console.error('Ошибка при обновлении недавно воспроизведенных:', error);
            }
        }
    };

    const handleNextSong = () => {
        if (songNext) {
            setSelectedSong(songNext);
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const userId = userData.id;
                axiosInstance.post('/main/recently-played/', { track: songNext.id, user: userId });
            } catch (error) {
                console.error('Ошибка при обновлении недавно воспроизведенных:', error);
            }
        }
    };

    const toggleVolumeBar = () => {
        setIsVolumeBarVisible(!isVolumeBarVisible);
    };
    
    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div className="Player">
            <div className="player-left">
                <img src={songInfo.cover_image_url} alt="" className="player-image"/>
                <div className="player-info">
                    <span className="song-title">{songInfo.title}</span>
                    <span className="Artist-name">{songInfo.artist}</span>
                </div>
            </div>
            <audio ref={audioRef} src={songInfo.track_file_url} />
            <div className="player-middle">
                <div className="controls">
                    <button className="icon" onClick={handlePrevSong}><BsRewindFill/></button> {/*Rewind Icon */}
                    <button className="icon" onClick={togglePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="icon" onClick={handleNextSong}><BsFastForwardFill/></button> {/* Forward Icon */}
                </div>
                <div className="progress">
                    <span className="time">{formatDuration(currentTime)}</span>
                    <div className="bar">
                        <div className="played" style={{ width: `${calculateProgress(currentTime, duration)}%` }}></div>
                    </div>
                    <span className="duration">{formatDuration(songInfo.duration)}</span>
                </div>
            </div>
            <div className="player-right">
                <button className="icon" onClick={handleFavouriteToggle}>
                    <AiOutlineHeart style={{ color: isFavourite ? 'red' : 'black' }}/>
                </button>   {/* Heart Icon */}
                <div className="volume-container"
                    onMouseEnter={() => setIsVolumeBarVisible(true)}
                    onMouseLeave={() => setIsVolumeBarVisible(false)}>
                    <button className="icon" onClick={toggleVolumeBar}><CiVolumeHigh/></button> {/* Volume Icon */}
                    {isVolumeBarVisible && (
                        <div className='volume-bar'>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={volume} 
                                onChange={handleVolumeChange} 
                                className="volume-slider vertical-slider"
                            />
                        </div>
                    )}
                </div>
                <div className="icon"></div>              
                <span className="icon">&#x2630;</span> {/* Menu Icon */}
            </div>
        </div>
    )
}


function CorrectionFormatDuration(duration) {
    const parts = duration.split(':');
    const formattedParts = parts.map((part, index) => {
      if (index === 0 && part === "00") {
        return '';
      }
      return part.replace(/^0/, '');
    }).filter(part => part !== ''); 
    return formattedParts.join(':');
  }

  function formatDuration(durationInSeconds) {
    if (typeof durationInSeconds !== 'number') {
        return CorrectionFormatDuration(durationInSeconds);
    }

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}

export default Player;