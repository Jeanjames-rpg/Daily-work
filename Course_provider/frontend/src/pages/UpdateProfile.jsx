import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProfileForm from "../componenets/ProfileForm";

function UpdateProfile() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [bio, setBio] = useState("");

    const [profilepic, setProfilePic] = useState("");

    useEffect(()=>{
        api.get("profile/update")
        .then((res) => {

            setUsername(res.data.username);

            setEmail(res.data.email);

            setBio(res.data.bio);

            setProfilePic(res.data.profilepic);
        });
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("username", username);

        formData.append("email", email);

        formData.append("bio", bio);

        if (profilepic instanceof File) {
            
            formData.append("profile_picture",profilepic);
        }

        try {

            await api.put(
                "profile/update/",
                formData
            );

            alert('Profile Updated');

            navigate('/dashboard');

        }

        catch(err){
            console.log(err);

            alert(err);
        }
    };

    return(
        <div>
            <ProfileForm
            
                username={username}
                setUsername={setUsername}

                email={email}
                setEmail={setEmail}

                bio={bio}
                setBio={setBio}

                profilePic={profilepic}
                setProfilePic={setProfilePic}

                onSubmit={handleSubmit}

                buttonText="Update Profile"
            />
        </div>
    );
}
export default UpdateProfile;