import React, { useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";

function Profile() {
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user, header } = useStateContext();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Assurez-vous que l'image est correctement attribuée à la variable d'état
        console.log(e.target.files[0]); // Vérifiez que l'image est correctement récupérée
    };
    

    const uploadProfilePicture = async () => {
        try {
            if (!image) {
                setErrorMessage('Please select an image.');
                return;
            }
            
            const formData = new FormData();
            formData.append('image', image); // Assurez-vous que 'image' correspond au nom du champ attendu par le backend Laravel
    
            const res = await axios.post('http://127.0.0.1:8000/api/uploadProfilePicture', formData,  header );
            setSuccessMessage('Profile picture uploaded successfully.');
            console.log(res);
        } catch (error) {
            console.log(error.response.data); // Affichez les détails de l'erreur dans la console pour le débogage
            setErrorMessage('Failed to upload profile picture.');
        }
    };
    

    const updateProfilePicture = async () => {
        try {
            if (!image) {
                setErrorMessage('Please select an image.');
                return;
            }
            const formData = new FormData();
            formData.append('image', image);
            await axios.put('http://127.0.0.1:8000/api/updateProfilePicture', formData, header);
            setSuccessMessage('Profile picture updated successfully.');
        } catch (error) {
            setErrorMessage('Failed to update profile picture.');
        }
    };

    const deleteProfilePicture = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/deleteProfilePicture',  header);
            setSuccessMessage('Profile picture deleted successfully.');
        } catch (error) {
            setErrorMessage('Failed to delete profile picture.');
        }
    };

    return (
        <div>
            <h2>Profile Picture Upload</h2>
            <input type="file" onChange={handleImageChange} />
            <button onClick={uploadProfilePicture}>Upload</button>
            <button onClick={updateProfilePicture}>Update</button>
            <button onClick={deleteProfilePicture}>Delete</button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default Profile;
