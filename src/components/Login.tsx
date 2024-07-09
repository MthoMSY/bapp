export function Login() {
  return (
    <div className="box ">
        <div className="block">
          {/* --- Username*/}
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-rounded"
                type="text"
                placeholder="Username"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          {/* --- Password*/}
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-rounded"
                type="password"
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <div className="buttons is-centered">
              <button className="button is-white">Login</button>
              <button className="button is-white">Sign Up</button>
              <button className="button is-text">Forgot your password?</button>

            </div>
          </div>
        </div>
    </div>
  );
}
