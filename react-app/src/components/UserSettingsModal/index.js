import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import "./UserSettingsModal.css";

export default function UserSettingsModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(sessionUser?.tagged_name.split('#')[0]);
  const [userHash, setUserHash] = useState(sessionUser?.tagged_name.split('#')[1]);
  const [userAvatar, setUserAvatar] = useState(sessionUser?.avatar);

  function editUser(e) {
    e.preventDefault();

    const userUpdate = {
      ...server,
      name: userName + "#" + userHash,
      icon: serverIcon,
    };
    dispatch(updateServer(serverUpdate));
    setShowModal(false);
  }

  function deleteServer() {
    dispatch(removeServer(server?.id));
    setShowModal(false);
    history.push("/channels/@me");
  }
  console.log(serverName, serverIcon);

  return (
    <>
      <button
        className="server-settings"
        onClick={() => setShowModal(true)}
      ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="edit-server-modal">
            <form className="edit-server-form" onSubmit={editServer}>
              <label htmlFor="edit-server-name">Server Name</label>
              <input
                id="edit-server-name"
                className="edit-server-name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              ></input>
              <label htmlFor="edit-server-icon">Server Icon</label>
              <input
                id="edit-server-icon"
                className="edit-server-icon"
                value={serverIcon}
                onChange={(e) => setServerIcon(e.target.value)}
              ></input>
              <button className="submit-edit-server-modal" type="submit">
                Edit Server
              </button>
            </form>
            <button className="delete-server" onClick={deleteServer}>
              Delete Server
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
