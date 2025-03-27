import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('dark');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full Stack Developer',
    avatar: 'https://via.placeholder.com/150',
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile update:', profileData);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Handle theme change logic here
    console.log('Theme changed to:', newTheme);
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src={profileData.avatar} alt="Profile" />
          <button className="change-avatar">Change Photo</button>
        </div>
        <nav className="profile-nav">
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`nav-item ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            Theme
          </button>
          <button
            className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </button>
        </nav>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Profile Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <div className="settings-group">
              <h3>Notifications</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Email Notifications
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Push Notifications
                </label>
              </div>
            </div>
            <div className="settings-group">
              <h3>Security</h3>
              <button className="secondary-button">Change Password</button>
              <button className="secondary-button">Enable 2FA</button>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="theme-section">
            <h2>Theme Settings</h2>
            <div className="theme-options">
              <button
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                Light Theme
              </button>
              <button
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                Dark Theme
              </button>
              <button
                className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                onClick={() => handleThemeChange('system')}
              >
                System Theme
              </button>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="privacy-section">
            <h2>Privacy Settings</h2>
            <div className="privacy-options">
              <div className="privacy-item">
                <h3>Profile Visibility</h3>
                <select defaultValue="public">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              <div className="privacy-item">
                <h3>Code Sharing</h3>
                <select defaultValue="public">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              <div className="privacy-item">
                <h3>Activity Status</h3>
                <select defaultValue="online">
                  <option value="online">Show Online Status</option>
                  <option value="offline">Hide Online Status</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 