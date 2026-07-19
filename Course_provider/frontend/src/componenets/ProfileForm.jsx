
function ProfileForm({
    username,
    setUsername,
    email,
    setEmail,
    bio,
    setBio,
    profilePic,
    setProfilePic,
    onSubmit,
    buttonText
}) {

    return(
        <div>

            <form onSubmit={onSubmit}>
                
                <h2>
                    {buttonText}
                </h2>
                
                <div>
                    {
                        typeof profilePic === 'string' &&

                        profilePic? (
                            <img
                                src={profilePic}
                                alt='profilePic'
                                className="w-36 h-36 rounded-full object-cover border-4 border-orange-400"
                            />
                        ) : (
                            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )
                    }
                </div>

                <div className="mb-5">

                    <label className="block mb-2 font-semibold">
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                        required
                    />

                </div>

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Email
                    </label>


                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none "
                        required
                    />
                </div>

                <div className="mb-5">

                    <label className="block mb-2">
                        Bio
                    </label>

                    <textarea
                        rows='4'
                        value={bio}
                        onChange={(e)=>setBio(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                        placeholder="Tell me something about yourself.."
                    />
                </div>


                <div className="mb-8">
                    <label className="block mb-2 font-semibold">
                            Profile Picture
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>setProfilePic(e.target.files[0])}
                        className="w-full"
                    />
                    {
                        profilePic instanceof File &&

                        <p className="text-green-600 mt-2">
                            Selected: {profilePic.name}
                        </p>
                    }
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                >

                    {buttonText}

                </button>
            </form>

        </div>
    );
}

export default ProfileForm;