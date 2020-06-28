import { User } from './user';
import { OrderDetail } from './orderdetail';

export interface Order {
    id: number;
    userId: number;
    createdAt: Date;
    status: number;
    user: User;
    orderDetail: OrderDetail[];
    codeId: number;
    total: number;
}
