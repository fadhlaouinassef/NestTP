import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('messages')
export class Messages {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  content: string;

  @Column()
  status: string;

  @Column()
  date: Date;
}
