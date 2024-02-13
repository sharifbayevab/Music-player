import React from "react";
import './SongBox.css'

function SongBox({ songInfo, onClick }) {
    return (
        <button onClick={onClick}>
            <div href='/#' className="song-box">
                <div className="img-music" style={{ backgroundImage: `url(${songInfo.cover_image_url})` }}></div>
                <div className="info-music"> 
                    <div className="name-music"> {songInfo.title} </div>
                    <div className="name-music"> {songInfo.artist} </div>
                </div>
            </div>
        </button>

    )
}

export default SongBox;