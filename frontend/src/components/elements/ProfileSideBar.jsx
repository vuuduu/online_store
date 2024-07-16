import './elements.css';

const ProfileSideBar = ({ storedUser, handleLogout, handleViewChange, homeView, handleGoBack }) => {
    const handleViewClick = (view) => {
        handleViewChange(view);
        handleGoBack();
    }

    return (
        <div className="profile-container">
            <div className="profile-container-top">
                <div className="welcome-container">
                    {storedUser ? `Welcome, ${storedUser.name}` : 'Welcome'}
                </div>
                <div className={`gallery-container ${homeView === 'gallery' ? 'active-view' : ''}`} onClick={() => handleViewClick('gallery')}>Gallery</div>
                <div className={`suggest-container ${homeView === 'suggest' ? 'active-view' : ''}`} onClick={() => handleViewClick('suggest')}>Suggest</div>
            </div>
            <div className="logout-container" onClick={handleLogout}>
                Logout
            </div>
        </div>
    )
}

export default ProfileSideBar;