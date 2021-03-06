import { EDayNames, ELessonType } from '../../../common/enums/schedule.enums';

export interface GroupSchedule {
  id: string;
  title: string;
  weeks: WeekSchedule[];
}

export interface WeekSchedule {
  id: string;
  isEven: boolean;
  days: DaySchedule[];
}

export interface DaySchedule {
  id: string;
  title: EDayNames;
  order: number;
  lessons: LessonInterface[];
}

export interface LessonInterface {
  id: string;
  title: string;
  type: ELessonType;
  teacher: string;
  cabinetNumber: string;
  startDate: string;
  endDate: string;
  order: number;
}
