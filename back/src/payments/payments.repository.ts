import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentsRepository {
    constructor (
        @InjectRepository(Payment) private paymentsRepository: Repository<Payment>
    ) {}
}