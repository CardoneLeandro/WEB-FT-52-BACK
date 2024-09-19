import { Post } from 'src/posts/entities/post.entity';
import { posts } from '../seed/post.seed';
//el id corresponde al id de la tabla "UserInformation"

interface Inform {
  error: number;
  errorPosts: string[];
  success: number;
  successPosts: Post[];
}

export async function seedPosts(id: string) {
  let inform: Inform = {
    error: 0,
    errorPosts: [],
    success: 0,
    successPosts: [],
  };

  for (const post of posts) {
    try {
      post.creator = id;
      const seededpost = await post.save();
      inform.success + 1;
      inform.successPosts.push(seededpost);
      console.log('CARDONE => postSeeder, seedPosts, seededpost', seededpost);
    } catch (e) {
      inform.error + 1, inform.errorPosts.push(e.message);
      throw new Error(e.message);
    }
  }

  console.log('CARDONE => postSeeder, seedPosts, inform', inform);

  return inform;
}
