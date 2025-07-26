import "./App.css";
import "./ProfileSummary";
import "./AvatarUpload";
function Message(props) {
  function HandleProfileClick(event) {
    event.preventDefault();
    props.setActiveSection("profile");
  }

  function HandleAvatarClick(event) {
    event.preventDefault();
    props.setActiveSection("avatar");
  }
  function Back(event) {
    event.preventDefault();
    props.setActiveSection("");
  }

  return (
    <div>
      <h1 id="App">Welcome to the Horticulture App</h1>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#" onClick={HandleProfileClick}>
              Profile Summary
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={HandleAvatarClick}>
              Avatar
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={Back}>
              Back
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Message;
