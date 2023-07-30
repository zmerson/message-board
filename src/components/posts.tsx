// import { PrismaClient } from '@prisma/client'
// import React, { useEffect, useState } from 'react';

// const prisma = new PrismaClient()

// interface Board {
//     id: number;
//     createdAt: string;
//     updatedAt: string;
//     title: string;
//     content: string;
//     published: boolean;
//     authorId: number;
// }
// const posts: React.FC = async () => {
//     const [posts, setPosts] = useState<Board[] | null>(null);
//     const usersWithPosts = await prisma.user.findMany({
//         where: {
//             posts: {
//                 every: {
//                     published: false
//                 }
//             }
//         }

//       })
//       console.dir(usersWithPosts, { depth: null })
     
//     return(
//         <div>
//             testing prisma
//             {}
//         </div>
//     )
// } 
// async function main() {
  
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//   })