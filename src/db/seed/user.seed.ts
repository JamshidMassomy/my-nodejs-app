// import { Injectable } from '@nestjs/common';
// import { User } from 'src/modules/user/user.entity';

// @Injectable()
// export class Seed implements Seeder {
//   constructor(private connection: Connection, private factory: Factory) {}

//   async run(): Promise<any> {
//     // Seed your data here
//     await this.seedUsers(10); // Seed 10 users
//   }

//   async seedUsers(count: number): Promise<void> {
//     const users = await this.factory(User)().createMany(count);
//     console.log(`${count} users seeded.`);
//   }
// }
