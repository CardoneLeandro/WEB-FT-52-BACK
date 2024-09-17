import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Donation } from "./entities/donation.entity";
import { Repository } from "typeorm";

@Injectable()
export class DonationsRepository {
    constructor (
        @InjectRepository(Donation) private donationsRepository: Repository<Donation>
    ) {}
}