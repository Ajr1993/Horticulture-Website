function UploadAvatar() {
  return (
    <form>
      <label htmlFor="avatar">Upload Avatar:</label>
      <input type="file" id="avatar" name="avatar" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}
export default UploadAvatar;
