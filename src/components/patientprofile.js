import React, { useEffect, useState } from 'react';

const PatientProfile = ({ uniqueId }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from backend
    const fetchProfileData = async () => {
      const response = await fetch(`http://localhost:5000/profile/${uniqueId}`);
      const data = await response.json();
      setProfileData(data);
    };

    fetchProfileData();
  }, [uniqueId]);

  return (
    <div>
      {profileData ? (
        <div>
          <h2>Profile Details</h2>
          <p>Unique ID: {profileData.unique_id}</p>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone: {profileData.phone}</p>
          <p>Age: {profileData.age}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
