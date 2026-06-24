import styles from "../styles/SearchBar.module.css"

function SearchBar({value,onChange}){

    return(
        <input  
        className={styles.input}
        type="text"
        placeholder="Search Courses.."
        value={value}
        onChange={onChange}
        
        />

    );

}

export default SearchBar;