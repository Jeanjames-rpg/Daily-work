
function ChapterForm ({
    title,
    setTitle,
    description,
    setDescription,
    order,
    setOrder,
    video,
    setVideo,
    onSubmit,
    buttontext
}) {
    return(
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <form 
                onSubmit={onSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl"
                encType="multipart/form-data"
            >
                <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
                    {buttontext}
                </h2>

                <div className="mb-6">

                    <label className="block text-gray-700 font-semibold mb-2">
                        Chapter Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Enter chapter title"
                        required
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder="What will students learn in this chapter?"
                        rows={4}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* chapter order */}
                <div className="mb-6">
                    <label className="font-semibold block text-gray-700 mb-2">
                        Chapter order
                    </label>

                    <input
                        type="number"
                        value={order}
                        onChange={(e)=>setOrder(e.target.value)}
                        placeholder="1"
                        required
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                </div>

                {/* Video  */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Upload Video
                    </label>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e)=>setVideo(e.target.files[0])}
                        className="w-full"
                    />

                </div>

                {/* Existing Video */}

                {
                    typeof video === "string" && 
                    video && 
                    (
                        <video
                            src={video}
                            controls
                            className="w-full rounded-lg mb-6"
                        />
                    )
                }

                {/* selected Video */}

                {
                    video instanceof File &&
                    (
                        <p className="mb-6 text-green-600">
                            Selected:{video.name}
                        </p>
                    )
                }

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                >
                    {buttontext}
                </button>
            </form>
        </div>
    );
}

export default ChapterForm;