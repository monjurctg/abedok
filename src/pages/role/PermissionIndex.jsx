import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/layout/Dashboard";
import { roleList } from "../../redux/actions/roleAction";

function PermissionIndex() {
  const { roleListRed } = useSelector((state) => state.role);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
    }
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleList());
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(roleList(pageNo));
  };

  let roleShow = "";
  if (roleListRed.permissions_all) {
    roleShow = roleListRed.permissions_all.map((exam, index) => {
      return (
        <h4
          className="permissions text-center"
          style={{ width: "30%" }}
          key={index}
        >
          {exam.name}
        </h4>
      );
    });
  }

  return (
    <div>
      <Dashboard>
        <div className="university">
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Permission List</h3>
            </div>
            <div className="university__details">
              <table className="">
                <tbody>
                  <tr>
                    <th className="text-center">Permissions</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex td_details flex-wrap align-items-center">
                        {roleShow}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default PermissionIndex;
