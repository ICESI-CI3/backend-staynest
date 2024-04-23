import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { Property } from '../property/entities/property.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {


  constructor(
    // @InjectRepository(Booking)
    // private bookingRepository: Repository<Booking>,
    // @InjectRepository(Property)
    // private propertyRepository: Repository<Property>,
    // @InjectRepository(User)
    // private userRepository: Repository<User>
  ) {}

//   async generateOcuppancyReport() {
    
//     const properties = await this.propertyRepository.find();
//     const reports = await Promise.all(properties.map(async (property) => {
//       const bookings = await this.bookingRepository.find({
//         where: { property: property }
//       });
//       const occupancyRate = bookings.length / (365 * property.rooms); // simplistic yearly occupancy rate per room
//       return {
//         propertyId: property.id,
//         occupancyRate
//       };
//     }));
//     return reports;
//   }

//   async generateFinancialReport(): Promise<any> {
//     // Calculate earnings per property or per city
//     const bookings = await this.bookingRepository.find({ relations: ['property'] });
//     const financialReport = bookings.reduce((acc, booking) => {
//       const earnings = booking.cost_per_night * ((booking.check_out as any ) - (booking.check_in as any )) / (1000 * 60 * 60 * 24);
//       if (!acc[booking.property.id]) {
//         acc[booking.property.id] = 0;
//       }
//       acc[booking.property.id] += earnings;
//       return acc;
//     }, {});
//     return financialReport;
//   }

//   async generateDetailedOccupancyReport(): Promise<any> {
//     const properties = await this.propertyRepository.find({ relations: ['bookings'] });
//     return properties.map(property => {
//         const monthlyOccupancy = property.bookings.reduce((acc, booking) => {
//             const month = booking.check_in.getMonth(); // Get month as a number (0-11)
//             if (!acc[month]) {
//                 acc[month] = { bookedDays: 0, totalDays: 0 };
//             }
//             const duration = (booking.check_out.getTime() - booking.check_in.getTime()) / (1000 * 3600 * 24); // Duration in days
//             acc[month].bookedDays += duration;
//             acc[month].totalDays += new Date(booking.check_in.getFullYear(), month + 1, 0).getDate(); // Total days in the month
//             return acc;
//         }, {});

//         return {
//             propertyId: property.id,
//             occupancyByMonth: Object.keys(monthlyOccupancy).map(month => ({
//                 month,
//                 occupancyRate: (monthlyOccupancy[month].bookedDays / monthlyOccupancy[month].totalDays * 100).toFixed(2) + '%'
//             }))
//         };
//     });
// }

// async generateUserActivityReport(): Promise<any> {
//     const users = await this.userRepository.find({ relations: ['bookings'] });
//     return users.map(user => {
//         const activityDetails = user.bookings.reduce((acc, booking) => {
//             acc.totalBookings++;
//             acc.totalSpent += booking.cost_per_night * ((booking.check_out.getTime() - booking.check_in.getTime()) / (86400000)); // Assuming cost_per_night is stored in Booking
//             acc.preferredProperties[booking.property_type] = (acc.preferredProperties[booking.property_type] || 0) + 1;
//             return acc;
//         }, { totalBookings: 0, totalSpent: 0, preferredProperties: {} });

//         return {
//             userId: user.id,
//             email: user.email,
//             totalBookings: activityDetails.totalBookings,
//             totalSpent: activityDetails.totalSpent.toFixed(2),
//             preferredProperties: activityDetails.preferredProperties
//         };
//     });
// }



  findOne(id: number) {
    return `This action returns a #${id} report`;
  }



  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
