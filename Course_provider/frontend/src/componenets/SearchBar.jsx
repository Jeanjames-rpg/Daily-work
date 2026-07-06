import styles from "../styles/SearchBar.module.css"

function SearchBar({value,onChange}){

    return(
        <input  
        className="block w-full p-3 ps-9 mb-5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        type="text"
        placeholder="Search Courses.."
        value={value}
        onChange={onChange}
        
        />

    );

}

export default SearchBar;