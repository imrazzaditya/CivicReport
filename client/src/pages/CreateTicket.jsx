import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
    HiOutlinePhotograph,
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineX,
} from 'react-icons/hi';

/**
 * CreateTicket — form page for reporting a new civic issue with media upload.
 */
const CreateTicket = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'Road',
        location: '',
    });
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        setFiles(selected);
        // Generate previews
        const urls = selected.map((f) =>
            f.type.startsWith('video/') ? 'video' : URL.createObjectURL(f)
        );
        setPreviews(urls);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('category', form.category);
            formData.append('location', form.location);
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
        <div className="max-w-2xl mx-auto animate-fadeInUp">
            <h1 className="text-2xl font-bold text-surface-800 mb-6">Report a Civic Issue</h1>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        Issue Title *
                    </label>
                    <input
                        id="ticket-title"
                        type="text"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g. Pothole on Main Street"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        Description *
                    </label>
                    <textarea
                        id="ticket-description"
                        name="description"
                        required
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className="input-field resize-none"
                        placeholder="Describe the issue in detail..."
                    />
                </div>

                {/* Category & Location */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            <HiOutlineTag className="inline w-4 h-4 mr-1" />
                            Category *
                        </label>
                        <select
                            id="ticket-category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Road">🛣️ Road</option>
                            <option value="Water">💧 Water</option>
                            <option value="Electricity">⚡ Electricity</option>
                            <option value="Garbage">🗑️ Garbage</option>
                            <option value="Other">📋 Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            <HiOutlineLocationMarker className="inline w-4 h-4 mr-1" />
                            Location *
                        </label>
                        <input
                            id="ticket-location"
                            type="text"
                            name="location"
                            required
                            value={form.location}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g. Sector 22, Block B"
                        />
                    </div>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        <HiOutlinePhotograph className="inline w-4 h-4 mr-1" />
                        Media (Images / Videos)
                    </label>
                    <div className="border-2 border-dashed border-surface-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                        <input
                            id="ticket-media"
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="ticket-media" className="cursor-pointer">
                            <HiOutlinePhotograph className="w-10 h-10 text-surface-300 mx-auto mb-2" />
                            <p className="text-sm text-surface-500">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-surface-400 mt-1">
                                Images (JPG, PNG, WebP) • Videos (MP4, MOV) • Max 10 MB each
                            </p>
                        </label>
                    </div>

                    {/* Previews */}
                    {previews.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                            {previews.map((src, i) => (
                                <div key={i} className="relative group">
                                    {src === 'video' ? (
                                        <div className="w-20 h-20 rounded-lg bg-surface-200 flex items-center justify-center text-xs text-surface-500">
                                            🎬 Video
                                        </div>
                                    ) : (
                                        <img
                                            src={src}
                                            alt="preview"
                                            className="w-20 h-20 rounded-lg object-cover border border-surface-200"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeFile(i)}
                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <HiOutlineX className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <button
                    id="ticket-submit"
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                        </div>
                    ) : (
                        'Submit Report'
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateTicket;
