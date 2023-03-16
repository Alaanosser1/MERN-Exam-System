import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ content, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(content);

    const resultsArray = content.filter(
      (value) =>
        value.exam_name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        value.exam_description
          .toUpperCase()
          .includes(e.target.value.toUpperCase())
    );
    console.log(e.target.value);

    setSearchResults(resultsArray);
    console.log(resultsArray);
  };

  return (
    <input
      type="text"
      class="form-control w-25"
      placeholder="بحث"
      dir="rtl"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange={handleSearchChange}
    />
  );
};
export default SearchBar;
