

function CourseForm({
  title,
  setTitle,
  description,
  setDescription,
  image,
  setImage,
  onSubmit,
  buttonText  
}){
   
    return(
   <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={onSubmit} className="space-y-6">

            <h2 className="text-2xl font-bold text-gray-800">
                {buttonText}
            </h2>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">
                    Course Title
                </label>

                <input 
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Enter course title"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Description
                </label>

                <input
                    rows='5'
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    placeholder="Course description" 
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Course Image
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>setImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-700 file:m-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                />
            </div>

            {image && typeof image !== 'string' && (
                <p className="text-sm text-green-600">
                    Selected: {image.name}
                </p>
            )}

            {typeof image === 'string' && image && (
                <img
                    src={image}
                    alt="course"
                    className="h-48 w-full rounded-lg border object-cover"
                />
            )}

            <button type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                {buttonText}
            </button>
        </form>
    </div>

    );
}

export default CourseForm;