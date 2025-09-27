import { users, posts } from "../data/appData";
import { User } from "../model/User";
import { Post } from "../model/Post";

export class AppBusiness {
  // Exercício 1
  getUserById(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  // Exercício 2
  getUsersByAgeRange(min: number, max: number): User[] {
    return users.filter(u => u.age >= min && u.age <= max);
  }

  // Exercício 3
  createPost(title: string, content: string, authorId: number): Post {
    const newPost: Post = {
      id: posts.length + 1,
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false
    };
    posts.push(newPost);
    return newPost;
  }

  // Exercício 4
  updateUser(id: number, newUser: Omit<User, "id">): User | undefined {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    users[index] = { id, ...newUser };
    return users[index];
  }

  // Exercício 5
  updatePostPartial(id: number, data: Partial<Post>): Post | undefined {
    const post = posts.find(p => p.id === id);
    if (!post) return undefined;
    if (data.title) post.title = data.title;
    if (data.content) post.content = data.content;
    if (data.published !== undefined) post.published = data.published;
    return post;
  }

  // Exercício 6
  deletePost(id: number, userId: number): boolean {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    const post = posts[index];
    const user = users.find(u => u.id === userId);
    if (!user) return false;
    if (user.role !== "admin" && user.id !== post.authorId) return false;
    posts.splice(index, 1);
    return true;
  }

  // Exercício 7
  cleanupInactive(): User[] {
    const removed: User[] = [];
    for (let i = users.length - 1; i >= 0; i--) {
      const user = users[i];
      const hasPosts = posts.some(p => p.authorId === user.id);
      if (!hasPosts && user.role !== "admin") {
        removed.push(user);
        users.splice(i, 1);
      }
    }
    return removed;
  }
}
