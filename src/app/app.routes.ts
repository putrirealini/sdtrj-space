import { Routes } from '@angular/router';
import { Login } from './pages/login/login'; 
import { Register } from './pages/register/register';
import { TeacherLayout } from './pages/teacher-layout/teacher-layout';
import { PrincipalLayout } from './pages/principal-layout/principal-layout';

import { TeacherDashboard } from './pages/teacher/teacher-dashboard/teacher-dashboard';
import { MyFolder } from './pages/teacher/my-folder/my-folder/my-folder';
import { MyFolder2 } from './pages/teacher/my-folder2/my-folder2/my-folder2';
import { MySchedule } from './pages/teacher/my-schedule/my-schedule/my-schedule';
import { AcademicCalendar } from './pages/teacher/academic-calendar/academic-calendar/academic-calendar';

import { PrincipalDashboard } from './pages/principal/principal-dashboard/principal-dashboard';
import { TeachersFolderComponent } from './pages/principal/teachers-folder/teachers-folder/teachers-folder';
import { TeacherScheduleComponent } from './pages/principal/teacher-schedule/teacher-schedule/teacher-schedule';
import { Announcement } from './pages/principal/announcement/announcement/announcement';
import { PrincipalAcademicCalendarComponent } from './pages/principal/principal-academic-calendar/principal-academic-calendar';



export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register},

     {
        path: 'teacher',
        component: TeacherLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
            { path: 'teacher-dashboard', component: TeacherDashboard }, 
            { path: 'my-folder', component: MyFolder },
            { path: 'my-folder2', component: MyFolder2 },
            { path: 'my-schedule', component: MySchedule },
            { path: 'academic-calendar', component: AcademicCalendar }
        ]
    },

     {
        path: 'principal',
        component: PrincipalLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'principal-dashboard', component: PrincipalDashboard }, 
            { path: 'teachers-folder', component: TeachersFolderComponent },
            { path: 'teachers-schedule', component: TeacherScheduleComponent }, 
            { path: 'announcement', component: Announcement },
            { path: 'academic-calendar', component: PrincipalAcademicCalendarComponent },
        ]
    }
    
];
