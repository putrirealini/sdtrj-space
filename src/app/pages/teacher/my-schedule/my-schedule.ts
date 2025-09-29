import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyScheduleService } from '../../../services/teacher/my-schedule.service';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-my-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-schedule.html',
  styleUrls: ['./my-schedule.css']
})
export class MySchedule implements OnInit {
  scheduleData: any[] = [];
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private myScheduleService: MyScheduleService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.myScheduleService.getSchedule().subscribe((res: any) => {
      if(res.success) {
        this.scheduleData = this.mapSchedule(res.data);
      }
    });
  }

  private toRoman(num: number): string {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    return romans[num - 1] || num.toString();
  }

  mapSchedule(apiData: any): any[] {
    const timePeriods = apiData.timePeriods;
    const schedules = apiData.schedules;

    const result: any[] = [];

    Object.keys(timePeriods).forEach((key, index) => {
      const time = timePeriods[key];
      if (key.includes('recess')) {
        const recessNum = parseInt(key.replace('recess', ''), 10);
        result.push({
          period: null,
          time,
          activity: `RECESS ${this.toRoman(recessNum)}`
        });
      } else {
        result.push({
          period: index + 1,
          time,
          monday: schedules.monday.find((s: any) => s.period === key)?.subject || '',
          tuesday: schedules.tuesday.find((s: any) => s.period === key)?.subject || '',
          wednesday: schedules.wednesday.find((s: any) => s.period === key)?.subject || '',
          thursday: schedules.thursday.find((s: any) => s.period === key)?.subject || '',
          friday: schedules.friday.find((s: any) => s.period === key)?.subject || ''
        });
      }
    });

    return result;
  }

  downloadSchedule(): void {
    this.myScheduleService.downloadSchedule().subscribe((blob) => {
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = "MySchedule.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
