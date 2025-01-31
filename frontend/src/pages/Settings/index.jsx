import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";
import Overlay from "./../AppComponents/Overlay";
import DeleteModal from "./../AppComponents/DeleteModal";

import styles from "./Settings.module.css";
import UpdateAlert from "../AppComponents/UpdateAlert";

function Settings() {
  const { user, updateUser: updateProfile, deleteUser } = useAuth();
  const [updateUser, setUpdateUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    setUpdateUser({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(updateUser);
      toast.success(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setIsModalOpen((is) => !is);
  };

  return (
    <section className={styles.section}>
      <article>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={updateUser.name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, name: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className={styles.input}
            placeholder="Email"
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
          />
          <label htmlFor="mobile">Mobile no.</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile no."
            value={updateUser.mobile}
            className={styles.input}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, mobile: e.target.value })
            }
          />
          <div className={styles.empty}></div>
          <button className={`${styles.btn} ${styles.save}`}>
            Save Changes
          </button>
          <div
            className={`${styles.btn} ${styles.delete}`}
            onClick={handleDelete}
          >
            Delete Account
          </div>
          {isModalOpen && (
            <Overlay>
              <DeleteModal
                itemType="Account"
                onDelete={deleteUser}
                onClose={() => setIsModalOpen(false)}
                message="delete the account?"
              />
            </Overlay>
          )}
        </form>
      </article>
      <UpdateAlert />
    </section>
  );
}

export default Settings;
