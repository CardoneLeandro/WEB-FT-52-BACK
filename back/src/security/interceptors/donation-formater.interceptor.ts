import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DonationFormaterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((userWithDonations) => {
        const formattedDonations = userWithDonations.donations.map(
          (donation) => {
            const date = new Date(donation.date);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            const { status, id, ...donationWithoutStatus } = donation;
            return {
              ...donationWithoutStatus,
              date: formattedDate,
            };
          },
        );

        return {
          user: { id: userWithDonations.id, donations: formattedDonations },
        };
      }),
    );
  }
}
