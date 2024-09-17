
import { Comment } from "src/comments/entities/comments.entity";
import { Event } from "src/events/entities/event.entity";
import { File } from "src/files/entities/file.entity";
import { Order } from "src/orders/entities/order.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Post } from "src/posts/entities/post.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_information' })
export class UserInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User,{eager : true})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Event, (event) => event.information)
    events: Event[];

    @OneToMany(() => Comment, (comment) => comment.information)
    comments: Comment[];

    @OneToMany(() => File, (file) => file.information)
    files: File[]

    @OneToMany(() => Post, (post) => post.information)
    posts: Post[]

    @OneToMany(() => Product, (product) => product.information)
    products: Product[]

    @OneToMany(() => Order, (order) => order.id)
    orders: Order[]

    @OneToMany(() => Payment, (payment) => payment.id)
    payments: Payment[]
    
}

