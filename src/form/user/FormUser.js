import React from 'react';
export const Form = ({ onSubmit, filledValue }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input defaultValue={filledValue.username} className="form-control" id="username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" defaultValue={filledValue.password} className="form-control border" id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="userFullname">FullName</label>
        <input defaultValue={filledValue.userFullname} className="form-control" id="userFullname" />
      </div>
      <div className="form-group">
        <label htmlFor="userAddress">Address</label>
        <input defaultValue={filledValue.userAddress} className="form-control" id="userAddress" />
      </div>
      <div className="form-group">
        <label htmlFor="userPhone">Phone</label>
        <input defaultValue={filledValue.userPhone} className="form-control" id="userPhone" />
      </div>
      <div className="form-group">
        <label htmlFor="userGender">Gender</label>
        <select defaultValue={filledValue.userGender} className="form-control" id="userGender">
          <option hidden value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="userEmail">Email address</label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          placeholder="name@example.com"
          defaultValue={filledValue.userEmail}
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
