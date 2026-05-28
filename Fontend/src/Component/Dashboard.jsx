import React, { useState, useEffect } from "react"
import { FiUsers, FiBriefcase, FiActivity, FiArrowRight, FiPhone, FiMail, FiCalendar, FiDollarSign } from "react-icons/fi"

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "https://chatbot-9xlk.onrender.com";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [isclienclicked, setclientclicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function handlejobapi() {
    setclientclicked(false);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobseeker`);
      if (response.ok) {
        const jsondata = await response.json();
        setdata(jsondata);
      } else {
        console.log("error in handleapi");
      }
    } catch (err) {
      console.log("cannot get the data");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleclientapi() {
    setclientclicked(true);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientdata`);
      if (response.ok) {
        const jsondata = await response.json();
        setdata2(jsondata);
      } else {
        console.log("error in handleapi");
      }
    } catch (err) {
      console.log("cannot get the data");
    } finally {
      setIsLoading(false);
    }
  }

  // Load both datasets on mount to populate stats and initial view
  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      try {
        const [jobRes, clientRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/jobseeker`),
          fetch(`${API_BASE_URL}/api/clientdata`)
        ]);
        
        if (jobRes.ok) {
          const jobs = await jobRes.json();
          setdata(jobs);
        }
        if (clientRes.ok) {
          const clients = await clientRes.json();
          setdata2(clients);
        }
      } catch (err) {
        console.log("Error loading dashboard data on mount", err);
      } finally {
        setIsLoading(false);
      }
    };
    initFetch();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR & HEADER Navigation */}
      <aside className="w-full md:w-[260px] bg-gradient-to-b from-slate-900 to-slate-950 text-white shrink-0 shadow-xl z-20">
        {/* Company Branding */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
              <FiActivity className="text-xl text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight leading-tight">XYZ Company</h2>
              <span className="text-[0.7rem] text-slate-400 font-medium uppercase tracking-wider">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap md:whitespace-normal w-auto md:w-full ${
              !isclienclicked
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
            onClick={handlejobapi}
          >
            <FiUsers className="text-lg" />
            <span>Job Candidates</span>
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap md:whitespace-normal w-auto md:w-full ${
              isclienclicked
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
            onClick={handleclientapi}
          >
            <FiBriefcase className="text-lg" />
            <span>Project Enquiries</span>
          </button>
        </nav>
      </aside>

      {/* MAIN MAIN VIEW PORT */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden max-w-full">
        {/* Header Title */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {isclienclicked ? "Client Project Enquiries" : "Job Application Board"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage, filter and audit direct user submissions from your chatbot widget.
          </p>
        </header>

        {/* METRIC STATISTICS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Job Seekers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Candidates</span>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{data.length}</h3>
              <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold mt-2 cursor-pointer" onClick={handlejobapi}>
                <span>View applicants</span>
                <FiArrowRight />
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              <FiUsers />
            </div>
          </div>

          {/* Card 2: Client Enquiries */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Project Proposals</span>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{data2.length}</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2 cursor-pointer" onClick={handleclientapi}>
                <span>View enquiries</span>
                <FiArrowRight />
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <FiBriefcase />
            </div>
          </div>

          {/* Card 3: Platform Health */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">System Status</span>
              <h3 className="text-3xl font-black text-slate-800 mt-1 flex items-center gap-2">
                <span>Active</span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">Database Node Server synced & live</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              <FiActivity />
            </div>
          </div>
        </section>

        {/* DATA CONTAINER */}
        <section className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-500 text-sm font-semibold">Retrieving secure logs...</span>
            </div>
          ) : isclienclicked ? (
            /* CLIENT SECTION */
            data2.length === 0 ? (
              <div className="text-center py-16 px-4">
                <FiBriefcase className="mx-auto text-4xl text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No project enquiries found</h3>
                <p className="text-slate-400 text-sm mt-1">When clients request project assistance through the widget, they will display here.</p>
              </div>
            ) : (
              <>
                {/* Desktop View Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-200 text-[0.82rem] font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="py-4 px-6">No</th>
                        <th className="py-4 px-6">Service Requested</th>
                        <th className="py-4 px-6">Client Details</th>
                        <th className="py-4 px-6">Budget</th>
                        <th className="py-4 px-6">Description</th>
                        <th className="py-4 px-6">Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data2.map((item, index) => (
                        <tr key={item._id} className="hover:bg-slate-50/70 transition-colors text-[0.9rem] text-slate-700 font-medium">
                          <td className="py-4 px-6 text-slate-400 font-bold">{index + 1}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {item.service}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FiMail className="shrink-0" /> {item.email}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FiPhone className="shrink-0" /> {item.phone}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <FiDollarSign /> {item.budget}
                            </span>
                          </td>
                          <td className="py-4 px-6 max-w-[280px] break-words text-slate-500 font-normal leading-relaxed text-xs">
                            {item.descript}
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-400">
                            <div className="flex items-center gap-1.5"><FiCalendar className="shrink-0" /> {formatDate(item.createdAt)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards */}
                <div className="block sm:hidden divide-y divide-slate-100">
                  {data2.map((item, index) => (
                    <div key={item._id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col gap-4">
                      {/* Top Bar Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-wider block mb-1">Entry #{index + 1}</span>
                          <h4 className="text-base font-bold text-slate-900 leading-tight">{item.name}</h4>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {item.service}
                        </span>
                      </div>

                      {/* Contact Info Row */}
                      <div className="grid grid-cols-2 gap-2 py-2 border-y border-dashed border-slate-100 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap"><FiMail className="shrink-0 text-slate-400" /> {item.email}</div>
                        <div className="flex items-center gap-1.5"><FiPhone className="shrink-0 text-slate-400" /> {item.phone}</div>
                      </div>

                      {/* Project Details */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-semibold uppercase">Proposed Budget</span>
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-50 text-emerald-700">
                            <FiDollarSign /> {item.budget}
                          </span>
                        </div>
                        <div className="text-slate-500 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-normal leading-relaxed">
                          {item.descript}
                        </div>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="flex items-center justify-between text-[0.75rem] text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5"><FiCalendar className="shrink-0" /> {formatDate(item.createdAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            /* JOB SEEKER SECTION */
            data.length === 0 ? (
              <div className="text-center py-16 px-4">
                <FiUsers className="mx-auto text-4xl text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No applicants logged yet</h3>
                <p className="text-slate-400 text-sm mt-1">Candidate applications completed through the chatbot will be logged here.</p>
              </div>
            ) : (
              <>
                {/* Desktop View Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-200 text-[0.82rem] font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="py-4 px-6">No</th>
                        <th className="py-4 px-6">Applied Role</th>
                        <th className="py-4 px-6">Candidate Details</th>
                        <th className="py-4 px-6">Applied On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.map((item, index) => (
                        <tr key={item._id} className="hover:bg-slate-50/70 transition-colors text-[0.9rem] text-slate-700 font-medium">
                          <td className="py-4 px-6 text-slate-400 font-bold">{index + 1}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {item.service}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FiMail className="shrink-0" /> {item.email}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FiPhone className="shrink-0" /> {item.phone}</div>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-400">
                            <div className="flex items-center gap-1.5"><FiCalendar className="shrink-0" /> {formatDate(item.createdAt)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards */}
                <div className="block sm:hidden divide-y divide-slate-100">
                  {data.map((item, index) => (
                    <div key={item._id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col gap-4">
                      {/* Top Header Card */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-wider block mb-1">Applicant #{index + 1}</span>
                          <h4 className="text-base font-bold text-slate-900 leading-tight">{item.name}</h4>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {item.service}
                        </span>
                      </div>

                      {/* Contact Info grid */}
                      <div className="grid grid-cols-2 gap-2 py-2 border-y border-dashed border-slate-100 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap"><FiMail className="shrink-0 text-slate-400" /> {item.email}</div>
                        <div className="flex items-center gap-1.5"><FiPhone className="shrink-0 text-slate-400" /> {item.phone}</div>
                      </div>

                      {/* Application details bottom */}
                      <div className="flex items-center justify-between text-[0.75rem] text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5"><FiCalendar className="shrink-0" /> {formatDate(item.createdAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
