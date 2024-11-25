import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function PostCard({ post }) {
  return (
    <div className={styles.postCard}>
      <Image
        className={styles.postImage}
        src={post.image}
        alt={`Post ${post.id}`}
        width={500}
        height={500}
      />
      <p>
      <strong>{post.username}</strong> {post.description}</p>
      <div className={styles.likes}>❤️ {post.likes} лайков</div>
    </div>
  );
}
