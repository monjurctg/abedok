import React from "react";

function RoleInputs() {
  return (
    <div className="role py-4">
      <h3>Role</h3>

      <div className="checkboxs">
        <input className="" type="checkbox" value="Insert" />
        <label>Insert</label>
      </div>
      <div className="checkboxs">
        <input className="" type="checkbox" value="Insert" />
        <label>Edit</label>
      </div>
      <div className="checkboxs">
        <input className="" type="checkbox" value="Insert" />
        <label>Delete</label>
      </div>
      <div className="checkboxs">
        <input className="" type="checkbox" value="Insert" />
        <label>Transfer Student</label>
      </div>
      <div className="checkboxs">
        <input className="" type="checkbox" value="Insert" />
        <label>Apply Student</label>
      </div>
    </div>
  );
}

export default RoleInputs;
