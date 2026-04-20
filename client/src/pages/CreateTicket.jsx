import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
    HiOutlinePhotograph,
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineX,
    HiOutlineCheckCircle,
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineFingerPrint,
    HiOutlineDocumentText
} from 'react-icons/hi';

const CreateTicket = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'Road',
        location: '',
        pincode: '',
        isPublic: true,
        name: '',
        mobile: '',
        email: '',
        aadhaar: '',
        isVerified: false
    });
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        setFiles([...files, ...selected]);
        const urls = selected.map((f) =>
            f.type.startsWith('video/') ? 'video' : URL.createObjectURL(f)
        );
        setPreviews([...previews, ...urls]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step !== 4) return;
        
        setError('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('category', form.category);
            formData.append('location', form.location);
            formData.append('isVerified', form.isVerified);
            files.forEach((file) => formData.append('media', file));

            await api.post('/tickets', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            navigate('/dashboard/my-tickets');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create ticket.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto pt-6 animate-fadeInUp">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[32px] font-bold text-civic-textPrimary">Report an Issue</h1>
                    <p className="text-civic-textSecondary">Submit a verified complaint to your local leaders.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                    <HiOutlineShieldCheck className="w-5 h-5 text-civic-primary" />
                    <span className="text-xs font-bold text-civic-primary uppercase tracking-wider">Govt. Verified Portal</span>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN: Form */}
                <div className="w-full lg:w-[60%] flex flex-col">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between mb-8 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-civic-border z-0"></div>
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="relative z-10 flex flex-col items-center gap-2 bg-civic-background px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                                    step > s ? 'bg-civic-primary text-white' : 
                                    step === s ? 'bg-civic-primary text-white ring-4 ring-blue-100' : 
                                    'bg-civic-border text-civic-textMuted'
                                }`}>
                                    {step > s ? <HiOutlineCheckCircle className="w-5 h-5" /> : s}
                                </div>
                                <span className={`text-[11px] uppercase font-semibold ${step >= s ? 'text-civic-primary' : 'text-civic-textMuted'}`}>
                                    {s === 1 ? 'Details' : s === 2 ? 'Proof' : s === 3 ? 'Verify' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="card flex-1 flex flex-col min-h-[500px]">
                        {/* Step 1: Issue Details */}
                        {step === 1 && (
                            <div className="space-y-5 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Issue Title *</label>
                                    <input type="text" name="title" required value={form.title} onChange={handleChange} className="input-field" placeholder="e.g. Large pothole near the intersection" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Category *</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {['Road', 'Water', 'Electricity', 'Garbage', 'Other'].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setForm({ ...form, category: cat })}
                                                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                                                    form.category === cat 
                                                    ? 'bg-blue-50 border-civic-primary text-civic-primary' 
                                                    : 'bg-white border-civic-border text-civic-textSecondary hover:border-gray-300'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Describe the issue *</label>
                                    <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="input-field resize-none" placeholder="Provide details about the issue..." />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Location *</label>
                                        <input type="text" name="location" required value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. MG Road, Sector 4" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">PIN Code *</label>
                                        <input type="text" name="pincode" required value={form.pincode} onChange={handleChange} className="input-field" placeholder="6-digit PIN" maxLength="6" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Upload Proof */}
                        {step === 2 && (
                            <div className="space-y-5 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Visual Evidence *</label>
                                    <div className="border-2 border-dashed border-civic-border rounded-2xl p-10 text-center hover:border-civic-primary hover:bg-blue-50 transition-all cursor-pointer relative group">
                                        <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <HiOutlinePhotograph className="w-8 h-8 text-civic-primary" />
                                        </div>
                                        <p className="text-base font-bold text-civic-textPrimary">Upload Photos or Videos</p>
                                        <p className="text-sm text-civic-textSecondary mt-1">Drag and drop or click to browse</p>
                                    </div>

                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            {previews.map((src, i) => (
                                                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-civic-border shadow-sm">
                                                    {src === 'video' ? (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">🎬 VIDEO</div>
                                                    ) : (
                                                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                                                    )}
                                                    <button type="button" onClick={() => removeFile(i)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                        <HiOutlineX className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Identity Verification */}
                        {step === 3 && (
                            <div className="space-y-6 animate-slideIn">
                                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                                    <HiOutlineShieldCheck className="w-6 h-6 text-civic-warning flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-amber-900">Government Identity Verification</p>
                                        <p className="text-xs text-amber-700 mt-1">Providing a verified ID ensures your complaint is prioritized by local authorities.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Full Name (As per ID) *</label>
                                    <input type="text" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Enter your full name" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Aadhaar Number (Last 4 Digits) *</label>
                                    <div className="relative">
                                        <HiOutlineFingerPrint className="absolute left-3 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5" />
                                        <input type="password" name="aadhaar" required value={form.aadhaar} onChange={handleChange} className="input-field pl-10" placeholder="••••" maxLength="4" />
                                    </div>
                                </div>

                                <div className="p-5 border-2 border-civic-border rounded-2xl bg-gray-50/50">
                                    <div className="flex items-start gap-4">
                                        <div className="pt-1">
                                            <input 
                                                type="checkbox" 
                                                id="isVerified" 
                                                name="isVerified" 
                                                checked={form.isVerified} 
                                                onChange={handleChange} 
                                                className="w-5 h-5 text-civic-primary rounded border-gray-300 focus:ring-civic-primary cursor-pointer" 
                                            />
                                        </div>
                                        <label htmlFor="isVerified" className="text-sm font-bold text-civic-textPrimary cursor-pointer">
                                            I solemnly affirm that the reported issue is genuine and based on my personal observation. I understand that submitting false complaints is a punishable offense.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Final Review */}
                        {step === 4 && (
                            <div className="space-y-6 animate-slideIn">
                                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                                    <h3 className="font-bold text-civic-primary mb-4 flex items-center gap-2">
                                        <HiOutlineDocumentText className="w-5 h-5" /> Assigned Authority
                                    </h3>
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-blue-100">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-500">RK</div>
                                        <div>
                                            <div className="font-bold text-civic-textPrimary text-base">Shri Ramesh Kumar</div>
                                            <div className="text-xs font-bold text-civic-primary uppercase tracking-wider">MLA, Constituency ({form.pincode || '600001'})</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-civic-textMuted uppercase tracking-widest">Issue Type</p>
                                        <p className="font-bold text-civic-textPrimary">{form.category}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-civic-textMuted uppercase tracking-widest">Verification Status</p>
                                        <p className={`font-bold ${form.isVerified ? 'text-civic-success' : 'text-civic-accent'}`}>
                                            {form.isVerified ? '✓ Identity Verified' : '⚠ Not Verified'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-civic-textMuted uppercase tracking-widest">Description</p>
                                    <p className="text-sm text-civic-textSecondary leading-relaxed italic">"{form.description || 'No description provided.'}"</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-auto pt-10 flex gap-4">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="btn-secondary h-14 flex-1">
                                    Previous Step
                                </button>
                            )}
                            {step < 4 ? (
                                <button 
                                    type="button" 
                                    onClick={nextStep} 
                                    disabled={step === 1 && !form.title}
                                    className="btn-primary h-14 flex-1 shadow-lg shadow-blue-100"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    disabled={loading || !form.isVerified} 
                                    className="btn-primary h-14 flex-1 bg-civic-success hover:bg-green-700 shadow-lg shadow-green-100 disabled:opacity-50 disabled:bg-gray-400"
                                >
                                    {loading ? 'Processing...' : 'Verify & Submit Complaint'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: Live Certificate Preview */}
                <div className="hidden lg:block w-[40%]">
                    <p className="text-xs font-bold text-civic-textMuted uppercase tracking-widest mb-4 flex items-center gap-2">
                         Digital Complaint Receipt Preview
                    </p>
                    <div className="w-full aspect-[1/1.414] bg-white shadow-modal rounded-sm border border-gray-200 p-8 flex flex-col relative overflow-hidden">
                        {/* Tricolor Header */}
                        <div className="absolute top-0 left-0 w-full h-2 flex">
                            <div className="flex-1 bg-civic-saffron"></div>
                            <div className="flex-1 bg-white"></div>
                            <div className="flex-1 bg-civic-success"></div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                            <HiOutlineShieldCheck className="w-64 h-64 text-civic-primary" />
                        </div>

                        {/* Certificate Header */}
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex items-center gap-2">
                                <HiOutlineShieldCheck className="w-7 h-7 text-civic-primary" />
                                <span className="font-bold text-civic-primary text-base">CivicReport</span>
                            </div>
                            <div className="text-right">
                                <div className="w-14 h-14 bg-gray-50 border border-gray-200 ml-auto flex items-center justify-center text-[8px] text-gray-400 font-bold">QR AUTH</div>
                                <p className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Scan to Verify</p>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold text-civic-textPrimary border-b-2 border-gray-100 inline-block px-8 pb-1 mb-1">COMPLAINT CERTIFICATE</h2>
                            <p className="text-[10px] text-civic-textMuted font-bold uppercase tracking-widest">Official Digital Submission</p>
                        </div>

                        <div className="space-y-4 text-[11px]">
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">Submission ID</div>
                                <div className="col-span-2 font-mono font-bold text-civic-textPrimary">#CR-TMP-2025-XXXX</div>
                            </div>
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">Reporter</div>
                                <div className="col-span-2 font-bold text-civic-textPrimary">{form.name || 'CITIZEN'}</div>
                            </div>
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">Issue Title</div>
                                <div className="col-span-2 font-bold text-civic-textPrimary">{form.title || 'NOT SPECIFIED'}</div>
                            </div>
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">Location</div>
                                <div className="col-span-2 font-bold text-civic-textPrimary">{form.location || '—'}, {form.pincode}</div>
                            </div>
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">ID Verification</div>
                                <div className="col-span-2">
                                    <span className={`font-bold px-2 py-0.5 rounded-full text-[9px] ${form.isVerified ? 'bg-green-50 text-civic-success border border-green-100' : 'bg-red-50 text-civic-accent border border-red-100'}`}>
                                        {form.isVerified ? '✓ GOVERNMENT VERIFIED' : '⚠ NOT VERIFIED'}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                                <div className="font-bold text-gray-400 uppercase tracking-tighter">Authority</div>
                                <div className="col-span-2 font-bold text-civic-primary">SHRI RAMESH KUMAR (MLA)</div>
                            </div>
                        </div>

                        {/* Evidence Preview */}
                        <div className="mt-8 border rounded-xl p-3 bg-gray-50/50">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Evidence</p>
                            <div className="h-28 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                {previews[0] ? (
                                    <img src={previews[0]} className="h-full w-full object-cover" alt="Proof" />
                                ) : (
                                    <HiOutlinePhotograph className="w-8 h-8 text-gray-200" />
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-6 text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <HiOutlineShieldCheck className="w-3 h-3 text-civic-success" />
                                <span className="text-[8px] font-bold text-civic-success uppercase tracking-widest">Legally Binding Digital Document</span>
                            </div>
                            <div className="text-[8px] text-gray-400 font-medium">
                                This certificate serves as official proof of submission on the CivicReport.in platform. 
                                It is cryptographically signed and stored in government-accessible archives.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTicket;
