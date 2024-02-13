import React, { useState, useEffect, useRef } from 'react';
import './Account.css';
import Sidebar from './Sidebar';
import axiosInstance from '../services/api';
import authService from '../services/authService';

function Account({ setSelectedSong, setIsPlayerVisible}) {
 

    const [userData, setUserData] = useState([]);
    const fileInputRef = useRef(null);

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/accounts/user-register/');
            setUserData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                await axiosInstance.put('accounts/user-upload-profile-image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                await authService.refreshUserData(); // Обновляем данные пользователя
                fetchUserData(); // Обновляем состояние компонента
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    };
    

    // useEffect(() => {
    //     console.log("Текущая информация о песне:", userData);
    // }, [userData]);

    return (
        <div className="acc-main-container">
            <Sidebar setSelectedSong={setSelectedSong} setIsPlayerVisible={setIsPlayerVisible} />
            <div className="acc-main-content">
                <div className='space'></div>
                <div className="page-name">Account</div>
                <div className='user-photo'>
                    {userData.profile_image ? (
                        <img className="user-icon" 
                             src={`http://localhost:8000${userData.profile_image}`} 
                             alt="User" 
                             onClick={handleIconClick} 
                        />
                    ) : (
                        <div className="user-icon" onClick={handleIconClick}></div>
                    )}
                    <input type="file" onChange={handleImageUpload} ref={fileInputRef} style={{display: 'none'}} />
                </div>
                <div className='space'></div>
                <div className="user-info">
                    <div className="user-cell">
                        <span>Name</span>
                        <div className="cell">{userData.username}</div>
                    </div>
                    <div className="user-cell">
                        <span>Email</span>
                        <div className="cell">{userData.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
