import React from 'react';
export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input className="form-control" id="username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="fullname">FullName</label>
        <input className="form-control" id="fullname" />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input className="form-control" id="address" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input className="form-control" id="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select className="form-control" id="gender">
          <option hidden>Select gender</option>
          <option value="nam">Male</option>
          <option value="nu">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        /> <br/>
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
