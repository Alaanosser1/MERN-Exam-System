const StudentSearch = ({ content, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(content);
    console.log(content, "CONTET");
    const resultsArray = content.filter(
      (value) =>
        value.examinee_name
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        value.examinee_id
          .toString()
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        value.examinee_police_number
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        value.examinee_civilian_number
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        value.examinee_seniority_number
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        value.examinee_entity
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
      class="form-control w-75"
      dir="rtl"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange={handleSearchChange}
    />
  );
};
export default StudentSearch;
