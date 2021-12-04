import React from 'react';

class ProfileBanner extends React.Component {
  render() {
    let { image, username } = this.props.user;
    return (
      <section className="profile_header ">
        <div className="container">
          <div className="profile_banner">
            <img alt="" src={image || '/images/profile.png'} />
            <h3>{username}</h3>
          </div>
          <div className="setting_wrapper">
            <a href="/" className="setting">
              <p>
                + Follow <span>{username}</span>
              </p>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileBanner;
