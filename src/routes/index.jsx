import Attendance from "../modules/attendance/Attendance";
import QRScanner from "../modules/attendance/QRScanner";
import AttendanceSummary from "../modules/attendance/AttendanceSummary";
import Dashboard from "../modules/dashboard/Dashboard";
import Inbox from "../modules/letters/Inbox";
import Compose from "../modules/letters/Compose";
<Routes>
  <Route path="/attendance" element={<Attendance />} />
  
<Route path="/attendance/qr" element={<QRScanner />} />

<Route path="/attendance/summary" element={<AttendanceSummary />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/letters" element={<Inbox />} />

<Route path="/letters/compose" element={<Compose />} />
</Routes>

 