import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({setSelectedSong, setIsPlayerVisible}) {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/mainpage"); 
    };

    const handleFavourit = () => {
        navigate("/favourit"); 
    };

    const handlePlaylist = () => {
        navigate("/playlist"); 
    };
    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        setSelectedSong(null);
        setIsPlayerVisible(false);
        navigate("/"); 
    };

    return (
        <aside className="sidebar">
            <div className="logo">MelodyMingle</div>
            <nav className="nav-links">
                <button onClick={handleHome} className="nav-link">
                    <img src="/home.png" alt="Home" className="nav-icon" /> Home
                </button>
                <button onClick={handleFavourit} className="nav-link">
                    <img src="/heart.png" alt="favourite" className="nav-icon" /> Favourit
                </button>
                <button onClick={handlePlaylist} className="nav-link">
                    <img src="/music.png" alt="playlist" className="nav-icon" /> Playlist
                </button>
                <button onClick={handleAccount} className="nav-link">
                    <img src="/person.png" alt="account" className="nav-icon" /> Account
                </button>
            </nav>
            <div className="space"> </div>
            <button className="logout" onClick={handleLogout}> Logout</button>
        </aside>
    );
}

export default Sidebar;
