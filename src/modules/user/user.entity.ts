import { Exclude } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;
}
