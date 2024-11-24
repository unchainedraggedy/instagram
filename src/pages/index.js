import { useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import { CameraIcon } from "../components/CameraIcon";
import useStateObject from "../hooks/useState";

const userInitial = {
  name: "",
  username: "",
  avatar: "/images/avatar.jpg",
  image: null,
  imagePreview: null,
  posts: [],
  newPostDescription: "",
  isUsernameEditing: false,
  isNameEditing: false,
};

export default function Home() {
  const { setValue, getValue } = useStateObject(userInitial);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", file);
        setValue("imagePreview", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = () => {
    if (getValue("image")) {
      setValue("posts", [
        ...getValue("posts"),
        {
          id: getValue("posts").length + 1,
          image: getValue("imagePreview"),
          description: getValue("newPostDescription") || "",
          likes: 0,
        },
      ]);
      setValue("image", null);
      setValue("imagePreview", null);
      setValue("newPostDescription", "");
    }
  };

  const handleNameChange = (e) => {
    setValue("newName", e.target.value);
  };

  const handleNameSubmit = () => {
    setValue("name", getValue("newName"));
  };

  const toggleUsernameEdit = () => {
    setValue("isUsernameEditing", !getValue("isUsernameEditing"));
  };

  const handleUsernameChange = (e) => {
    setValue("newUsername", e.target.value);
  };

  const handleUsernameSubmit = () => {
    setValue("username", getValue("newUsername"));
    setValue("isUsernameEditing", false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Head>
        <title>{`${getValue("username") || "username"} — Instagram`}</title>
        <meta
          name="description"
          content="Однопользовательский Instagram — делитесь моментами своей жизни."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.profile}>
            <img
              className={styles.avatar}
              src={getValue("avatar")}
              alt="Avatar"
              width={100}
              height={100}
            />
            <div className={styles.profileInfo}>
              <h2
                onClick={() => setValue("isNameEditing", true)}
                style={{ cursor: "pointer" }}
              >
                {getValue("isNameEditing") ? (
                  <input
                    type="text"
                    value={getValue("newName")}
                    onChange={handleNameChange}
                    onBlur={() => {
                      handleNameSubmit();
                      setValue("isNameEditing", false);
                    }}
                    autoFocus
                    className={styles.editNameInput}
                    placeholder="Ashura"
                  />
                ) : (
                  getValue("name") || "Ashura"
                )}
              </h2>
              <p onClick={toggleUsernameEdit} style={{ cursor: "pointer" }}>
                {getValue("isUsernameEditing") ? (
                  <input
                    type="text"
                    value={getValue("newUsername")}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameSubmit}
                    autoFocus
                    className={styles.editUsernameInput}
                    placeholder="@rggedyman"
                  />
                ) : (
                  `@${getValue("username") || "rggedyman"}`
                )}
              </p>

              <div onClick={handleIconClick} style={{ cursor: "pointer" }}>
                <CameraIcon fill="gray" size={18} label="Загрузить файл" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className={styles.uploadContainer}>
            <button
              onClick={() => fileInputRef.current.click()}
              className={styles.uploadButton}
            >
              <CameraIcon fill="white" size={20} label="Загрузить файл" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {getValue("imagePreview") && (
              <div className={styles.previewContainer}>
                <img
                  src={getValue("imagePreview")}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <input
                  type="text"
                  value={getValue("newPostDescription")}
                  onChange={(e) =>
                    setValue("newPostDescription", e.target.value)
                  }
                  placeholder="Описание поста"
                  className={styles.postDescription}
                />
                <Button onClick={handlePostSubmit}>Опубликовать</Button>
              </div>
            )}
          </div>

          <div className={styles.posts}>
            {getValue("posts").map((post) => (
              <div key={post.id} className={styles.postCard}>
                <img
                  src={post.image}
                  alt={`Post ${post.id}`}
                  className={styles.postImage}
                />
                <p>{post.description}</p>
                <div className={styles.likes}>❤️ {post.likes} лайков</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
