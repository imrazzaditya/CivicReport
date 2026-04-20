import { useParams, Link } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlinePrinter } from 'react-icons/hi';

const CertificateView = () => {
    const { id } = useParams();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-200 py-10 px-4 font-sans print:bg-white print:p-0 print:m-0">
            {/* Action Bar (Hidden when printing) */}
            <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center print:hidden">
                <Link to="/track" className="text-civic-primary font-medium hover:underline">
                    &larr; Back to Tracking
                </Link>
                <button onClick={handlePrint} className="btn-primary flex items-center gap-2 shadow-md">
                    <HiOutlinePrinter className="w-5 h-5" /> Print / Save as PDF
                </button>
            </div>

            {/* A4 Certificate Container */}
            <div className="max-w-[800px] mx-auto bg-white shadow-modal relative overflow-hidden print:shadow-none print:max-w-none">
                
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                    <HiOutlineShieldCheck className="w-96 h-96 text-civic-primary" />
                </div>

                {/* Content Container */}
                <div className="relative z-10">
                    {/* Tricolor Top Bar */}
                    <div className="w-full h-3 flex">
                        <div className="flex-1 bg-[#FF9933]"></div>
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-[#138808]"></div>
                    </div>

                    <div className="p-10 md:p-14">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                            <div className="flex items-center gap-3">
                                <HiOutlineShieldCheck className="w-12 h-12 text-civic-primary" />
                                <div>
                                    <h1 className="text-2xl font-bold text-civic-primary tracking-tight leading-none">CivicReport</h1>
                                    <p className="text-sm text-gray-500 font-medium tracking-wide mt-1">CITIZEN ACCOUNTABILITY PORTAL</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <div className="w-20 h-20 bg-gray-50 border border-gray-200 p-1 mb-2">
                                    {/* Placeholder QR Code */}
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://civicreport.in/track/${id || 'CR-10294'}`} alt="QR Code" className="w-full h-full opacity-80" />
                                </div>
                                <div className="text-xs text-gray-500 font-medium">Scan to verify</div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight uppercase">Civic Issue Complaint Certificate</h2>
                            <p className="text-gray-500 mt-2 font-medium">Formal documentation of a citizen-reported civic infrastructure issue.</p>
                        </div>

                        {/* Details Table */}
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-10">
                            <table className="w-full text-left border-collapse">
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="bg-gray-50">
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Complaint ID</th>
                                        <td className="px-6 py-4 font-mono text-lg font-bold text-gray-900">{id || 'CR-10294'}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Issue Category</th>
                                        <td className="px-6 py-4 font-semibold text-gray-900"><span className="bg-gray-100 px-3 py-1 rounded-md">Road Damage</span></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Description</th>
                                        <td className="px-6 py-4 text-gray-800 font-medium">Large pothole causing traffic slowdowns and safety hazards for two-wheelers.</td>
                                    </tr>
                                    <tr>
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Location</th>
                                        <td className="px-6 py-4 text-gray-800 font-medium">Main Street, Opposite Central Park, Sector 4, Bengaluru, Karnataka (PIN: 560001)</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Date Reported</th>
                                        <td className="px-6 py-4 text-gray-800 font-medium">12 April 2025, 14:30 IST</td>
                                    </tr>
                                    <tr>
                                        <th className="w-1/3 px-6 py-4 text-sm font-bold text-gray-700 border-r border-gray-200 uppercase tracking-wider">Current Status</th>
                                        <td className="px-6 py-4"><span className="text-amber-600 font-bold bg-amber-50 px-3 py-1 border border-amber-200 rounded-md uppercase">In Review</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Leader & Proof Section */}
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            {/* Assigned Leader */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Responsible Authority</h3>
                                <div className="border border-gray-200 rounded-lg p-5 bg-blue-50/50 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 border-2 border-white shadow-sm"></div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">Shri Ramesh Kumar</h4>
                                        <p className="text-sm font-semibold text-civic-primary">Member of Legislative Assembly (MLA)</p>
                                        <p className="text-xs text-gray-600 mt-1">Constituency Office, Bengaluru</p>
                                    </div>
                                </div>
                            </div>

                            {/* Attached Proof */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Attached Visual Proof</h3>
                                <div className="border border-gray-200 rounded-lg bg-gray-100 h-[106px] overflow-hidden relative group">
                                    <img src="https://via.placeholder.com/400x200?text=Pothole+Evidence+Photo" alt="Evidence" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">Geotagged: 12.9716° N, 77.5946° E</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer & Disclaimer */}
                        <div className="border-t-2 border-gray-100 pt-6 mt-10">
                            <p className="text-[10px] leading-relaxed text-gray-400 text-justify mb-4 font-medium">
                                DISCLAIMER: This document is an auto-generated digital certificate created on the CivicReport platform based on user-submitted data. 
                                It serves as a formal record of a civic issue reported by a citizen. CivicReport is an independent platform and does not verify the absolute authenticity of the issue, but relies on geotagging and timestamping for basic validation. 
                                Authorities may use the Complaint ID and QR code to track this issue on www.civicreport.in.
                            </p>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <span>Generated: {new Date().toLocaleString('en-IN')}</span>
                                <span>www.civicreport.in</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateView;
