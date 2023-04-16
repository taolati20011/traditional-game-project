import React from 'react';

const getGameType = (typeId) => {
  switch(typeId) {
    case 1:
      return "Trí tuệ";
    case 2:
      return "Phong tục";
    case 3:
      return "Chiến trận";
    case 4:
      return "Tình yêu";
    case 5:
      return "Nghề nghiệp";
  }
}

export const Form = ({ onSubmit, filledValue }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="gameName">gameName</label>
        <input defaultValue={filledValue.gameName} className="form-control" id="gameName" />
      </div>
      <div className="form-group">
        <label htmlFor="gameDescription">gameDescription</label>
        <textarea defaultValue={filledValue.gameDescription} className="form-control text-truncate" id="gameDescription" style={{ height: "150px",}} />
      </div>
      <div className="form-group">
        <label htmlFor="releaseDate">releaseDate</label>
        <input defaultValue={filledValue.releaseDate} type="date" className="form-control" id="releaseDate" />
      </div>
      <div className="form-group">
        <label htmlFor="releaseLocation">releaseLocation</label>
        <input defaultValue={filledValue.releaseLocation} className="form-control" id="releaseLocation" />
      </div>
      <div className="form-group">
        <label htmlFor="typeId">Game type</label>
        <select defaultValue={getGameType(filledValue.typeId)} className="form-control" id="typeId">
          <option hidden>Select game type</option>
          <option value="1">Trí tuệ</option>
          <option value="2">Phong tục</option>
          <option value="3">Chiến trận</option>
          <option value="4">Tình yêu</option>
          <option value="5">Nghề nghiệp</option>
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
