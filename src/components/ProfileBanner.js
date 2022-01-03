import React from 'react';
// import { userProfile } from '../utils/constant';
import { Link } from 'react-router-dom';

class ProfileBanner extends React.Component {
  render() {
    const { bio, image, username, following } = this.props.profile;

    return (
      <section className="profile_header ">
        <div className="container">
          <div className="profile_banner">
            <img alt="" src={image || '/images/profile.png'} />
            <h3>{username}</h3>
            <h2>{bio}</h2>
          </div>
          <div className="setting_wrapper">
            {username === this.props.user.username ? (
              <Link to="/settings" className="setting">
                <p>Edit Profile Setting</p>
              </Link>
            ) : (
              <Link
                to="/"
                className="setting"
                onClick={() =>
                  this.props.handleFollow(username, this.props.user)
                }
              >
                <p>
                  {following === false
                    ? `+ Follow ${username}`
                    : `UnFollow ${username}`}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileBanner;
