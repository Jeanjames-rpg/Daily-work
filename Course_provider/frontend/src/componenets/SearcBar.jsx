import styles from "../styles/SearchBar.module.css"

function SearchBar({value,onchange}){

    return(
        <input  
        className={styles.input}
        type="text"
        placeholder="Search Courses.."
        value={value}
        onChange={onchange}
        
        />

    );

}

export default SearchBar;