import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { verifyDate } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./profileEdit.style.scss";
import ExtraPageLayout from "../../components/extra-page-layout/ExtraPageLayout.component";
import LoginInput from "../../components/login-input/LoginInput.component";
import Btn from "../../components/btn/Btn.component";

const ProfileEdit = () => {
  const { user, editUserInfo } = useContext(UserContext);
  const history = useHistory();

  const [editUserName, setEditUserName] = useState(user.name);
  const [editUserBio, setEditUserBio] = useState(user.bio);
  const [editUserCity, setEditUserCity] = useState(user.location);
  const [editUserBdDay, setEditUserBdDay] = useState(
    user.birthday.split("/")[0]
  );
  const [editUserBdMonth, setEditUserBdMonth] = useState(
    user.birthday.split("/")[1]
  );
  const [editUserBdYear, setEditUserBdYear] = useState(
    user.birthday.split("/")[2]
  );

  const commitEdit = () => {
    if (
      editUserName === "" ||
      editUserBio === "" ||
      editUserCity === "" ||
      editUserBdDay === "" ||
      editUserBdMonth === "" ||
      editUserBdYear === ""
    ) {
      alert("Please, leave no box empty.");
    } else if (!verifyDate(editUserBdDay, editUserBdMonth, editUserBdYear)) {
      alert("Something is wrong with your birthday.");
    } else {
      editUserInfo(
        editUserName,
        editUserBio,
        editUserCity,
        `${editUserBdDay}/${editUserBdMonth}/${editUserBdYear}`
      );
      history.push("/");
    }
  };

  return (
    <ExtraPageLayout pageTitle="Edit your Profile">
      <div className="edit-box">
        <LoginInput
          state={editUserName}
          setState={setEditUserName}
          inputName="Edit Name"
          type="text"
          ctrlClass="edit-name"
        ></LoginInput>
        <LoginInput
          state={editUserBio}
          setState={setEditUserBio}
          inputName="Edit Bio"
          type="text"
          ctrlClass="edit-bio"
        ></LoginInput>
        <LoginInput
          state={editUserCity}
          setState={setEditUserCity}
          inputName="Edit City"
          type="text"
          ctrlClass="edit-city"
        ></LoginInput>
        <div className="flex jc-sb">
          <LoginInput
            state={editUserBdDay}
            setState={setEditUserBdDay}
            inputName="Day"
            type="text"
            ctrlClass="day"
            small
            charLimit={2}
          ></LoginInput>
          <LoginInput
            state={editUserBdMonth}
            setState={setEditUserBdMonth}
            inputName="Month"
            type="text"
            ctrlClass="month"
            small
            charLimit={2}
          ></LoginInput>
          <LoginInput
            state={editUserBdYear}
            setState={setEditUserBdYear}
            inputName="Year"
            type="text"
            ctrlClass="year"
            small
            charLimit={4}
          ></LoginInput>
        </div>
        <div className="flex jc-c">
          <Btn text="Comfirm" med onClick={commitEdit}></Btn>
        </div>
      </div>
    </ExtraPageLayout>
  );
};

export default ProfileEdit;
