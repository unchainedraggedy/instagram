import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";

const userInitial = {
  name: "user",
  username: "username",
  avatar: "/images/avatar.jpg",
};

export default function Home() {
  const [user, setUser] = useState(userInitial);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostDescription, setNewPostDescription] = useState("");
  const [newName, setNewName] = useState(user.name);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [isNameEditing, setIsNameEditing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = () => {
    if (image) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          image: imagePreview,
          description: newPostDescription || "",
          likes: 0,
        },
      ]);
      setImage(null);
      setImagePreview(null);
      setNewPostDescription("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = () => {
    setUser((prevUser) => ({ ...prevUser, name: newName }));
  };

  const toggleUsernameEdit = () => {
    setIsUsernameEditing((prev) => !prev);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleUsernameSubmit = () => {
    setUser((prevUser) => ({ ...prevUser, username: newUsername }));
    setIsUsernameEditing(false);
  };

  return (
    <>
      <Head>
        <title>{`${user.username} — Instagram`}</title>
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
              src={user.avatar}
              alt="Avatar"
              width={100}
              height={100}
            />
            <div className={styles.profileInfo}>
              <h2
                onClick={() => setIsNameEditing(true)}
                style={{ cursor: "pointer" }}
              >
                {isNameEditing ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    onBlur={() => {
                      handleNameSubmit();
                      setIsNameEditing(false);
                    }}
                    autoFocus
                    className={styles.editNameInput}
                  />
                ) : (
                  user.name
                )}
              </h2>
              <p onClick={toggleUsernameEdit} style={{ cursor: "pointer" }}>
                {isUsernameEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameSubmit}
                    autoFocus
                    className={styles.editUsernameInput}
                  />
                ) : (
                  `@${user.username}`
                )}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.uploadInput}
              />
            </div>
          </div>

          <div className={styles.uploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.uploadInput}
            />
            {imagePreview && (
              <div className={styles.previewContainer}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <input
                  type="text"
                  value={newPostDescription}
                  onChange={(e) => setNewPostDescription(e.target.value)}
                  placeholder="Описание поста"
                  className={styles.postDescription}
                />
                <Button onClick={handlePostSubmit}>Опубликовать</Button>
              </div>
            )}
          </div>

          <div className={styles.posts}>
            {posts.map((post) => (
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
