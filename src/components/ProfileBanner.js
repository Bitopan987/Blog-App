import React from 'react';

class ProfileBanner extends React.Component {
  render() {
    return (
      <section className="profile_header ">
        <div className="container">
          <div className="profile_banner">
            <img alt="" src="/images/profile.png" />
            <h3>Altcampus</h3>
            <p>hello</p>
          </div>
          <div className="setting_wrapper">
            <a href="/" className="setting">
              <p>Edit Profile Setting</p>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileBanner;
