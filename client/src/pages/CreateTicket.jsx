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
    HiOutlinePhone
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
        email: ''
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
            // Ignore pincode, name, mobile etc. for now if backend doesn't support it, 
            // but we will send what we can.
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
            <h1 className="text-[28px] font-bold text-civic-textPrimary mb-8">Report an Issue</h1>

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
                                    {s === 1 ? 'Details' : s === 2 ? 'Proof' : s === 3 ? 'You' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="card flex-1 flex flex-col">
                        {/* Step 1: Issue Details */}
                        {step === 1 && (
                            <div className="space-y-5 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5">Issue Title *</label>
                                    <input type="text" name="title" required value={form.title} onChange={handleChange} className="input-field" placeholder="e.g. Large pothole near the intersection" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5">Category *</label>
                                    <select name="category" value={form.category} onChange={handleChange} className="input-field">
                                        <option value="Road">Road</option>
                                        <option value="Water">Water</option>
                                        <option value="Electricity">Electricity</option>
                                        <option value="Garbage">Garbage</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-civic-textSecondary">Describe the issue *</label>
                                        <span className="text-xs text-civic-textMuted">{form.description.length} / 140 min</span>
                                    </div>
                                    <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="input-field resize-none" placeholder="Provide details about the issue..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5">Exact Location / Landmark *</label>
                                    <input type="text" name="location" required value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. Opposite to Central Park, Sector 4" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5">PIN Code *</label>
                                    <input type="text" name="pincode" required value={form.pincode} onChange={handleChange} className="input-field" placeholder="e.g. 560001" maxLength="6" />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Upload Proof */}
                        {step === 2 && (
                            <div className="space-y-5 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5">Media (Images / Videos) *</label>
                                    <div className="border-2 border-dashed border-civic-border rounded-xl p-8 text-center hover:border-civic-primary hover:bg-blue-50 transition-colors cursor-pointer relative">
                                        <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <HiOutlinePhotograph className="w-12 h-12 text-civic-primary mx-auto mb-3" />
                                        <p className="text-sm font-medium text-civic-textPrimary">Drop photos/videos here</p>
                                        <p className="text-xs text-civic-textMuted mt-1">Supports JPG, PNG, MP4 (Max 20MB)</p>
                                    </div>

                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3 mt-4">
                                            {previews.map((src, i) => (
                                                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-civic-border">
                                                    {src === 'video' ? (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">🎬 Video</div>
                                                    ) : (
                                                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                                                    )}
                                                    <button type="button" onClick={() => removeFile(i)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <HiOutlineX className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-civic-border">
                                    <input type="checkbox" id="isPublic" name="isPublic" checked={form.isPublic} onChange={handleChange} className="w-4 h-4 text-civic-primary bg-gray-100 border-gray-300 rounded focus:ring-civic-primary focus:ring-2" />
                                    <label htmlFor="isPublic" className="text-sm font-medium text-civic-textPrimary">Make this report public</label>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Your Details */}
                        {step === 3 && (
                            <div className="space-y-5 animate-slideIn">
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5"><HiOutlineUser className="inline mr-1"/> Full Name *</label>
                                    <input type="text" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Enter your full name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5"><HiOutlinePhone className="inline mr-1"/> Mobile Number *</label>
                                    <div className="flex gap-3">
                                        <input type="tel" name="mobile" required value={form.mobile} onChange={handleChange} className="input-field flex-1" placeholder="10-digit mobile number" />
                                        <button type="button" className="btn-secondary whitespace-nowrap">Verify</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-civic-textSecondary mb-1.5"><HiOutlineMail className="inline mr-1"/> Email Address (Optional)</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="To receive updates via email" />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Generate */}
                        {step === 4 && (
                            <div className="space-y-6 animate-slideIn">
                                <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                                    <h3 className="font-semibold text-civic-primary mb-4 flex items-center gap-2">
                                        <HiOutlineLocationMarker /> Assigned Leader Details
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-bold text-civic-textPrimary">Shri Ramesh Kumar</div>
                                            <div className="text-xs text-civic-textSecondary">MLA, Constituency ({form.pincode || 'XXXXXX'})</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-civic-textPrimary mb-3">Summary</h3>
                                    <ul className="text-sm space-y-2 text-civic-textSecondary">
                                        <li><strong className="text-civic-textPrimary">Issue:</strong> {form.title || 'N/A'}</li>
                                        <li><strong className="text-civic-textPrimary">Category:</strong> {form.category}</li>
                                        <li><strong className="text-civic-textPrimary">Location:</strong> {form.location || 'N/A'}</li>
                                        <li><strong className="text-civic-textPrimary">Proof Attached:</strong> {files.length} files</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-auto pt-8 flex gap-4">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="btn-secondary flex-1">
                                    Back
                                </button>
                            )}
                            {step < 4 ? (
                                <button type="button" onClick={nextStep} className="btn-primary flex-1">
                                    Continue
                                </button>
                            ) : (
                                <button type="submit" disabled={loading} className="btn-primary flex-1 bg-civic-success hover:bg-green-700 shadow-lg shadow-green-200">
                                    {loading ? 'Submitting...' : 'Generate Certificate & Submit'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: Live Preview */}
                <div className="hidden lg:block w-[40%] pl-8">
                    <p className="text-xs font-semibold text-civic-textMuted uppercase tracking-wider mb-4">Your certificate will look like this ↓</p>
                    <div className="w-full aspect-[1/1.414] bg-white shadow-modal rounded-sm border border-gray-200 p-6 flex flex-col relative overflow-hidden">
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                            <HiOutlineShieldCheck className="w-64 h-64 text-civic-primary" />
                        </div>

                        {/* Tricolor Header */}
                        <div className="absolute top-0 left-0 w-full h-2 flex">
                            <div className="flex-1 bg-[#FF9933]"></div>
                            <div className="flex-1 bg-white"></div>
                            <div className="flex-1 bg-[#138808]"></div>
                        </div>

                        {/* Header */}
                        <div className="flex justify-between items-start mt-4 mb-8">
                            <div className="flex items-center gap-1.5">
                                <HiOutlineShieldCheck className="w-6 h-6 text-civic-primary" />
                                <span className="font-bold text-civic-primary text-sm">CivicReport</span>
                            </div>
                            <div className="text-right">
                                <div className="w-12 h-12 bg-gray-100 border border-gray-300 ml-auto flex items-center justify-center text-[8px] text-gray-400">QR CODE</div>
                            </div>
                        </div>

                        <h2 className="text-lg font-bold text-center mb-6 border-b pb-2">CIVIC ISSUE COMPLAINT</h2>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Complaint ID</div>
                                <div className="col-span-2 font-mono font-bold">#CR-PENDING</div>
                            </div>
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Issue Title</div>
                                <div className="col-span-2">{form.title || '—'}</div>
                            </div>
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Location</div>
                                <div className="col-span-2">{form.location || '—'}</div>
                            </div>
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Category</div>
                                <div className="col-span-2"><span className="px-2 py-0.5 bg-gray-100 rounded-full font-semibold">{form.category}</span></div>
                            </div>
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Date Reported</div>
                                <div className="col-span-2">{new Date().toLocaleDateString('en-IN')}</div>
                            </div>
                            <div className="grid grid-cols-3 border-b pb-2">
                                <div className="font-semibold text-gray-500">Leader Assigned</div>
                                <div className="col-span-2 font-semibold">Shri Ramesh Kumar (MLA)</div>
                            </div>
                        </div>

                        {/* Photo Box */}
                        {previews.length > 0 && (
                            <div className="mt-6">
                                <div className="font-semibold text-gray-500 text-xs mb-2">Attached Proof</div>
                                <div className="h-24 bg-gray-100 rounded overflow-hidden flex">
                                    <img src={previews[0] !== 'video' ? previews[0] : ''} className="h-full w-full object-cover" alt="Proof 1" />
                                </div>
                            </div>
                        )}

                        <div className="mt-auto text-[9px] text-gray-400 text-center border-t pt-2">
                            This is an auto-generated digital certificate by CivicReport.in.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTicket;
