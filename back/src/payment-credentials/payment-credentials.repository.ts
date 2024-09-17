import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentCredential } from "./entities/payment-credential.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentCredentialsRepository {
    constructor (
        @InjectRepository(PaymentCredential) private paymentCredentialsRepository: Repository<PaymentCredential>
    ) {}
}