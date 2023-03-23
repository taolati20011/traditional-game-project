import React from 'react';
export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="gameName">gameName</label>
        <input className="form-control" id="username" />
      </div>
      <div className="form-group">
        <label htmlFor="gameDescription">gameDescription</label>
        <input className="form-control" id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="releaseDate">releaseDate</label>
        <input className="form-control" id="fullname" />
      </div>
      <div className="form-group">
        <label htmlFor="releaseLocation">releaseLocation</label>
        <input className="form-control" id="address" />
      </div>
      <div className="form-group">
        <label htmlFor="gametype">Game type</label>
        <select className="form-control" id="gender">
          <option hidden>Select game type</option>
          <option value="1">Tình yêu</option>
          <option value="2">Phong tục</option>
          <option value="3">Chiến trận</option>
          <option value="4">Nghề nghiệp</option>
          <option value="5">Trí tuệ</option>
        </select>
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
