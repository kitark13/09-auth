"use client";

import Image from "next/image";
import css from "./Edit.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { patchMe } from "@/lib/api/clientApi";

function Edit() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [userName, setUserName] = useState(user?.username);

  if (!user) {
    router.push("/sign-in");
    return;
  }

  const handleSubmit = async (formData: FormData) => {
    const newUserName = formData.get("username") as string;
    const updateUser = await patchMe({ username: newUserName });
    setUser(updateUser);
    router.push("/profile");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    console.log(event.target.value);
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userName}
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Edit;
