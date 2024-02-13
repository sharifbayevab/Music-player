import React from "react";
import './MusicalBox.css';
import SongBox from "./SongBox";

// MusicalBox.js
function MusicalBox({ nameOfBox, songInfo, onSelectSong }) {
    return (
        <div className="MusicalBox">
            <div className="header">
                <div className="name">{nameOfBox}</div>
                <a href="/#" className="view-all-link">view all</a>
            </div>
            <div className="song-boxes">
                {songInfo.map((track, index) => 
                    <SongBox key={index} songInfo={track} onClick={() => onSelectSong(track)} />
                )}
            </div>
        </div>
    );
}


export default MusicalBox;
