import React from 'react';
import './Profile.css'; 
import { useProfileQuery } from '../../redux/api/profileApi';

const Profile = () => {
 const {data} = useProfileQuery();

 console.log(data);

 return (
  <div className="profile-container">
   {
    data && data.payload && (
      <>
        <img src={data.payload.photo_url} alt="Profile" />
        <h1>{data.payload.username}</h1>
        <h2>{data.payload.first_name}</h2>
      </>
    )
   }
  </div>
 );
};

export default Profile;
