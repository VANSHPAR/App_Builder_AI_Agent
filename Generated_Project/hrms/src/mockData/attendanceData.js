// Mock attendance data
// This module exports an array of attendance records used for simulating API responses.
// Each record contains: id, date (ISO string), checkIn time, checkOut time, and status.
// Status can be 'Present', 'Absent', or 'Late'.

/**
 * @typedef {'Present' | 'Absent' | 'Late'} AttendanceStatus
 */

/**
 * @typedef {Object} AttendanceRecord
 * @property {number} id - Unique identifier for the record.
 * @property {string} date - ISO formatted date string (e.g., '2023-09-15').
 * @property {string} checkIn - Check‑in time in HH:mm format.
 * @property {string} checkOut - Check‑out time in HH:mm format.
 * @property {AttendanceStatus} status - Attendance status.
 */

/**
 * Sample attendance records covering various statuses.
 * @type {AttendanceRecord[]}
 */
export const attendanceRecords = [
  {
    id: 1,
    date: '2023-09-01',
    checkIn: '09:02',
    checkOut: '17:30',
    status: 'Late',
  },
  {
    id: 2,
    date: '2023-09-02',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'Present',
  },
  {
    id: 3,
    date: '2023-09-03',
    checkIn: '',
    checkOut: '',
    status: 'Absent',
  },
  {
    id: 4,
    date: '2023-09-04',
    checkIn: '09:15',
    checkOut: '17:45',
    status: 'Late',
  },
  {
    id: 5,
    date: '2023-09-05',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'Present',
  },
  {
    id: 6,
    date: '2023-09-06',
    checkIn: '',
    checkOut: '',
    status: 'Absent',
  },
  {
    id: 7,
    date: '2023-09-07',
    checkIn: '08:55',
    checkOut: '17:20',
    status: 'Present',
  },
];
