function ProfileSummary() {
  return (
    <form className="summary-form" method="POST">
      <label htmlFor="FirstName">FirstName:</label>
      <input id="FirstName" name="firstName" />

      <label htmlFor="SecondName">SecondName:</label>
      <input id="SecondName" name="secondName" />

      <label htmlFor="Email">Email:</label>
      <input id="Email" name="email" />

      <label htmlFor="bio">Bio:</label>
      <textarea id="bio" name="bio"></textarea>

      <button type="submit" id="submit">
        Submit
      </button>
    </form>
  );
}
export default ProfileSummary;
