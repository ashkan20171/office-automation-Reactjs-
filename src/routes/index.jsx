import Attendance from "../modules/attendance/Attendance";
import QRScanner from "../modules/attendance/QRScanner";
import AttendanceSummary from "../modules/attendance/AttendanceSummary";
import Dashboard from "../modules/dashboard/Dashboard";
import Inbox from "../modules/letters/Inbox";
<Routes>
  <Route path="/attendance" element={<Attendance />} />
  
<Route path="/attendance/qr" element={<QRScanner />} />

<Route path="/attendance/summary" element={<AttendanceSummary />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/letters" element={<Inbox />} />
</Routes>

 